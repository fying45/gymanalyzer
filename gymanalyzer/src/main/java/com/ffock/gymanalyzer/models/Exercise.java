package com.ffock.gymanalyzer.models;

import java.util.List;

import com.ffock.gymanalyzer.models.enums.ExerciceArea;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "exercise")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "primary_muscle_group")
    private List<String> primaryMuscleGroup;

    @Column(name = "secondary_muscle_group")
    private List<String> secondaryMuscleGroup;

    @Column(name = "area", nullable = false)
    @Enumerated(EnumType.STRING)
    private ExerciceArea area;

    public Exercise() {
    }

    public Exercise(String name, ExerciceArea area) {
        this.name = name;
        this.area = area;
    }

}
