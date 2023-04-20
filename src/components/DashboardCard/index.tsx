import { Box } from '@mui/material';
import React from 'react'
import { CardContent, SubTitle, Title, TitleGroup, Card, IconContainer } from './styles';

export interface DashboardCardProps {
    leftIcon?: React.ReactNode;
    title?: string;
    subtitle?: string; 
}
const DashboardCard: React.FC<DashboardCardProps> = ({ leftIcon, title, subtitle}) => {
  return (
    <Card>
        <CardContent>
            <IconContainer>{leftIcon}</IconContainer>
            <TitleGroup>
                <Title>{title}</Title>
                <SubTitle>{subtitle}</SubTitle>
            </TitleGroup>
        </CardContent>
    </Card>
  )
}

export default DashboardCard