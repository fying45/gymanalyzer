package com.ffock.gymanalyzer.lib.gymbookcsv;

import java.util.function.BiFunction;

import com.ffock.gymanalyzer.models.Exercise;
import com.ffock.gymanalyzer.models.enums.ExerciceArea;

public interface ExerciceProvider extends BiFunction<String, ExerciceArea, Exercise> {

}
