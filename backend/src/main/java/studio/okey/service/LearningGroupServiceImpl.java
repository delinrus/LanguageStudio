package studio.okey.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studio.okey.model.LearningGroup;
import studio.okey.model.Student;
import studio.okey.repository.LearningGroupRepository;

import java.util.List;

import static studio.okey.util.StudentUtil.generateLogin;
import static studio.okey.util.ValidationUtil.checkNotFoundWithId;

@Service
public class LearningGroupServiceImpl implements LearningGroupService {
    private final LearningGroupRepository groupRepository;

    @Autowired
    public LearningGroupServiceImpl(LearningGroupRepository learningGroupRepository) {
        this.groupRepository = learningGroupRepository;
    }

    @Override
    public long count() {
        return groupRepository.count();
    }

    @Override
    public List<LearningGroup> getList() {
        return groupRepository.findAll();
    }

    @Override
    public void delete(long id) {
        boolean result = groupRepository.delete(id) != 0;
        checkNotFoundWithId(result, id);
    }

    @Override
    public LearningGroup get(long id) {
        return checkNotFoundWithId(groupRepository.findById(id).orElse(null), id);
    }

    @Override
    public LearningGroup save(LearningGroup group) {
        return groupRepository.save(group);
    }

}
