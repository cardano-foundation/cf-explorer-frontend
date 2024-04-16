import { Box, useTheme } from "@mui/material";
import React from "react";

import { HashtagIcon, TimerIcon } from "src/commons/resources";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";

import { OverviewIcon, OverviewTitle, Card } from "./styles";
import CustomIcon from "../CustomIcon";
import ADAicon from "../ADAIcon";
import DatetimeTypeTooltip from "../DatetimeTypeTooltip";

interface Props<T> {
  hash: string;
  amount: number;
  time: string;
  item?: T;
  onClick: (registration?: T) => void;
}

const OverviewStaking = function <T>({ item, ...props }: Props<T>) {
  const { hash, amount, time, onClick } = props;
  const theme = useTheme();

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
          <ADAicon style={{ fill: theme.palette.primary.main }} />
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
          <DatetimeTypeTooltip>
            <OverviewTitle data-testid="overview-staking-time">{formatDateTimeLocal(time)}</OverviewTitle>
          </DatetimeTypeTooltip>
        </Box>
      </Box>
    </Card>
  );
};

export default OverviewStaking;
