package studio.okey.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "lesson")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long lesson_id;
    private Date lesson_date;
    private String theme;
    private String homework;

    @ManyToOne (optional=false, cascade=CascadeType.ALL)
    @JoinColumn(name="group_id")
    private LearningGroup learningGroup;
}
