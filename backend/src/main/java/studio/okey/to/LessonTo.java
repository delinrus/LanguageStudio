package studio.okey.to;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Arrays;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class LessonTo {
    private Long id;

    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;

    private Long groupId;
    private String theme;
    private String homework;
    private String description;
    private Long[] studentIds;

    public LessonTo(Long id, Date date, Long groupId, String theme, String homework, String description, Long[] studentIds) {
        this.id = id;
        this.date = date;
        this.groupId = groupId;
        this.theme = theme;
        this.homework = homework;
        this.description = description;
        this.studentIds = studentIds;

        Arrays.sort(this.studentIds);
    }
}
