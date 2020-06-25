package studio.okey.util;

import studio.okey.model.LearningGroup;
import studio.okey.to.GroupTo;

public class GroupUtil {
    public static GroupTo createTo(LearningGroup lg) {
        return new GroupTo(lg.getName(), false, lg.getStudents().size());
    }
}
