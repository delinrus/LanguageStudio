package studio.okey.model;

import javax.persistence.*;

@Entity
@Table(name = "lesson_data")
public class LessonData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Enumerated(EnumType.STRING)
    private Attendance attendance;
    @Enumerated(EnumType.STRING)
    private Homework homework;
    private String description;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    protected LessonData() {
    }
}
