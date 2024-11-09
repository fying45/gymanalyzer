import { create } from "zustand";
import { WorkoutWeek } from "../types/models";
import { useDate } from "../hooks/useFormatDate";
import { VolumeByWeek } from "../types/statistics";
import { computePeriodWeek, PeriodEnum } from "../types/period";

type WorkoutWeekState = {
  weeks: WorkoutWeek[];
  period: PeriodEnum | null;
};

type WorkoutWeekActions = {
  setWeeks: (newData: WorkoutWeekState["weeks"]) => void;
  setPeriod: (newPeriod: WorkoutWeekState["period"]) => void;
};

export type WorkoutWeekStore = WorkoutWeekState & WorkoutWeekActions;

const useWorkoutWeek = create<WorkoutWeekStore>((set) => ({
  weeks: [],
  takes: null,
  period: "PAST_6_MONTH",
  setWeeks: (newData) => set({ weeks: [...newData] }),
  setPeriod: (newPeriod) => set({ period: newPeriod }),
}));

export default useWorkoutWeek;

const useWorkoutWeekByPeriod = (): WorkoutWeek[] => {
  const period = useWorkoutWeek((s) => s.period);
  const takes = period ? computePeriodWeek(period) : null;

  const weeks = useWorkoutWeek((s) => s.weeks);

  if (takes === null || weeks.length < takes) {
    return weeks;
  }
  return weeks.slice(-takes);
};

export const useWorkoutVolume = (): VolumeByWeek[] => {
  const { ddMMyyyStringToDate } = useDate();

  const weeks = useWorkoutWeekByPeriod();

  return weeks.reduce((array, week) => {
    const totalVolume = week.days.reduce((totalWeekVolume, day) => {
      let weekVolume = 0;
      if (day.workouts) {
        weekVolume = day.workouts.reduce((dayVolume, workout) => {
          return dayVolume + workout.weight * workout.volume;
        }, weekVolume);
      }
      return totalWeekVolume + weekVolume;
    }, 0);

    const totalRepetitions = week.days.reduce((totalWeekRepetition, day) => {
      let weekRepetition = 0;
      if (day.workouts) {
        weekRepetition = day.workouts.reduce((dayVolume, workout) => {
          return dayVolume + workout.volume;
        }, weekRepetition);
      }
      return totalWeekRepetition + weekRepetition;
    }, 0);

    const averageVolume = totalRepetitions > 0 ? totalVolume / totalRepetitions : 0;

    array.push({
      weekStartingDay: ddMMyyyStringToDate(week.days[0].dayDate),
      totalVolume,
      totalRepetitions,
      averageVolume,
    });
    return array;
  }, [] as VolumeByWeek[]);
};
