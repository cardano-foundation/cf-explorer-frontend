import { Box, Icon } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DelegatorDetailContext from "~/components/StakingLifeCycle/DelegatorLifecycle/DelegatorDetailContext";
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
  CardList,
  CardItem,
  CardTitle,
  CardValue,
  ItemIcon,
  StyledAdaLogoIcon,
  TransferButton
} from "./styles";
import { useSelector } from "react-redux";

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
      <ItemIcon src={iconUrl} alt='title' />
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
    <CardList>
      <GridItem
        title='Payment Wallet'
        iconUrl={PaymentWalletUrl}
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
        iconUrl={RewardAccountIconUrl}
        value={<CardAmount amount={Math.max(data?.rewardAvailable || 0, 0)} />}
      />
      <GridItem
        title='Rewards Withdrawn'
        iconUrl={RewardWithdrawnIconUrl}
        value={<CardAmount amount={data?.rewardWithdrawn} />}
      />
      <GridItem
        title='Delegating To'
        iconUrl={DelegationToIconUrl}
        value={
          <Box component={Link} to={details.delegation(data?.pool?.poolId)} display='flex' alignItems='center'>
            <CardValue>{data?.pool?.poolName || getShortHash(data?.pool?.poolId || "")}</CardValue>
          </Box>
        }
      />
      <ADATransferModal open={open} handleCloseModal={() => setOpen(false)} />
    </CardList>
  );
};

export default TabularOverview;
