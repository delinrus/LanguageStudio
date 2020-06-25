package studio.okey.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlConfig;
import org.springframework.test.context.junit4.SpringRunner;
import studio.okey.repository.StudentRepository;
import studio.okey.service.StudentService;

import static org.junit.Assert.assertEquals;


@RunWith(SpringRunner.class)
@SpringBootTest
@Sql(scripts = "classpath:init.sql", config = @SqlConfig(encoding = "UTF-8"))
public class StudentControllerTests {

    @Autowired
    private StudentService service;

    @Autowired
    private StudentRepository repository;


    @Test
    public void contextLoads() {
        assertEquals(4, service.count());
    }
}
