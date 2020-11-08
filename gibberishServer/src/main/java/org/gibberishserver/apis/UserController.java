package org.gibberishserver.apis;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.Optional;
import org.gibberishserver.models.User;
import org.gibberishserver.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Operation(summary = "Get an user by its id")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User found!",
                content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = User.class))}),
        @ApiResponse(responseCode = "404", description = "User not found",
                content = @Content)})
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") long id) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Create user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User created!!",
                content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = User.class))}),
        @ApiResponse(responseCode = "500", description = "Internal server error!",
                content = @Content)})
    @PostMapping("/insert")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            User _user = userRepository
                    .save(new User(user.getName(), user.getSurname(), user.getAddress(), user.getPhone(), user.getEmail(), user.getUser_type()));
            return new ResponseEntity<>(_user, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
