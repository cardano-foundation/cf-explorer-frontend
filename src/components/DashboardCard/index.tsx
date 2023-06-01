import React from "react";
import { Link } from "react-router-dom";

import { CardContent, SubTitle, Title, TitleGroup, Card, IconContainer } from "./styles";

export interface DashboardCardProps {
  leftIcon?: React.ReactNode;
  title?: string;
  to?: string;
  subtitle?: string;
}
const DashboardCard: React.FC<DashboardCardProps> = ({ leftIcon, title, subtitle, to }) => {
  return (
    <Card>
      <Link to={to || "#"}>
        <CardContent>
          <IconContainer>{leftIcon}</IconContainer>
          <TitleGroup>
            <Title>{title}</Title>
            <SubTitle>{subtitle}</SubTitle>
          </TitleGroup>
        </CardContent>
      </Link>
    </Card>
  );
};

export default DashboardCard;
