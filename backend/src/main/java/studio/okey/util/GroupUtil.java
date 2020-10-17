package studio.okey.util;

import io.micrometer.core.lang.Nullable;
import studio.okey.model.LearningGroup;
import studio.okey.to.GroupTo;

public class GroupUtil {
    public static GroupTo createTo(@Nullable  LearningGroup lg) {
        if (lg == null) {
            return null;
        }
        return new GroupTo(lg.getName(), false, lg.getStudents().size());
    }
}
