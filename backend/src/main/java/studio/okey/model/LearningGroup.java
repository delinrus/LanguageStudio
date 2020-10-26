package studio.okey.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
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

    @OneToMany(mappedBy = "learningGroupId", fetch = FetchType.EAGER)
    private Set<Student> students = new HashSet<>();
}
