import { Box, BoxProps, Grid, Icon, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  BgBlue,
  BgCardWhite,
  BgGreen,
  BgPink,
  OwnerAccountIcon,
  PoolSizeIcon,
  RewardsAvailableIcon,
  StatusIcon,
  WalletGreenIcon
} from "src/commons/resources";
import { details } from "src/commons/routers";
import { formatADAFull, getShortWallet } from "src/commons/utils/helper";
import ViewMoreAddressModal from "src/components/ViewMoreAddressModal";
import CustomTooltip from "src/components/commons/CustomTooltip";

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
  WrapWalletIcon
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

const GridItem = ({ title, action, value, bgType, mainIcon }: TGridItem) => {
  const bg = {
    blue: BgBlue,
    green: BgGreen,
    red: BgPink,
    white: BgCardWhite
  }[bgType];
  const { sidebar } = useSelector(({ user }: RootState) => user);
  return (
    <Grid item sm={sidebar ? 12 : 6} md={6} lg={6} width={"100%"}>
      <CardOverview>
        <Icon component={bg} />
        <StyledBox>
          <WrapIcon>{mainIcon}</WrapIcon>
          <Box textAlign="start">
            <CardTitle>{title}</CardTitle>
            {value}
          </Box>
        </StyledBox>
        {action}
      </CardOverview>
    </Grid>
  );
};

const TabularOverview: React.FC = () => {
  const data = useContext(PoolDetailContext);
  const { stakeKeys, poolSize, epochNo, status, rewardAvailable } = data ?? {};
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const theme = useTheme();

  const onOwnerItemClick = (key: string) => {
    return history.push(details.stake(key));
  };

  const ownerAccountValue = getShortWallet(stakeKeys?.[0]);
  const STATUS = {
    ACTIVE: ["Active", theme.palette.grey[400]],
    INACTIVE: ["Inactive", "rgb(255,0,0)"],
    RETIRING: ["Retiring", "rgb(255,153,0)"]
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <GridItem
          title="Pool Size"
          bgType="white"
          mainIcon={<PoolSizeIcon />}
          value={
            <Box display="flex" alignItems="center">
              <CardValue>{formatADAFull(poolSize)} ₳</CardValue>
            </Box>
          }
        />
        <GridItem
          title="Status"
          bgType="white"
          mainIcon={<StatusIcon />}
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
              <ClickAbleLink to={details.epoch(epochNo)}>Epoch {epochNo}</ClickAbleLink>
            </WrapStatus>
          }
        />
        <GridItem
          title="Rewards Available"
          bgType="white"
          mainIcon={<RewardsAvailableIcon />}
          value={
            <Box display="flex" alignItems="center">
              <CardValue>{formatADAFull(rewardAvailable)} ₳</CardValue>
            </Box>
          }
        />
        <GridItem
          title="Owner Account"
          bgType="white"
          mainIcon={<OwnerAccountIcon />}
          value={
            <Box display="flex" alignItems="center">
              <CardValue>
                <CustomTooltip title={stakeKeys?.[0]}>
                  <ClickAbleLink to={details.stake(stakeKeys?.[0] || "#")}>{ownerAccountValue}</ClickAbleLink>
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
        title="Owner Account"
        open={open}
        items={stakeKeys}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
};

export default TabularOverview;
