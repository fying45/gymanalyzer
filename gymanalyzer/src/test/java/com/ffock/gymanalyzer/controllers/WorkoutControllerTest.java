package com.ffock.gymanalyzer.controllers;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.testcontainers.junit.jupiter.Testcontainers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ffock.gymanalyzer.TestcontainersConfiguration;
import com.ffock.gymanalyzer.models.Day;
import com.ffock.gymanalyzer.models.Exercise;
import com.ffock.gymanalyzer.models.GymWorkout;
import com.ffock.gymanalyzer.models.enums.ExerciceArea;
import com.ffock.gymanalyzer.models.enums.SeriesType;
import com.ffock.gymanalyzer.repositories.DayRepository;
import com.ffock.gymanalyzer.repositories.ExerciseRepository;
import com.ffock.gymanalyzer.repositories.GymWorkoutRepository;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
public class WorkoutControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DayRepository dayRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private GymWorkoutRepository gymWorkoutRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        gymWorkoutRepository.deleteAll();
        exerciseRepository.deleteAll();
        dayRepository.deleteAll();

        Exercise curlBicepsExercise = new Exercise("Curl Biceps", ExerciceArea.ARMS);
        Exercise benchPressExercise = new Exercise("Bench Press", ExerciceArea.PECTORALS);
        Exercise pullDownExercise = new Exercise("Pull Down", ExerciceArea.BACK);
        Exercise tricepsExtensionExercises = new Exercise("Triceps Extensions", ExerciceArea.ARMS);

        Day pushDay = new Day(LocalDate.of(2024, 10, 1));
        Day pullDay = new Day(LocalDate.of(2024, 10, 4));

        List<GymWorkout> workouts = List.of(
                new GymWorkout(SeriesType.REPS, 10, 20, curlBicepsExercise, pushDay),
                new GymWorkout(SeriesType.REPS, 10, 70, benchPressExercise, pushDay),
                new GymWorkout(SeriesType.REPS, 10, 50, pullDownExercise, pullDay),
                new GymWorkout(SeriesType.REPS, 10, 10, tricepsExtensionExercises, pullDay)
        );
        gymWorkoutRepository.saveAllAndFlush(workouts);
    }

    @Test
    void shouldFindAllWorkoutDays() throws Exception {

        MvcResult mvcResult = mockMvc.perform(get("/api/workout-days"))
                .andExpect(status().isOk())
                .andReturn();
        String content = mvcResult.getResponse().getContentAsString();

        List<Day> result = objectMapper.readValue(content, new TypeReference<>() {
        });

        assertThat(result).hasSize(2);
    }

}
