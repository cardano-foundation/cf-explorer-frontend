import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";
import { getShortHash } from "src/commons/utils/helper";
import { API } from "src/commons/utils/api";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import StyledModal from "src/components/commons/StyledModal";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";

import DelegationDraw from "./DelegationDraw";
import RecentDelegations from "./RecentDelegations";
import { Item, ItemList, Label, LineData, StyledLink } from "./styles";

const Delegation = () => {
  const [openModal, setOpenModal] = useState(false);
  const { stakeId = "", txHash = "" } = useParams<{ stakeId: string; txHash?: string }>();

  const toggleModal = () => setOpenModal((pre) => !pre);

  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  return (
    <Box>
      <RecentDelegations setShowBackButton={setShowBackButton} />
      <DelegationDraw toggleModal={toggleModal} showBackButton={showBackButton} />
      <DelegationCertificateModal open={openModal} handleCloseModal={toggleModal} stake={stakeId} txHash={txHash} />
    </Box>
  );
};
export default Delegation;

interface CertificateItemType {
  label: React.ReactNode;
  content: React.ReactNode;
  extra?: React.ReactNode | false;
}

interface DelegationCertificateModalrops {
  stake: string;
  open: boolean;
  txHash: string;
  handleCloseModal: () => void;
}

export const DelegationCertificateModal = ({ stake, txHash, ...props }: DelegationCertificateModalrops) => {
  const { t } = useTranslation();
  const { data } = useFetch<DelegationDetail>((txHash && API.STAKE_LIFECYCLE.DELEGATION_DETAIL(stake, txHash)) || "");

  const list: CertificateItemType[] = [
    {
      label: t("glossary.poolId"),
      content: (
        <LineData>
          <CustomTooltip title={data?.poolId}>
            <StyledLink
              data-testid="delegator-delegation-cetificate-modal-pool-id"
              to={details.delegation(data?.poolId || "")}
              sx={{ wordBreak: "break-word" }}
            >
              {getShortHash(data?.poolId || "")}
            </StyledLink>
          </CustomTooltip>
          <CopyButton data-testid="delegator-delegation-cetificate-modal-copy-pool-id" text={data?.poolId || ""} />
        </LineData>
      )
    },
    {
      label: t("glossary.poolName"),
      content: (
        <CustomTooltip title={data?.poolName || data?.poolId}>
          <LineData>
            <StyledLink
              data-testid="delegator-delegation-cetificate-modal-pool-name"
              to={details.delegation(data?.poolId || "")}
              sx={{ wordBreak: "break-word" }}
            >
              {data?.poolName || getShortHash(data?.poolId)}
            </StyledLink>
          </LineData>
        </CustomTooltip>
      )
    },
    {
      label: t("common.stakeAddress"),
      content: (
        <LineData>
          <CustomTooltip title={stake}>
            <StyledLink
              data-testid="delegator-delegation-cetificate-modal-stake-id"
              to={details.stake(stake)}
              sx={{ wordBreak: "break-word" }}
            >
              {getShortHash(stake)}
            </StyledLink>
          </CustomTooltip>
          <CopyButton data-testid="delegator-delegation-cetificate-modal-copy-stake-id" text={stake} />
        </LineData>
      )
    }
  ];

  return (
    <StyledModal {...props} title={t("slc.delegationCertificate")}>
      <ItemList data-testid="delegation-certificate-modal">
        {list.map(({ label, content, extra }, index) => {
          return (
            <Item key={index} flexDirection={extra ? "row" : "column"}>
              {extra ? (
                <Box>
                  <Label>{label}</Label>
                  {data ? content : <CommonSkeleton variant="rectangular" />}
                </Box>
              ) : (
                <>
                  <Label>{label}</Label>
                  {data ? content : <CommonSkeleton variant="rectangular" />}
                </>
              )}
              {extra}
            </Item>
          );
        })}
      </ItemList>
    </StyledModal>
  );
};
