import { useMemo } from "react";
import { useFetchData } from "./hooks/useFetchData";
import { useDate } from "./hooks/useFormatDate";
import { UploadCsvForm } from "./components/UploadGymBookForm";

type VolumeByWeek = {
  startDate: Date;
  endDate: Date;
  value: number;
};

export const App = () => {
  const { data, loading, refetch } = useFetchData<Record<string, number>>("/api/volume");
  const { formatDate, ddMMyyyStringToDate } = useDate();

  const volumeByWeek: VolumeByWeek[] = useMemo(() => {
    if (data) {
      return Object.entries(data).map(([key, value]): VolumeByWeek => {
        const [start, end] = key.split("-");
        return {
          startDate: ddMMyyyStringToDate(start),
          endDate: ddMMyyyStringToDate(end),
          value: value,
        };
      });
    }
    return [];
  }, [data]);

  if (loading) {
    return <div>Data is loading </div>;
  }

  return (
    <div>
      <UploadCsvForm onSubmit={refetch} />
      <h2>Volume</h2>
      <div>Total weeks : {volumeByWeek.length} </div>
      <div>
        {volumeByWeek.map(({ startDate, endDate, value }) => (
          <div key={startDate.toISOString().concat(endDate.toISOString())}>
            {formatDate(startDate)} - {formatDate(endDate)} : {value}
          </div>
        ))}
      </div>
    </div>
  );
};
