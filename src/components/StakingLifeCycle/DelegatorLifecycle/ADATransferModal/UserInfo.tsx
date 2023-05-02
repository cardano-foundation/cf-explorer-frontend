import CopyButton from "../../../commons/CopyButton";
import { Box } from "@mui/material";
import { OverviewIcon, TextTx, TextUserInfo } from "./styles";
import { AIconGreen, BalanceIcon, HashtagIcon } from "../../../../commons/resources";
import CustomIcon from "../../../commons/CustomIcon";
import { formatADA, getShortWallet } from "../../../../commons/utils/helper";

const UserInfo = ({ total, stake, reward }: { total: number; stake: string; reward: number }) => {
  return (
    <Box display={"flex"} justifyContent={"space-between"} margin={"7px 0"}>
      <Box display={"flex"}>
        <Box display={"flex"} alignItems="center" marginRight={4}>
          <OverviewIcon>
            <CustomIcon icon={HashtagIcon} width={17} color={theme => theme.palette.primary.main} fill="currentColor" />
          </OverviewIcon>
          &nbsp;<TextUserInfo>{getShortWallet(stake || "")}</TextUserInfo>
          <CopyButton />
        </Box>
        <Box display={"flex"} alignItems="center">
          <OverviewIcon marginRight={1}>
            <BalanceIcon />
          </OverviewIcon>
          <TextUserInfo> Reward Balance: {formatADA(reward)}</TextUserInfo>
          <CustomIcon icon={AIconGreen} fill="currentColor" height={14} />
        </Box>
      </Box>
      <TextTx>{total} Transactions</TextTx>
    </Box>
  );
};

export default UserInfo;
