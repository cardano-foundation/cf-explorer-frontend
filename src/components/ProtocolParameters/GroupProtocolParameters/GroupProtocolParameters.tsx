import { Box, Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSelector } from "react-redux";

import { ProtectIcon, ProtectIconDark } from "src/commons/resources";
import Card from "src/components/commons/Card";
import { formatDateLocal } from "src/commons/utils/helper";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";
import ParseScriptModal from "src/components/ParseScriptModal";

import { HereButton, StyledCard, StyledImg } from "./styles";
import DetailViewGroupProtocol from "../DetailViewGroupProtocol/DetailViewGroupProtocol";

type GroupType = {
  group: { name: string; value: string | number | undefined; time: string | undefined; icon: boolean }[];
  type: string;
};

function GroupProtocoParameters(props: GroupType) {
  const { theme } = useSelector(({ theme }: RootState) => theme);
  const { group, type } = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [costModelScript, setCostModelScript] = useState("");
  const [titleModal, setTitleModal] = useState("");

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const getTitleGroupProtocol = (type: string) => {
    let titleCard = null;
    switch (type) {
      case "network":
        titleCard = "Network group";
        break;
      case "economic":
        titleCard = "Economic Group";
        break;
      case "technical":
        titleCard = "Technical Group";
        break;
      case "governance":
        titleCard = "Governance Group";
        break;
    }
    return titleCard;
  };

  const getDescripttionGroup = (type: string) => {
    let descripttion = null;
    switch (type) {
      case "network":
        descripttion = t("protocolParameters.network");
        break;
      case "economic":
        descripttion = t("protocolParameters.economic");
        break;
      case "technical":
        descripttion = t("protocolParameters.technical");
        break;
      case "governance":
        descripttion = t("protocolParameters.governance");
        break;
    }
    return descripttion;
  };
  return (
    <Card
      marginBottom={"34px"}
      title={
        <Box marginBottom={"16px"}>
          <Box fontSize={18} fontWeight={700} mt={1} paddingBottom={"8px"}>
            {getTitleGroupProtocol(type)}
          </Box>
          <Box whiteSpace={"pre-wrap"} component={"p"} fontSize={16} fontWeight={400} mt={1}>
            {getDescripttionGroup(type)}
            <HereButton onClick={toggleDrawer(true)}>here</HereButton>
          </Box>
        </Box>
      }
    >
      <Grid container spacing={2}>
        {group.map((el, i) => {
          return (
            <Grid key={i} item lg={6} xl={3} md={6} sm={6} xs={12}>
              <StyledCard.Container>
                <StyledCard.Content>
                  <StyledCard.ContainerTitile>
                    <StyledCard.Title data-testid="drep.epochTitle">{el.name}</StyledCard.Title>
                    {el.icon && <StyledImg src={theme === "light" ? ProtectIcon : ProtectIconDark} alt="Protect" />}
                  </StyledCard.ContainerTitile>
                  <StyledCard.ContainerValue>
                    <StyledCard.Value>{t("glossary.value")}</StyledCard.Value>
                    <StyledCard.Value>
                      <Box
                        maxWidth={"200px "}
                        component={el?.name === "costModels" && typeof el.value === "string" ? Button : Box}
                        onClick={() => {
                          if (el?.name === "costModels") {
                            setCostModelScript(el.value ? `${el.value}` : "");
                            setTitleModal("costModels");
                          }
                        }}
                      >
                        <Box maxWidth={170} overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"}>
                          {el.value ? el.value : t("N/A")}
                        </Box>
                      </Box>
                    </StyledCard.Value>
                  </StyledCard.ContainerValue>

                  <StyledCard.ContainerValue>
                    <StyledCard.Value>{t("common.timestamp")}</StyledCard.Value>
                    <StyledCard.Value>
                      {el.time ? <DatetimeTypeTooltip>{formatDateLocal(el.time)}</DatetimeTypeTooltip> : t("N/A")}
                    </StyledCard.Value>
                  </StyledCard.ContainerValue>
                </StyledCard.Content>
              </StyledCard.Container>
            </Grid>
          );
        })}
      </Grid>
      <DetailViewGroupProtocol groupType={type} open={open} onClose={toggleDrawer(false)} />
      <ParseScriptModal
        open={!!costModelScript}
        onClose={() => setCostModelScript("")}
        script={costModelScript}
        title={titleModal || "CostModel"}
      />
    </Card>
  );
}

export default GroupProtocoParameters;
