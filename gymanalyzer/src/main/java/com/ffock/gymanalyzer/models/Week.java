package com.ffock.gymanalyzer.models;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.TreeSet;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Week {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    @JsonProperty("days")
    private final TreeSet<Day> days;

    @JsonCreator
    public Week(@JsonProperty("days") List<Day> days) {
        this.days = new TreeSet<>(days);
    }

    public Double computeTrainingVolume() {
        return days.stream()
                .map(Day::computeVolume)
                .reduce(0.0, Double::sum);
    }

    @Override
    public String toString() {
        LocalDate startDate = days.first().getDayDate();
        LocalDate endDate = days.last().getDayDate();

        return startDate.format(DATE_FORMATTER) + "-" + endDate.format(DATE_FORMATTER);
    }
}
