package com.ffock.gymanalyzer.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ffock.gymanalyzer.models.GymWorkout;

@Repository
public interface GymWorkoutRepository extends JpaRepository<GymWorkout, Long> {

}
