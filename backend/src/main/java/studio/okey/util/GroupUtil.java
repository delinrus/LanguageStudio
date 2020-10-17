package studio.okey.util;

import io.micrometer.core.lang.Nullable;
import studio.okey.model.LearningGroup;
import studio.okey.to.GroupTo;

import java.util.List;
import java.util.stream.Collectors;

public class GroupUtil {
    public static GroupTo createTo(@Nullable  LearningGroup lg) {
        if (lg == null) {
            return null;
        }
        return new GroupTo(lg.getName(), lg.isIndividual(), lg.getStudents().size());
    }

    public static List<GroupTo> createTos(List<LearningGroup> list) {
        return  list.stream().map(GroupUtil::createTo).collect(Collectors.toList());
    }
}
