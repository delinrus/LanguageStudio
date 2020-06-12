package studio.okey.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import studio.okey.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
