import { TabContext, TabPanel } from "@mui/lab";
import { Box, Tab, useTheme } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as UtxoIcon } from "src/commons/resources/images/utxoIcon.svg";
import { details } from "src/commons/routers";
import { ScriptIcon } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";

import ScriptTab from "./ScriptTab";
import TokenTransaction from "./TokenTransaction";
import { TabListStyled, TabTitle, TitleTab } from "./styles";

const ContractDetailContent: React.FC = () => {
  const { t } = useTranslation();
  const { tabActive = "transaction", address } = useParams<{
    tabActive: "transaction" | "transcript";
    address: string;
  }>();
  const history = useHistory();
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, tab: "transaction" | "transcript") => {
    history.replace({ pathname: details.contract(address, tab) });
  };

  const tabs: { label: React.ReactNode; key: string; children: React.ReactNode }[] = [
    {
      label: (
        <TabTitle className={tabActive === "transaction" ? "active" : ""}>
          <Box display={"flex"} alignItems="center">
            <UtxoIcon fill={tabActive === "transaction" ? theme.palette.primary.main : theme.palette.secondary.light} />
            <TitleTab active={+(tabActive === "transaction")} pl={1}>
              {t("drawer.transactions")}
            </TitleTab>
          </Box>
        </TabTitle>
      ),
      key: "transaction",
      children: <TokenTransaction />
    },
    {
      label: (
        <TabTitle className={tabActive === "transcript" ? "active" : ""}>
          <Box display={"flex"} alignItems="center">
            <CustomIcon
              icon={ScriptIcon}
              width={24}
              fill="currentColor"
              color={tabActive === "transcript" ? theme.palette.primary.main : theme.palette.secondary.light}
            />
            <TitleTab active={+(tabActive === "transcript")} pl={1}>
              {t("common.script")}
            </TitleTab>
          </Box>
        </TabTitle>
      ),
      key: "transcript",
      children: <ScriptTab />
    }
  ];

  return (
    <TabContext value={tabActive}>
      <Box>
        <TabListStyled
          onChange={handleChange}
          TabIndicatorProps={{ sx: { background: (theme) => theme.palette.primary.main, height: 3 } }}
        >
          {tabs?.map((item) => (
            <Tab
              key={item.key}
              label={item.label}
              value={item.key}
              sx={{
                padding: "12px 0px",
                marginRight: "24px"
              }}
            />
          ))}
        </TabListStyled>
      </Box>
      {tabs.map((item) => (
        <TabPanel
          sx={{ padding: 0, borderTop: (theme) => `1px solid ${theme.palette.primary[200]}` }}
          key={item.key}
          value={item.key}
        >
          {item.children}
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default ContractDetailContent;
