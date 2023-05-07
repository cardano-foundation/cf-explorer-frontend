import { Box, Grid, Skeleton, alpha } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { Link as LinkDom } from "react-router-dom";

import {
  ADAHolderIcon,
  ButtonListIcon,
  BackIcon,
  AddressIcon,
  ADAGreen,
  TimeIcon,
} from "../../../../commons/resources";
import cadarnoSystem from "../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg";
import DelegationCertificateIcon from "../../../../commons/resources/icons/Staking/DelegationCertificateIcon.svg";
import Line from "../../../Line";
import { FeeBox, HoldBox, IconButton, IconButtonBack, Info, InfoText } from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import ArrowDiagram from "../../../ArrowDiagram";
import RecentDelegations from "./RecentDelegations";
import { useParams } from "react-router";
import useFetch from "../../../../commons/hooks/useFetch";
import { API } from "../../../../commons/utils/api";
import PopoverStyled from "../../../commons/PopoverStyled";
import PopupStaking from "../../../commons/PopupStaking";
import { styled } from "@mui/material";
import StyledModal from "../../../commons/StyledModal";
import CopyButton from "../../../commons/CopyButton";
import { formatADAFull, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import { details } from "../../../../commons/routers";
import moment from "moment";

const Delegation = ({
  containerPosition,
  handleResize,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
}) => {
  const [selected, setSelected] = useState<DelegationItem | null>(null);

  const handleSelect = (delegation: DelegationItem) => {
    setSelected(delegation);
  };

  return (
    <Box>
      <Box>{selected === null && <RecentDelegations onSelect={handleSelect} />}</Box>
      <Box>
        {!!selected && (
          <DelegationTimeline
            handleResize={handleResize}
            setSelected={setSelected}
            containerPosition={containerPosition}
            selected={selected}
          />
        )}
      </Box>
    </Box>
  );
};
export default Delegation;

interface DelegationDetail {
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

const DelegationTimeline = ({
  containerPosition,
  setSelected,
  handleResize,
  selected,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  setSelected: (item: DelegationItem | null) => void;
  handleResize: () => void;
  selected: DelegationItem | null;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const { data, loading } = useFetch<DelegationDetail>(
    (selected && selected.txHash && stakeId && API.STAKE_LIFECYCLE.DELEGATION_DETAIL(stakeId, selected.txHash)) || ""
  );

  const adaHolderRef = useRef(null);
  const feeRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const fake1Ref = useRef(null);
  const fake2Ref = useRef(null);
  const registrationRef = useRef(null);

  useEffect(() => {
    handleResize();
  }, [loading, registrationRef.current]);

  if (loading) {
    return (
      <Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={1} mb={2}>
          <IconButtonBack onClick={() => setSelected(null)}>
            <BackIcon />
          </IconButtonBack>
          <Box display={"flex"}>
            <Info>
              <AddressIcon fill="#438F68" />
              <Box component={Skeleton} ml={1} variant="rectangular" width={145} height={18} />
            </Info>
            <Info>
              <ADAGreen />
              <Box component={Skeleton} ml={1} variant="rectangular" width={60} height={18} />
            </Info>
            <Info>
              <TimeIcon />
              <Box component={Skeleton} ml={1} variant="rectangular" width={130} height={18} />
            </Info>
          </Box>
        </Box>
        <Box component={Skeleton} width={"100%"} height={400} variant="rectangular" borderRadius={12} />
      </Box>
    );
  }

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={1} mb={2}>
        <IconButtonBack onClick={() => setSelected(null)}>
          <BackIcon />
        </IconButtonBack>
        <Box display={"flex"}>
          <Info>
            <AddressIcon fill="#438F68" />
            <InfoText>{getShortHash(data?.txHash || "")}</InfoText>
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADAFull(data?.outSum || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{moment(data?.time).format("MM/DD/yyyy HH:mm:ss")}</InfoText>
          </Info>
        </Box>
      </Box>
      <Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
          <Box ref={adaHolderRef} width={190} height={215}>
            <ADAHolderIcon />
          </Box>
          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Box display={"flex"} flex={1}>
              <PopoverStyled
                render={({ handleClick }) => (
                  <FeeBox ref={feeRef}>
                    <Box>
                      <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                        {formatADAFull(data?.fee || 0)}
                      </Box>
                      <ADAicon fontSize="18px" />
                    </Box>
                    <IconButton onClick={() => feeRef?.current && handleClick(feeRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </FeeBox>
                )}
                content={<PopupStaking hash={data?.txHash || ""} />}
              />
            </Box>
          </Box>
          <Box ref={cadarnoSystemRef} width={192} height={215}>
            <img src={cadarnoSystem} alt="carrdano" />
          </Box>

          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100vw",
              zIndex: "-1",
            }}
          >
            <Line
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={feeRef}
              pointTo="border"
              pointFrom="border"
              orient="vertical"
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={feeRef}
              toRef={cadarnoSystemRef}
              pointTo="border"
              pointFrom="border"
              orient="vertical"
            />
            <Line
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={fake1Ref}
              orient="horizontal"
              pointFrom="border"
              pointTo="center"
            />
            <Line
              containerPosition={containerPosition}
              fromRef={fake1Ref}
              toRef={registrationRef}
              pointTo="border"
              pointFrom="center"
              orient="vertical"
            />
            <Line
              containerPosition={containerPosition}
              fromRef={registrationRef}
              toRef={fake2Ref}
              orient="vertical"
              pointFrom="border"
              pointTo="center"
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={fake2Ref}
              toRef={cadarnoSystemRef}
              orient="horizontal"
              pointFrom="center"
              pointTo="border"
            />
          </svg>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} position={"relative"} top={"-60px"}>
          <Box ref={fake1Ref} width={"190px"} height={220}></Box>
          <Box component={IconButton} p={0} onClick={() => setOpenModal(true)}>
            <Box ref={registrationRef} width={220} height={220}>
              <img src={DelegationCertificateIcon} alt="RegistrationCertificateIcon" />
            </Box>
          </Box>
          <Box ref={fake2Ref} width={"190px"} height={220}></Box>
        </Box>
      </Box>
      <DelegationCertificateModal
        txHash={selected?.txHash || ""}
        open={openModal}
        handleCloseModal={() => setOpenModal(false)}
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
    (stake && API.STAKE_LIFECYCLE.DELEGATION_DETAIL(stake, txHash)) || ""
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
                <Link to={details.delegation(data?.poolId || "")}>{getShortWallet(data?.poolId || "")}</Link>{" "}
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
                <Link to={details.stake(stake)}>{getShortWallet(stake || "")}</Link> <CopyButton text={stake} />
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
  color: `${theme.palette.blue[800]} !important`,
}));
