package com.ffock.gymanalyzer.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ffock.gymanalyzer.models.Day;
import com.ffock.gymanalyzer.repositories.DayRepository;

@RestController
@RequestMapping("/api")
public class WorkoutController {

    private final DayRepository dayRepository;

    public WorkoutController(DayRepository dayRepository) {
        this.dayRepository = dayRepository;
    }

    @GetMapping("/workout-days")
    public List<Day> findAllWorkoutDay() {
        return dayRepository.findAll();
    }
}
