import React, { useCallback } from "react";
import { ALL_PERIODS, PeriodEnum } from "../../../types/period";
import * as S from "./_SelectPeriod.style";
import useWorkoutWeek from "../../../stores/GymWorkoutByWeek";

export const SelectPeriod = () => {
  const appliedPeriod = useWorkoutWeek((state) => state.period);
  const setPeriod = useWorkoutWeek((state) => state.setPeriod);

  const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const target = event.target as HTMLButtonElement;
      const newPeriodValue = target.value as PeriodEnum;
      if (appliedPeriod === newPeriodValue) {
        setPeriod(null);
      } else {
        setPeriod(newPeriodValue);
      }
    },
    [appliedPeriod, setPeriod]
  );

  return (
    <S.Wrapper>
      {ALL_PERIODS.map((period) => (
        <S.PeriodTag key={period} $active={period === appliedPeriod} value={period} onClick={handleOnClick}>
          {period}
        </S.PeriodTag>
      ))}
    </S.Wrapper>
  );
};
