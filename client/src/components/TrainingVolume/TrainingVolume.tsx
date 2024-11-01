import { useMemo } from "react";
import { useDate } from "../../hooks/useFormatDate";

type VolumeByWeek = {
  startDate: Date;
  endDate: Date;
  value: number;
};

type TrainingVolumeProps = {
  data: Record<string, number>;
  refetch: () => void;
};

export const TrainingVolume = ({ data, refetch }: TrainingVolumeProps) => {
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

  return (
    <div>
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
