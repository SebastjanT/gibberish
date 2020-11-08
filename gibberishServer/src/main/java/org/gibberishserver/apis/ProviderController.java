package org.gibberishserver.apis;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.Optional;
import org.gibberishserver.models.Provider;
import org.gibberishserver.repositories.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/providers")
public class ProviderController {

    @Autowired
    ProviderRepository providerRepository;

    @Operation(summary = "Get a provider by its id")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Provider found!",
                content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Provider.class))}),
        @ApiResponse(responseCode = "404", description = "Provider not found",
                content = @Content)})
    @GetMapping("/{id}")
    public ResponseEntity<Provider> getProviderById(@PathVariable("id") long id) {
        Optional<Provider> providerData = providerRepository.findById(id);

        if (providerData.isPresent()) {
            return new ResponseEntity<>(providerData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
