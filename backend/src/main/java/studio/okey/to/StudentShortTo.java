package studio.okey.to;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class StudentShortTo {
    private Long id;
    private String surname;
    private String name;
    private String patronymic;
    private GroupTo group;

    public StudentShortTo(Long id, String surname, String name, String patronymic, GroupTo group) {
        this.id = id;
        this.surname = surname;
        this.name = name;
        this.patronymic = patronymic;
        this.group = group;
    }
}
