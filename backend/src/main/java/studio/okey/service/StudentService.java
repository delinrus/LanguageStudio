package studio.okey.service;

import studio.okey.model.Student;

import java.util.List;

public interface StudentService {
    long count();

    List<Student> getList();

    void delete(long id);

    Student save(Student student);

    Student get(long id);

    void update(Student student, long id);
}
