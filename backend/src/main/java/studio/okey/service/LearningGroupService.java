package studio.okey.service;

import studio.okey.model.LearningGroup;

import java.util.List;

public interface LearningGroupService {
    long count();

    List<LearningGroup> getList();

    void delete(long id);

    LearningGroup get(long id);

    LearningGroup save(LearningGroup group);
}
