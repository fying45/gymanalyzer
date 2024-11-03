import { useRef, useEffect, useMemo, useCallback } from "react";
import * as d3 from "d3";
import * as S from "./WorkoutVolume.style";
import { useDate } from "../../hooks/useFormatDate";

type VolumeByWeek = {
  startDate: Date;
  endDate: Date;
  value: number;
};

type TrainingVolumeProps = {
  data: Record<string, number>;
};

type ZoomEventHandler = (e: d3.D3ZoomEvent<SVGSVGElement, unknown>) => void;

export const TrainingVolume = ({ data }: TrainingVolumeProps) => {
  const { formatDate, ddMMyyyStringToDate } = useDate();

  const volumeByWeek: VolumeByWeek[] = useMemo(() => {
    return Object.entries(data).map(([key, value]) => {
      const [start, end] = key.split("-");
      return {
        startDate: ddMMyyyStringToDate(start),
        endDate: ddMMyyyStringToDate(end),
        value,
      };
    });
  }, [data]);

  const width = 1080;
  const height = 500;
  const marginTop = 20;
  const marginRight = 0;
  const marginBottom = 60;
  const marginLeft = 80;

  const svgRef = useRef<SVGSVGElement>(null);
  const xAxisRef = useRef<SVGGElement>(null);
  const yAxisRef = useRef<SVGGElement>(null);
  const barRectRef = useRef<(SVGRectElement | null)[]>([]);

  const x = d3
    .scaleBand()
    .domain(volumeByWeek.map((d) => formatDate(d.startDate)))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const xAxis = d3.axisBottom(x).tickSizeOuter(0);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(volumeByWeek, (d) => d.value) as number])
    .nice()
    .range([height - marginBottom, marginTop]);

  const yFormat = d3.format("");
  const yAxis = d3.axisLeft(y).tickFormat((d) => `${yFormat(d)} kg`);

  const zoomEventHandler: ZoomEventHandler = useCallback(
    (event) => {
      x.range([marginLeft, width - marginRight].map((d) => event.transform.applyX(d)));
      barRectRef.current.forEach((bar, i) => {
        if (bar) {
          const dataPoint = volumeByWeek[i];
          bar.setAttribute("x", `${x(formatDate(dataPoint.startDate))}`);
          bar.setAttribute("width", `${x.bandwidth()}`);
        }
      });

      d3.select(xAxisRef.current).call(xAxis as any);
    },
    [barRectRef]
  );

  useEffect(() => void d3.select(xAxisRef.current).call(xAxis as any), [xAxisRef, x]);
  useEffect(() => void d3.select(yAxisRef.current).call(yAxis as any), [yAxisRef, y]);
  useEffect(() => {
    const extent: [[number, number], [number, number]] = [
      [marginLeft, marginTop],
      [width - marginRight, height - marginTop],
    ];

    const zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .translateExtent(extent)
      .extent(extent)
      .on("zoom", zoomEventHandler);
    d3.select(svgRef.current).call(zoomBehavior as any);
  }, [svgRef]);

  return (
    <S.Wrapper>
      <S.HeaderWrapper>Total weeks: {volumeByWeek.length}</S.HeaderWrapper>
      <S.ContentWrapper>
        <S.SVGChart viewBox={`0, 0, ${width}, ${height}`} ref={svgRef} width={width} height={height}>
          <S.SVGBackground transform={`translate(${marginLeft},${-marginBottom})`} />
          <S.YLines transform={`translate(0,${marginTop})`} />
          <S.XAxis ref={xAxisRef} transform={`translate(0,${height - marginBottom})`} />
          <S.YAxis ref={yAxisRef} transform={`translate(${marginLeft},0)`} />
          <S.BarChart>
            {volumeByWeek.map((d, index) => (
              <S.BarRect
                ref={(el) => (barRectRef.current[index] = el)}
                key={formatDate(d.startDate)}
                x={x(formatDate(d.startDate))}
                y={y(d.value)}
                height={y(0) - y(d.value)}
                width={x.bandwidth()}
              />
            ))}
          </S.BarChart>
        </S.SVGChart>
      </S.ContentWrapper>
    </S.Wrapper>
  );
};
