package org.gibberishserver.apis;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.gibberishserver.models.Device;
import org.gibberishserver.models.Provider;
import org.gibberishserver.models.Task;
import org.gibberishserver.models.User;
import org.gibberishserver.repositories.DeviceRepository;
import org.gibberishserver.repositories.ProviderRepository;
import org.gibberishserver.repositories.TaskRepository;
import org.gibberishserver.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    TaskRepository taskrepository;
    @Autowired
    DeviceRepository deviceRepository;
    @Autowired
    ProviderRepository providerRepository;
    @Autowired
    UserRepository userRepository;

    @Operation(summary = "Get all tasks")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Tasks found!",
                content = @Content),
        @ApiResponse(responseCode = "404", description = "Tasks not found",
                content = @Content)})
    @GetMapping("")
    public ResponseEntity<List<Task>> getAllTasks() {
        try {
            List<Task> tasks = new ArrayList<Task>();

            taskrepository.findAll().forEach(tasks::add);

            if (tasks.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Create task")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Task created!",
                content = @Content),
        @ApiResponse(responseCode = "404", description = "Device or provider not found",
                content = @Content),
        @ApiResponse(responseCode = "500", description = "Internal server error",
                content = @Content)})
    @PostMapping("/{device_id}")
    public ResponseEntity<Task> createTasks(@PathVariable("device_id") long device_id) {
        try {
            Optional<Device> deviceData = deviceRepository.findById(device_id);
            if (!deviceData.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Optional<Provider> providerData = providerRepository.findById(Long.valueOf(0));
            if (!providerData.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            User user = deviceData.get().getUser();
            Task _task = taskrepository.save(new Task(new Date(System.currentTimeMillis()), user.getAddress(), "pending", 4.20, null, deviceData.get().getUser(), providerData.get()));
            return new ResponseEntity<>(_task, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @Operation(summary = "Update task progress")
//    @ApiResponses(value = {
//        @ApiResponse(responseCode = "200", description = "Task updated!",
//                content = @Content),
//        @ApiResponse(responseCode = "404", description = "Task or worker not found",
//                content = @Content),
//        @ApiResponse(responseCode = "500", description = "Internal server error",
//                content = @Content)})
//    @PostMapping("/{task_id}/{worker_id}")
//    public ResponseEntity<Task> createTasks(@PathVariable("task_id") long task_id, @PathVariable("worker_id") long worker_id) {
//        try {
//            Optional<User> userData = userRepository.findById(worker_id);
//            if (!userData.isPresent()) {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }
//
//            Optional<Provider> providerData = providerRepository.findById(Long.valueOf(0));
//            if (!providerData.isPresent()) {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }
//
//            User user = deviceData.get().getUser();
//            Task _task = taskrepository.save(new Task(new Date(System.currentTimeMillis()), user.getAddress(), "pending", 4.20, null, deviceData.get().getUser(), providerData.get()));
//            return new ResponseEntity<>(_task, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}
