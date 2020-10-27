package studio.okey.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import studio.okey.model.LessonData;

public interface LessonDataRepository extends JpaRepository<LessonData, Long> {

}
