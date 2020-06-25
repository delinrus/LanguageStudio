package studio.okey.util;

import studio.okey.model.Student;
import studio.okey.to.StudentTo;

import java.util.List;
import java.util.stream.Collectors;

public class StudentUtil {
    public static List<StudentTo> getTos(List<Student> students) {
        return students.stream().map(StudentUtil::crateTo).collect(Collectors.toList());
    }

    private static StudentTo crateTo(Student s) {
        return new StudentTo(s.getStudentId(), s.getSurname(), s.getName(), s.getPatronymic(),
                s.getLearningGroup() == null ? null : GroupUtil.createTo(s.getLearningGroup()));
    }

}
