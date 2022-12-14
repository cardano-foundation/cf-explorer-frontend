import React from "react";
import { styled, Box, Container } from "@mui/material";

const StyledFooter = styled("footer")`
  height: 60px;
  padding: 0px 10px;
  border-top: 1px solid ${props => props.theme.borderColor};
`;

const FooterContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: 60px;
`;

const Copyright = styled("small")`
  color: ${props => props.theme.textColorPale};
  font-family: var(--font-family-title);
`;

const Hyperlink = styled(Box)`
  text-align: right;
`;

const ExternalLink = styled("a")`
  color: ${props => props.theme.colorGreen}!important;
  &:hover {
    text-decoration: underline !important;
  }
`;

const Dot = styled("a")`
  display: inline-block;
  margin: 0.1rem 10px;
  width: 4px;
  height: 4px;
  background-color: ${props => props.theme.textColorPale};
  border-radius: 50%;
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <FooterContainer>
        <Copyright>© 2022 Cardano Foundation. All rights reserved v1.0</Copyright>
        <Hyperlink>
          <ExternalLink href="/" target="_blank" rel="noreferrer" title="Terms of Service">
            <small>Terms of Service</small>
          </ExternalLink>
          <Dot />
          <ExternalLink href="/" target="_blank" rel="noreferrer" title="Privacy Policy">
            <small>Privacy Policy</small>
          </ExternalLink>
        </Hyperlink>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
