import { Box, Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSelector } from "react-redux";
import { isArray } from "lodash";

import { ProtectIcon, ProtectIconDark } from "src/commons/resources";
import Card from "src/components/commons/Card";
import { formatDateLocal } from "src/commons/utils/helper";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";
import ParseScriptModal from "src/components/ParseScriptModal";
import CustomTooltip from "src/components/commons/CustomTooltip";

import { HereButton, StyledCard, StyledImg, StyledSkeleton } from "./styles";
import DetailViewGroupProtocol from "../DetailViewGroupProtocol/DetailViewGroupProtocol";

interface TooltipNode {
  description?: string;
  children?: TooltipNode[];
}

interface DisplayTooltip {
  [key: string]: TooltipNode;
}
type GroupType = {
  group: { name: string; value: string | number | undefined; time: string | undefined; icon: boolean }[];
  type: string;
  data: DisplayTooltip;
  loading: boolean;
};

type PropsExpainer = {
  items: TooltipNode[] | undefined;
  level?: number;
};
function GroupProtocoParameters(props: GroupType) {
  const { theme } = useSelector(({ theme }: RootState) => theme);
  const { group, type, data, loading } = props;
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
              {loading ? (
                <StyledSkeleton style={{ minHeight: "130px" }} variant="rectangular" />
              ) : (
                <StyledCard.Container>
                  <StyledCard.Content>
                    <StyledCard.ContainerTitile>
                      <CustomTooltip
                        title={
                          <Box style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>
                            <Box>{data[el.name].description}</Box>
                            {data[el.name].children !== undefined && (
                              <ExplainerHoverTooltip items={data[el.name].children} level={0} />
                            )}
                          </Box>
                        }
                      >
                        <StyledCard.Title data-testid="drep.epochTitle">{el.name}</StyledCard.Title>
                      </CustomTooltip>
                      {el.icon && (
                        <CustomTooltip
                          title={
                            <Box style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>
                              <Box>{t("protocolParameters.explainerShield")}</Box>
                            </Box>
                          }
                        >
                          <StyledImg src={theme === "light" ? ProtectIcon : ProtectIconDark} alt="Protect" />
                        </CustomTooltip>
                      )}
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
                          <Box>{truncateText(el.value ? `${el.value}` : t("N/A"), 20)}</Box>
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
              )}
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

function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
}

const getStylesText = (level: number) => {
  let style = {};
  switch (level) {
    case 0:
      style = {
        listStyle: "none"
      };
      break;
    case 1:
      style = {
        listStyle: "disc"
      };
      break;
    case 2:
      style = {
        listStyle: "circle"
      };
      break;
  }
  return style;
};

const Member = ({ name, level }: { name: string; level: number }) => (
  <Box component={"li"} style={getStylesText(level)}>
    {name}
  </Box>
);

const ExplainerHoverTooltip = ({ items, level = 0 }: PropsExpainer) => {
  if (!items) return;
  return (
    <Box>
      {items.map((parentItem, i) => (
        <Box key={i}>
          <Member name={parentItem.description ?? ""} level={level} />
          <Box marginLeft={"16px"}>
            {isArray(parentItem.children) && <ExplainerHoverTooltip items={parentItem.children} level={level + 1} />}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default GroupProtocoParameters;
