package com.ffock.gymanalyzer.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ffock.gymanalyzer.models.Day;
import com.ffock.gymanalyzer.models.Week;
import com.ffock.gymanalyzer.models.enums.OrderByEnum;
import com.ffock.gymanalyzer.repositories.DayRepository;

@Service
public class WeekService {

    private final DayRepository dayRepository;

    public WeekService(DayRepository dayRepository) {
        this.dayRepository = dayRepository;
    }

    public List<Week> getAllWeeks(OrderByEnum orderBy) {
        List<Week> weeks = new ArrayList<>();
        LocalDate startDate = dayRepository.findOldestDate().orElse(LocalDate.now());
        LocalDate latestDate = dayRepository.findLatestDate().orElse(LocalDate.now());

        while (startDate.isBefore(latestDate)) {
            List<Day> days = new ArrayList<>();
            for (int i = 0; i < 7; i++) {
                LocalDate date = startDate.plusDays(i);
                days.add(dayRepository.findById(date).orElse(new Day(date)));
            }
            weeks.add(new Week(days));

            startDate = startDate.plusWeeks(1);
        }

        if (orderBy == OrderByEnum.ASC) {
            Collections.sort(weeks);
        } else {
            Collections.reverse(weeks);
        }

        return weeks;
    }
}
