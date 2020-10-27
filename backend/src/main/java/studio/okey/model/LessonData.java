package studio.okey.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "lesson_data")
@Getter
@Setter
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
    @JsonBackReference
    private Lesson lesson;

    @Column(name="student_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull
    private Long studentId;

    protected LessonData() {
    }
}
