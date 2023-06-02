import { Box, Grid, Skeleton, alpha, styled } from "@mui/material";
import { useState } from "react";
import { Link as LinkDom } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { FilterParams } from "src/components/StackingFilter";
import useFetch from "src/commons/hooks/useFetch";
import { ADAGreen, AddressIcon, BackIcon, TimeIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatDateTimeLocal, getShortHash, getShortWallet } from "src/commons/utils/helper";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import StyledModal from "src/components/commons/StyledModal";

import { StyledCopyButton } from "../../SPOLifecycle/Registration/styles";
import DelegationDraw from "./DelegationDraw";
import RecentDelegations from "./RecentDelegations";
import { IconButtonBack, Info, InfoGroup, InfoText, StepInfo } from "./styles";
import { StyledLink } from "../Registration/styles";

const Delegation = () => {
  const [selected, setSelected] = useState<DelegationItem | null>(null);
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });
  const handleSelect = (delegation: DelegationItem | null) => {
    setSelected(delegation);
  };

  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  return (
    <Box>
      <RecentDelegations
        onSelect={handleSelect}
        params={params}
        setParams={setParams}
        setShowBackButton={setShowBackButton}
      />
      {selected && <DelegationTimeline selected={selected} showBackButton={showBackButton} />}
    </Box>
  );
};
export default Delegation;

export interface DelegationDetail {
  txHash: string;
  blockNo: number;
  epoch: number;
  outSum: number;
  fee: number;
  poolId: string;
  poolName: string;
  time: string;
  stakeTotalAmount: number;
}

interface Props {
  selected: DelegationItem;
  showBackButton?: boolean;
}

const DelegationTimeline = ({ selected, showBackButton = false }: Props) => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const { data, loading } = useFetch<DelegationDetail>(
    (selected && selected.txHash && stakeId && API.STAKE_LIFECYCLE.DELEGATION_DETAIL(stakeId, selected.txHash)) || ""
  );

  const handleBack = () => {
    history.push(details.staking(stakeId, "timeline", "delegation"));
  };

  const toggleCertificateModal = () => setOpenModal((pre) => !pre);

  if (loading) {
    return (
      <Box>
        <StepInfo>
          {showBackButton ? (
            <IconButtonBack onClick={handleBack}>
              <BackIcon />
            </IconButtonBack>
          ) : (
            <Box />
          )}

          <InfoGroup sidebar={+sidebar}>
            <Info>
              <AddressIcon fill="#438F68" />
              <Box component={Skeleton} variant="rectangular" width={145} height={18} />
            </Info>
            <Info>
              <ADAGreen />
              <Box component={Skeleton} variant="rectangular" width={60} height={18} />
            </Info>
            <Info>
              <TimeIcon />
              <Box component={Skeleton} variant="rectangular" width={130} height={18} />
            </Info>
          </InfoGroup>
        </StepInfo>
        <Box component={Skeleton} width={"100%"} height={400} variant="rectangular" borderRadius={12} />
      </Box>
    );
  }

  return (
    <Box>
      <StepInfo>
        {showBackButton ? (
          <IconButtonBack onClick={handleBack}>
            <BackIcon />
          </IconButtonBack>
        ) : (
          <Box />
        )}
        <InfoGroup>
          <Info>
            <AddressIcon fill="#438F68" />
            <CustomTooltip title={data?.txHash}>
              <InfoText>
                <StyledLink to={details.transaction(data?.txHash)}>{getShortHash(data?.txHash || "")}</StyledLink>
              </InfoText>
            </CustomTooltip>
            <StyledCopyButton text={data?.txHash} />
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADAFull(data?.fee || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{formatDateTimeLocal(data?.time || "")}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <Box>
        <DelegationDraw data={data} toggleCertificateModal={toggleCertificateModal} />
      </Box>
      <DelegationCertificateModal
        txHash={selected?.txHash || ""}
        open={openModal}
        handleCloseModal={toggleCertificateModal}
        stake={stakeId}
      />
    </Box>
  );
};

export const DelegationCertificateModal = ({
  stake,
  txHash,
  ...props
}: {
  stake: string;
  open: boolean;
  txHash: string;
  handleCloseModal: () => void;
}) => {
  const { data, loading } = useFetch<DelegationDetail>(
    (txHash && API.STAKE_LIFECYCLE.DELEGATION_DETAIL(stake, txHash)) || ""
  );

  return (
    <StyledModal {...props} title="Delegation certificate">
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Pool ID
            </Box>
            {loading && <Skeleton variant="rectangular" />}
            {data && !loading && (
              <Box>
                <CustomTooltip title={data?.poolId}>
                  <Link to={details.delegation(data?.poolId || "")}>{getShortWallet(data?.poolId || "")}</Link>
                </CustomTooltip>
                <CopyButton text={data?.poolId || ""} />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Pool Name
            </Box>
            {loading && <Skeleton variant="rectangular" />}
            {data && !loading && (
              <Box>
                <Link to={details.delegation(data?.poolId || "")}>{data?.poolName || ""}</Link>{" "}
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Stake Key
            </Box>
            {loading && <Skeleton variant="rectangular" />}
            {data && !loading && (
              <Box>
                <CustomTooltip title={stake}>
                  <Link to={details.stake(stake)}>{getShortWallet(stake || "")}</Link>
                </CustomTooltip>
                <CopyButton text={stake} />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </StyledModal>
  );
};

const Link = styled(LinkDom)(({ theme }) => ({
  fontSize: "0.875rem",
  color: `${theme.palette.blue[800]} !important`
}));
