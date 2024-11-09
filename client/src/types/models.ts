export const ALL_SERIES_TYPE = ["CHRONO", "REPS"] as const;
export type SeriesTypeEnum = (typeof ALL_SERIES_TYPE)[number];

export type Exercice = {
  id: number;
  name: string;
  primaryMuscleGroup: null;
  secondaryMuscleGroup: null;
  area: string;
};

export type Workout = {
  id: number;
  volume: number;
  weight: number;
  seriesType: SeriesTypeEnum;
  exercice: Exercice;
};

export type Days = {
  dayDate: string;
  workouts: Workout[];
  sleepingTime: number | null;
  weight: number | null;
  activeCalores: number | null;
  vo2Max: number | null;
};

export type WorkoutWeek = {
  days: Days[];
};
