package com.ffock.gymanalyzer.repositories;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ffock.gymanalyzer.models.Day;

@Repository
public interface DayRepository extends JpaRepository<Day, LocalDate> {

    @Query("SELECT MIN(d.dayDate) FROM Day d")
    Optional<LocalDate> findOldestDate();

    @Query("SELECT MAX(d.dayDate) FROM Day d")
    Optional<LocalDate> findLatestDate();
}
