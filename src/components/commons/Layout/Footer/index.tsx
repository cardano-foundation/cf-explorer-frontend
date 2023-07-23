import React from "react";
import { styled, Container } from "@mui/material";

import { APP_VERSION } from "src/commons/utils/constants";

import FooterMenu from "../Sidebar/FooterMenu";

const StyledFooter = styled("footer")`
  height: 60px;
  padding: 0px 10px;
  border-top: 1px solid ${(props) => props.theme.palette.border.main};
  ${({ theme }) => theme.breakpoints.down("md")} {
    height: unset;
    padding: 10px;
  }
`;

const FooterContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: 60px;
  max-width: unset !important;
  ${({ theme }) => theme.breakpoints.down("md")} {
    height: unset;
  }
`;

const Copyright = styled("small")`
  color: ${(props) => props.theme.palette.secondary.light};
  font-family: var(--font-family-title);
  ::first-letter {
    font-size: 1em;
    vertical-align: top;
    margin-right: 2px;
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 100%;
    text-align: center;
  }
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter data-testid="footer">
      <FooterContainer>
        <FooterMenu bottom={true} />
        <Copyright data-testid="footer-text">
          &copy; {new Date().getFullYear()} Cardano Foundation. All rights reserved. Version: {APP_VERSION}
        </Copyright>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
