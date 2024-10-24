package com.ffock.gymanalyzer.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "gym_workout")
public class GymWorkout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String seriesType;

    @NotNull
    private Integer series;

    @NotNull
    private Integer volume;

    @NotNull
    private Integer weight;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false, foreignKey = @ForeignKey(name = "fk_exercise_id"))
    private Exercise exercise;

    @NotNull
    @Column(name = "day_date")
    private java.sql.Date dayDate;

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSeriesType() {
        return seriesType;
    }

    public void setSeriesType(String seriesType) {
        this.seriesType = seriesType;
    }

    public Integer getSeries() {
        return series;
    }

    public void setSeries(Integer series) {
        this.series = series;
    }

    public Integer getVolume() {
        return volume;
    }

    public void setVolume(Integer volume) {
        this.volume = volume;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public java.sql.Date getDayDate() {
        return dayDate;
    }

    public void setDayDate(java.sql.Date dayDate) {
        this.dayDate = dayDate;
    }
}

