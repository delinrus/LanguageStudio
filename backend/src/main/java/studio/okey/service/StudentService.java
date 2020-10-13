package studio.okey.service;

import studio.okey.model.Student;

import java.util.List;

public interface StudentService {
    long count();

    List<Student> getList();

    void delete(Long id);

    Student save(Student student);
}
