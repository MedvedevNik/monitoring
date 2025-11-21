import React from "react";
import { FooterContainer } from "./FooterApp.styles";
import { Theme } from "../types";

interface Props {
  theme: Theme;
}

const FooterApp: React.FC<Props> = ({ theme }) => {
  return (
    <FooterContainer theme={theme}>
      Разработано для мониторинга состояния систем
    </FooterContainer>
  );
};

export default FooterApp;
