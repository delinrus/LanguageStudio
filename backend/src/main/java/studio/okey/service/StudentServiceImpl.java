package studio.okey.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studio.okey.model.Student;
import studio.okey.repository.StudentRepository;

import java.util.List;

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
    public void delete(Long id) {
        studentRepository.deleteById(id);
    }
}
