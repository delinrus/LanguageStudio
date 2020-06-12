package studio.okey.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studio.okey.model.LearningGroup;
import studio.okey.repository.LearningGroupRepository;
import studio.okey.repository.StudentRepository;

import java.util.List;

@Service
public class LearningGroupServiceImpl implements LearningGroupService {
    private final LearningGroupRepository learningGroupRepository;

    @Autowired
    public LearningGroupServiceImpl(LearningGroupRepository learningGroupRepository) {
        this.learningGroupRepository = learningGroupRepository;
    }

    @Override
    public long count() {
        return learningGroupRepository.count();
    }

    @Override
    public List<LearningGroup> getList() {
        return learningGroupRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        learningGroupRepository.deleteById(id);
    }
}
