import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useScreen } from "src/commons/hooks/useScreen";
import receiveImg from "src/commons/resources/images/receiveImg.svg";
import sendImg from "src/commons/resources/images/sendImg.svg";
import { details } from "src/commons/routers";
import { formatADAFull, getShortHash, getShortWallet } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";

import {
  BoxHeaderBottom,
  BoxHeaderTop,
  Header,
  Img,
  Item,
  ItemBox,
  ItemContent,
  ItemFooter,
  WrapUTXOs,
  Wrapper
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
          <div>
            <Box color={({ palette }) => palette.secondary.main} fontWeight={"bold"} component="span" pr={1}>
              {`+${formatADAFull(totalADA)}`}
            </Box>
            <ADAicon />
          </div>
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
          <Box>{t("glossary.amount")}</Box>
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
  const { isTablet } = useScreen();
  return (
    <Box>
      {data?.map((item) => (
        <Item key={item.address} fontSize={14}>
          <ItemContent>
            <Box display="flex" alignItems="center">
              <Box width={50}>
                <Img src={type === "input" ? receiveImg : sendImg} alt="send icon" />
              </Box>
              {isTablet ? (
                <Box color={({ palette }) => palette.secondary.light}>
                  {type === "input" ? t("common.from") : t("common.to")}:
                </Box>
              ) : null}
            </Box>
            <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
              <Box>
                {type === "input" && (
                  <WrapUTXOs>
                    <Box mr={3} minWidth={200}>
                      <Box display={"flex"} justifyContent="flex-start" alignItems={"center"}>
                        <Box color={(theme) => theme.palette.secondary.light} pr={1}>
                          {t("tab.utxo")}:
                        </Box>
                        <Link to={details.transaction(item.txHash)}>
                          <CustomTooltip title={item.txHash}>
                            <Box
                              component={"span"}
                              fontWeight="bold"
                              fontFamily={"var(--font-family-text)"}
                              color={(theme) => theme.palette.primary.main}
                              mr={1}
                            >
                              {getShortHash(item.txHash)}
                            </Box>
                          </CustomTooltip>
                        </Link>
                        <Box fontWeight={"bold"} color={({ palette }) => palette.secondary.main}>
                          #{item?.index}
                        </Box>
                        <CopyButton text={item.txHash} />
                      </Box>
                    </Box>
                  </WrapUTXOs>
                )}
                <Box
                  display={"flex"}
                  pl={type === "input" ? 2 : 0}
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  {!isTablet ? (
                    <Box
                      color={({ palette }) => palette.secondary.light}
                      display={"flex"}
                      alignItems="center"
                      justifyContent={"flex-start"}
                      pr={1}
                      mr={1}
                    >
                      {type === "input" ? "From" : "To"}:
                    </Box>
                  ) : null}
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
                          <Box
                            fontWeight="bold"
                            fontFamily={"var(--font-family-text)"}
                            color={(theme) => theme.palette.primary.main}
                            mr={1}
                          >
                            {getShortWallet(item.address)}
                          </Box>
                        </CustomTooltip>
                      </Link>{" "}
                      <CopyButton text={item.address} />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box
                  component={"span"}
                  whiteSpace="nowrap"
                  color={(theme) => (type === "output" ? theme.palette.success[800] : theme.palette.error[700])}
                  fontWeight="bold"
                  mr={1}
                >
                  {type === "input" ? `-${formatADAFull(item.value)}` : `+${formatADAFull(item.value)}`}
                </Box>
                <ADAicon />
              </Box>
            </Box>
          </ItemContent>
        </Item>
      ))}
    </Box>
  );
};
