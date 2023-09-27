import React from "react";
import { Typography } from "@mui/material";

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
}

const ContractDetail: React.FC<ContractDetailProps> = ({ data, onGoBack }) => {
  const details = {
    CERT: {
      component: <Certviews data={data} />,
      contract: data?.stakeAddress,
      detail: routerDetals.address
    },
    MINT: {
      component: <Mintviews data={data} isBurned={!!data?.burningTokens?.length} />,
      contract: data?.scriptHash,
      detail: routerDetals.policyDetail
    },
    REWARD: {
      component: <Rewardviews data={data} />,
      contract: data?.stakeAddress,
      detail: routerDetals.stake
    },
    SPEND: {
      component: <Spendviews data={data} />,
      contract: data?.address,
      detail: routerDetals.stake
    }
  };
  const { component, contract, detail } = details[(data?.purpose as ContractDetailProps["view"]) || "SPEND"];
  return (
    <DetailContainer>
      <DetailHeader>
        <BackIcon style={{ cursor: "pointer" }} onClick={() => onGoBack?.(data)} />
        <Typography fontWeight="500">
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
