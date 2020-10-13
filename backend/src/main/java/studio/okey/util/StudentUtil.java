package studio.okey.util;

import com.ibm.icu.text.Transliterator;
import studio.okey.model.Student;
import studio.okey.to.StudentShortTo;
import studio.okey.to.StudentTo;

import java.util.List;
import java.util.stream.Collectors;

public class StudentUtil {
    public static List<StudentShortTo> getShortTos(List<Student> students) {
        return students.stream().map(StudentUtil::getShortTo).collect(Collectors.toList());
    }

    public static StudentShortTo getShortTo(Student s) {
        return new StudentShortTo(s.getId(), s.getSurname(), s.getName(), s.getPatronymic(),
                s.getLearningGroup() == null ? null : GroupUtil.createTo(s.getLearningGroup()));
    }

    public static StudentTo getTo(Student s) {
        return new StudentTo(s.getId(), s.getSurname(), s.getName(),
                s.getPatronymic(), s.getPhone(), s.getAddress(), s.getLogin(), s.getParents(),
                s.getLearningGroup() == null ? null : GroupUtil.createTo(s.getLearningGroup()));
    }

    public static String generateLogin(Student s) {
        Transliterator toLatinTrans = Transliterator.getInstance("Russian-Latin/BGN");
        String surnameStr = toLatinTrans.transliterate(s.getSurname());
        String nameStr = toLatinTrans.transliterate(s.getName().substring(0, 1));
        String patronymicStr = toLatinTrans.transliterate(s.getPatronymic().substring(0, 1));
        String result = surnameStr + "." + nameStr + patronymicStr;
        return result.toLowerCase();
    }
}
