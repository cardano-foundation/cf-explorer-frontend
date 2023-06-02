import React from "react";
import { Box } from "@mui/material";

import sendImg from "src/commons/resources/images/sendImg.svg";
import { getShortWallet } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { useScreen } from "src/commons/hooks/useScreen";

import { AddressLink, Header, ItemContainer, StatusIcon, StyledItem, Wrapper } from "./styles";

interface DelegationProps {
  data: Transaction["delegations"] | null;
}

const Delegations: React.FC<DelegationProps> = ({ data }) => {
  const { isTablet } = useScreen();
  return (
    <Wrapper>
      <Header>Address Stake Key</Header>
      {data?.map((item) => (
        <StyledItem key={item.address}>
          <ItemContainer>
            <Box display="flex" alignItems="center">
              <Box width={50}>
                <StatusIcon src={sendImg} alt="wallet icon" />
              </Box>
              {isTablet ? <span>From: </span> : null}
            </Box>
            <Box width={"100%"}>
              <Box>
                {!isTablet ? <span>From: </span> : null}
                <CustomTooltip title={item.address}>
                  <AddressLink to={details.stake(item.address)}>{getShortWallet(item.address || "")}</AddressLink>
                </CustomTooltip>
                <CopyButton text={item.address || ""} />
              </Box>
              <Box>
                Pool ID:{" "}
                <CustomTooltip title={item.poolId}>
                  <AddressLink to={details.delegation(item.poolId)}>{getShortWallet(item.poolId || "")}</AddressLink>
                </CustomTooltip>
                <CopyButton text={item.poolId || ""} />
              </Box>
            </Box>
          </ItemContainer>
        </StyledItem>
      ))}
    </Wrapper>
  );
};

export default Delegations;
