import React from "react";
import { styled, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";

import { APP_VERSION } from "src/commons/utils/constants";
import { routers } from "src/commons/routers";

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
  color: ${(props) => props.theme.palette.grey[300]};
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

const RefContainer = styled(Box)`
  display: flex;
  gap: 10px;
  align-items: center;
  justiy-content: center;
  margin-right: 30px;
  ${(props) => props.theme.breakpoints.down("md")} {
    width: 100%;
    justify-content: center;
    margin: 10px 0px;
  }
  ${(props) => props.theme.breakpoints.down("sm")} {
    flex-direction: column;
    margin: 20px 0 40px 0;
  }
`;

const DotDivide = styled(Box)`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${(props) => props.theme.palette.green[650]};
`;

const LinkTo = styled(Link)`
  color: ${(props) => `${props.theme.palette.blue[850]} !important`};
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter data-testid="footer">
      <FooterContainer>
        <FooterMenu bottom={true} />
        <Copyright data-testid="footer-text">
          &copy; {new Date().getFullYear()} Cardano Foundation. All rights reserved. Version: {APP_VERSION}
        </Copyright>
        <RefContainer>
          <LinkTo to={routers.FAQ} target="_blank" rel="noopener noreferrer">
            FAQ
          </LinkTo>
          <DotDivide />
          <LinkTo to={routers.TERMS_AND_CONDITIONS} target="_blank" rel="noopener noreferrer">
            Terms and Conditions
          </LinkTo>
          <DotDivide />
          <LinkTo to={routers.POLICY} target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </LinkTo>
        </RefContainer>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
