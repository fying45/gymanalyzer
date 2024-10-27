package com.ffock.gymanalyzer.lib.gymbookcsv;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.ffock.gymanalyzer.models.Day;
import com.ffock.gymanalyzer.models.Exercise;
import com.ffock.gymanalyzer.models.GymWorkout;
import com.ffock.gymanalyzer.models.enums.ExerciceArea;
import com.ffock.gymanalyzer.models.enums.SeriesType;
import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvDate;

public class GymBookLogsRow {

    @CsvBindByName(column = "Date")
    @CsvDate("dd/MM/yyyy")
    private LocalDate date;

    @CsvBindByName(column = "Entraînement")
    private String entrainement;

    @CsvBindByName(column = "Heure")
    @CsvDate("HH:mm")
    private LocalTime heure;

    @CsvBindByName(column = "Exercice")
    private String exercice;

    @CsvBindByName(column = "Région")
    private String region;

    @CsvBindByName(column = "Groupes musculaires (Primaires)")
    private String groupesMusculairesPrimaires;

    @CsvBindByName(column = "Groupes musculaires (Secondaires)")
    private String groupesMusculairesSecondaires;

    @CsvBindByName(column = "Série / Série d'échauffement / Série de récupération")
    private String typeSerie;

    @CsvBindByName(column = "Répétitions / Temps")
    private String repetitionsOuTemps;

    @CsvBindByName(column = "Poids / Distance")
    private String poidsOuDistance;

    @CsvBindByName(column = "Notes")
    private String notes;

    @CsvBindByName(column = "Sautée")
    private String sautee;

    public GymWorkout toGymWorkout(DayProvider dayProvider, ExerciceProvider exerciceProvider) {
        Day trainingDay = dayProvider.apply(date);

        ExerciceArea area = ExerciceArea.evaluatExerciceArea(region);
        Exercise exercise = exerciceProvider.apply(exercice, area);

        SeriesType seriesType = SeriesType.evaluateSeriesType(repetitionsOuTemps);
        int volume = parseVolume();
        double weight = parseWeight();

        return new GymWorkout(seriesType, volume, weight, exercise, trainingDay);
    }

    private int parseVolume() {
        if (repetitionsOuTemps == null || repetitionsOuTemps.isEmpty()) {
            throw new IllegalArgumentException("Repetition ou temps invalide :" + repetitionsOuTemps);
        }

        Pattern pattern = Pattern.compile("([0-9]+(,[0-9]+)?)");
        Matcher matcher = pattern.matcher(repetitionsOuTemps);

        if (matcher.find()) {
            String numericValue = matcher.group(1).replace(",", ".");
            try {
                return Integer.parseInt(numericValue);
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Format incorrect pour le poids : " + repetitionsOuTemps, e);
            }
        } else {
            throw new IllegalArgumentException("Aucun nombre trouvé dans la chaîne : " + repetitionsOuTemps);
        }
    }

    private double parseWeight() {
        if (poidsOuDistance == null || poidsOuDistance.isEmpty()) {
            throw new IllegalArgumentException("poids ou Distance ou temps invalide :" + repetitionsOuTemps);
        }

        Pattern pattern = Pattern.compile("([0-9]+(,[0-9]+)?)");
        Matcher matcher = pattern.matcher(poidsOuDistance);

        if (matcher.find()) {
            String numericValue = matcher.group(1).replace(",", ".");
            try {
                return Double.parseDouble(numericValue);
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Format incorrect pour le poids : " + poidsOuDistance, e);
            }
        } else {
            throw new IllegalArgumentException("Aucun nombre trouvé dans la chaîne : " + poidsOuDistance);
        }
    }
}
