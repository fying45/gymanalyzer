import styled from "styled-components";

export const Wrapper = styled.div`
  box-shadow: 0px 8px 24px rgb(4, 21, 31, 0.2);
  width: fit-content;
  padding: 2rem;
  border-radius: 1rem;
`;

export const HeaderWrapper = styled.div``;

export const ContentWrapper = styled.div``;

export const SVGChart = styled.svg`
  max-width: 100%;
  height: auto;
`;

export const SVGBackground = styled.rect`
  width: 100%;
  height: 100%;
  fill: rgba(95, 191, 249, 0.15);
`;

export const XAxis = styled.g`
  text {
    transform: rotate(-45deg);
    text-anchor: end;
  }
`;

export const YAxis = styled.g``;

export const YLines = styled.g``;

export const BarChart = styled.g``;

export const BarRect = styled.rect`
  fill: rgb(29, 120, 216);
`;
