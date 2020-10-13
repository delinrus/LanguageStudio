package studio.okey.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@ToString
@NoArgsConstructor
@Table(name = "parent")
@Getter
@Setter
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
