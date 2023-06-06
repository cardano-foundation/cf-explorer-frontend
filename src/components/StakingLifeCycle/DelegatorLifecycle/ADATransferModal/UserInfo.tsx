import { Box } from "@mui/material";

import { useScreen } from "src/commons/hooks/useScreen";
import { details } from "src/commons/routers";
import { StyledLink } from "src/components/share/styled";
import { AIconGreen, BalanceIcon, HashtagIcon } from "src/commons/resources";
import { formatADAFull, getShortWallet } from "src/commons/utils/helper";
import CopyButton from "src/components/commons/CopyButton";
import CustomIcon from "src/components/commons/CustomIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";

import { OverviewIcon, TextTx, TextUserInfo } from "./styles";

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
  const { isTablet } = useScreen();
  
  return (
    <Box display={"flex"} justifyContent={"space-between"} margin={"7px 0"} flexDirection={isTablet ? "column" : "row"}>
      <Box display={"flex"} flexDirection={isTablet ? "column" : "row"}>
        <Box display={"flex"} alignItems="center" marginRight={4}>
          <OverviewIcon>
            <CustomIcon
              icon={HashtagIcon}
              width={17}
              color={(theme) => theme.palette.primary.main}
              fill="currentColor"
            />
          </OverviewIcon>
          &nbsp;
          <CustomTooltip title={stake}>
            <StyledLink to={details.stake(stake)}>
              <TextUserInfo>{getShortWallet(stake || "")}</TextUserInfo>
            </StyledLink>
          </CustomTooltip>
          <CopyButton text={stake || ""} />
        </Box>
        <Box display={"flex"} alignItems="center" mt={isTablet ? "5px" : "0px"}>
          <OverviewIcon marginRight={1}>
            <BalanceIcon />
          </OverviewIcon>
          <TextUserInfo>
            {" "}
            {acitve === "reward" ? "Reward" : "Wallet"} Balance: {formatADAFull(reward)}
          </TextUserInfo>
          <CustomIcon icon={AIconGreen} fill="currentColor" height={14} />
        </Box>
      </Box>
      <TextTx sx={{ marginTop: isTablet ? "10px" : "0px" }}>{total} Transactions</TextTx>
    </Box>
  );
};

export default UserInfo;
