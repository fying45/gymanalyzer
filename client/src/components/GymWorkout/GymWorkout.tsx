import { useFetchData } from "../../hooks/useFetchData";
import { UploadCsvForm } from "../UploadGymBookForm";
import { useEffect } from "react";
import { WorkoutWeek } from "../../types/models";
import useWorkoutWeek from "../../stores/GymWorkoutByWeek";
import { WorkoutChart } from "./WorkoutChart";
import { SelectPeriod } from "../Filtering/SelectPeriod";
import * as S from "./GymWorkout.style";

export const GymWorkout = () => {
  const { data, loading, refetch } = useFetchData<WorkoutWeek[]>("/api/weeks");

  const setWorkoutWeek = useWorkoutWeek((state) => state.setWeeks);

  useEffect(() => {
    if (data) {
      setWorkoutWeek(data);
    }
  }, [data, loading, setWorkoutWeek]);

  return (
    <>
      <UploadCsvForm onSubmit={refetch} />
      <S.TileWrapper>
        <SelectPeriod />
        <WorkoutChart />
      </S.TileWrapper>
    </>
  );
};
