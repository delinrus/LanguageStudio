package studio.okey.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import studio.okey.service.StudentService;
import studio.okey.to.StudentTo;
import studio.okey.util.StudentUtil;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<StudentTo> getStudentsList() {
        return StudentUtil.getTos(studentService.getList());
    }
}

