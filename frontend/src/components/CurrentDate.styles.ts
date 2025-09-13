import styled from "styled-components";
import { Theme } from "../types";

export const DateContainer = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5em 2em;
  color: ${(props) => props.theme.dateText};
`;

export const DateText = styled.p`
  font-size: 1.2em;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;
  transition: font-size 0.3s ease;
`;

export const TimeText = styled.p`
  font-size: 1.2em;
  font-weight: 700;
  margin: 0.25em 0 0;
  transition: font-size 0.3s ease;
`;
