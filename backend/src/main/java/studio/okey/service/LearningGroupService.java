package studio.okey.service;

import studio.okey.model.LearningGroup;
import studio.okey.to.GroupTo;

import java.util.List;

public interface LearningGroupService {
    long count();

    List<LearningGroup> getList();

    void delete(Long id);

    LearningGroup get(long id);
}
