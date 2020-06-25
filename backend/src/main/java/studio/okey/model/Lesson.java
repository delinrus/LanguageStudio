package studio.okey.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "lesson")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long lessonId;
    private Date lessonDate;
    private String theme;
    private String homework;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "group_name")
    private LearningGroup learningGroup;
}
