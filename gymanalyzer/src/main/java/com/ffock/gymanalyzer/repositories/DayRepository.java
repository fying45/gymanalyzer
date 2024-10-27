package com.ffock.gymanalyzer.repositories;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ffock.gymanalyzer.models.Day;

@Repository
public interface DayRepository extends JpaRepository<Day, LocalDate> {
}
