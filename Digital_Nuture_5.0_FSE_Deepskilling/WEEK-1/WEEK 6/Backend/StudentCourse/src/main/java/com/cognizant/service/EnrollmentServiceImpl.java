package com.cognizant.service;

import com.cognizant.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository repository;

    @Override
    public List<Enrollment> getAllEnrollments() {
        return repository.findAll();
    }

    @Override
    public Enrollment getEnrollmentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Enrollment not found with id: " + id));
    }

    @Override
    public Enrollment createEnrollment(Enrollment enrollment) {
        return repository.save(enrollment);
    }

    @Override
    public Enrollment updateEnrollment(Long id, Enrollment enrollment) {
        Enrollment existing = getEnrollmentById(id);

        existing.setStudentName(enrollment.getStudentName());
        existing.setEmail(enrollment.getEmail());
        existing.setCourseId(enrollment.getCourseId());
        existing.setSemester(enrollment.getSemester());
        existing.setAcceptedTerms(enrollment.getAcceptedTerms());

        return repository.save(existing);
    }

    @Override
    public void deleteEnrollment(Long id) {
        Enrollment existing = getEnrollmentById(id);
        repository.delete(existing);
    }
}
