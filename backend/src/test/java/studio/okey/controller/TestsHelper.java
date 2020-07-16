package studio.okey.controller;

import studio.okey.to.GroupTo;
import studio.okey.to.StudentTo;

import java.util.ArrayList;
import java.util.List;

public class TestsHelper {
    private List<StudentTo> allStudents = new ArrayList<>();

    {
        allStudents.add(new StudentTo(1L, "Хренова", "Гадя", "Петрович", null));
        allStudents.add(new StudentTo(2L, "Иванов", "Василий", "Генадиевич",
                new GroupTo("Группа понедельника", false, 2)));
        allStudents.add(new StudentTo(3L, "Ветрова", "Валентина", "Федоровна",
                new GroupTo("Группа понедельника", false, 2)));
        allStudents.add(new StudentTo(4L, "Мурдашева", "Антонина", "Артемовна",
                new GroupTo("Группа вторника", false, 1)));

    }

    public List<StudentTo> getAllStudents() {
        return allStudents;
    }

}
