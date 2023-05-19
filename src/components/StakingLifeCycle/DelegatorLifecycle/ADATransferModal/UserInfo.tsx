import { Box } from "@mui/material";
import { useScreen } from "~/commons/hooks/useScreen";
import { details } from "~/commons/routers";
import { StyledLink } from "~/components/share/styled";
import { AIconGreen, BalanceIcon, HashtagIcon } from "../../../../commons/resources";
import { formatADAFull, getShortWallet } from "../../../../commons/utils/helper";
import CopyButton from "../../../commons/CopyButton";
import CustomIcon from "../../../commons/CustomIcon";
import CustomTooltip from "../../../commons/CustomTooltip";
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
  const { isMobile } = useScreen();
  return (
    <Box display={"flex"} justifyContent={"space-between"} margin={"7px 0"} flexDirection={isMobile ? "column" : "row"}>
      <Box display={"flex"} flexDirection={isMobile ? "column" : "row"}>
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
            <StyledLink to={details.stake(stake)}>
              <TextUserInfo>{getShortWallet(stake || "")}</TextUserInfo>
            </StyledLink>
          </CustomTooltip>
          <CopyButton text={stake || ""} />
        </Box>
        <Box display={"flex"} alignItems='center' mt={isMobile ? "5px" : "0px"}>
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
      <TextTx sx={{ marginTop: isMobile ? "10px" : "0px" }}>{total} Transactions</TextTx>
    </Box>
  );
};

export default UserInfo;
