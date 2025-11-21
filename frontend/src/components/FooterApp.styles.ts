import styled from "styled-components";
import { Theme } from "../types";

export const FooterContainer = styled.footer<{ theme: Theme }>`
  text-align: center;
  color: ${(props) => props.theme.appText};
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid ${(props) => props.theme.tableRowBorder};
  transition: color 0.5s ease;
`;
