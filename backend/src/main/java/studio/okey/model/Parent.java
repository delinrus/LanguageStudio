package studio.okey.model;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "parent")
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long parent_id;
    private String surname;
    private String name;
    private String patronymic;
    private String phone;

    protected Parent() {
    }

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name="parent_student",
            joinColumns=@JoinColumn(name="parent"),
            inverseJoinColumns=@JoinColumn(name="student"))
    private Set<Student> students;

    public Set<Student> getStudents() {
        return students;
    }

    @Override
    public String toString() {
        return "Parent{" +
                "parent_id=" + parent_id +
                ", surname='" + surname + '\'' +
                ", name='" + name + '\'' +
                ", patronymic='" + patronymic + '\'' +
                ", phone='" + phone +
                '}';
    }
}
