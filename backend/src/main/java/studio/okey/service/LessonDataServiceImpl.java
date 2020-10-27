package studio.okey.service;

import org.springframework.stereotype.Service;
import studio.okey.model.LessonData;
import studio.okey.repository.LessonDataRepository;

import java.util.List;

@Service
public class LessonDataServiceImpl implements LessonDataService {

    private final LessonDataRepository lessonDataRepository;

    public LessonDataServiceImpl(LessonDataRepository lessonDataRepository) {
        this.lessonDataRepository = lessonDataRepository;
    }

    @Override
    public List<LessonData> getList() {
        return lessonDataRepository.findAll();
    }
}
