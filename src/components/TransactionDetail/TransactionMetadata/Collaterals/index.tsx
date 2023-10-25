import { Box, useTheme } from "@mui/material";
import { SxProps } from "@mui/system";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { DownRedUtxoDarkmode, UpGreenUtxoDarkmode } from "src/commons/resources";
import receiveImg from "src/commons/resources/images/receiveImg.svg";
import sendImg from "src/commons/resources/images/sendImg.svg";
import { details } from "src/commons/routers";
import { formatADAFull } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { FlexCenter } from "src/components/share/styled";

import {
  BoxHeaderBottom,
  BoxHeaderTop,
  Header,
  Img,
  Item,
  ItemBox,
  ItemContent,
  ItemFooter,
  TitleAmountMobile,
  WrapAmountHeader,
  StyleAmount,
  WrapContent,
  WrapUTXOs,
  Wrapper,
  StyledContainerInfo,
  EllipsisContainer
} from "./style";

interface CollateralProps {
  data: Transaction["collaterals"] | null;
}

const Collaterals: React.FC<CollateralProps> = ({ data }) => {
  const { t } = useTranslation();
  const totalADAInput = (data?.collateralInputResponses || []).reduce((prv, item) => {
    return prv + item.value;
  }, 0);
  const totalADAOutput = (data?.collateralOutputResponses || []).reduce((prv, item) => {
    return prv + item.value;
  }, 0);
  const totalADA = totalADAInput - totalADAOutput;
  const isShowCardInput = data?.collateralInputResponses && data?.collateralInputResponses.length > 0;
  const isShowCardOutput = data?.collateralOutputResponses && data?.collateralOutputResponses.length > 0;
  return (
    <Box>
      {isShowCardInput && <Card type="input" items={data?.collateralInputResponses} />}
      {isShowCardOutput && <Card type="output" items={data?.collateralOutputResponses} sx={{ mt: 1 }} />}
      {isShowCardOutput && (
        <ItemFooter>
          <Box color={({ palette }) => palette.secondary.main} fontWeight={"bold"}>
            {t("glassary.totalCollateralSpent")}
          </Box>
          <Box color={({ palette }) => palette.secondary.main} fontWeight={"bold"} component="span" pr={1}>
            {`+${formatADAFull(totalADA)}`} <ADAicon />
          </Box>
        </ItemFooter>
      )}
    </Box>
  );
};

const Card = ({ type, items, sx }: { type: "input" | "output"; items?: CollateralResponses[]; sx?: SxProps }) => {
  const { t } = useTranslation();
  return (
    <Wrapper sx={sx} type={type}>
      <Header fontWeight="bold">
        <BoxHeaderTop>{type === "input" ? t("drawer.input") : t("drawer.ouput")}</BoxHeaderTop>
        <BoxHeaderBottom>
          <Box>{t("glossary.address")}</Box>
          <WrapAmountHeader>{t("glossary.amount")}</WrapAmountHeader>
        </BoxHeaderBottom>
      </Header>
      <ItemBox>
        <ItemCollateral data={items || []} type={type} />
      </ItemBox>
    </Wrapper>
  );
};

export default Collaterals;

const ItemCollateral = ({ data, type }: { data: CollateralResponses[]; type: "input" | "output" }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Box>
      {data?.map((item) => (
        <Item key={item.address} fontSize={14}>
          <ItemContent>
            <Box display="flex" alignItems="center">
              <Box>
                <Img
                  src={
                    type === "input"
                      ? theme.isDark
                        ? DownRedUtxoDarkmode
                        : receiveImg
                      : theme.isDark
                      ? UpGreenUtxoDarkmode
                      : sendImg
                  }
                  alt="send icon"
                />
              </Box>
            </Box>
            <StyledContainerInfo>
              <WrapContent flexGrow={1}>
                {type === "input" && (
                  <WrapUTXOs>
                    <Box mr={3} minWidth={200} width={"100%"}>
                      <Box display={"flex"} justifyContent="flex-start" alignItems={"center"} width={"100%"}>
                        <Box color={(theme) => theme.palette.secondary.light} pr={1}>
                          {t("tab.utxo")}:
                        </Box>
                        <Link to={details.transaction(item.txHash)} style={{ width: "100%" }}>
                          <CustomTooltip title={item.txHash}>
                            <Box
                              component={"span"}
                              fontWeight="bold"
                              fontFamily={"var(--font-family-text)"}
                              color={(theme) => theme.palette.primary.main}
                              width={"100%"}
                            >
                              <EllipsisContainer sx={{ transform: "translateY(-2px)" }}>
                                <DynamicEllipsisText
                                  value={item.txHash}
                                  afterElm={
                                    <FlexCenter>
                                      <Box
                                        fontWeight={"bold"}
                                        color={({ palette }) => palette.secondary.main}
                                        sx={{ transform: "translateY(3px)" }}
                                      >
                                        #{item?.index}
                                      </Box>
                                      <CopyButton text={item.txHash} />
                                    </FlexCenter>
                                  }
                                />
                              </EllipsisContainer>
                            </Box>
                          </CustomTooltip>
                        </Link>
                      </Box>
                    </Box>
                  </WrapUTXOs>
                )}
                <Box color={({ palette }) => palette.secondary.light} display="flex" alignItems={"center"}>
                  {type === "input" ? t("common.from") : t("common.to")}:&nbsp;
                  <Box
                    display={"flex"}
                    justifyContent="space-between"
                    flex={"1"}
                    alignItems={"center"}
                    width={"100%"}
                    flexWrap={"wrap"}
                    gap="4px"
                  >
                    <Box display={"flex"} justifyContent="flex-start" alignItems={"center"} width={"100%"}>
                      <Link to={details.address(item.address)} style={{ width: "100%" }}>
                        <Box
                          fontWeight="bold"
                          fontFamily={"var(--font-family-text)"}
                          color={(theme) => theme.palette.primary.main}
                          width={"100%"}
                        >
                          <EllipsisContainer>
                            <DynamicEllipsisText value={item.address} isCopy isTooltip />
                          </EllipsisContainer>
                        </Box>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </WrapContent>
              <StyleAmount>
                <Box color={theme.palette.secondary.light} fontWeight={"bold"}>
                  <TitleAmountMobile> {t("glossary.amount")}&nbsp;</TitleAmountMobile>
                </Box>
                <Box
                  component={"span"}
                  whiteSpace="nowrap"
                  color={(theme) =>
                    type === "output"
                      ? theme.isDark
                        ? theme.palette.success[700]
                        : theme.palette.success[800]
                      : theme.palette.error[700]
                  }
                  fontWeight="bold"
                  mr={1}
                >
                  {type === "input" ? `-${formatADAFull(item.value)}` : `+${formatADAFull(item.value)}`} <ADAicon />
                </Box>
              </StyleAmount>
            </StyledContainerInfo>
          </ItemContent>
        </Item>
      ))}
    </Box>
  );
};
