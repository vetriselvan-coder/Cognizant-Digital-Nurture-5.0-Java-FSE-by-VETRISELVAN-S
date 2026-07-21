package com.cognizant.controller;

import com.cognizant.*;
import com.cognizant.service.EnrollmentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService service;

    @GetMapping
    public ResponseEntity<List<Enrollment>> getAll() {
        return ResponseEntity.ok(service.getAllEnrollments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Enrollment> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getEnrollmentById(id));
    }

    @PostMapping
    public ResponseEntity<Enrollment> create(@Valid @RequestBody Enrollment enrollment) {
        return new ResponseEntity<>(service.createEnrollment(enrollment), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Enrollment> update(@PathVariable Long id,
                                             @Valid @RequestBody Enrollment enrollment) {
        return ResponseEntity.ok(service.updateEnrollment(id, enrollment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteEnrollment(id);
        return ResponseEntity.noContent().build();
    }
}