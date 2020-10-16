package studio.okey.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studio.okey.model.Student;
import studio.okey.repository.StudentRepository;

import java.util.List;

import static studio.okey.util.StudentUtil.generateLogin;
import static studio.okey.util.ValidationUtil.checkNotFoundWithId;

@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public long count() {
        return studentRepository.count();
    }

    @Override
    public List<Student> getList() {
        return studentRepository.findAll();
    }

    @Override
    public void delete(long id) {
        boolean result = studentRepository.delete(id) != 0;
        checkNotFoundWithId(result, id);
    }

    @Override
    public Student save(Student student) {
        student.setLogin(generateLogin(student));
        return studentRepository.save(student);
    }

    @Override
    public Student get(long id) {
        return checkNotFoundWithId(studentRepository.findById(id).orElse(null), id);
    }
}
