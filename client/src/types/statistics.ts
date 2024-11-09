export type VolumeByWeek = {
  weekStartingDay: Date;
  totalVolume: number;
  totalRepetitions: number;
  averageVolume: number;
};

export const VOLUME_BY_WEEK_STATS_KEY = ["totalVolume", "totalRepetitions"] as const satisfies Array<
  keyof Omit<VolumeByWeek, "weekStartingDay">
>;
export type VolumeByWeekStatsKey = (typeof VOLUME_BY_WEEK_STATS_KEY)[number];
