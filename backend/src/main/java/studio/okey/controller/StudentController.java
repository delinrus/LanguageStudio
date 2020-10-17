package studio.okey.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import studio.okey.model.Student;
import studio.okey.service.StudentService;
import studio.okey.to.StudentShortTo;
import studio.okey.to.StudentTo;
import studio.okey.util.StudentUtil;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = StudentController.REST_URL, produces = MediaType.APPLICATION_JSON_VALUE)
public class StudentController {
    private final StudentService studentService;
    public static final String REST_URL = "/students";

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<StudentShortTo> getAll() {
        return StudentUtil.getShortTos(studentService.getList());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Student> createWithLocation(@RequestBody Student student) {
        student.getParents().forEach(parent -> parent.setStudent(student));
        Student created = studentService.save(student);

        URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(REST_URL + "/{id}")
                .buildAndExpand(created.getId()).toUri();

        return ResponseEntity.created(uriOfNewResource).body(created);
    }

    @GetMapping("/{id}")
    public StudentTo get(@PathVariable long id) {
        return StudentUtil.getTo(studentService.get(id));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable long id) {
        studentService.delete(id);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void update(@RequestBody Student student, @PathVariable long id) {
        studentService.update(student, id);
    }



}

