package com.ffock.gymanalyzer.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "day")
public class Day {

    @Id
    @Column(name = "day_date")
    private java.sql.Date dayDate;

    private Integer sleepingTime;
    private Double weight;
    private Integer activeCaloric;
    private Double vo2Max;
    private Integer swimmingDistance;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "week_id", nullable = false, foreignKey = @ForeignKey(name = "fk_week_id"))
    private Week week;

    // Getters et Setters
    public java.sql.Date getDayDate() {
        return dayDate;
    }

    public void setDayDate(java.sql.Date dayDate) {
        this.dayDate = dayDate;
    }

    public Integer getSleepingTime() {
        return sleepingTime;
    }

    public void setSleepingTime(Integer sleepingTime) {
        this.sleepingTime = sleepingTime;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Integer getActiveCaloric() {
        return activeCaloric;
    }

    public void setActiveCaloric(Integer activeCaloric) {
        this.activeCaloric = activeCaloric;
    }

    public Double getVo2Max() {
        return vo2Max;
    }

    public void setVo2Max(Double vo2Max) {
        this.vo2Max = vo2Max;
    }

    public Integer getSwimmingDistance() {
        return swimmingDistance;
    }

    public void setSwimmingDistance(Integer swimmingDistance) {
        this.swimmingDistance = swimmingDistance;
    }

    public Week getWeek() {
        return week;
    }

    public void setWeek(Week week) {
        this.week = week;
    }
}