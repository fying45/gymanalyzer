package com.ffock.gymanalyzer.controllers;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ffock.gymanalyzer.models.Day;
import com.ffock.gymanalyzer.models.Week;
import com.ffock.gymanalyzer.models.enums.OrderByEnum;
import com.ffock.gymanalyzer.repositories.DayRepository;
import com.ffock.gymanalyzer.services.WeekService;

@RestController
@RequestMapping("/api")
public class WorkoutController {

    private final DayRepository dayRepository;

    private final WeekService weekService;

    public WorkoutController(DayRepository dayRepository, WeekService weekService) {
        this.dayRepository = dayRepository;
        this.weekService = weekService;
    }

    @GetMapping("/workout-days")
    public List<Day> findAllWorkoutDay() {
        return dayRepository.findAll();
    }

    @GetMapping("/weeks")
    public List<Week> getAllWeeks(@RequestParam(value = "orderBy", defaultValue = "ASC") OrderByEnum orderBy) {
        return weekService.getAllWeeks(orderBy);
    }

    @GetMapping("/volume")
    public Map<Week, Double> getTrainingVolume(@RequestParam(value = "orderBy", defaultValue = "ASC") OrderByEnum orderBy) {
        List<Week> weeks = weekService.getAllWeeks(orderBy);

        return weeks.stream()
                .collect(Collectors.toMap(
                        week -> week,
                        Week::computeTrainingVolume,
                        (existing, replacement) -> existing,
                        LinkedHashMap::new
                ));
    }
}
