import * as Plot from "@observablehq/plot";
import { useEffect, useMemo, useRef } from "react";
import { useFetchData } from "./hooks/useFetchData";

type VolumeByWeek = {
  startDate: Date;
  endDate: Date;
  value: number;
};

const ddMMyyyStringToDate = (dateString: string): Date => {
  const dateParts = dateString.split("/");
  return new Date(+dateParts[2], Number(dateParts[1]) - 1, +dateParts[0]);
};

const getMaxValue = (volumeByWeek: VolumeByWeek[]): number =>
  volumeByWeek.reduce((max, current) => (current.value > max.value ? current : max), volumeByWeek[0]).value;

export const App = () => {
  const { data, loading } = useFetchData<Record<string, number>>("/workouts/volume");

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

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const plot = Plot.plot({
      width: containerRef.current?.clientWidth,
      height: 400,
      marginLeft: 60,
      marginRight: 20,
      marginBottom: 80,
      y: {
        grid: true,
        tickFormat: (y: number) => (y !== 0 ? `${y / 1000}*10^3` : y),
        domain: [0, getMaxValue(volumeByWeek) + 1000],
      },
      x: { type: "band", tickRotate: -45, ticks: 10 },
      color: {
        range: ["#4CAF50"],
      },
      marks: [Plot.barY(volumeByWeek, { x: "endDate", y: "value" })],
    });
    containerRef.current?.append(plot);
    return () => plot.remove();
  }, [volumeByWeek]);

  if (loading) {
    return <div>Data is loading </div>;
  }

  return (
    <div>
      <h2>Volume</h2>
      <div>Total weeks : {volumeByWeek.length} </div>
      <div ref={containerRef}></div>
      <div>
        {volumeByWeek.map(({ startDate, endDate, value }) => (
          <div key={startDate.toISOString().concat(endDate.toISOString())}>
            {startDate.toString()} - {endDate.toString()} : {value}
          </div>
        ))}
      </div>
    </div>
  );
};
