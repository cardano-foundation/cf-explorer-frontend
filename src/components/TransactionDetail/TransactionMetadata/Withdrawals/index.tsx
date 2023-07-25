import React from "react";
import { Box } from "@mui/material";

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
  const { isMobile } = useScreen();
  return (
    <Wrapper>
      <Header>
        <Box>Wallet Addresses</Box>
        <Box>Amount</Box>
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
                  From:
                </Box>
              ) : null}
            </Box>
            <Box width="100%" sx={{ overflowX: "scroll", overflowY: "hidden" }}>
              <Box flex={1} display="flex" justifyContent="space-between">
                <Box minWidth={120}>
                  {!isMobile ? (
                    <Box component={"span"} color={({ palette }) => palette.secondary.light}>
                      From:
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
                <Box minWidth="1.75rem" color={({ palette }) => palette.secondary.main}>
                  To:
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
