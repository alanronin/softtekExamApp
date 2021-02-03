package com.tutorial.myjhipsterapp.repository;

import com.tutorial.myjhipsterapp.domain.Course;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Course entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
}
