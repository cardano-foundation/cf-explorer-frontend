import { Box } from "@mui/material";
import React from "react";

import { AIconGreen, HashtagIcon, TimerIcon } from "src/commons/resources";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";

import { OverviewIcon, OverviewTitle, Card } from "./styles";
import CustomIcon from "../CustomIcon";

interface Props {
  hash: string;
  amount: number;
  time: string;
  item?:
    | SPODeregistration
    | PoolUpdateItem
    | RegistrationItem
    | DelegationItem
    | WithdrawItem
    | DeregistrationItem
    | SPORegistration;
  onClick: (registration: any) => void;
}

const OverviewStaking: React.FC<Props> = ({ item, ...props }) => {
  const { hash, amount, time, onClick } = props;

  return (
    <Card onClick={() => onClick(item)} data-testid="overview-staking">
      <Box display={"flex"}>
        <OverviewIcon>
          <CustomIcon icon={HashtagIcon} width={17} fill="currentColor" color={(theme) => theme.palette.primary.main} />
        </OverviewIcon>
        <Box marginLeft={"10px"}>
          <OverviewTitle data-testid="overview-staking-hash">{getShortHash(hash)}</OverviewTitle>
        </Box>
      </Box>
      <Box display={"flex"}>
        <OverviewIcon>
          <CustomIcon icon={AIconGreen} height={14} fill="currentColor" color={(theme) => theme.palette.primary.main} />
        </OverviewIcon>
        <Box marginLeft={"10px"}>
          <OverviewTitle data-testid="overview-staking-amount">{formatADAFull(amount)}</OverviewTitle>
        </Box>
      </Box>
      <Box display={"flex"}>
        <OverviewIcon>
          <CustomIcon icon={TimerIcon} width={17} fill="currentColor" color={(theme) => theme.palette.primary.main} />
        </OverviewIcon>
        <Box marginLeft={"10px"}>
          <OverviewTitle data-testid="overview-staking-time">{formatDateTimeLocal(time)}</OverviewTitle>
        </Box>
      </Box>
    </Card>
  );
};

export default OverviewStaking;
