import { Box, styled, BoxProps } from "@mui/material";
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

export const Title = styled("h2") <{ underline: number; }>`
  text-align: left;
  padding-bottom: 8px;
  position: relative;
  ${(props) => (props.underline ? `font-size: 1.25rem;` : "")};
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
  wrapTitle?: boolean;
}

const Card: React.FC<CardProps> = ({ title, marginTitle, children, wrapTitle = false, underline = false, extra, ...props }) => {
  return (
    <CardContainer {...props}>
      <Header>
        {title ? (
          <Title
            underline={underline ? 1 : 0}
            sx={{
              margin: marginTitle ? marginTitle : "unset",
              width: wrapTitle ? "max-content" : "unset",
            }}
          >
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
