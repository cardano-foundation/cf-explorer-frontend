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
import { formatADAFull } from "../../../commons/utils/helper";
import ADATransferModal from "../../StakingLifeCycle/DelegatorLifecycle/ADATransferModal";
import ADAicon from "../../commons/ADAIcon";
import { CardOverview, CardTitle, CardValue, TransferButton, WrapFlex, WrapIcon, WrapWalletIcon } from "./styles";

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
  const { isSmallScreen, isTablet, isLargeTablet, width } = useScreen();
  const MIN_WIDTH_ITEM_GRID = 700;
  const isLimitGridItem = width < MIN_WIDTH_ITEM_GRID;
  return (
    <Grid item xs={12} sm={!isTablet || isLimitGridItem ? 12 : 6} md={isSmallScreen ? 12 : 6} lg={6}>
      <CardOverview
        mr={isSmallScreen ? 2 : 0}
        flexDirection={isSmallScreen ? "column" : "row"}
        alignItems={isSmallScreen ? "flex-start" : "center"}
        justifyContent={`${isSmallScreen ? "center" : "space-between"}`}
      >
        <Icon component={BgGray} />
        <Box display='flex' alignItems='center' gap='12px'>
          <WrapIcon>{mainIcon}</WrapIcon>
          <WrapFlex paddingLeft={action && isLargeTablet && !isSmallScreen ? "20px" : 0} smallScreen={isSmallScreen ? 1 : 0}>
            <Box textAlign='start' mr={"30px"}>
              <CardTitle>{title}</CardTitle>
              {value}
            </Box>
            {action ?
              <Box display='flex'>
                {" "}
                {action}
              </Box>
              : <Box />}
          </WrapFlex>
        </Box>
      </CardOverview>
    </Grid>
  );
};

const TabularOverview: React.FC = () => {
  const data = useContext(DelegatorDetailContext);
  const [open, setOpen] = useState(false);
  const { stakeId } = useParams<{ stakeId: string }>();
  const { isTablet } = useScreen();
  return (
    <Grid container spacing={2} columnSpacing={isTablet ? "0px" : ""} >
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
