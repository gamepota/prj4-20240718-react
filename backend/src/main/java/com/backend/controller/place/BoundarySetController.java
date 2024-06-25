package com.backend.controller.place;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class BoundarySetController {

    @GetMapping("/api/boundarySet")
    public String getBoundarySet() throws IOException {
        Resource resource = new ClassPathResource("secret/data/geojson.json");
        Path path = Paths.get(resource.getURI());
        String content = new String(Files.readAllBytes(path));
        return content;
    }
}
