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
            "{\"name\":\"Группа понедельника\"," +
                    "\"studentCount\":2," +
                    "\"isIndividual\":true}";

    public static final String NEW_GROUP =
            "{\"name\":\"Новая группа\"," +
                    "\"isIndividual\":true}";

    public static final String RESULT_NEW_GROUP =
            "{\"name\":\"Новая группа\"" +
                    ",\"studentCount\":0," +
                    "\"isIndividual\":true}";

    public static final String UPDATED_GROUP =
            "{\"name\":\"Измененная группа\"," +
                    "\"isIndividual\":false}";

    public static final String RESULT_UPDATED_GROUP =
            "{\"name\":\"Измененная группа\"" +
                    ",\"studentCount\":2," +
                    "\"isIndividual\":false}";

    public static final Long LEARNING_GROUP_INDEX = 1L;

    public static final Long GROUP_NON_EXISTING_INDEX = 1000001L;
}
