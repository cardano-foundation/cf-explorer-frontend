import React from "react";
import { styled, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { APP_VERSION, BUG_BOUNTY_URL } from "src/commons/utils/constants";
import { routers } from "src/commons/routers";

import FooterMenu from "../Sidebar/FooterMenu";
import CustomTooltip from "../../CustomTooltip";

const StyledFooter = styled("footer")`
  margin-top: 10px;
  height: 60px;
  padding: 0px 10px;
  border-top: 1px solid ${(props) => props.theme.palette.primary[200]};
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
  display: flex;
  gap: 3px;
  color: ${(props) => props.theme.palette.secondary.light};
  font-family: var(--font-family-title);
  ::first-letter {
    font-size: 1em;
    vertical-align: top;
    margin-right: 2px;
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 100%;
    justify-content: center;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-direction: column;
  }
`;

const Version = styled("span")`
  white-space: nowrap;
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

const DotDivide = styled(Box)(({ theme }) => ({
  width: "4px",
  height: "4px",
  borderRadius: "50%",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    display: "none"
  }
}));

const StyledLinkExternal = styled("a")`
  color: ${(props) => `${props.theme.palette.primary.main} !important`};
`;

const LinkTo = styled(Link)`
  color: ${(props) => `${props.theme.palette.primary.main} !important`};
`;

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <StyledFooter data-testid="footer" id="footer">
      <FooterContainer>
        <FooterMenu bottom={true} />
        <Copyright data-testid="footer-text">
          &copy; {new Date().getFullYear()} {t("common.copyright")}{" "}
          <Version>
            {t("common.version")}: {APP_VERSION}
          </Version>
        </Copyright>
        <RefContainer>
          <LinkTo to={routers.FAQ} rel="noopener noreferrer">
            {t("common.faqs")}
          </LinkTo>
          <DotDivide />
          <CustomTooltip
            componentsProps={{ transition: { style: { marginBottom: "10px" } } }}
            title={t("common.tooltipBugBounty")}
          >
            <StyledLinkExternal href={BUG_BOUNTY_URL} target="_blank" rel="noopener noreferrer">
              {t("common.bugBounty")}
            </StyledLinkExternal>
          </CustomTooltip>

          <DotDivide />
          <LinkTo to={routers.TERMS_OF_SERVICE} rel="noopener noreferrer">
            {t("common.termsOfService")}
          </LinkTo>
          <DotDivide />
          <LinkTo to={routers.POLICY} rel="noopener noreferrer">
            {t("common.privacyPolicy")}
          </LinkTo>
        </RefContainer>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
