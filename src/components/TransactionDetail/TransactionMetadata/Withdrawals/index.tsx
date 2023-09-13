import React from "react";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import sendImg from "src/commons/resources/images/sendImg.svg";
import { formatADAFull, getShortWallet } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import { useScreen } from "src/commons/hooks/useScreen";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import ADAicon from "src/components/commons/ADAIcon";

import { AddressLink, Amount, ItemContainer, StatusIcon, StyledItem, Wrapper, Header } from "./styles";

interface WithdrawalsProps {
  data: Transaction["withdrawals"] | null;
}

const Withdrawals: React.FC<WithdrawalsProps> = ({ data }) => {
  const { t } = useTranslation();
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
                <StatusIcon src={sendImg} alt="wallet icon" />
              </Box>
              {isMobile ? (
                <Box component={"span"} color={({ palette }) => palette.secondary.light}>
                  {t("common.from")}:
                </Box>
              ) : null}
            </Box>
            <Box width="100%" sx={{ overflowX: "scroll", overflowY: "hidden" }}>
              <Box flex={1} display="flex" justifyContent="space-between">
                <Box minWidth={120}>
                  {!isMobile ? (
                    <Box component={"span"} mr={1} color={({ palette }) => palette.secondary.light}>
                      {t("common.from")}:
                    </Box>
                  ) : null}
                  <CustomTooltip title={item.stakeAddressFrom}>
                    <AddressLink
                      to={
                        item.stakeAddressFrom.startsWith("addr")
                          ? details.address(item.stakeAddressFrom)
                          : details.stake(item.stakeAddressFrom)
                      }
                    >
                      {getShortWallet(item.stakeAddressFrom || "")}
                    </AddressLink>
                  </CustomTooltip>
                  <CopyButton text={item.stakeAddressFrom || ""} />
                </Box>
                <Box minWidth="max-content" maxWidth="50%">
                  <Amount>+ {formatADAFull(item?.amount)}</Amount>
                  <ADAicon ml={"3px"} />
                </Box>
              </Box>
              <Box display={"flex"} flexDirection={isMobile ? "column" : "row"}>
                <Box minWidth="1.75rem" color={({ palette }) => palette.secondary.light}>
                  {t("common.to")}:
                </Box>
                <Box flex={1}>
                  {item?.addressTo.map((address, idx) => {
                    return (
                      <Box minWidth={120} key={idx}>
                        <CustomTooltip title={address}>
                          <AddressLink
                            to={address.startsWith("addr") ? details.address(address) : details.stake(address)}
                          >
                            {getShortWallet(address || "")}
                          </AddressLink>
                        </CustomTooltip>
                        <CopyButton text={address || ""} />
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
