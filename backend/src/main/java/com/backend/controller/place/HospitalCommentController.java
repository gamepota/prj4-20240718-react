package com.backend.controller.place;

import com.backend.domain.place.HospitalComment;
import com.backend.domain.place.StarRating;
import com.backend.service.place.HospitalCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitalComment")
@RequiredArgsConstructor
public class HospitalCommentController {

    final HospitalCommentService service;

    @PostMapping("add")
    public ResponseEntity<Object> addComment(@RequestBody HospitalComment hospitalComment,
                                             Authentication authentication) {
        if (service.validate(hospitalComment)) {
            service.add(hospitalComment, authentication);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("list/{hospitalId}")
    public List<HospitalComment> list(@PathVariable Integer hospitalId) {


        return service.list(hospitalId);
    }

    @DeleteMapping("remove")
    public ResponseEntity remove(@RequestBody HospitalComment hospitalComment
    ) {
        if (service.hasAccess(hospitalComment)) {
            System.out.println("컨트롤러의 comment = " + hospitalComment);
            service.remove(hospitalComment);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("edit")
    public ResponseEntity edit(@RequestBody HospitalComment hospitalComment,
                               Authentication authentication) {
        if (service.validate(hospitalComment)) {
            service.edit(hospitalComment);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }


    }

    @PutMapping("rating")
    public ResponseEntity rating(@RequestBody StarRating starRating) {

        if (service.validate2(starRating)) {
            service.rating(starRating);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }


    }
}
