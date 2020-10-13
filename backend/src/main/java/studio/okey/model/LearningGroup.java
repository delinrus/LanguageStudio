package studio.okey.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@ToString
@NoArgsConstructor
@Table(name = "learning_group")
public class LearningGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private boolean isIndividual;

    private Integer teacherId;

    @OneToMany(mappedBy = "learningGroup", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Lesson> Lessons;

    @OneToMany(mappedBy = "learningGroup", fetch = FetchType.EAGER)
    private Set<Student> students;
}
