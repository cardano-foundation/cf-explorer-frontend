import { Box } from "@mui/material";
import moment from "moment";
import React from "react";
import { AIconGreen, HashtagIcon, TimerIcon } from "../../../commons/resources";
import { formatADAFull, getShortHash } from "../../../commons/utils/helper";
import { OverviewIcon, OverviewTitle, WrapContainer } from "./styles";

interface Props {
  txns: string;
  amount: string;
  time: Date;
}

const OverviewStaking: React.FC<Props> = props => {
  const {
    txns,
    amount,
    time,
  } = props;

  return (
    <WrapContainer >
      <Box display={"flex"}>
        <OverviewIcon>
          <HashtagIcon />
        </OverviewIcon>
        <Box marginLeft={"10px"}>
          <OverviewTitle>
            {getShortHash(txns)}
          </OverviewTitle>
        </Box>
      </Box>
      <Box display={"flex"}>
        <OverviewIcon>
          <AIconGreen />
        </OverviewIcon>
        <Box marginLeft={"10px"}>
          <OverviewTitle>
            {formatADAFull(amount)}
          </OverviewTitle>
        </Box>
      </Box>
      <Box display={"flex"}>
        <OverviewIcon>
          <TimerIcon />
        </OverviewIcon>
        <Box marginLeft={"10px"}>
          <OverviewTitle>
            {moment(time).format("MM/DD/YYYY HH:mm:ss")}
          </OverviewTitle>
        </Box>
      </Box>
    </WrapContainer>
  );
};

export default OverviewStaking;
