import React, { useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";

import { formatLongText } from "src/commons/utils/helper";
import { InfoIcon } from "src/commons/resources";
import { StyledLink } from "src/components/share/styled";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";

import { CLButton, CLCardContaienr } from "./styles";

export interface ContractItemProps {
  data: IContractItemTx;
  onClick?: (data: IContractItemTx) => void;
}

const ContractItem: React.FC<ContractItemProps> = ({ data, onClick }) => {
  const theme = useTheme();
  const contractAddress = useMemo(() => {
    switch (data.purpose) {
      case "SPEND":
        return {
          value: data.address,
          explain: "A script with the purpose to control how to spend outputs",
          detail: details.address
        };
      case "MINT":
        return {
          value: data.scriptHash,
          explain: "A script with the purpose to control how to mint or burn assets",
          detail: details.policyDetail
        };
      case "CERT":
        return {
          value: data.stakeAddress,
          explain: "A script with the purpose to control how to publish delegation certificates",
          detail: details.stake
        };
      case "REWARD":
        return {
          value: data.stakeAddress,
          explain: "A script with the purpose to control how to withdraw consensus rewards",
          detail: details.stake
        };
    }
  }, [data]);
  return (
    <CLCardContaienr>
      <Box>
        <Typography fontWeight={600}>Contract Address:</Typography>
        <CustomTooltip title={contractAddress?.value}>
          <StyledLink
            style={{ fontWeight: "500", textDecoration: "underline" }}
            to={contractAddress?.detail(contractAddress.value) || "/"}
          >
            {formatLongText(contractAddress?.value || "")}
          </StyledLink>
        </CustomTooltip>
      </Box>
      <Box>
        <Typography fontWeight={600}>Purpose:</Typography>
        <Typography>{data.purpose}</Typography>
        {!!data?.burningTokens?.length && (
          <span>
            (
            <Typography component="span" color={theme.palette.error[700]}>
              BURN
            </Typography>
            )
          </span>
        )}
        <CustomTooltip title={contractAddress?.explain}>
          <InfoIcon />
        </CustomTooltip>
      </Box>
      <Box>
        <CLButton onClick={() => onClick?.(data)}>View Contract</CLButton>
      </Box>
    </CLCardContaienr>
  );
};

export default ContractItem;
