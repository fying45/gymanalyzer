package com.ffock.gymanalyzer.models.enums;

public enum SeriesType {
    CHRONO, REPS;

    public static SeriesType evaluateSeriesType(String value) {
        if (value.toLowerCase().contains("répétitions")) {
            return REPS;
        }
        if (value.toLowerCase().contains("secondes")
                || value.toLowerCase().contains("minute")
                || value.toLowerCase().contains("minutes")) {
            return CHRONO;
        }
        throw new IllegalArgumentException("Repetition ou temps invalide : " + value);
    }
}
