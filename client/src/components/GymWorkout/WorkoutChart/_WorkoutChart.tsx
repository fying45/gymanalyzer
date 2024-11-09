/* eslint @typescript-eslint/no-explicit-any: 0 */
import { useEffect, useMemo, useRef } from "react";
import * as S from "./_WorkoutChart.style";
import * as d3 from "d3";
import { useWorkoutVolume } from "../../../stores/GymWorkoutByWeek";
import { useDate } from "../../../hooks/useFormatDate";
import { VOLUME_BY_WEEK_STATS_KEY } from "../../../types/statistics";
import { computePeriodWeek } from "../../../types/period";

type WorkoutChartProps = {
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};

export const WorkoutChart = ({
  width = 720,
  height = 450,
  marginTop = 20,
  marginRight = 40,
  marginBottom = 60,
  marginLeft = 60,
}: WorkoutChartProps) => {
  const { formatDate } = useDate();

  const volumeByWeek = useWorkoutVolume();

  const xAxisRef = useRef<SVGGElement>(null);
  const yLeftAxisRef = useRef<SVGGElement>(null);
  const yRightAxisRef = useRef<SVGGElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const color = d3.scaleOrdinal<string>().domain(VOLUME_BY_WEEK_STATS_KEY).range(["#1d78d8", "#e2871f"]);

  const yRange = [height - marginBottom, marginTop];
  const yLeftScale = d3
    .scaleLinear()
    .domain([0, (d3.max(volumeByWeek.map((v) => v.totalVolume)) as number) + 1250])
    .range(yRange);
  const yLeftAxis = d3.axisLeft(yLeftScale).tickFormat((d) => `${d} kg`);

  const yRightScale = d3
    .scaleLinear()
    .domain([0, (d3.max(volumeByWeek.map((v) => v.totalRepetitions)) as number) + 105])
    .range(yRange);
  const yRightAxis = d3.axisRight(yRightScale);

  const xScale = d3
    .scaleBand()
    .domain(volumeByWeek.map((v) => formatDate(v.weekStartingDay)))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const computeTickValue = () => {
    if (volumeByWeek.length > computePeriodWeek("PAST_6_MONTH")) {
      return volumeByWeek.map((v) => formatDate(v.weekStartingDay)).filter((_, index) => index % 2 !== 0);
    }
    if (volumeByWeek.length > computePeriodWeek("PAST_2_YEARS")) {
      return volumeByWeek.map((v) => formatDate(v.weekStartingDay)).filter((_, index) => index % 3 === 0);
    }
    return volumeByWeek.map((v) => formatDate(v.weekStartingDay));
  };

  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0).tickValues(computeTickValue());

  const xSubgroupScale = d3.scaleBand().domain(VOLUME_BY_WEEK_STATS_KEY).range([0, xScale.bandwidth()]).padding(0.05);

  const preparedData = useMemo(
    () =>
      volumeByWeek.map((v) => {
        return {
          weekStartingDay: v.weekStartingDay,
          subGroupData: VOLUME_BY_WEEK_STATS_KEY.map((key) => ({
            key: key,
            value: v[key],
          })),
        };
      }),
    [volumeByWeek]
  );

  useEffect(
    () =>
      void d3
        .select(xAxisRef.current)
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis as any),
    [xAxisRef, xScale, xAxis, height, marginBottom]
  );
  useEffect(
    () =>
      void d3
        .select(yLeftAxisRef.current)
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yLeftAxis as any),
    [yLeftAxisRef, yLeftScale, yLeftAxis, marginLeft]
  );
  useEffect(
    () =>
      void d3
        .select(yRightAxisRef.current)
        .attr("transform", `translate(${width - marginRight},0)`)
        .call(yRightAxis as any),
    [yRightAxisRef, yRightScale, yRightAxis, width, marginRight]
  );

  return (
    <S.SVGChart ref={svgRef} viewBox={`0, 0, ${width}, ${height}`} width={width} height={height}>
      <S.SVGBackground />
      <S.XAxis ref={xAxisRef} />
      <S.YAxisLeft ref={yLeftAxisRef} />
      <S.YAxisRight ref={yRightAxisRef} />
      <S.Chart>
        {preparedData.map((datum) => (
          <S.SubGroup
            key={formatDate(datum.weekStartingDay)}
            transform={`translate(${xScale(formatDate(datum.weekStartingDay))},0)`}
          >
            {datum.subGroupData.map((subGroupDatum) => (
              <S.BarChartRect
                key={formatDate(datum.weekStartingDay).concat(subGroupDatum.key)}
                x={xSubgroupScale(subGroupDatum.key)}
                y={
                  subGroupDatum.key === "totalVolume"
                    ? yLeftScale(subGroupDatum.value)
                    : yRightScale(subGroupDatum.value)
                }
                width={xSubgroupScale.bandwidth()}
                height={
                  subGroupDatum.key === "totalVolume"
                    ? yLeftScale(0) - yLeftScale(subGroupDatum.value)
                    : yRightScale(0) - yRightScale(subGroupDatum.value)
                }
                fill={color(subGroupDatum.key)}
              />
            ))}
          </S.SubGroup>
        ))}
      </S.Chart>
    </S.SVGChart>
  );
};
