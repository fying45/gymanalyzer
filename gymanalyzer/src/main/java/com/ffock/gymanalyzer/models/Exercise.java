package com.ffock.gymanalyzer.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "exercise")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @ElementCollection
    @CollectionTable(name = "exercise_primary_muscle_group", joinColumns = @JoinColumn(name = "exercise_id"))
    private String[] primaryMuscleGroup;

    @ElementCollection
    @CollectionTable(name = "exercise_secondary_muscle_group", joinColumns = @JoinColumn(name = "exercise_id"))
    private String[] secondaryMuscleGroup;

    @NotNull
    private String area;

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getPrimaryMuscleGroup() {
        return primaryMuscleGroup;
    }

    public void setPrimaryMuscleGroup(String[] primaryMuscleGroup) {
        this.primaryMuscleGroup = primaryMuscleGroup;
    }

    public String[] getSecondaryMuscleGroup() {
        return secondaryMuscleGroup;
    }

    public void setSecondaryMuscleGroup(String[] secondaryMuscleGroup) {
        this.secondaryMuscleGroup = secondaryMuscleGroup;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }
}
