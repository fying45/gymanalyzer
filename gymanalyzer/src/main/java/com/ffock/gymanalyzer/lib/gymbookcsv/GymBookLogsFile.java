package com.ffock.gymanalyzer.lib.gymbookcsv;

import java.util.List;

import com.ffock.gymanalyzer.models.GymWorkout;

public class GymBookLogsFile {

    private final List<GymBookLogsRow> rows;

    public GymBookLogsFile(List<GymBookLogsRow> rows) {
        this.rows = rows;
    }

    public List<GymWorkout> getGymWorkouts(DayProvider dayProvider, ExerciceProvider exerciceProvider) {
        return rows.stream()
                .map((element) -> element.toGymWorkout(dayProvider, exerciceProvider))
                .toList();
    }

}
