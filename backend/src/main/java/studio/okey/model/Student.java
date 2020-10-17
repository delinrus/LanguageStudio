package studio.okey.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@NoArgsConstructor
@ToString
@Getter
@Setter
@Table(name = "student")
public class Student extends AbstractBaseEntity  {

    private String surname;
    private String name;
    private String patronymic;
    private String phone;
    private String address;

    @NotNull
    @Column(unique = true)
    private String login;

    @OneToMany(mappedBy = "student", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Parent> parents;

    @Column(name="group_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Long learningGroupId;
}
