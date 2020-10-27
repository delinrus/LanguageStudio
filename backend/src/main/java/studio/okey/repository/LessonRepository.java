package studio.okey.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import studio.okey.model.Lesson;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

}
