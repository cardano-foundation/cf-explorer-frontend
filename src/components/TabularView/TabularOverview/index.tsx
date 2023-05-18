import { Box, BoxProps, Grid, Icon } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import {
  WalletGreenIcon,
  BgGray,
  PaymentWallet,
  RewardWithdrawn,
  DelegationTo,
  RewardAccount,
  TransactionIcon
} from "../../../commons/resources/index";
import { CardOverview, CardTitle, CardValue, TransferButton, WrapIcon, WrapWalletIcon } from "./styles";
import { API } from "../../../commons/utils/api";
import useFetch from "../../../commons/hooks/useFetch";
import { formatADAFull } from "../../../commons/utils/helper";
import ADAicon from "../../commons/ADAIcon";
import { useContext, useEffect, useState } from "react";
import ADATransferModal from "../../StakingLifeCycle/DelegatorLifecycle/ADATransferModal";
import { details } from "../../../commons/routers";
import { useScreen } from "../../../commons/hooks/useScreen";
import DelegatorDetailContext from "~/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";

export const GreenWalletIcon = (props: BoxProps) => {
  return (
    <WrapWalletIcon {...props}>
      <Icon component={WalletGreenIcon} />
    </WrapWalletIcon>
  );
};

type TCardAmount = {
  amount?: number;
};

const CardAmount = ({ amount }: TCardAmount) => {
  return (
    <Box display='flex' alignItems='center'>
      <GreenWalletIcon mr={2} />
      <CardValue>
        {formatADAFull(amount)}
        <ADAicon pl={"8px"} />
      </CardValue>
    </Box>
  );
};

type TGridItem = {
  action?: React.ReactNode;
  title: string;
  value: React.ReactNode;
  mainIcon: React.ReactNode;
};

const GridItem = ({ title, action, value, mainIcon }: TGridItem) => {
  const { isSmallScreen } = useScreen();
  return (
    <Grid item xs={12} md={isSmallScreen ? 12 : 6} lg={6}>
      <CardOverview
        mr={isSmallScreen ? 2 : 0}
        flexDirection={isSmallScreen ? "column" : "row"}
        alignItems={isSmallScreen ? "flex-start" : "center"}
        justifyContent={`${isSmallScreen ? "center" : "space-between"}`}
      >
        <Icon component={BgGray} />
        <Box display='flex' alignItems='center' gap='12px'>
          <WrapIcon pt={`${isSmallScreen ? "30px" : "0px"}`}>{mainIcon}</WrapIcon>
          <Box display='flex' alignItems={isSmallScreen ? "start" : "center"} flexDirection={isSmallScreen ? "column" : "row"}>
            <Box textAlign='start'>
              <CardTitle>{title}</CardTitle>
              {value}
            </Box>
            {action ?
              <Box display='flex' ml={isSmallScreen ? "" : "30px"} mt={`${isSmallScreen ? "8px" : "0px"}`}>
                {" "}
                {action}
              </Box>
              : <Box />}
          </Box>
        </Box>
      </CardOverview>
    </Grid>
  );
};

const TabularOverview: React.FC = () => {
  const data = useContext(DelegatorDetailContext);
  const [open, setOpen] = useState(false);
  const { stakeId } = useParams<{ stakeId: string }>();
  return (
    <Grid container spacing={2} >
      <GridItem
        title='Payment Wallet'
        mainIcon={<PaymentWallet />}
        value={<CardAmount amount={data?.totalStake} />}
        action={
          <TransferButton
            onClick={() => setOpen(true)}
            variant='contained'
            startIcon={<Icon fill='white' component={TransactionIcon} />}
          >
            ADA Transfers
          </TransferButton>
        }
      />
      <GridItem
        title='Reward Account'
        mainIcon={<RewardAccount />}
        value={<CardAmount amount={data?.rewardAvailable} />}
      />
      <GridItem
        title='Rewards Withdrawn'
        mainIcon={<RewardWithdrawn />}
        value={<CardAmount amount={data?.rewardWithdrawn} />}
      />
      <GridItem
        title='Delegating To'
        mainIcon={<DelegationTo />}
        value={
          <Box component={Link} to={details.delegation(data?.pool?.poolId)} display='flex' alignItems='center'>
            <CardValue>{data?.pool?.poolName}</CardValue>
          </Box>
        }
      />
      <ADATransferModal open={open} handleCloseModal={() => setOpen(false)} />
    </Grid>
  );
};

export default TabularOverview;
