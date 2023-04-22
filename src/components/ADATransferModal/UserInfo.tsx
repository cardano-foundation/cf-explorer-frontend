import CopyButton from "../commons/CopyButton";
import ADAicon from "../commons/ADAIcon";
import { OverviewIcon } from "../commons/OverviewStaking/styles";
import HashtagIcon from "../../commons/resources/icons/hashtag.svg";
import { Box } from "@mui/material";
import { TextTx, TextUserInfo } from "./styles";
import { BalanceIcon } from "../../commons/resources";

const UserInfo = () => {
  return (
    <Box display={"flex"} justifyContent={"space-between"} margin={"7px 0"}>
      <Box display={"flex"}>
        <Box display={"flex"} alignItems="center" marginRight={4}>
          <OverviewIcon>
            <img src={HashtagIcon} alt="HashtagIcon" />
          </OverviewIcon>
          &nbsp;<TextUserInfo>abcde...67890</TextUserInfo>
          <CopyButton />
        </Box>
        <Box display={"flex"} alignItems="center">
          <OverviewIcon>
            <BalanceIcon />
          </OverviewIcon>
          &nbsp;
          <TextUserInfo>
            Reward Balance: 10,000.0&nbsp;
            <ADAicon />
          </TextUserInfo>
        </Box>
      </Box>
      <TextTx>100 Transactions</TextTx>
    </Box>
  );
};

export default UserInfo;
