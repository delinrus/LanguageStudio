package studio.okey.model;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "learning_group")
public class LearningGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long group_id;
    private String name;

    @OneToMany(mappedBy="learningGroup", fetch=FetchType.EAGER, cascade=CascadeType.ALL)
    private Set<Lesson> Lessons;

    @OneToMany(mappedBy="learningGroup", fetch=FetchType.EAGER)
    private Set<Student> students;

    protected LearningGroup() {
    }

    public long getGroup_id() {
        return group_id;
    }

    @Override
    public String toString() {
        return "LearningGroup{" +
                "group_id=" + group_id +
                ", name='" + name + '\'' +
                ", Lessons=" + Lessons +
                ", students=" + students +
                '}';
    }
}
