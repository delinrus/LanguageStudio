package studio.okey.model;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long student_id;
    private Long group_id;
    private String  surname;
    private String  name;
    private String  patronymic;
    private String  phone;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name="parent_student",
            joinColumns=@JoinColumn(name="student"),
            inverseJoinColumns=@JoinColumn(name="parent"))
    private Set<Parent> parents;

    @ManyToOne
    @JoinColumn(name="group_id", insertable = false, updatable = false)
    private LearningGroup learningGroup;

    protected Student() {
    }

    public Set<Parent> getParents() {
        return parents;
    }

    public Long getStudent_id() {
        return student_id;
    }

    public String getSurname() {
        return surname;
    }

    public String getName() {
        return name;
    }

    public String getPatronymic() {
        return patronymic;
    }

    public String getPhone() {
        return phone;
    }

    @Override
    public String toString() {
        return "Student{" +
                "student_id=" + student_id +
                ", group_id=" + group_id +
                ", surname='" + surname + '\'' +
                ", name='" + name + '\'' +
                ", patronymic='" + patronymic + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}
