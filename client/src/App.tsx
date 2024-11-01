import { useCallback, useMemo, useState } from "react";
import { useFetchData } from "./hooks/useFetchData";
import { useDate } from "./hooks/useFormatDate";
import { UploadCsvForm } from "./components/UploadGymBookForm";

type VolumeByWeek = {
  startDate: Date;
  endDate: Date;
  value: number;
};

const ALL_ORDER_BY = ["ASC", "DSC"] as const;
type OrderByEnum = (typeof ALL_ORDER_BY)[number];

type FetchVolumeParams = {
  orderBy: OrderByEnum;
};

export const App = () => {
  const [orderBy, setOrderBy] = useState<OrderByEnum>("ASC");
  const { data, loading, refetch } = useFetchData<Record<string, number>, FetchVolumeParams>("/api/volume", {
    queryParameters: {
      orderBy,
    },
  });
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

  const handleChangeOrderBy: React.ChangeEventHandler<HTMLSelectElement> = useCallback((event) => {
    event.preventDefault();
    setOrderBy(event.target.value as OrderByEnum);
    refetch();
  }, []);

  if (loading) {
    return <div>Data is loading </div>;
  }

  return (
    <div>
      <UploadCsvForm onSubmit={refetch} />
      <h2>Volume</h2>
      <div>Total weeks : {volumeByWeek.length} </div>
      <form>
        <label>
          Tri :
          <select onChange={handleChangeOrderBy} value={orderBy}>
            {ALL_ORDER_BY.map((orderBy) => (
              <option value={orderBy}>{orderBy}</option>
            ))}
          </select>
        </label>
      </form>
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
