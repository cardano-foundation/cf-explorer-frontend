import CopyButton from "../../../commons/CopyButton";
import { Box } from "@mui/material";
import { OverviewIcon, TextTx, TextUserInfo } from "./styles";
import { AIconGreen, BalanceIcon, HashtagIcon } from "../../../../commons/resources";
import CustomIcon from "../../../commons/CustomIcon";

const UserInfo = ({ total }: { total: number }) => {
  return (
    <Box display={"flex"} justifyContent={"space-between"} margin={"7px 0"}>
      <Box display={"flex"}>
        <Box display={"flex"} alignItems="center" marginRight={4}>
          <OverviewIcon>
            <CustomIcon icon={HashtagIcon} width={17} color={theme => theme.palette.primary.main} fill="currentColor" />
          </OverviewIcon>
          &nbsp;<TextUserInfo>abcde...67890</TextUserInfo>
          <CopyButton />
        </Box>
        <Box display={"flex"} alignItems="center">
          <OverviewIcon>
            <BalanceIcon />
          </OverviewIcon>
          <TextUserInfo>Reward Balance: 10,000.0</TextUserInfo>
          <CustomIcon icon={AIconGreen} fill="currentColor" height={14} />
        </Box>
      </Box>
      <TextTx>{total} Transactions</TextTx>
    </Box>
  );
};

export default UserInfo;
