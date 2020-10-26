package studio.okey.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import studio.okey.model.LearningGroup;
import studio.okey.service.LearningGroupService;
import studio.okey.to.GroupTo;
import studio.okey.util.exception.IllegalRequestDataException;

import java.net.URI;
import java.util.List;

import static studio.okey.util.GroupUtil.*;

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

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GroupTo> createWithLocation(@RequestBody GroupTo groupTo) {
        if (groupTo.getStudentCount() != 0) {
            throw new IllegalRequestDataException("studentCount must be 0");
        }
        LearningGroup created = groupService.save(getFromTo(groupTo));

        URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(REST_URL + "/{id}")
                .buildAndExpand(created.getId()).toUri();

        return ResponseEntity.created(uriOfNewResource).body(createTo(created));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void update(@RequestBody GroupTo groupTo, @PathVariable long id) {
        groupService.update(getFromTo(groupTo), id);
    }
}
