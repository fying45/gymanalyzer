package com.ffock.gymanalyzer.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ffock.gymanalyzer.models.enums.SeriesType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "gym_workout")
public class GymWorkout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "series_type")
    @Enumerated(EnumType.STRING)
    @JsonProperty("seriesType")
    private SeriesType seriesType;

    private int volume;
    private double weight;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "day_date", nullable = false, referencedColumnName = "day_date")
    @JsonBackReference
    private Day day;

    public GymWorkout() {
    }

    public GymWorkout(SeriesType seriesType, int volume, double weight, Exercise exercise, Day day) {
        this.seriesType = seriesType;
        this.volume = volume;
        this.weight = weight;
        this.exercise = exercise;
        this.day = day;
    }

}
