package studio.okey.controller;

import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.util.AssertionErrors.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static studio.okey.controller.LessonTestData.*;


public class LessonControllerTest extends AbstractControllerTest {

    private static final String REST_URL = LessonController.REST_URL + '/';

    @Test
    public void getAll() throws Exception {
        ResultActions action = perform(MockMvcRequestBuilders.get(REST_URL))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

        String contentAsString = action.andReturn().getResponse().getContentAsString();
        assertEquals("", ALL_LESSONS, contentAsString);
    }

    @Test
    public void getByGroupId() throws Exception {
        ResultActions action = perform(MockMvcRequestBuilders.get(REST_URL)
                .param("group", "1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

        String contentAsString = action.andReturn().getResponse().getContentAsString();
        assertEquals("", GROUP1_LESSONS, contentAsString);
    }

    @Test
    public void getByStudentId() throws Exception {
        ResultActions action = perform(MockMvcRequestBuilders.get(REST_URL)
                .param("student", "1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

        String contentAsString = action.andReturn().getResponse().getContentAsString();
        assertEquals("", STUDENT1_LESSONS, contentAsString);
    }
}
