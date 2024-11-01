import { useCallback, useState } from "react";
import { useFetchData } from "./hooks/useFetchData";
import { UploadCsvForm } from "./components/UploadGymBookForm";
import { ALL_ORDER_BY, type OrderByEnum } from "./types/orderBy";
import { TrainingVolume } from "./components/TrainingVolume";

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

  const handleChangeOrderBy: React.ChangeEventHandler<HTMLSelectElement> = useCallback((event) => {
    event.preventDefault();
    setOrderBy(event.target.value as OrderByEnum);
    refetch();
  }, []);

  return (
    <div>
      <UploadCsvForm onSubmit={refetch} />
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
      <h2>Volume</h2>
      {loading ? <div>Data is loading </div> : <TrainingVolume data={data!} refetch={refetch} />}
    </div>
  );
};
