package studio.okey.controller;

import studio.okey.to.GroupTo;
import studio.okey.to.StudentShortTo;

import java.util.ArrayList;
import java.util.List;

public class StudentTestData {

    public static final String NEW_STUDENT =
            "{" +
                    "\"name\": \"Виктор\"," +
                    "\"patronymic\":\"Иванович\"," +
                    "\"surname\": \"Чайков\"," +
                    "\"phone\" : \"8-834-437-24-11\"," +
                    "\"parents\":[" +
                    "{\"name\": \"Иван\"," +
                    "\"patronymic\":\"Федорович\"," +
                    "\"surname\": \"Чайков\"," +
                    "\"phone\" : \"8-834-437-24-11\"}," +
                    "{\"name\": \"Мария\"," +
                    "\"patronymic\":\"Олеговна\"," +
                    "\"surname\": \"Чайкова\"," +
                    "\"phone\" : \"8-834-437-24-11\"}]" +
                    "}";

    public static final String RESULT_NEW_STUDENT =
            "{" +
                    "\"id\":5," +
                    "\"surname\":\"Чайков\"," +
                    "\"name\":\"Виктор\"," +
                    "\"patronymic\":\"Иванович\"," +
                    "\"phone\":\"8-834-437-24-11\"," +
                    "\"address\":null," +
                    "\"login\":\"chaykov.vi\"," +
                    "\"parents\":" +
                    "[" +
                    "{\"id\":3," +
                    "\"surname\":\"Чайков\"," +
                    "\"name\":\"Иван\"," +
                    "\"patronymic\":\"Федорович\"," +
                    "\"phone\":\"8-834-437-24-11\"}," +
                    "" +
                    "{\"id\":4,\"surname\":\"Чайкова\"," +
                    "\"name\":\"Мария\"," +
                    "\"patronymic\":\"Олеговна\"," +
                    "\"phone\":\"8-834-437-24-11\"}" +
                    "]," +
                    "\"learningGroup\":null}";

    public static final String RESULT_STUDENT_BY_ID =
            "{\"id\":2," +
                    "\"surname\":\"Иванов\"," +
                    "\"name\":\"Василий\"," +
                    "\"patronymic\":\"Генадиевич\"," +
                    "\"phone\":\"8-935-532-83-98\"," +
                    "\"address\":null," +
                    "\"login\":\"ivanov.vg\"," +
                    "\"parents\":" +
                    "[{\"id\":1," +
                    "\"surname\":\"Иванов\"," +
                    "\"name\":\"Генадий\"," +
                    "\"patronymic\":\"Васильевич\"," +
                    "\"phone\":\"8-363-733-12-67\"}]," +
                    "\"group\":" +
                    "{\"name\":\"Группа понедельника\"," +
                    "\"studentCount\":2," +
                    "\"isIndividual\":false}}";

    public static final List<StudentShortTo> ALL_STUDENTS = new ArrayList<>();

    static {
        ALL_STUDENTS.add(new StudentShortTo(1L, "Назаренко", "Виктория", "Сергеевна", null));
        ALL_STUDENTS.add(new StudentShortTo(2L, "Иванов", "Василий", "Генадиевич",
                new GroupTo("Группа понедельника", false, 2)));
        ALL_STUDENTS.add(new StudentShortTo(3L, "Ветрова", "Валентина", "Федоровна",
                new GroupTo("Группа понедельника", false, 2)));
        ALL_STUDENTS.add(new StudentShortTo(4L, "Мурдашева", "Антонина", "Артемовна",
                new GroupTo("Группа вторника", false, 1)));

    }


}
