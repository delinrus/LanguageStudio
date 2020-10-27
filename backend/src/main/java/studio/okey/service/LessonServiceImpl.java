package studio.okey.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studio.okey.model.Lesson;
import studio.okey.repository.LessonRepository;

import java.util.List;

@Service
public class LessonServiceImpl implements LessonService {

    private final LessonRepository lessonRepository;

    @Autowired
    public LessonServiceImpl(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    @Override
    public List<Lesson> getList() {
        return lessonRepository.findAll();
    }
}
