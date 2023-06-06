import { Grid, Icon } from "@mui/material";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";

import DelegatorDetailContext from "src/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";

import {
  DelegationToIconUrl,
  PaymentWalletUrl,
  RewardAccountIconUrl,
  RewardWithdrawnIconUrl,
  TransactionIcon
} from "../../../commons/resources/index";
import { details } from "../../../commons/routers";
import { formatADAFull, getShortHash } from "../../../commons/utils/helper";
import ADATransferModal from "../../StakingLifeCycle/DelegatorLifecycle/ADATransferModal";
import {
  CardContent,
  CardInfo,
  CardItem,
  CardTitle,
  CardValue,
  ItemIcon,
  StyledAdaLogoIcon,
  TransferButton,
  NoDelegatedStakePool,
  CardValueDelegating,
  BoxStyled,
  StyledBoxDelegating
} from "./styles";

type TCardAmount = {
  amount?: number;
};

const CardAmount = ({ amount }: TCardAmount) => {
  return (
    <CardValue>
      {formatADAFull(amount)}
      <StyledAdaLogoIcon />
    </CardValue>
  );
};

type TGridItem = {
  action?: React.ReactNode;
  title: string;
  value: React.ReactNode;
  iconUrl: string;
};

const GridItem = ({ title, action, value, iconUrl }: TGridItem) => {
  const { sidebar } = useSelector(({ user }: RootState) => user);

  return (
    <CardItem sidebar={+sidebar}>
      <ItemIcon src={iconUrl} alt="title" />
      <CardContent>
        <CardInfo>
          <CardTitle>{title}</CardTitle>
          {value}
        </CardInfo>
        {action}
      </CardContent>
    </CardItem>
  );
};

const TabularOverview: React.FC = () => {
  const data = useContext(DelegatorDetailContext);
  const [open, setOpen] = useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <GridItem
          title="Payment Wallet"
          iconUrl={PaymentWalletUrl}
          value={<CardAmount amount={Math.max(data?.totalStake || 0, 0)} />}
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
      </Grid>
      <Grid item xs={12} sm={6}>
        <GridItem
          title="Reward Account"
          iconUrl={RewardAccountIconUrl}
          value={<CardAmount amount={Math.max(data?.rewardAvailable || 0, 0)} />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <GridItem
          title="Rewards Withdrawn"
          iconUrl={RewardWithdrawnIconUrl}
          value={<CardAmount amount={data?.rewardWithdrawn} />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <GridItem
          title="Delegating To"
          iconUrl={DelegationToIconUrl}
          value={
            data?.pool?.poolId ? (
              <StyledBoxDelegating to={details.delegation(data?.pool?.poolId)}>
                <CardValueDelegating>
                  <BoxStyled>{data?.pool?.poolName || getShortHash(data?.pool?.poolId || "")}</BoxStyled>
                </CardValueDelegating>
              </StyledBoxDelegating>
            ) : (
              <NoDelegatedStakePool>Not delegated to any pool</NoDelegatedStakePool>
            )
          }
        />
      </Grid>
      <ADATransferModal open={open} handleCloseModal={() => setOpen(false)} />
    </Grid>
  );
};

export default TabularOverview;
