package com.cognizant.service;
import java.util.List;

import com.cognizant.Course;
public interface CourseService {

    List<Course> getAllCourses();

    Course getCourseById(Long id);

    Course createCourse(Course course);

    Course updateCourse(Long id, Course course);

    void deleteCourse(Long id);
}