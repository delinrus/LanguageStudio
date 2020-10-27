package studio.okey.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import studio.okey.model.Lesson;
import studio.okey.model.LessonData;
import studio.okey.service.LessonService;
import studio.okey.to.LessonTo;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping(value = LessonController.REST_URL, produces = MediaType.APPLICATION_JSON_VALUE)
public class LessonController {
    private final LessonService lessonsService;

    public LessonController(LessonService lessonsService) {
        this.lessonsService = lessonsService;
    }

    public static final String REST_URL = "/lessons";

    @GetMapping
    public List<LessonTo> getAll(
            @RequestParam(value = "group", required = false) Long groupId,
            @RequestParam(value = "student", required = false) Long studentId,
            @RequestParam(value = "pageSize", required = false) Integer pageSize,
            @RequestParam(value = "group", required = false) Integer pageNumber) {

        List<Lesson> lessons = lessonsService.getList().stream()
                .filter(lesson -> groupId == null || lesson.getLearningGroup().getId().equals(groupId))
                .filter(lesson -> lesson.getLessonDataSet().stream()
                        .anyMatch(lessonData -> studentId == null || lessonData.getStudentId().equals(studentId)))
                .collect(Collectors.toList());

        return lessons.stream()
                .map(l -> new LessonTo(l.getId(), l.getDate(),
                        l.getLearningGroup().getId(), l.getTheme(),
                        l.getHomework(), l.getDescription(), l.getLessonDataSet().stream().map(LessonData::getStudentId).toArray(Long[]::new)))
                .collect(Collectors.toList());
    }
}