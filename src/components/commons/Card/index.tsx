import { Box, styled } from "@mui/material";
import { BoxProps } from "@mui/system";
import React, { ReactNode } from "react";

const CardContainer = styled(Box)`
  background-color: transparent;
  padding: 25px 0px;
  border-radius: var(--border-radius);
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled("h2")`
  text-align: left;
  padding-bottom: 8px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 100px;
    height: 4px;
    background-color: ${props => props.theme.colorGreenLight};
    left: 0;
    bottom: 0;
  }
`;

interface CardProps extends Omit<BoxProps, "title"> {
  title?: React.ReactNode;
  children?: ReactNode;
  extra?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, extra, ...props }) => {
  return (
    <CardContainer {...props}>
      <Header>
        {title ? <Title>{title}</Title> : null}
        {extra}
      </Header>
      {children}
    </CardContainer>
  );
};

export default Card;
