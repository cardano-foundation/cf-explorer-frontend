import React from "react";
import sendImg from "../../../../commons/resources/images/sendImg.svg";
import { getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import { details } from "../../../../commons/routers";
import CopyButton from "../../../commons/CopyButton";
import { Box } from "@mui/material";
import CustomTooltip from "../../../commons/CustomTooltip";
import { AddressLink, Header, ItemContainer, StatusIcon, StyledItem, Wrapper } from "./styles";

interface DelegationProps {
  data: Transaction["delegations"] | null;
}

const Delegations: React.FC<DelegationProps> = ({ data }) => {
  return (
    <Wrapper>
      <Header>Wallet Addresses</Header>
      {data?.map(item => (
        <StyledItem key={item.address}>
          <ItemContainer>
            <Box width={50}>
              <StatusIcon src={sendImg} alt="wallet icon" />
            </Box>
            <Box width={"100%"}>
              <Box>
                <span>From: </span>
                <CustomTooltip title={item.address}>
                  <AddressLink to={details.stake(item.address)}>{getShortWallet(item.address || "")}</AddressLink>
                </CustomTooltip>
                <CopyButton text={item.address || ""} />
              </Box>
              <Box>
                Pool ID:{" "}
                <CustomTooltip title={item.poolId}>
                  <AddressLink to={details.delegation(item.poolId)}>{getShortHash(item.poolId || "")}</AddressLink>
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
