import { Box, styled, useTheme } from "@mui/material";
import { t } from "i18next";

import ConstitutionalCommitteeOVerrall from "./Overrall";
import Tabs from "./Tabs";
import Card from "../commons/Card";

const ConstitutionalCommittees = () => {
  const theme = useTheme();

  return (
    <Box>
      <Card data-testid="committee-header" title={t("glossary.constitutionalCommittee")}>
        <Description data-testid="constitutionalCommittee.drepDes">
          {t("constitutionalCommittee.page.description")}
        </Description>
        <Description data-testid="constitutionalCommittee.drepDes">
          To learn more about the different parameters, click{" "}
          <Box component={"a"} href="#" color={`${theme.palette.primary.main} !important`}>
            here
          </Box>
        </Description>
      </Card>
      <ConstitutionalCommitteeOVerrall />
      <Tabs />
    </Box>
  );
};

export default ConstitutionalCommittees;

const Description = styled(Box)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.light,
  fontWeight: 400,
  marginTop: theme.spacing(1),
  textAlign: "left",
  width: "80vw",
  [theme.breakpoints.down("md")]: {
    width: "100%"
  }
}));
