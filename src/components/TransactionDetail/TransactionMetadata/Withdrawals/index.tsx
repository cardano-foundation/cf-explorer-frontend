import React from "react";
import { Box } from "@mui/material";
import sendImg from "~/commons/resources/images/sendImg.svg";
import { formatADAFull, getShortWallet } from "~/commons/utils/helper";
import { details } from "~/commons/routers";
import { AddressLink, Amount, ItemContainer, StatusIcon, StyledItem, Wrapper, Header } from "./styles";

import { useScreen } from "~/commons/hooks/useScreen";
import CopyButton from "~/components/commons/CopyButton";
import CustomTooltip from "~/components/commons/CustomTooltip";
import ADAicon from "~/components/commons/ADAIcon";

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
            <Box display='flex' alignItems='center'>
              <Box width={50}>
                <StatusIcon src={sendImg} alt='wallet icon' />
              </Box>
              {isMobile ? <span>From: </span> : null}
            </Box>
            <Box width='100%' sx={{ overflowX: "scroll", overflowY: "hidden" }}>
              <Box flex={1} display='flex' justifyContent='space-between'>
                <Box minWidth={120}>
                  {!isMobile ? <span>From: </span> : null}
                  <CustomTooltip title={item.stakeAddressFrom}>
                    <AddressLink to={details.address(item.stakeAddressFrom)}>
                      {getShortWallet(item.stakeAddressFrom || "")}
                    </AddressLink>
                  </CustomTooltip>
                  <CopyButton text={item.stakeAddressFrom || ""} />
                </Box>
                <Box minWidth='max-content' maxWidth='50%'>
                  <Amount>+ {formatADAFull(item?.amount)}</Amount>
                  <ADAicon ml={"3px"} />
                </Box>
              </Box>
              <Box display={"flex"} flexDirection={isMobile ? "column" : "row"}>
                <Box minWidth='1.75rem'>To:</Box>
                <Box flex={1}>
                  {item?.addressTo.map((address, idx) => {
                    return (
                      <Box minWidth={120} key={idx}>
                        <CustomTooltip title={address}>
                          <AddressLink to={details.address(address)}>{getShortWallet(address || "")}</AddressLink>
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
