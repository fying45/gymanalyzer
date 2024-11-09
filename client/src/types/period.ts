export const ALL_PERIODS = ["PAST_2_YEARS", "PAST_YEAR", "PAST_6_MONTH", "PAST_3_MONTH", "PAST_4_WEEKS"] as const;
export type PeriodEnum = (typeof ALL_PERIODS)[number];

export const computePeriodWeek = (period: PeriodEnum): number => {
  switch (period) {
    case "PAST_2_YEARS":
      return 104;
    case "PAST_YEAR":
      return 52;
    case "PAST_6_MONTH":
      return 26;
    case "PAST_3_MONTH":
      return 14;
    case "PAST_4_WEEKS":
      return 4;
  }
};
