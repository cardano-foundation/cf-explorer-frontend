import { Box, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useScreen } from "src/commons/hooks/useScreen";
import receiveImg from "src/commons/resources/images/receiveImg.svg";
import receiveImgFail from "src/commons/resources/images/receiveImgFail.svg";
import sendImg from "src/commons/resources/images/sendImg.svg";
import sendImgFail from "src/commons/resources/images/sendImgFail.svg";
import { details } from "src/commons/routers";
import { formatADAFull } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CopyButton from "src/components/commons/CopyButton";
import DropdownTokens, { TokenLink } from "src/components/commons/DropdownTokens";
import { DownRedUtxoDarkmode, UpGreenUtxoDarkmode } from "src/commons/resources";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

import {
  AmountHeader,
  AmountMobile,
  EllipsisContainer,
  Header,
  Img,
  Item,
  ItemContent,
  ItemFooter,
  WrapIcon,
  WrapInfo,
  WrapLeftSide,
  WrapRightSide,
  WrapTokenDropdown,
  WrapTokenLink,
  WrapUTXOs
} from "./styles";

interface Props {
  data: Transaction["utxOs"] | null;
  fee: number;
  isFailed?: boolean;
}

const UTXO: React.FC<Props> = ({ data, fee, isFailed }) => {
  return (
    <div>
      <Card type="down" items={data?.inputs} isFailed={isFailed} />
      <Card type="up" items={data?.outputs} fee={fee} isFailed={isFailed} />
    </div>
  );
};

export default UTXO;

