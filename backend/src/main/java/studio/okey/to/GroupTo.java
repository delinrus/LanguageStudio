package studio.okey.to;

import lombok.Getter;

@Getter
public class GroupTo {
    private String name;
    private boolean isIndividual;
    private int studentCount;

    public GroupTo(String name, boolean isIndividual, int studentCount) {
        this.name = name;
        this.isIndividual = isIndividual;
        this.studentCount = studentCount;
    }

}
