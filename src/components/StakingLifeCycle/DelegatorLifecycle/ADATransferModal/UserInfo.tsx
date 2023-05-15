import CopyButton from "../../../commons/CopyButton";
import { Box } from "@mui/material";
import { OverviewIcon, TextTx, TextUserInfo } from "./styles";
import { AIconGreen, BalanceIcon, HashtagIcon } from "../../../../commons/resources";
import CustomIcon from "../../../commons/CustomIcon";
import { formatADA, formatADAFull, getShortWallet } from "../../../../commons/utils/helper";
import CustomTooltip from "../../../commons/CustomTooltip";

const UserInfo = ({
  total,
  stake,
  reward,
  acitve
}: {
  total: number;
  stake: string;
  reward: number;
  acitve: "wallet" | "reward";
}) => {
  return (
    <Box display={"flex"} justifyContent={"space-between"} margin={"7px 0"}>
      <Box display={"flex"}>
        <Box display={"flex"} alignItems='center' marginRight={4}>
          <OverviewIcon>
            <CustomIcon
              icon={HashtagIcon}
              width={17}
              color={(theme) => theme.palette.primary.main}
              fill='currentColor'
            />
          </OverviewIcon>
          &nbsp;
          <CustomTooltip title={stake}>
            <TextUserInfo>{getShortWallet(stake || "")}</TextUserInfo>
          </CustomTooltip>
          <CopyButton text={stake || ""} />
        </Box>
        <Box display={"flex"} alignItems='center'>
          <OverviewIcon marginRight={1}>
            <BalanceIcon />
          </OverviewIcon>
          <TextUserInfo>
            {" "}
            {acitve === "reward" ? "Reward" : "Wallet"} Balance: {formatADAFull(reward)}
          </TextUserInfo>
          <CustomIcon icon={AIconGreen} fill='currentColor' height={14} />
        </Box>
      </Box>
      <TextTx>{total} Transactions</TextTx>
    </Box>
  );
};

export default UserInfo;
