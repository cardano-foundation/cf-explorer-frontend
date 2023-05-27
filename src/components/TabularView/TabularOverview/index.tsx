import { Box, BoxProps, Grid, Icon } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DelegatorDetailContext from "~/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";
import { useScreen } from "../../../commons/hooks/useScreen";
import {
  BgGray,
  DelegationTo,
  PaymentWallet,
  RewardAccount,
  RewardWithdrawn,
  TransactionIcon,
  WalletGreenIcon
} from "../../../commons/resources/index";
import { details } from "../../../commons/routers";
import { formatADAFull, getShortHash } from "../../../commons/utils/helper";
import ADATransferModal from "../../StakingLifeCycle/DelegatorLifecycle/ADATransferModal";
import ADAicon from "../../commons/ADAIcon";
import {
  CardContent,
  CardOverview,
  CardTitle,
  CardValue,
  TransferButton,
  WalletBox,
  WrapFlex,
  WrapIcon,
  WrapWalletIcon
} from "./styles";
import { useSelector } from "react-redux";

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
    <Box display='flex' alignItems='center' gap='10px'>
      <WalletBox>
        <GreenWalletIcon />
      </WalletBox>
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
  const { sidebar } = useSelector(({ user }: RootState) => user);

  return (
    <Grid item sm={sidebar ? 12 : 6} md={6} lg={6} width={"100%"}>
      <CardOverview>
        <Icon component={BgGray} />
        <CardContent>
          <WrapIcon>{mainIcon}</WrapIcon>
          <WrapFlex>
            <Box textAlign='start'>
              <CardTitle>{title}</CardTitle>
              {value}
            </Box>
            {action ? (
              <Box display='flex' alignItems='center'>
                {action}
              </Box>
            ) : (
              <Box />
            )}
          </WrapFlex>
        </CardContent>
      </CardOverview>
    </Grid>
  );
};

const TabularOverview: React.FC = () => {
  const data = useContext(DelegatorDetailContext);
  const [open, setOpen] = useState(false);

  return (
    <Grid container spacing={2}>
      <GridItem
        title='Payment Wallet'
        mainIcon={<PaymentWallet />}
        value={<CardAmount amount={Math.max(data?.totalStake || 0, 0)} />}
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
        value={<CardAmount amount={Math.max(data?.rewardAvailable || 0, 0)} />}
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
            <CardValue>{data?.pool?.poolName || getShortHash(data?.pool?.poolId || "")}</CardValue>
          </Box>
        }
      />
      <ADATransferModal open={open} handleCloseModal={() => setOpen(false)} />
    </Grid>
  );
};

export default TabularOverview;
