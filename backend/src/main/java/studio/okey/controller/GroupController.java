package studio.okey.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import studio.okey.service.LearningGroupService;
import studio.okey.to.GroupTo;

import java.util.List;

import static studio.okey.util.GroupUtil.createTo;
import static studio.okey.util.GroupUtil.createTos;

@RestController
@RequestMapping(value = GroupController.REST_URL, produces = MediaType.APPLICATION_JSON_VALUE)
public class GroupController {
    private final LearningGroupService groupService;
    public static final String REST_URL = "/groups";

    public GroupController(LearningGroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping
    public List<GroupTo> getAll() {
        return createTos(groupService.getList());
    }

    @GetMapping("/{id}")
    public GroupTo get(@PathVariable long id) {
        return createTo(groupService.get(id));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable long id) {
        groupService.delete(id);
    }
}