const Card = ({
  type,
  items,
  isFailed
}: {
  type: "up" | "down";
  items?: Required<Transaction>["utxOs"]["inputs"];
  fee?: number;
  isFailed?: boolean;
}) => {
  const { t } = useTranslation();
  const totalADA =
    items &&
    items.reduce((prv, item) => {
      return prv + +item.value;
    }, 0);

  const { isMobile, width } = useScreen();
  const theme = useTheme();
  const ADAIconAmount = () => (
    <ADAicon sx={{ color: isFailed ? theme.palette.secondary[600] : theme.palette.secondary.main }} />
  );
  const renderIcon = (type: "up" | "down") => {
    const srcImg = isFailed
      ? type === "down"
        ? theme.isDark
          ? DownRedUtxoDarkmode
          : receiveImgFail
        : theme.isDark
        ? UpGreenUtxoDarkmode
        : sendImgFail
      : type === "down"
      ? theme.isDark
        ? DownRedUtxoDarkmode
        : receiveImg
      : theme.isDark
      ? UpGreenUtxoDarkmode
      : sendImg;
    return <Img src={srcImg} alt="send icon" />;
  };
  return (
    <Box
      textAlign={"left"}
      mb={1}
      border={(theme) => `1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`}
      borderRadius={4}
      sx={{ background: (theme) => theme.palette.secondary[0] }}
      overflow={"hidden"}
    >
      <Header fontWeight="bold">
        <Box
          data-testid="transactionMetadata.utxos.input"
          color={(theme) => theme.palette.secondary.main}
          fontSize={"1rem"}
          lineHeight="19px"
          mb="2px"
        >
          {type === "down" ? t("glossary.input") : t("glossary.output")}
        </Box>
        <Box color={(theme) => theme.palette.secondary.light} display="flex" justifyContent="space-between">
          <Box data-testid="transactionMetadata.utxos.address">{t("glossary.address")}</Box>
          <AmountHeader data-testid="transactionMetadata.utxos.amount">{t("glossary.amount")}</AmountHeader>
        </Box>
      </Header>
      <Box fontSize={14}>
        {items?.map((item, index) => (
          <Item key={index}>
            <ItemContent
              sx={{
                overflow: "unset!important"
              }}
            >
              <WrapIcon type={type}>{renderIcon(type)}</WrapIcon>
              <WrapInfo
                sx={
                  width < 400
                    ? {
                        width: "calc(100% - 38px)"
                      }
                    : {}
                }
              >
                <WrapLeftSide>
                  {type === "down" ? (
                    <WrapUTXOs>
                      <Box mr={3} minWidth={200} width={"100%"}>
                        <Box display={"flex"} justifyContent="flex-start" alignItems={"center"}>
                          <Box
                            data-testid="transactionMetadata.utxos.utxoTitle"
                            color={(theme) => (isFailed ? theme.palette.secondary[600] : theme.palette.secondary.light)}
                            pr={1}
                          >
                            {t("tab.utxo")}:
                          </Box>
                          <Link
                            data-testid="transactionMetadata.utxos.utxoValue"
                            to={details.transaction(item.txHash)}
                            style={{ width: "100%" }}
                          >
                            <EllipsisContainer
                              isFailed={isFailed}
                              sx={{ transform: "translateY(-3px)" }}
                              hasToken={item?.tokens?.length >= 1}
                            >
                              <DynamicEllipsisText
                                value={item.txHash}
                                isTooltip
                                afterElm={
                                  <Box display={"flex"} alignItems={"center"}>
                                    <Box
                                      fontWeight={"bold"}
                                      color={({ palette }) =>
                                        isFailed ? theme.palette.secondary[600] : palette.secondary.main
                                      }
                                      sx={{ transform: "translateY(2px)" }}
                                    >
                                      #{item?.index}
                                    </Box>
                                    <CopyButton text={item.txHash} />
                                  </Box>
                                }
                                customTruncateFold={[5, 6]}
                              />
                            </EllipsisContainer>
                          </Link>
                        </Box>
                      </Box>
                    </WrapUTXOs>
                  ) : (
                    <Box />
                  )}
                  <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
                    <Box
                      data-testid="transactionMetadata.utxos.fromTitle"
                      display={"flex"}
                      alignItems="center"
                      justifyContent={"flex-start"}
                      pr={1}
                      color={(theme) => (isFailed ? theme.palette.secondary[600] : theme.palette.secondary.light)}
                    >
                      {type === "down" ? t("glossary.from") : t("glossary.to")}:
                    </Box>
                    <Box display={"flex"} justifyContent="space-between" flex={"1"} alignItems={"center"}>
                      <Box
                        display={"flex"}
                        justifyContent="flex-start"
                        alignItems={"center"}
                        flexWrap="nowrap"
                        width={"100%"}
                      >
                        <Link
                          data-testid="transactionMetadata.utxos.fromValue"
                          to={details.address(item.address)}
                          style={{ width: "100%" }}
                        >
                          <EllipsisContainer isFailed={isFailed} hasToken={item?.tokens?.length >= 1}>
                            <DynamicEllipsisText value={item.address} isCopy isTooltip customTruncateFold={[6, 8]} />
                          </EllipsisContainer>
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                  {item?.stakeAddress && (
                    <Box
                      justifyContent={"space-between"}
                      width={"100%"}
                      display="flex"
                      flexDirection={isMobile ? "column" : "row"}
                      paddingTop="5px"
                    >
                      <Box mr={3} minWidth={180} width={"100%"}>
                        <Box
                          display={"flex"}
                          flexDirection={isMobile ? "column" : "row"}
                          justifyContent="flex-start"
                          alignItems={isMobile ? "flex-start" : "center"}
                          flex={1}
                        >
                          <Box
                            data-testid="transactionMetadata.utxos.stakeAddressTitle"
                            pr={1}
                            color={({ palette }) => (isFailed ? theme.palette.secondary[600] : palette.secondary.light)}
                            sx={{ minWidth: "100px" }}
                          >
                            {t("common.stakeAddress")}:&nbsp;
                          </Box>
                          <Box style={{ width: "100%" }}>
                            <Link
                              data-testid="transactionMetadata.utxos.stakeAddressValue"
                              to={details.stake(item?.stakeAddress)}
                              style={{ width: "100%" }}
                            >
                              <EllipsisContainer isFailed={isFailed} hasToken={item?.tokens?.length >= 1}>
                                <DynamicEllipsisText
                                  value={item.stakeAddress}
                                  isCopy
                                  isTooltip
                                  customTruncateFold={[7, 8]}
                                />
                              </EllipsisContainer>
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </WrapLeftSide>
                <WrapRightSide>
                  <Box
                    display={"flex"}
                    justifyContent="flex-start"
                    alignItems={"center"}
                    flexWrap="nowrap"
                    width={"auto"}
                  >
                    <AmountMobile data-testid="transactionMetadata.utxos.amountTitle">
                      {t("glossary.amount")}
                    </AmountMobile>
                    <Box
                      data-testid="transactionMetadata.utxos.amountValue"
                      component={"span"}
                      whiteSpace="nowrap"
                      color={(theme) =>
                        isFailed
                          ? theme.palette.secondary[600]
                          : type === "up"
                          ? theme.isDark
                            ? theme.palette.success[700]
                            : theme.palette.success[800]
                          : theme.palette.error[700]
                      }
                      fontWeight="bold"
                      mr={1}
                    >
                      {type === "down" ? `-${formatADAFull(item.value)}` : `+${formatADAFull(item.value)}`}
                    </Box>
                    <ADAIconAmount />
                  </Box>
                  <WrapTokenLink>
                    {item.tokens && item.tokens.length === 1 && (
                      <WrapTokenDropdown>
                        <TokenLink isSuccess={!isFailed} token={item.tokens[0]} sx={{ minWidth: "calc(100% - 2px)" }} />
                      </WrapTokenDropdown>
                    )}
                    {item.tokens && item.tokens.length > 1 && (
                      <WrapTokenDropdown>
                        <DropdownTokens
                          isSuccess={!isFailed}
                          tokens={item.tokens}
                          type={type}
                          hideInputLabel
                          hideMathChar
                          sx={{ width: "100%" }}
                        />
                      </WrapTokenDropdown>
                    )}
                  </WrapTokenLink>
                </WrapRightSide>
              </WrapInfo>
            </ItemContent>
          </Item>
        ))}
      </Box>
      <ItemFooter>
        <Box
          data-testid="transactionMetadata.utxos.totalTitle"
          fontWeight={"bold"}
          color={({ palette }) => (isFailed ? theme.palette.secondary[600] : palette.secondary.main)}
          sx={{ textWrap: "nowrap", marginRight: 1 }}
        >
          {t("common.total")} {type === "down" ? t("drawer.input") : t("drawer.ouput")}
        </Box>
        <div>
          <Box
            data-testid="transactionMetadata.utxos.amountValue"
            fontWeight={"bold"}
            component="span"
            pr={1}
            sx={{
              color: (theme) => (isFailed ? theme.palette.secondary[600] : theme.palette.secondary.main),
              wordBreak: "break-word"
            }}
          >
            {isFailed || !totalADA
              ? 0
              : type === "down"
              ? `-${formatADAFull(totalADA)}`
              : `+${formatADAFull(totalADA)}`}
          </Box>
          <ADAIconAmount />
        </div>
      </ItemFooter>
    </Box>
  );
};
