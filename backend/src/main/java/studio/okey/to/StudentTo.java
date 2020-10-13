package studio.okey.to;

import lombok.*;
import studio.okey.model.Parent;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class StudentTo {
    private Long id;
    private String surname;
    private String name;
    private String patronymic;
    private String phone;
    private String address;
    private String login;
    private List<Parent> parents;
    private GroupTo group;

    public StudentTo(Long id, String surname, String name, String patronymic, String phone, String address,
                     String login, List<Parent> parents, GroupTo group) {
        this.id = id;
        this.surname = surname;
        this.name = name;
        this.patronymic = patronymic;
        this.phone = phone;
        this.address = address;
        this.login = login;
        this.parents = parents;
        this.group = group;
    }
}
