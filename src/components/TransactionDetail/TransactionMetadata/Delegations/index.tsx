import React from "react";
import { Box } from "@mui/material";

import sendImg from "src/commons/resources/images/sendImg.svg";
import { getShortWallet } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";

import { AddressLink, Header, ItemContainer, StatusIcon, StyledItem, Wrapper } from "./styles";

interface DelegationProps {
  data: Transaction["delegations"] | null;
}

const Delegations: React.FC<DelegationProps> = ({ data }) => {
  return (
    <Wrapper>
      <Header>Stake Address</Header>
      {data?.map((item) => (
        <StyledItem key={item.address}>
          <ItemContainer>
            <Box display="flex" alignItems="center">
              <Box width={50}>
                <StatusIcon src={sendImg} alt="wallet icon" />
              </Box>
              <Box width={"100%"}>
                <Box>
                  <Box component={"span"} color={({ palette }) => palette.secondary.light} mr={1}>
                    From:
                  </Box>
                  <CustomTooltip title={item.address}>
                    <AddressLink to={details.stake(item.address)}>{getShortWallet(item.address || "")}</AddressLink>
                  </CustomTooltip>
                  <CopyButton text={item.address || ""} />
                </Box>
                <Box>
                  <Box component={"span"} color={({ palette }) => palette.secondary.light} mr={1}>
                    Pool ID:
                  </Box>
                  <CustomTooltip title={item.poolId}>
                    <AddressLink to={details.delegation(item.poolId)}>{getShortWallet(item.poolId || "")}</AddressLink>
                  </CustomTooltip>
                  <CopyButton text={item.poolId || ""} />
                </Box>
              </Box>
            </Box>
          </ItemContainer>
        </StyledItem>
      ))}
    </Wrapper>
  );
};

export default Delegations;
