import * as S from "./GymWorkout.style";
import { useFetchData } from "../../hooks/useFetchData";
import { UploadCsvForm } from "../../components/UploadGymBookForm";
import { TrainingVolume } from "../../components/WorkoutVolume";

export const GymWorkout = () => {
  const { data, loading, refetch } = useFetchData<Record<string, number>>("/api/volume");

  return (
    <S.Wrapper>
      <UploadCsvForm onSubmit={refetch} />
      <h2>Volume</h2>
      {loading ? <div>Data is loading </div> : <TrainingVolume data={data!} />}
    </S.Wrapper>
  );
};
