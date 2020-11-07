package org.gibberishserver.apis;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                title = "Gibberish application api",
                version = "1.0",
                description = "This is the official documentation for the Gibberish application API"
        ),
        servers = {
            @Server(
                    description = "KMS Server",
                    url = "https://localhost:8080"
            )
        }
)
public abstract class ApiBase {

}
