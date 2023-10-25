import React from "react";
import { Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import sendImg from "src/commons/resources/images/sendImg.svg";
import { formatADAFull } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import { useScreen } from "src/commons/hooks/useScreen";
import ADAicon from "src/components/commons/ADAIcon";
import { UpGreenUtxoDarkmode } from "src/commons/resources";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

import { AddressLink, Amount, ItemContainer, StatusIcon, StyledItem, Wrapper, Header } from "./styles";

interface WithdrawalsProps {
  data: Transaction["withdrawals"] | null;
}

const Withdrawals: React.FC<WithdrawalsProps> = ({ data }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isMobile } = useScreen();
  return (
    <Wrapper>
      <Header>
        <Box>{t("glassary.walletAddresses")}</Box>
        <Box>{t("glossary.amount")}</Box>
      </Header>
      {data?.map((item) => (
        <StyledItem key={item.stakeAddressFrom}>
          <ItemContainer>
            <Box display="flex" alignItems="center">
              <Box width={50}>
                <StatusIcon src={theme.isDark ? UpGreenUtxoDarkmode : sendImg} alt="wallet icon" />
              </Box>
              {isMobile ? (
                <Box component={"span"} color={({ palette }) => palette.secondary.light}>
                  {t("common.from")}:
                </Box>
              ) : null}
            </Box>
            <Box width="100%" sx={{ overflowX: "scroll", overflowY: "hidden" }}>
              <Box flex={1} display="flex" columnGap={2} justifyContent="space-between">
                <Box display="flex" alignItems="center" fontSize="14px" minWidth={120}>
                  {!isMobile ? (
                    <Box component={"span"} mr={1} color={({ palette }) => palette.secondary.light}>
                      {t("common.from")}:
                    </Box>
                  ) : null}
                  <AddressLink
                    to={
                      item.stakeAddressFrom.startsWith("addr")
                        ? details.address(item.stakeAddressFrom)
                        : details.stake(item.stakeAddressFrom)
                    }
                  >
                    <DynamicEllipsisText value={item.stakeAddressFrom} isCopy isTooltip />
                  </AddressLink>
                </Box>
                <Box minWidth="max-content" maxWidth="50%">
                  <Amount>+ {formatADAFull(item?.amount)}</Amount>
                  <ADAicon />
                </Box>
              </Box>
              <Box display="flex" alignItems="center" flexDirection={isMobile ? "column" : "row"} columnGap={2}>
                <Box minWidth="1.75rem" color={({ palette }) => palette.secondary.light}>
                  {t("common.to")}:
                </Box>
                <Box fontSize="14px" flex={1} maxWidth={"55vw"}>
                  {item?.addressTo.map((address, idx) => {
                    return (
                      <Box minWidth={120} key={idx}>
                        <AddressLink
                          to={address.startsWith("addr") ? details.address(address) : details.stake(address)}
                        >
                          <DynamicEllipsisText value={address} isCopy isTooltip />
                        </AddressLink>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </ItemContainer>
        </StyledItem>
      ))}
    </Wrapper>
  );
};

export default Withdrawals;
