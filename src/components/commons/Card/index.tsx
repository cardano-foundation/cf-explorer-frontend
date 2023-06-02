import { Box, styled } from "@mui/material";
import { BoxProps } from "@mui/system";
import React, { ReactNode } from "react";

const CardContainer = styled(Box)`
  background-color: transparent;
  border-radius: var(--border-radius);
  position: relative;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled("h2")<{ underline: number; marginTitle?: string }>`
  width: 100%;
  text-align: left;
  padding-bottom: 8px;
  position: relative;
  ${(props) => (props.underline ? `font-size: 1.25rem;` : "")};
  margin: ${({ marginTitle }) => (marginTitle ? marginTitle : "unset")};
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: ${(props) => (props.underline ? props.theme.palette.primary.main : "unset")};
    left: 0;
    bottom: 0;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 24px !important;
    padding-top: 10px;
  }
},
`;

interface CardProps extends Omit<BoxProps, "title"> {
  title?: React.ReactNode;
  children?: ReactNode;
  underline?: boolean;
  extra?: React.ReactNode;
  marginTitle?: string;
}

const Card: React.FC<CardProps> = ({ title, marginTitle, children, underline = false, extra }) => {
  return (
    // <CardContainer {...props}>
    <CardContainer>
      <Header>
        {title ? (
          <Title marginTitle={marginTitle} underline={underline ? 1 : 0}>
            {title}
          </Title>
        ) : null}
        {extra}
      </Header>
      {children}
    </CardContainer>
  );
};

export default Card;
