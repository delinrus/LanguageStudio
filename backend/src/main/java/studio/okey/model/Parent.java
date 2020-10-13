package studio.okey.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@ToString
@NoArgsConstructor
@Table(name = "parent")
@Getter
@Setter
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String surname;
    private String name;
    private String patronymic;
    private String phone;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Student student;
}
