import { ALL_ORDER_BY, OrderByEnum } from "../../../types/orderBy";

type SelectOrderByProps = {
  value: OrderByEnum;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export const SelectOrderBy = ({ value, onChange }: SelectOrderByProps) => {
  return (
    <form>
      <label>
        Tri :
        <select onChange={onChange} value={value}>
          {ALL_ORDER_BY.map((orderBy) => (
            <option value={orderBy}>{orderBy}</option>
          ))}
        </select>
      </label>
    </form>
  );
};
