package studio.okey.util;

import com.ibm.icu.text.Transliterator;
import studio.okey.model.Student;
import studio.okey.to.StudentTo;

import java.util.List;
import java.util.stream.Collectors;

public class StudentUtil {
    public static List<StudentTo> getTos(List<Student> students) {
        return students.stream().map(StudentUtil::crateTo).collect(Collectors.toList());
    }

    public static StudentTo crateTo(Student s) {
        return new StudentTo(s.getId(), s.getSurname(), s.getName(), s.getPatronymic(),
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
