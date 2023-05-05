import React from "react";
import { CardContent, SubTitle, Title, TitleGroup, Card, IconContainer } from "./styles";
import { Link } from "react-router-dom";

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
