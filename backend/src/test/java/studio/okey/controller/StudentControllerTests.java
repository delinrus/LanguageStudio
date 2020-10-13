package studio.okey.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import studio.okey.to.StudentTo;

import java.util.List;

import static org.springframework.test.util.AssertionErrors.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static studio.okey.controller.StudentTestData.*;


public class StudentControllerTests extends AbstractControllerTest {
    private ObjectMapper mapper = new ObjectMapper();
    private TypeReference<List<StudentTo>> typeReference = new TypeReference<List<StudentTo>>() {
    };

    private static final String REST_URL = StudentController.REST_URL + '/';

    @Test
    public void getAll() throws Exception {
        ResultActions resultActions = mockMvc.perform(get("/students")
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isOk());


        String contentAsString = resultActions.andReturn().getResponse().getContentAsString();
        List<StudentTo> actual = mapper.readValue(contentAsString, typeReference);
        assertEquals("Возвращается не правильный результат при запросе GET /students.", ALL_STUDENTS, actual);
    }

    @Test
    public void createWithLocation() throws Exception {
        ResultActions action = perform(MockMvcRequestBuilders.post(REST_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(NEW_STUDENT))
                .andDo(print())
                .andExpect(status().isCreated());

        String contentAsString = action.andReturn().getResponse().getContentAsString();
        assertEquals("Возвращается не правильный результат при запросе POST /students/{id}.", RESULT_NEW_STUDENT, contentAsString);
    }
}


