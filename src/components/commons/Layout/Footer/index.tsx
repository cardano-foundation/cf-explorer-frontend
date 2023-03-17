import React from "react";
import { styled, Box, Container } from "@mui/material";

const StyledFooter = styled("footer")`
  height: 60px;
  padding: 0px 10px;
  border-top: 1px solid ${props => props.theme.palette.border.main};
  @media screen and (max-width: 1023px) {
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
  @media screen and (max-width: 1023px) {
    height: unset;
  }
`;

const Copyright = styled("small")`
  color: ${props => props.theme.palette.grey[400]};
  font-family: var(--font-family-title);
  ::first-letter {
    font-size: 0.75em;
    vertical-align: top;
    margin-right: 2px;
  }
  @media screen and (max-width: 1023px) {
    width: 100%;
    text-align: center;
  }
`;

const Hyperlink = styled(Box)`
  text-align: right;
  @media screen and (max-width: 1023px) {
    width: 100%;
    text-align: center;
  }
`;

const ExternalLink = styled("a")`
  color: ${props => props.theme.palette.primary.dark}!important;
  &:hover {
    text-decoration: underline !important;
  }
`;

const Dot = styled("a")`
  display: inline-block;
  margin: 0.1rem 10px;
  width: 4px;
  height: 4px;
  background-color: ${props => props.theme.palette.grey[400]};
  border-radius: 50%;
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <FooterContainer>
        <Copyright>©2022 Cardano Foundation. All rights reserved (v1.0)</Copyright>
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
