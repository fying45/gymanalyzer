import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 0.4rem;
`;

export const PeriodTag = styled.button<{ $active: boolean }>`
  ${({ $active }) =>
    $active &&
    `
      background: green;
    `}
`;
