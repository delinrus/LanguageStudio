package studio.okey.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import studio.okey.model.LearningGroup;
import studio.okey.model.Student;
import studio.okey.service.LearningGroupService;
import studio.okey.service.StudentService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TestController {
    private final StudentService studentService;

    @Autowired
    public TestController(StudentService studentService) {
        this.studentService = studentService;
    }

    @RequestMapping(path = "/student", method = RequestMethod.GET)
    public List<Student> sayHello(){
        List<Student> students = studentService.getList();
        return  students;
    }

}

