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
import CustomTooltip from "src/components/commons/CustomTooltip";
import DropdownTokens, { TokenLink } from "src/components/commons/DropdownTokens";
import { DownRedUtxoDarkmode, UpGreenUtxoDarkmode } from "src/commons/resources";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

import { EllipsisContainer, Header, Img, Item, ItemContent, ItemFooter, WrapInfo, WrapUTXOs } from "./styles";

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
      return prv + item.value;
    }, 0);

  const { isMobile } = useScreen();
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
        <Box color={(theme) => theme.palette.secondary.main} fontSize={"1rem"} lineHeight="19px" mb="2px">
          {type === "down" ? t("glossary.input") : t("glossary.output")}
        </Box>
        <Box color={(theme) => theme.palette.secondary.light} display="flex" justifyContent="space-between">
          <Box>{t("glossary.address")}</Box>
          <Box>{t("glossary.amount")}</Box>
        </Box>
      </Header>
      <Box fontSize={14}>
        {items?.map((item, index) => (
          <Item key={index}>
            <ItemContent>
              <Box display="flex" alignItems="center">
                <Box width={50}>{renderIcon(type)}</Box>
              </Box>
              <WrapInfo>
                {/* container left */}
                <Box display="flex" flexDirection="column" justifyContent="center" paddingTop="5px" flexGrow={1}>
                  {type === "down" ? (
                    <WrapUTXOs>
                      <Box mr={3} minWidth={200}>
                        <Box display={"flex"} justifyContent="flex-start" alignItems={"center"}>
                          <Box
                            color={(theme) => (isFailed ? theme.palette.secondary[600] : theme.palette.secondary.light)}
                            pr={1}
                          >
                            {t("tab.utxo")}:
                          </Box>
                          <Link to={details.transaction(item.txHash)} style={{ width: "100%" }}>
                            <CustomTooltip title={item.txHash}>
                              <EllipsisContainer isFailed={isFailed}>
                                <DynamicEllipsisText
                                  value={item.txHash}
                                  afterElm={
                                    <Box display={"flex"} alignItems={"center"}>
                                      <Box
                                        fontWeight={"bold"}
                                        color={({ palette }) =>
                                          isFailed ? theme.palette.secondary[600] : palette.secondary.main
                                        }
                                      >
                                        #{item?.index}
                                      </Box>
                                      <CopyButton text={item.txHash} />
                                    </Box>
                                  }
                                />
                              </EllipsisContainer>
                            </CustomTooltip>
                          </Link>
                        </Box>
                      </Box>
                    </WrapUTXOs>
                  ) : (
                    <Box />
                  )}
                  <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
                    <Box
                      display={"flex"}
                      alignItems="center"
                      justifyContent={"flex-start"}
                      pr={1}
                      pl={type === "down" ? 2 : 0}
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
                        width={"auto"}
                      >
                        <Link to={details.address(item.address)}>
                          <CustomTooltip title={item.address}>
                            <EllipsisContainer isFailed={isFailed}>
                              <DynamicEllipsisText value={item.address} isCoppy={true} />
                            </EllipsisContainer>
                          </CustomTooltip>
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
                      <Box mr={3} minWidth={180}>
                        <Box
                          display={"flex"}
                          flexDirection={isMobile ? "column" : "row"}
                          justifyContent="flex-start"
                          alignItems={isMobile ? "flex-start" : "center"}
                        >
                          <Box
                            pr={1}
                            color={({ palette }) => (isFailed ? theme.palette.secondary[600] : palette.secondary.light)}
                          >
                            {t("common.stakeAddress")}:{" "}
                          </Box>
                          <Box>
                            <Link to={details.stake(item?.stakeAddress)}>
                              <CustomTooltip title={item?.stakeAddress}>
                                <EllipsisContainer isFailed={isFailed}>
                                  <DynamicEllipsisText value={item.stakeAddress} isCoppy={true} />
                                </EllipsisContainer>
                              </CustomTooltip>
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
                {/* container right */}
                <Box display={"flex"} alignItems={"end"} flexDirection={"column"}>
                  <Box
                    display={"flex"}
                    justifyContent="flex-start"
                    alignItems={"center"}
                    flexWrap="nowrap"
                    width={"auto"}
                  >
                    <Box
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
                  <Box display={"flex"} alignItems={"center"}>
                    {item.tokens && item.tokens.length === 1 && (
                      <Box mt={2}>
                        <TokenLink isSuccess={!isFailed} token={item.tokens[0]} />
                      </Box>
                    )}
                    {item.tokens && item.tokens.length > 1 && (
                      <Box mt={2}>
                        <DropdownTokens
                          isSuccess={!isFailed}
                          tokens={item.tokens}
                          type={type}
                          hideInputLabel
                          hideMathChar
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </WrapInfo>
            </ItemContent>
          </Item>
        ))}
      </Box>
      <ItemFooter>
        <Box
          fontWeight={"bold"}
          color={({ palette }) => (isFailed ? theme.palette.secondary[600] : palette.secondary.main)}
          sx={{ textWrap: "nowrap", marginRight: 1 }}
        >
          {t("common.total")} {type === "down" ? t("drawer.input") : t("drawer.ouput")}
        </Box>
        <div>
          <Box
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
