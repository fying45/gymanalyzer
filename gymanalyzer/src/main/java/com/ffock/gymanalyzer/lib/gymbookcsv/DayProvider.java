package com.ffock.gymanalyzer.lib.gymbookcsv;

import java.time.LocalDate;
import java.util.function.Function;

import com.ffock.gymanalyzer.models.Day;

public interface DayProvider extends Function<LocalDate, Day> {

}
