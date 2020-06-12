package studio.okey.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import studio.okey.model.LearningGroup;

public interface LearningGroupRepository extends JpaRepository<LearningGroup, Long> {
}
