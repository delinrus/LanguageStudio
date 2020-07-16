package studio.okey.to;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class GroupTo {
    private String name;
    private boolean isIndividual;
    private int studentCount;

    public GroupTo(String name, boolean isIndividual, int studentCount) {
        this.name = name;
        this.isIndividual = isIndividual;
        this.studentCount = studentCount;
    }

    @JsonProperty(value = "isIndividual")
    public boolean isIndividual() {
        return isIndividual;
    }
}
