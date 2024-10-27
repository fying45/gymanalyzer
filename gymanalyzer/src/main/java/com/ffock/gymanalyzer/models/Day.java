package com.ffock.gymanalyzer.models;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "day")
public class Day {

    @Id
    @Column(name = "day_date")
    private LocalDate dayDate;

    @Column(name = "sleeping_time")
    private Integer sleepingTime;

    private Float weight;

    @Column(name = "active_calories")
    private Integer activeCalores;

    @Column(name = "vo_2_max")
    private Float vo2Max;

    @Column(name = "swimming_distance")
    private Integer swimmingDistance;

    @OneToMany(targetEntity = GymWorkout.class, mappedBy = "day")
    private List<GymWorkout> workouts;

    public Day() {
    }

    public Day(LocalDate dayDate) {
        this.dayDate = dayDate;
    }

}
