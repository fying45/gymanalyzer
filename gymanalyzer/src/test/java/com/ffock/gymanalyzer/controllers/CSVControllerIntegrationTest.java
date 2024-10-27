package com.ffock.gymanalyzer.controllers;

import java.io.File;
import java.io.FileInputStream;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.util.ResourceUtils;
import org.testcontainers.junit.jupiter.Testcontainers;

import com.ffock.gymanalyzer.TestcontainersConfiguration;
import com.ffock.gymanalyzer.repositories.DayRepository;
import com.ffock.gymanalyzer.repositories.ExerciseRepository;
import com.ffock.gymanalyzer.repositories.GymWorkoutRepository;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
public class CSVControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DayRepository dayRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private GymWorkoutRepository gymWorkoutRepository;

    @BeforeEach
    public void setup() {
        gymWorkoutRepository.deleteAll();
        exerciseRepository.deleteAll();
        dayRepository.deleteAll();
    }

    @Test
    public void shouldUploadCSVAndSaveData() throws Exception {
        File csvFile = ResourceUtils.getFile("classpath:sample.csv");

        try (FileInputStream fileInputStream = new FileInputStream(csvFile)) {
            MockMultipartFile multipartFile = new MockMultipartFile(
                    "file",
                    csvFile.getName(),
                    MediaType.TEXT_PLAIN_VALUE,
                    fileInputStream
            );

            mockMvc.perform(multipart("/api/csv/upload")
                    .file(multipartFile))
                    .andExpect(status().isOk());

        }

        assertThat(gymWorkoutRepository.findAll()).hasSize(5);
        assertThat(exerciseRepository.findAll()).hasSize(3);
        assertThat(dayRepository.findAll()).hasSize(2);
    }

}
