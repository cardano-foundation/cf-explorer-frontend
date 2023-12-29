import React from "react";
import { Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import sendImg from "src/commons/resources/images/sendImg.svg";
import { formatADAFull } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import ADAicon from "src/components/commons/ADAIcon";
import { UpGreenUtxoDarkmode } from "src/commons/resources";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

import {
  AddressLink,
  Amount,
  ItemContainer,
  StatusIcon,
  StyledItem,
  Wrapper,
  Header,
  ContainerInfo,
  AmountMobileTitle,
  AmountMobileContainer,
  EllipsisContainer,
  FromContainer,
  ToContainer,
  AmountTextHeader
} from "./styles";

interface WithdrawalsProps {
  data: Transaction["withdrawals"] | null;
}

const Withdrawals: React.FC<WithdrawalsProps> = ({ data }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Wrapper>
      <Header>
        <Box>{t("glassary.walletAddresses")}</Box>
        <AmountTextHeader>{t("glossary.amount")}</AmountTextHeader>
      </Header>
      {data?.map((item) => (
        <StyledItem key={item.stakeAddressFrom}>
          <ItemContainer>
            <StatusIcon src={theme.isDark ? UpGreenUtxoDarkmode : sendImg} alt="wallet icon" />
            <ContainerInfo>
              <Box flex={1}>
                <Box flex={1} display="flex" columnGap={2} justifyContent="space-between">
                  <FromContainer>
                    <Box component={"span"} mr={1} color={({ palette }) => palette.secondary.light}>
                      {t("common.from")}:
                    </Box>
                    <AddressLink
                      to={
                        item.stakeAddressFrom.startsWith("addr")
                          ? details.address(item.stakeAddressFrom)
                          : details.stake(item.stakeAddressFrom)
                      }
                      sx={{ width: "100%" }}
                    >
                      <EllipsisContainer>
                        <DynamicEllipsisText
                          value={item.stakeAddressFrom}
                          isCopy
                          isTooltip
                          customTruncateFold={[8, 6]}
                        />
                      </EllipsisContainer>
                    </AddressLink>
                  </FromContainer>
                </Box>
                <ToContainer>
                  <Box minWidth="1.75rem" lineHeight={"28px"} color={({ palette }) => palette.secondary.light}>
                    {t("common.to")}:
                  </Box>
                  <Box flex={1}>
                    {item?.addressTo.map((address, idx) => {
                      return (
                        <Box minWidth={120} key={idx} lineHeight={0}>
                          <AddressLink
                            to={address.startsWith("addr") ? details.address(address) : details.stake(address)}
                          >
                            <EllipsisContainer fontSize={14}>
                              <DynamicEllipsisText value={address} isCopy isTooltip customTruncateFold={[8, 6]} />
                            </EllipsisContainer>
                          </AddressLink>
                        </Box>
                      );
                    })}
                  </Box>
                </ToContainer>
              </Box>
              <AmountMobileContainer>
                <AmountMobileTitle>{t("glossary.amount")}</AmountMobileTitle>
                <Amount>+ {formatADAFull(item?.amount)}</Amount>
                <ADAicon />
              </AmountMobileContainer>
            </ContainerInfo>
          </ItemContainer>
        </StyledItem>
      ))}
    </Wrapper>
  );
};

export default Withdrawals;
