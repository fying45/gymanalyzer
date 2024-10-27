package com.ffock.gymanalyzer.services;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ffock.gymanalyzer.lib.gymbookcsv.GymBookLogsFile;
import com.ffock.gymanalyzer.lib.gymbookcsv.GymBookLogsFileReader;
import com.ffock.gymanalyzer.models.Day;
import com.ffock.gymanalyzer.models.Exercise;
import com.ffock.gymanalyzer.models.GymWorkout;
import com.ffock.gymanalyzer.models.enums.ExerciceArea;
import com.ffock.gymanalyzer.repositories.DayRepository;
import com.ffock.gymanalyzer.repositories.ExerciseRepository;
import com.ffock.gymanalyzer.repositories.GymWorkoutRepository;
import com.opencsv.exceptions.CsvException;

@Service
public class CsvService {

    private final GymBookLogsFileReader gymBookLogsFileReader = new GymBookLogsFileReader();

    private final DayRepository dayRepository;
    private final ExerciseRepository exerciseRepository;
    private final GymWorkoutRepository gymWorkoutRepository;

    public CsvService(DayRepository dayRepository, ExerciseRepository exerciseRepository,
            GymWorkoutRepository gymWorkoutRepository) {
        this.dayRepository = dayRepository;
        this.exerciseRepository = exerciseRepository;
        this.gymWorkoutRepository = gymWorkoutRepository;
    }

    @Transactional
    public Integer importCSV(String filePath) throws IOException, CsvException {
        GymBookLogsFile gymBookLogs = gymBookLogsFileReader.read(filePath);

        List<GymWorkout> gymWorkouts = gymBookLogs.getGymWorkouts(
                this::dayProvider,
                this::exerciceProvier);

        return gymWorkoutRepository.saveAll(gymWorkouts).size();
    }

    private Day dayProvider(LocalDate localDate) {
        return dayRepository.findById(localDate).orElseGet(() -> {
            Day newDay = new Day(localDate);
            return dayRepository.save(newDay);
        });
    }

    private Exercise exerciceProvier(String name, ExerciceArea area) {
        return exerciseRepository.findByName(name).orElseGet(() -> {
            Exercise newExercise = new Exercise(name, area);
            return exerciseRepository.save(newExercise);
        });
    }
}
