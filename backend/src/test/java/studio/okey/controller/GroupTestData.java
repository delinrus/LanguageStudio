package studio.okey.controller;

public class GroupTestData {

    public static final String ALL_GROUPS =
            "[{\"name\":\"Группа понедельника\"," +
                    "\"studentCount\":2," +
                    "\"isIndividual\":true}," +
                    "{\"name\":\"Группа вторника\"," +
                    "\"studentCount\":1," +
                    "\"isIndividual\":false}]";

    public static final String RESULT_GROUP_SHORT =
            "{\"name\":\"Группа понедельника\"" +
                    ",\"studentCount\":2," +
                    "\"isIndividual\":true}";

    public static final Long LEARNING_GROUP_INDEX = 1L;

    public static final Long GROUP_NON_EXISTING_INDEX = 1000001L;
}
