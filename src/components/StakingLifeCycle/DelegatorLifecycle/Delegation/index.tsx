import { useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";

import { details } from "src/commons/routers";
import { getShortWallet } from "src/commons/utils/helper";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import StyledModal from "src/components/commons/StyledModal";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";

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
  const { data } = useFetch<DelegationDetail>((txHash && API.STAKE_LIFECYCLE.DELEGATION_DETAIL(stake, txHash)) || "");

  const list: CertificateItemType[] = [
    {
      label: "Pool ID",
      content: (
        <LineData>
          <CustomTooltip title={data?.poolId}>
            <StyledLink
              data-testid="delegator-delegation-cetificate-modal-pool-id"
              to={details.delegation(data?.poolId || "")}
            >
              {getShortWallet(data?.poolId || "")}
            </StyledLink>
          </CustomTooltip>
          <CopyButton data-testid="delegator-delegation-cetificate-modal-copy-pool-id" text={data?.poolId || ""} />
        </LineData>
      )
    },
    {
      label: "Pool Name",
      content: (
        <CustomTooltip title={data?.poolName || data?.poolId}>
          <LineData>
            <StyledLink
              data-testid="delegator-delegation-cetificate-modal-pool-name"
              to={details.delegation(data?.poolId || "")}
            >
              {data?.poolName || getShortWallet(data?.poolId)}
            </StyledLink>
          </LineData>
        </CustomTooltip>
      )
    },
    {
      label: "Stake Address",
      content: (
        <LineData>
          <CustomTooltip title={stake}>
            <StyledLink data-testid="delegator-delegation-cetificate-modal-stake-id" to={details.stake(stake)}>
              {getShortWallet(stake)}
            </StyledLink>
          </CustomTooltip>
          <CopyButton data-testid="delegator-delegation-cetificate-modal-copy-stake-id" text={stake} />
        </LineData>
      )
    }
  ];

  return (
    <StyledModal {...props} title="Delegation certificate">
      <ItemList data-testid="delegation-certificate-modal">
        {list.map(({ label, content, extra }, index) => {
          return (
            <Item key={index} flexDirection={extra ? "row" : "column"}>
              {extra ? (
                <Box>
                  <Label>{label}</Label>
                  {data ? content : <Skeleton variant="rectangular" />}
                </Box>
              ) : (
                <>
                  <Label>{label}</Label>
                  {data ? content : <Skeleton variant="rectangular" />}
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
