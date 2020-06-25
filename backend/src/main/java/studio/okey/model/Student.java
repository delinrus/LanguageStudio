package studio.okey.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@NoArgsConstructor
@ToString
@Getter
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long studentId;
    private String surname;
    private String name;
    private String patronymic;
    private String phone;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "parent_student",
            joinColumns = @JoinColumn(name = "student"),
            inverseJoinColumns = @JoinColumn(name = "parent"))
    private Set<Parent> parents;

    @ManyToOne
    @JoinColumn(name = "group_name", insertable = false, updatable = false)
    private LearningGroup learningGroup;

    public Set<Parent> getParents() {
        return parents;
    }
}
