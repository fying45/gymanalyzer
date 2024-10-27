package com.ffock.gymanalyzer.models.enums;

public enum ExerciceArea {
    BACK, ABS, PECTORALS, ARMS, LEGS, SHOULDERS, GLUTES, CARDIO;

    public static ExerciceArea evaluatExerciceArea(String value) {
        switch (value.trim().toLowerCase()) {
            case "dos" -> {
                return BACK;
            }
            case "bras" -> {
                return ARMS;
            }
            case "épaules" -> {
                return SHOULDERS;
            }
            case "jambes" -> {
                return LEGS;
            }
            case "fessiers" -> {
                return GLUTES;
            }
            case "abdominaux" -> {
                return ABS;
            }
            case "pectoraux" -> {
                return PECTORALS;
            }
            case "cardio" -> {
                return CARDIO;
            }
            default ->
                throw new IllegalArgumentException("Zone inconnue : " + value);
        }
    }
}
