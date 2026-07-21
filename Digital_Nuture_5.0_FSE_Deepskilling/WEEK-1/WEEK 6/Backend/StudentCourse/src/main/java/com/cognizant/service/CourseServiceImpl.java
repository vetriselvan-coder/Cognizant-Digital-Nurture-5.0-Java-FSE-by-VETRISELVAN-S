package com.cognizant.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cognizant.Course;
import com.cognizant.CourseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository repository;

    @Override
    public List<Course> getAllCourses() {
        return repository.findAll();
    }

    @Override
    public Course getCourseById(Long id) {
        return repository.findById(id)
                .orElseThrow();
    }

    @Override
    public Course createCourse(Course course) {
        return repository.save(course);
    }

    @Override
    public Course updateCourse(Long id, Course course) {

        Course existing = getCourseById(id);

        existing.setName(course.getName());
        existing.setCode(course.getCode());
        existing.setCredits(course.getCredits());
        existing.setGradeStatus(course.getGradeStatus());
        existing.setEnrolled(course.getEnrolled());

        return repository.save(existing);
    }

    @Override
    public void deleteCourse(Long id) {
        repository.delete(getCourseById(id));
    }

}