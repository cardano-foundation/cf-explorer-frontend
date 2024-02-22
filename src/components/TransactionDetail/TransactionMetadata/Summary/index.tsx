import { Box, Grid, useTheme, useMediaQuery } from "@mui/material";
import React, { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  ArrowDownDarkIcon,
  ArrowDownIcon,
  ArrowUpDarkIcon,
  ArrowUpIcon,
  SummaryWalletDark,
  WalletRoundedIcon,
  DisableArrowUpLightIcon,
  DisableArrowDownLightIcon,
  DisableArrowUpDarkIcon,
  DisableArrowDownDarkIcon
} from "src/commons/resources";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { details } from "src/commons/routers";
import { formatADAFull, formatNumberDivByDecimals } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import DropdownTokens, { TokenLink } from "src/components/commons/DropdownTokens";

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
  const walletAddressRef = React.useRef<HTMLElement>(null);
  const iconRef = React.useRef<HTMLElement>(null);
  const [height, setHeight] = React.useState(0);
  const [heightImg, setHeightImg] = React.useState(0);
  const matches = useMediaQuery("(max-width: 1000px) and (min-width: 901px)");

  useLayoutEffect(() => {
    walletAddressRef.current && setHeight(walletAddressRef.current.clientHeight);
    iconRef.current && setHeightImg(iconRef.current.clientHeight);
  }, []);

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
          <Box ref={iconRef} display={"flex"} flexDirection={"column"} justifyContent={"center"} width={"100%"}>
            <TitleText>{t("common.wallet")}</TitleText>
            <Box ref={walletAddressRef} display={"flex"} justifyContent="flex-start" alignItems={"center"}>
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
                  <Box
                    color={(theme) => theme.palette.primary.main}
                    fontWeight="bold"
                    fontFamily={"var(--font-family-text)"}
                    fontSize="14px"
                  >
                    <DynamicEllipsisText value={item.address} isCopy isTooltip />
                  </Box>
                </Link>
              </Box>
            </Box>
          </Box>
        </GridItem>
      </Grid>
      <Grid
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={3}
        sx={{
          display: "flex",
          alignItems: "center",
          height: "fit-content"
        }}
      >
        <WrapItemsInfo
          paddingX={2}
          sx={{
            width: "-webkit-fill-available"
          }}
        >
          <Icon
            src={
              item.value > 0
                ? theme.isDark
                  ? ArrowUpDarkIcon
                  : ArrowUpIcon
                : item.value < 0
                ? theme.isDark
                  ? ArrowDownDarkIcon
                  : ArrowDownIcon
                : theme.isDark
                ? DisableArrowUpDarkIcon
                : DisableArrowUpLightIcon
            }
            height={heightImg}
            alt="send icon"
          />
          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
            <TitleText
              style={
                item.value === 0
                  ? {
                      color: theme.isDark ? theme.palette.secondary[800] : theme.palette.secondary[600],
                      paddingBottom: 0
                    }
                  : {}
              }
            >
              {type === "down" ? `${t("tab.adaSent")}` : `${t("tab.adaReceived")}`}
            </TitleText>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                height: item.value ? `${height}px` : "0px"
              }}
            >
              <ValueText>
                {item.value
                  ? type === "down"
                    ? `${formatADAFull(item.value).replace("-", "")}`
                    : `+${formatADAFull(item.value)}`
                  : ""}
                {item.value ? <Box component={ADAicon} ml={1} display={"inline"} /> : null}
              </ValueText>
            </Box>
          </Box>
        </WrapItemsInfo>
      </Grid>
      <Grid
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={3}
        sx={{
          display: "flex",
          alignItems: "center",
          height: "fit-content"
        }}
      >
        <WrapTokensInfo
          paddingX={2}
          sx={{
            width: "-webkit-fill-available"
          }}
        >
          <Box display={"flex"}>
            <Icon
              src={
                theme.isDark
                  ? tokensSent.length === 0
                    ? DisableArrowDownDarkIcon
                    : ArrowDownDarkIcon
                  : tokensSent.length === 0
                  ? DisableArrowDownLightIcon
                  : ArrowDownIcon
              }
              height={heightImg}
              alt="send icon"
            />
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
              <TitleText
                style={
                  tokensSent.length === 0
                    ? {
                        color: theme.isDark ? theme.palette.secondary[800] : theme.palette.secondary[600],
                        paddingBottom: 0
                      }
                    : {}
                }
              >
                {t("tab.tokensSent")}
              </TitleText>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  height: tokensSent.length > 0 ? `${height}px` : "0px"
                }}
              >
                <ValueText alignSelf={"flex-start"}>
                  {tokensSent.length === 0
                    ? ""
                    : tokensSent.length === 1
                    ? formatNumberDivByDecimals(
                        tokensSent[0]?.assetQuantity || 0,
                        tokensSent[0]?.metadata?.decimals || 0
                      ).replace("-", "")
                    : t("tab.multiple")}
                </ValueText>
              </Box>
            </Box>
          </Box>
          {tokensSent && tokensSent.length === 1 && (
            <Box display={"flex"} alignItems={"center"} mt={1}>
              <TokenLink
                token={tokensSent[0]}
                isSummary={true}
                truncateAddress={matches ? { firstPart: 8, lastPart: 6 } : undefined}
                isSuccess={!isFailed}
                sxBox={{
                  flexWrap: "nowrap",
                  minWidth: matches ? "160px" : "220px"
                }}
                sxTokenName={{ minWidth: matches ? "100px" : "165px" }}
                sx={{
                  minWidth: matches ? "160px" : "249px",
                  background: (theme) => theme.palette.primary[100]
                }}
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
      <Grid
        xs={12}
        sm={6}
        md={4}
        lg={3}
        xl={3}
        sx={{
          display: "flex",
          alignItems: "center",
          height: "fit-content"
        }}
      >
        <WrapTokensInfo
          paddingX={2}
          sx={{
            width: "-webkit-fill-available"
          }}
        >
          <Box display={"flex"}>
            <Icon
              src={
                theme.isDark
                  ? tokensReceived.length === 0
                    ? DisableArrowUpDarkIcon
                    : ArrowUpDarkIcon
                  : tokensReceived.length === 0
                  ? DisableArrowUpLightIcon
                  : ArrowUpIcon
              }
              height={heightImg}
              alt="send icon"
            />
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
              <TitleText
                style={
                  tokensReceived.length === 0
                    ? {
                        color: theme.isDark ? theme.palette.secondary[800] : theme.palette.secondary[600],
                        paddingBottom: 0
                      }
                    : {}
                }
              >
                {t("tab.tokensReceived")}
              </TitleText>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  height: tokensReceived.length > 0 ? `${height}px` : "0px"
                }}
              >
                <ValueText alignSelf={"flex-start"}>
                  {tokensReceived.length === 0
                    ? ""
                    : tokensReceived.length === 1
                    ? `+${formatNumberDivByDecimals(
                        tokensReceived[0]?.assetQuantity || 0,
                        tokensReceived[0]?.metadata?.decimals || 0
                      )}`
                    : t("tab.multiple")}
                </ValueText>
              </Box>
            </Box>
          </Box>
          {tokensReceived && tokensReceived.length === 1 && (
            <Box display={"flex"} alignItems={"center"} mt={1}>
              <TokenLink
                token={tokensReceived[0]}
                isSummary={true}
                isSuccess={!isFailed}
                truncateAddress={matches ? { firstPart: 8, lastPart: 6 } : undefined}
                sxBox={{
                  flexWrap: "nowrap",
                  minWidth: matches ? "160px" : "241px"
                }}
                sxTokenName={{ minWidth: matches ? "100px" : "165px" }}
                sx={{ minWidth: matches ? "160px" : "220px", background: (theme) => theme.palette.primary[100] }}
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
