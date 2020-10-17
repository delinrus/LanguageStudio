package studio.okey.util;

import com.ibm.icu.text.Transliterator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import studio.okey.model.Student;
import studio.okey.repository.LearningGroupRepository;
import studio.okey.to.GroupTo;
import studio.okey.to.StudentShortTo;
import studio.okey.to.StudentTo;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class StudentUtil {
    private static LearningGroupRepository groupRepository;

    @Autowired
    public StudentUtil(LearningGroupRepository groupRepository) {
        StudentUtil.groupRepository = groupRepository;
    }

    public static List<StudentShortTo> getShortTos(List<Student> students) {
        return students.stream().map(StudentUtil::getShortTo).collect(Collectors.toList());
    }

    private static GroupTo getGroupToFromStudent(Student s) {
        return s.getLearningGroupId() == null ? null :
                GroupUtil.createTo(groupRepository.findById(s.getLearningGroupId()).orElse(null));
    }

    public static StudentShortTo getShortTo(Student s) {
        return new StudentShortTo(s.getId(), s.getSurname(), s.getName(), s.getPatronymic(), getGroupToFromStudent(s));
    }

    public static StudentTo getTo(Student s) {
        return new StudentTo(s.getId(), s.getSurname(), s.getName(),
                s.getPatronymic(), s.getPhone(), s.getAddress(), s.getLogin(), s.getParents(), getGroupToFromStudent(s));
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
