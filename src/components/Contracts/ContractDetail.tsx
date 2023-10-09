import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

import { BackIcon } from "src/commons/resources";
import { formatLongText } from "src/commons/utils/helper";
import { details as routerDetals } from "src/commons/routers";

import Mintviews from "./Mintviews";
import Certviews from "./Certviews";
import Rewardviews from "./Rewardviews";
import { DetailContainer, DetailContent, DetailHeader } from "./styles";
import { StyledLink } from "../share/styled";
import CustomTooltip from "../commons/CustomTooltip";
import Spendviews from "./SpendViews";

export interface ContractDetailProps {
  view?: "SPEND" | "MINT" | "CERT" | "REWARD";
  data?: IContractItemTx;
  onGoBack?: (data?: IContractItemTx) => void;
  isMobile?: boolean;
}

const ContractDetail: React.FC<ContractDetailProps> = ({ data, onGoBack, isMobile }) => {
  const theme = useTheme();
  const details = {
    CERT: {
      component: <Certviews data={data} isMobile={isMobile} />,
      contract: data?.stakeAddress,
      detail: routerDetals.stake
    },
    MINT: {
      component: <Mintviews data={data} isBurned={!!data?.burningTokens?.length} isMobile={isMobile} />,
      contract: data?.scriptHash,
      detail: routerDetals.policyDetail
    },
    REWARD: {
      component: <Rewardviews data={data} isMobile={isMobile} />,
      contract: data?.stakeAddress,
      detail: routerDetals.stake
    },
    SPEND: {
      component: <Spendviews data={data} isMobile={isMobile} />,
      contract: data?.address,
      detail: routerDetals.contract
    }
  };
  const { component, contract, detail } = details[(data?.purpose as ContractDetailProps["view"]) || "SPEND"];
  return (
    <DetailContainer isMobile={+!!isMobile}>
      <DetailHeader>
        <Box flex={1} display="flex" justifyContent="flex-start">
          {!isMobile && (
            <BackIcon data-testid="goback-button" style={{ cursor: "pointer" }} onClick={() => onGoBack?.(data)} />
          )}
        </Box>
        <Typography fontWeight="500" color={theme.palette.secondary.light}>
          Contract:{" "}
          <CustomTooltip title={contract}>
            <StyledLink style={{ fontWeight: "500", textDecoration: "underline" }} to={detail(contract)}>
              {formatLongText(contract || "")}
            </StyledLink>
          </CustomTooltip>
        </Typography>
      </DetailHeader>
      <DetailContent>{component}</DetailContent>
    </DetailContainer>
  );
};

export default ContractDetail;
