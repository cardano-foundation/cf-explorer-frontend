import { Box, BoxProps, Grid, Icon, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CustomIcon from "src/components/commons/CustomIcon";
import {
  OwnerAccountIcon,
  RewardsAvailableIcon,
  WalletGreenIcon,
  StatusDarkIcon,
  StatusLightIcon,
  PoolSizeDarkIcon,
  PoolSizeLightIcon
} from "src/commons/resources";
import { details } from "src/commons/routers";
import { formatADAFull } from "src/commons/utils/helper";
import ViewMoreAddressModal from "src/components/ViewMoreAddressModal";
import CustomTooltip from "src/components/commons/CustomTooltip";
import ADAicon from "src/components/commons/ADAIcon";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

import PoolDetailContext from "../../PoolDetailContext";
import {
  CardOverview,
  CardTitle,
  CardValue,
  ClickAbleLink,
  DotsIcon,
  StyledBox,
  ViewMoreButton,
  WrapIcon,
  WrapStatus,
  WrapWalletIcon,
  WrapIconToStyle
} from "./styles";

export const GreenWalletIcon = (props: BoxProps) => {
  return (
    <WrapWalletIcon {...props}>
      <Icon component={WalletGreenIcon} />
    </WrapWalletIcon>
  );
};
export interface OverviewCardProps {
  title?: string;
  subtitle?: string;
}

type TGridItem = {
  action?: React.ReactNode;
  title: string;
  value: React.ReactNode;
  bgType: "blue" | "green" | "red" | "white";
  mainIcon: React.ReactNode;
};

const GridItem = ({ title, action, value, mainIcon }: TGridItem) => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  return (
    <Grid item sm={sidebar ? 12 : 6} md={6} lg={6} width={"100%"}>
      <CardOverview>
        <StyledBox hasAction={!!action} sidebar={!!sidebar} flexGrow={1}>
          <WrapIcon>{mainIcon}</WrapIcon>
          <Box textAlign="start" width={"calc(100% - 100px)"} flexGrow={action ? 1 : ""}>
            <CardTitle>{title}</CardTitle>
            {value}
          </Box>
        </StyledBox>
        <Box sx={{ position: "absolute", right: "5%", top: "23%" }}> {action}</Box>
      </CardOverview>
    </Grid>
  );
};

const TabularOverview: React.FC = () => {
  const { t } = useTranslation();

  const data = useContext(PoolDetailContext);
  const { stakeKeys, poolSize, epochNo, status, rewardAvailable } = data ?? {};
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const theme = useTheme();

  const onOwnerItemClick = (key: string) => {
    return history.push(details.stake(key));
  };

  const ownerAccountValue = stakeKeys?.[0] || "";
  const STATUS = {
    ACTIVE: [t("common.active"), theme.palette.secondary.main],
    RETIRED: [t("common.retired"), theme.palette.error[700]]
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <GridItem
          title={t("glossary.poolSize")}
          bgType="white"
          mainIcon={
            theme.isDark ? (
              <img src={PoolSizeDarkIcon} alt="pool size icon" height={80} width={80} />
            ) : (
              <img src={PoolSizeLightIcon} alt="pool size icon" height={80} width={80} />
            )
          }
          value={
            <Box display="flex" alignItems="center">
              <CardValue display="flex" alignItems="center">
                {formatADAFull(poolSize)} <ADAicon width={15} height={20} />
              </CardValue>
            </Box>
          }
        />
        <GridItem
          title={t("common.status")}
          bgType="white"
          mainIcon={
            theme.isDark ? (
              <img src={StatusDarkIcon} alt="status icon" height={80} width={80} />
            ) : (
              <img src={StatusLightIcon} alt="status icon" height={80} width={80} />
            )
          }
          value={
            <WrapStatus>
              <CardValue
                sx={{
                  whiteSpace: "pre"
                }}
                color={STATUS[status ?? "ACTIVE"][1]}
              >
                {STATUS[status ?? "ACTIVE"][0] + ": "}
              </CardValue>
              <ClickAbleLink to={details.epoch(epochNo)}>
                {t("epoch")} {epochNo}
              </ClickAbleLink>
            </WrapStatus>
          }
        />
        <GridItem
          title={t("glossary.rewardsAvailable")}
          bgType="white"
          mainIcon={
            <WrapIconToStyle>
              <CustomIcon icon={RewardsAvailableIcon} height={80} width={80} />
            </WrapIconToStyle>
          }
          value={
            <Box display="flex" alignItems="center">
              <CardValue>{formatADAFull(rewardAvailable)} </CardValue>
              <ADAicon width={15} height={20} style={{ overflow: "inherit" }} />
            </Box>
          }
        />
        <GridItem
          title={t("common.ownerAccount")}
          bgType="white"
          mainIcon={
            <WrapIconToStyle>
              <CustomIcon icon={OwnerAccountIcon} height={80} width={80} />
            </WrapIconToStyle>
          }
          value={
            <Box display="flex" alignItems="center">
              <CardValue width={"100%"}>
                <CustomTooltip title={stakeKeys?.[0]}>
                  <ClickAbleLink to={details.stake(stakeKeys?.[0] || "#")} sx={{ textWrap: "wrap" }}>
                    <DynamicEllipsisText
                      value={ownerAccountValue}
                      postfix={3}
                      sx={{ wordBreak: "inherit" }}
                      sxFirstPart={{ maxWidth: "70px" }}
                    />
                  </ClickAbleLink>
                </CustomTooltip>
              </CardValue>
            </Box>
          }
          action={
            stakeKeys &&
            stakeKeys.length > 1 && (
              <ViewMoreButton onClick={() => setOpen(true)}>
                <DotsIcon />
              </ViewMoreButton>
            )
          }
        />
      </Grid>
      <ViewMoreAddressModal
        showFullHash={true}
        onItemClick={onOwnerItemClick}
        title={t("common.ownerAccount")}
        open={open}
        items={stakeKeys}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
};

export default TabularOverview;
