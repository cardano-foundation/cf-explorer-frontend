import { Box, Grid, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  ArrowDownDarkIcon,
  ArrowDownIcon,
  ArrowUpDarkIcon,
  ArrowUpIcon,
  SummaryWalletDark,
  WalletRoundedIcon
} from "src/commons/resources";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

import { details } from "../../../../commons/routers";
import { formatADAFull, formatNumberDivByDecimals } from "../../../../commons/utils/helper";
import ADAicon from "../../../commons/ADAIcon";
import CustomTooltip from "../../../commons/CustomTooltip";
import DropdownTokens, { TokenLink } from "../../../commons/DropdownTokens";
import { GridItem, Icon, TitleText, ValueText, WrapContainerGrid, WrapItemsInfo, WrapTokensInfo } from "./styles";

const SummaryItems = ({
  item,
  type,
  isFailed
}: {
  item: Transaction["summary"]["stakeAddress"][number];
  type?: "up" | "down";
  isFailed?: boolean;
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const tokensSent = item.tokens?.filter((token) => token.assetQuantity <= 0);
  const tokensReceived = item.tokens?.filter((token) => token.assetQuantity > 0);

  return (
    <WrapContainerGrid
      rowGap={2}
      container
      sx={{
        background: (theme) => theme.palette.secondary[0],
        px: 3,
        py: 2,
        mb: 1,
        [theme.breakpoints.down("sm")]: {
          px: 2
        }
      }}
    >
      <Grid xs={12} sm={6} md={4} lg={3} xl={3}>
        <GridItem>
          <Icon src={theme.isDark ? SummaryWalletDark : WalletRoundedIcon} alt="wallet icon" />
          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} width={"100%"}>
            <TitleText>{t("common.wallet")}</TitleText>
            <Box display={"flex"} justifyContent="flex-start" alignItems={"center"}>
              <Box
                display={"flex"}
                justifyContent="flex-start"
                alignItems={"center"}
                flexWrap={"nowrap"}
                width={"100%"}
              >
                <Link
                  to={item.address.startsWith("stake") ? details.stake(item.address) : details.address(item.address)}
                  style={{ width: "100%" }}
                >
                  <CustomTooltip title={item.address}>
                    <Box
                      color={(theme) => theme.palette.primary.main}
                      fontWeight="bold"
                      fontFamily={"var(--font-family-text)"}
                    >
                      <DynamicEllipsisText value={item.address} isCopy />
                    </Box>
                  </CustomTooltip>
                </Link>
              </Box>
            </Box>
          </Box>
        </GridItem>
      </Grid>
      <Grid xs={12} sm={6} md={4} lg={3} xl={3}>
        <WrapItemsInfo paddingX={2}>
          <Icon
            src={
              type === "up"
                ? theme.isDark
                  ? ArrowUpDarkIcon
                  : ArrowUpIcon
                : theme.isDark
                ? ArrowDownDarkIcon
                : ArrowDownIcon
            }
            alt="send icon"
          />
          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
            <TitleText>{type === "down" ? `${t("tab.adaSent")}` : `${t("tab.adaReceived")}`}</TitleText>
            <Box display="flex" alignItems="center">
              <ValueText mr={1}>
                {item.value
                  ? type === "down"
                    ? `${formatADAFull(item.value).replace("-", "")}`
                    : `+${formatADAFull(item.value)}`
                  : t("common.na")}
              </ValueText>
              {item.value ? <ADAicon /> : null}
            </Box>
          </Box>
        </WrapItemsInfo>
      </Grid>
      <Grid xs={12} sm={6} md={4} lg={3} xl={3}>
        <WrapTokensInfo paddingX={2}>
          <Box display={"flex"}>
            <Icon src={theme.isDark ? ArrowDownDarkIcon : ArrowDownIcon} alt="send icon" />
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
              <TitleText>{t("tab.tokensSent")}</TitleText>
              <ValueText alignSelf={"flex-start"}>
                {tokensSent.length === 0
                  ? t("common.na")
                  : tokensSent.length === 1
                  ? formatNumberDivByDecimals(
                      tokensSent[0]?.assetQuantity || 0,
                      tokensSent[0]?.metadata?.decimals || 0
                    ).replace("-", "")
                  : t("tab.multiple")}
              </ValueText>
            </Box>
          </Box>
          {tokensSent && tokensSent.length === 1 && (
            <Box display={"flex"} alignItems={"center"} mt={1}>
              <TokenLink
                token={tokensSent[0]}
                isSummary={true}
                isSuccess={!isFailed}
                sx={{ minWidth: "100%", background: (theme) => theme.palette.primary[100] }}
                hideValue
              />
            </Box>
          )}
          {tokensSent && tokensSent.length > 1 && (
            <Box display={"flex"} alignItems={"center"} mt={1}>
              <DropdownTokens
                isSummary={true}
                tokens={tokensSent}
                type={type}
                hideInputLabel
                isSuccess={!isFailed}
                sx={{ minWidth: "100%", background: (theme) => theme.palette.primary[100] }}
              />
            </Box>
          )}
        </WrapTokensInfo>
      </Grid>
      <Grid xs={12} sm={6} md={4} lg={3} xl={3}>
        <WrapTokensInfo paddingX={2}>
          <Box display={"flex"}>
            <Icon src={theme.isDark ? ArrowUpDarkIcon : ArrowUpIcon} alt="send icon" />
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
              <TitleText>{t("tab.tokensReceived")}</TitleText>
              <ValueText alignSelf={"flex-start"}>
                {tokensReceived.length === 0
                  ? t("common.na")
                  : tokensReceived.length === 1
                  ? `+${formatNumberDivByDecimals(
                      tokensReceived[0]?.assetQuantity || 0,
                      tokensReceived[0]?.metadata?.decimals || 0
                    )}`
                  : t("tab.multiple")}
              </ValueText>
            </Box>
          </Box>
          {tokensReceived && tokensReceived.length === 1 && (
            <Box display={"flex"} alignItems={"center"} mt={1}>
              <TokenLink
                token={tokensReceived[0]}
                isSummary={true}
                isSuccess={!isFailed}
                sx={{ minWidth: "100%", background: (theme) => theme.palette.primary[100] }}
                hideValue
              />
            </Box>
          )}
          {tokensReceived && tokensReceived.length > 1 && (
            <Box display={"flex"} alignItems={"center"} mt={1}>
              <DropdownTokens
                tokens={tokensReceived}
                type={type}
                isSummary={true}
                hideInputLabel
                isSuccess={!isFailed}
                sx={{
                  minWidth: "100%",
                  background: (theme) => theme.palette.primary[100],
                  color: theme.palette.secondary.main
                }}
              />
            </Box>
          )}
        </WrapTokensInfo>
      </Grid>
    </WrapContainerGrid>
  );
};

interface SummaryProps {
  data: Transaction["summary"] | null;
  isFailed?: boolean;
}
const Summary: React.FC<SummaryProps> = ({ data, isFailed }) => {
  return (
    <Box>
      {data?.stakeAddress?.map((tx, key) => {
        const type = tx.value >= 0 ? "up" : "down";
        return <SummaryItems key={key} item={tx} type={type} isFailed={isFailed} />;
      })}
    </Box>
  );
};

export default Summary;
