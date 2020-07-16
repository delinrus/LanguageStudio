package studio.okey.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;
import studio.okey.to.StudentTo;

import java.util.List;

import static org.springframework.test.util.AssertionErrors.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


public class StudentControllerTests extends AbstractTest {

    private TestsHelper testsHelper = new TestsHelper();
    private ObjectMapper mapper = new ObjectMapper();
    private TypeReference<List<StudentTo>> typeReference = new TypeReference<List<StudentTo>>() {
    };

    @Test
    public void getAll() throws Exception {
        ResultActions resultActions = mockMvc.perform(get("/students")
                .accept(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());


        String contentAsString = resultActions.andReturn().getResponse().getContentAsString();
        List<StudentTo> actual = mapper.readValue(contentAsString, typeReference);
        List<StudentTo> expected = testsHelper.getAllStudents();
        assertEquals("Возвращается не правильный результат при запросе GET /students.", expected, actual);
    }
}


