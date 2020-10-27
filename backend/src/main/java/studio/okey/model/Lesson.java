package studio.okey.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "lesson")
@Getter
@Setter
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private Date date;
    private String theme;
    private String homework;
    private String description;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "group_id")
    @JsonManagedReference
    private LearningGroup learningGroup;

    @OneToMany(mappedBy = "lesson", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<LessonData> lessonDataSet;
}
