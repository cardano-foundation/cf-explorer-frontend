import { Box, BoxProps, Grid, Icon } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  WalletGreenIcon,
  BgGray,
  PaymentWallet,
  RewardWithdrawn,
  DelegationTo,
  RewardAccount,
  TransactionIcon,
} from "../../../commons/resources/index";
import { CardOverview, CardTitle, CardValue, TransferButton, WrapIcon, WrapWalletIcon } from "./styles";
import { API } from "../../../commons/utils/api";
import useFetch from "../../../commons/hooks/useFetch";
import { formatADAFull } from "../../../commons/utils/helper";
import ADAicon from "../../commons/ADAIcon";
import { useState } from "react";
import ADATransferModal from "../../StakingLifeCycle/DelegatorLifecycle/ADATransferModal";

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
    <Box display="flex" alignItems="center">
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
  return (
    <Grid item xs={6}>
      <CardOverview>
        <Icon component={BgGray} />
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
  const { poolId } = useParams<{ poolId: string }>();
  const { data } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${poolId}`, undefined, false);

  return (
    <Grid container spacing={2}>
      <GridItem
        title="Payment Wallet"
        mainIcon={<PaymentWallet />}
        value={<CardAmount amount={data?.totalStake} />}
        action={
          <TransferButton
            onClick={() => setOpen(true)}
            variant="contained"
            startIcon={<Icon fill="white" component={TransactionIcon} />}
          >
            ADA Transfers
          </TransferButton>
        }
      />
      <GridItem
        title="Reward Account"
        mainIcon={<RewardAccount />}
        value={<CardAmount amount={data?.rewardAvailable} />}
      />
      <GridItem
        title="Rewards Withdrawn"
        mainIcon={<RewardWithdrawn />}
        value={<CardAmount amount={data?.rewardWithdrawn} />}
      />
      <GridItem
        title="Delegating To"
        mainIcon={<DelegationTo />}
        value={
          <Box display="flex" alignItems="center">
            <CardValue>{data?.pool?.poolName}</CardValue>
          </Box>
        }
      />
      <ADATransferModal open={open} handleCloseModal={() => setOpen(false)} />
    </Grid>
  );
};

export default TabularOverview;
