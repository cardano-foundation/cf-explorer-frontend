import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useScreen } from "src/commons/hooks/useScreen";
import { BalanceIcon, HashtagIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { formatADAFull, getShortHash } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CopyButton from "src/components/commons/CopyButton";
import CustomIcon from "src/components/commons/CustomIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { StyledLink } from "src/components/share/styled";

import { OverviewIcon, TextTx, TextUserInfo } from "./styles";

const UserInfo = ({
  total,
  stake,
  reward,
  acitve
}: {
  total: number;
  stake: string;
  reward?: number;
  acitve: "wallet" | "reward";
}) => {
  const { t } = useTranslation();
  const { isTablet } = useScreen();
  const theme = useTheme();

  return (
    <Box display={"flex"} justifyContent={"space-between"} margin={"7px 0"} flexDirection={isTablet ? "column" : "row"}>
      <Box display={"flex"} flexDirection={isTablet ? "column" : "row"}>
        <Box display={"flex"} alignItems="center" marginRight={4}>
          <OverviewIcon>
            <CustomIcon
              icon={HashtagIcon}
              width={17}
              fill={theme.isDark ? theme.palette.primary.main : theme.palette.secondary.light}
            />
          </OverviewIcon>
          &nbsp;
          <CustomTooltip title={stake}>
            <StyledLink to={details.stake(stake)}>
              <TextUserInfo>{getShortHash(stake || "")}</TextUserInfo>
            </StyledLink>
          </CustomTooltip>
          <CopyButton text={stake || ""} />
        </Box>
        <Box display={"flex"} alignItems="center" mt={isTablet ? "5px" : "0px"}>
          <OverviewIcon marginRight={1}>
            <CustomIcon
              icon={BalanceIcon}
              width={17}
              stroke={theme.isDark ? theme.palette.primary.main : theme.palette.secondary.light}
            />
          </OverviewIcon>
          <TextUserInfo>
            <Box component={"span"} mr={1}>
              {acitve === "reward" ? t("glossary.rewardBalance") : t("common.totalBalnceReward")} :
            </Box>
            <Box component={"span"} display={"inline-flex"} alignItems={"center"}>
              {reward != undefined ? (
                <Box lineHeight={1}>
                  {formatADAFull(reward)}&nbsp;
                  <ADAicon width={11} />
                </Box>
              ) : (
                t("common.notAvailable")
              )}
            </Box>
          </TextUserInfo>
        </Box>
      </Box>
      <TextTx sx={{ marginTop: isTablet ? "10px" : "0px" }}>
        {total} {t("glossary.transactions")}
      </TextTx>
    </Box>
  );
};

export default UserInfo;
