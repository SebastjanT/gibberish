package org.gibberishserver.apis;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.Optional;
import org.gibberishserver.models.Device;
import org.gibberishserver.repositories.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    @Autowired
    DeviceRepository deviceRepository;

    @Operation(summary = "Get a device by its id")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Device found!",
                content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Device.class))}),
        @ApiResponse(responseCode = "404", description = "Device not found",
                content = @Content)})
    @GetMapping("/{id}")
    public ResponseEntity<Device> getDeviceById(@PathVariable("id") long id) {
        Optional<Device> deviceData = deviceRepository.findById(id);

        if (deviceData.isPresent()) {
            return new ResponseEntity<>(deviceData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
