import { useState } from "react";
import { Box, BoxProps, Grid, Icon } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  TransactionIcon,
  Wallet,
  WalletGreenIcon,
  BgBlue,
  BgPink,
  BgGreen,
  PigSave,
  Diamond,
} from "../../../commons/resources/index";
import { CardOverview, CardTitle, CardValue, TransferButton, WrapIcon, WrapWalletIcon } from "./styles";

export const GreenWalletIcon = (props: BoxProps) => {
  return (
    <WrapWalletIcon {...props}>
      <Icon component={WalletGreenIcon} />
    </WrapWalletIcon>
  );
};

const CardAmount = () => {
  return (
    <Box display="flex" alignItems="center">
      <GreenWalletIcon mr={2} />
      <CardValue>10,000.0 ₳</CardValue>
    </Box>
  );
};

type TGridItem = {
  action?: React.ReactNode;
  title: string;
  value: React.ReactNode;
  bgType: "blue" | "green" | "red";
  mainIcon: React.ReactNode;
};

const GridItem = ({ title, action, value, bgType, mainIcon }: TGridItem) => {
  const bg = {
    blue: BgBlue,
    green: BgGreen,
    red: BgPink,
  }[bgType];
  return (
    <Grid item xs={6}>
      <CardOverview>
        <Icon component={bg} />
        <Box display="flex" alignItems="center" gap="12px">
          <WrapIcon>{mainIcon}</WrapIcon>
          <Box textAlign="start">
            <CardTitle>{title}</CardTitle>
            {value}
          </Box>
        </Box>
        {action}
      </CardOverview>
    </Grid>
  );
};

const TabularOverview: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { stakeId } = useParams<{ stakeId: string }>();

  return (
    <Grid container spacing={2}>
      <GridItem
        title="Payment Wallet"
        bgType="blue"
        mainIcon={<Wallet />}
        value={<CardAmount />}
        action={
          <TransferButton variant="contained" startIcon={<Icon fill="white" component={TransactionIcon} />}>
            ADA Transfers
          </TransferButton>
        }
      />
      <GridItem title="Reward Account" bgType="green" mainIcon={<Diamond />} value={<CardAmount />} />
      <GridItem title="Rewards Withdrawn" bgType="red" mainIcon={<PigSave />} value={<CardAmount />} />
      <GridItem
        title="Delegating To"
        bgType="blue"
        mainIcon={<Wallet />}
        value={
          <Box display="flex" alignItems="center">
            <CardValue>OctasPool</CardValue>
          </Box>
        }
      />
    </Grid>
  );
};

export default TabularOverview;
