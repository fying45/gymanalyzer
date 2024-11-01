export const ALL_ORDER_BY = ["ASC", "DSC"] as const;
export type OrderByEnum = (typeof ALL_ORDER_BY)[number];
