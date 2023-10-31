import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import { BackIcon } from "src/commons/resources";
import { details as routerDetals } from "src/commons/routers";
import { getShortHash } from "src/commons/utils/helper";

import Mintviews from "./Mintviews";
import Certviews from "./Certviews";
import Rewardviews from "./Rewardviews";
import { DetailContainer, DetailContent, DetailHeader, ReferenceButton, ReferenceCount } from "./styles";
import { StyledLink } from "../share/styled";
import CustomTooltip from "../commons/CustomTooltip";
import Spendviews from "./SpendViews";
import ReferenceInputModal from "./modals/ReferenceInputModal";

export interface ContractDetailProps {
  view?: "SPEND" | "MINT" | "CERT" | "REWARD";
  data?: IContractItemTx;
  onGoBack?: (data?: IContractItemTx) => void;
  isMobile?: boolean;
}

const ContractDetail: React.FC<ContractDetailProps> = ({ data, onGoBack, isMobile }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [openReferenceInputModal, setOpenReferenceInputModal] = useState(false);
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
          {t("contract.title")}:{" "}
          <CustomTooltip title={contract}>
            <StyledLink style={{ fontWeight: "500", textDecoration: "underline" }} to={detail(contract)}>
              {getShortHash(contract || "")}
            </StyledLink>
          </CustomTooltip>
        </Typography>
      </DetailHeader>
      <DetailContent>{component}</DetailContent>
      {data?.referenceInputs && data?.referenceInputs.length > 0 && (
        <Box component={ReferenceButton} mt={3} onClick={() => setOpenReferenceInputModal(true)}>
          {t("trx.referenceInput")} <Box component={ReferenceCount}>{(data?.referenceInputs || [])?.length}</Box>
        </Box>
      )}
      <ReferenceInputModal
        data={data}
        open={openReferenceInputModal}
        onClose={() => setOpenReferenceInputModal(false)}
      />
    </DetailContainer>
  );
};

export default ContractDetail;
