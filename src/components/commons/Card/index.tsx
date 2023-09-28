import { Box, styled, BoxProps, SxProps } from "@mui/material";
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
  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
    align-items: baseline;
  }
`;

export const Title = styled("h2")<{ underline: number }>`
  text-align: left;
  padding-bottom: 8px;
  margin-top: 30px;
  line-height: 1;
  margin-bottom: 0px;
  position: relative;
  width: max-content;
  color: ${(props) => props.theme.palette.secondary.main};
  ${(props) => (props.underline ? `font-size: 1.25rem;` : "")};
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: ${(props) =>
      props.underline
        ? props.theme.mode === "light"
          ? props.theme.palette.primary[200]
          : props.theme.palette.primary.main
        : "unset"};
    left: 0;
    bottom: 0;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 24px !important;
    padding-top: 10px;
  }
`;

interface CardProps extends Omit<BoxProps, "title"> {
  title?: React.ReactNode;
  children?: ReactNode;
  underline?: boolean;
  extra?: React.ReactNode;
  titleSx?: SxProps;
}

const Card: React.FC<CardProps> = ({ title, children, underline = false, extra, titleSx, ...props }) => {
  return (
    <CardContainer {...props}>
      <Header>
        {title ? (
          <Title underline={underline ? 1 : 0} sx={titleSx}>
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
