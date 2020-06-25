package studio.okey.model;

import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@ToString
@NoArgsConstructor
@Table(name = "parent")
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String surname;
    private String name;
    private String patronymic;
    private String phone;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name="parent_student",
            joinColumns=@JoinColumn(name="parent"),
            inverseJoinColumns=@JoinColumn(name="student"))
    private Set<Student> students;

    public Set<Student> getStudents() {
        return students;
    }
}
