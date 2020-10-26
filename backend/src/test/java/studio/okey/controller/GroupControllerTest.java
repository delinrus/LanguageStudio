package studio.okey.controller;

import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.util.AssertionErrors.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static studio.okey.controller.GroupTestData.*;

public class GroupControllerTest extends AbstractControllerTest {

    private static final String REST_URL = GroupController.REST_URL + '/';

    @Test
    public void getAll() throws Exception {
        ResultActions action = perform(MockMvcRequestBuilders.get(REST_URL)
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isOk());

        String contentAsString = action.andReturn().getResponse().getContentAsString();
        assertEquals("", ALL_GROUPS, contentAsString);
    }


    @Test
    public void get() throws Exception {
        ResultActions action = perform(MockMvcRequestBuilders.get(REST_URL + LEARNING_GROUP_INDEX)
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isOk());

        String contentAsString = action.andReturn().getResponse().getContentAsString();
        assertEquals("Возвращается неправильный результат при запросе GET /groups/{id}.",
                RESULT_GROUP_SHORT, contentAsString);
    }

    @Test
    public void getNotFound() throws Exception {
        perform(MockMvcRequestBuilders.get(REST_URL + GROUP_NON_EXISTING_INDEX))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    public void delete() throws Exception {
        perform(MockMvcRequestBuilders.delete(REST_URL + LEARNING_GROUP_INDEX))
                .andDo(print())
                .andExpect(status().isNoContent());

        ResultActions action = perform(MockMvcRequestBuilders.get(REST_URL + LEARNING_GROUP_INDEX)
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isNotFound());
    }

    @Test
    public void deleteNotFound() throws Exception {
        perform(MockMvcRequestBuilders.delete(REST_URL + GROUP_NON_EXISTING_INDEX))
                .andDo(print())
                .andExpect(status().isNotFound());

    }

    @Test
    public void createWithLocation() throws Exception {
        ResultActions action = perform(MockMvcRequestBuilders.post(REST_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(NEW_GROUP))
                .andDo(print())
                .andExpect(status().isCreated());

        String contentAsString = action.andReturn().getResponse().getContentAsString();
        assertEquals("Возвращается неправильный результат при запросе POST /groups/{id}.",
                RESULT_NEW_GROUP, contentAsString);
    }

}