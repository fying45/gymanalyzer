import styled from "styled-components";

export const SVGChart = styled.svg`
  max-width: 100%;
  height: auto;
`;

export const SVGBackground = styled.rect`
  width: 100%;
  height: 100%;
  fill: rgba(95, 191, 249, 0.15);
`;

export const YAxisLeft = styled.g``;

export const YAxisRight = styled.g``;

export const XAxis = styled.g`
  text {
    transform: rotate(-45deg);
    text-anchor: end;
  }
`;

export const Chart = styled.g``;

export const SubGroup = styled.g``;

export const BarChartRect = styled.rect``;

export const Legend = styled.g``;
