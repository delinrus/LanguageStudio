package studio.okey.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import studio.okey.to.StudentShortTo;

import java.util.List;

import static org.springframework.test.util.AssertionErrors.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static studio.okey.controller.StudentTestData.*;


public class StudentControllerTests extends AbstractControllerTest {
    private ObjectMapper mapper = new ObjectMapper();
    private TypeReference<List<StudentShortTo>> typeReference = new TypeReference<List<StudentShortTo>>() {
    };

    private static final String REST_URL = StudentController.REST_URL + '/';

    @Test
    public void getAll() throws Exception {
        ResultActions resultActions = perform(MockMvcRequestBuilders.get(REST_URL)
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isOk());


        String contentAsString = resultActions.andReturn().getResponse().getContentAsString();
        List<StudentShortTo> actual = mapper.readValue(contentAsString, typeReference);
        assertEquals("Возвращается неправильный результат при запросе GET /students.", ALL_STUDENTS, actual);
    }

    @Test
    public void createWithLocation() throws Exception {
        ResultActions action = perform(MockMvcRequestBuilders.post(REST_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(NEW_STUDENT))
                .andDo(print())
                .andExpect(status().isCreated());

        String contentAsString = action.andReturn().getResponse().getContentAsString();
        assertEquals("Возвращается неправильный результат при запросе POST /students/{id}.",
                RESULT_NEW_STUDENT, contentAsString);
    }

    @Test
    public void get() throws Exception {
        ResultActions action = perform(MockMvcRequestBuilders.get(REST_URL + STUDENT_INDEX)
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isOk());

        String contentAsString = action.andReturn().getResponse().getContentAsString();
        assertEquals("Возвращается неправильный результат при запросе GET /students/{id}.",
                RESULT_STUDENT_BY_ID, contentAsString);
    }

    @Test
    public void getNotFound() throws Exception {
        perform(MockMvcRequestBuilders.get(REST_URL + STUDENT_NON_EXISTING_INDEX))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    public void delete() throws Exception {
        perform(MockMvcRequestBuilders.delete(REST_URL + STUDENT_INDEX))
                .andDo(print())
                .andExpect(status().isNoContent());

        ResultActions action = perform(MockMvcRequestBuilders.get(REST_URL + STUDENT_INDEX)
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isNotFound());
    }

    @Test
    public void deleteNotFound() throws Exception {
        perform(MockMvcRequestBuilders.delete(REST_URL + STUDENT_NON_EXISTING_INDEX))
                .andDo(print())
                .andExpect(status().isNotFound());

    }


    @Test
    public void update() throws Exception {
        perform(MockMvcRequestBuilders.put(REST_URL + STUDENT_INDEX)
                .contentType(MediaType.APPLICATION_JSON)
                .content(UPDATED_STUDENT))
                .andDo(print())
                .andExpect(status().isNoContent());


        ResultActions action = perform(MockMvcRequestBuilders.get(REST_URL + STUDENT_INDEX)
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isOk());

        String contentAsString = action.andReturn().getResponse().getContentAsString();
        assertEquals("", UPDATED_STUDENT_RESULT, contentAsString);
    }

    @Test
    public void updateNotFound() throws Exception {
        perform(MockMvcRequestBuilders.put(REST_URL + STUDENT_NON_EXISTING_INDEX)
                .contentType(MediaType.APPLICATION_JSON)
                .content(UPDATED_STUDENT))
                .andDo(print())
                .andExpect(status().isNotFound());
    }
}


