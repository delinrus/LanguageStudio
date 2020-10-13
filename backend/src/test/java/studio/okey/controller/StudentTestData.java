package studio.okey.controller;

import studio.okey.to.GroupTo;
import studio.okey.to.StudentTo;

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
                    "\"phone\":\"8-834-437-24-11\"," +
                    "\"students\":null}," +
                    "" +
                    "{\"id\":4,\"surname\":\"Чайкова\"," +
                    "\"name\":\"Мария\"," +
                    "\"patronymic\":\"Олеговна\"," +
                    "\"phone\":\"8-834-437-24-11\"," +
                    "\"students\":null}" +
                    "]," +
                    "\"learningGroup\":null}";


    public static final List<StudentTo> ALL_STUDENTS = new ArrayList<>();

    static {
        ALL_STUDENTS.add(new StudentTo(1L, "Назаренко", "Виктория", "Сергеевна", null));
        ALL_STUDENTS.add(new StudentTo(2L, "Иванов", "Василий", "Генадиевич",
                new GroupTo("Группа понедельника", false, 2)));
        ALL_STUDENTS.add(new StudentTo(3L, "Ветрова", "Валентина", "Федоровна",
                new GroupTo("Группа понедельника", false, 2)));
        ALL_STUDENTS.add(new StudentTo(4L, "Мурдашева", "Антонина", "Артемовна",
                new GroupTo("Группа вторника", false, 1)));

    }


}
