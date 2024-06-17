package com.backend.controller.place;

import com.backend.domain.place.Hospital;
import com.backend.service.place.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/place/map")
@RequiredArgsConstructor
public class PlaceController {

    private final PlaceService service;

    @GetMapping("{id}")
    public Hospital get(@PathVariable Integer id) {

        return service.get(id);

    }
}
