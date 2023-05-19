import { Box, Grid, Skeleton, alpha, useTheme, styled } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { Link as LinkDom } from "react-router-dom";

import {
  ADAHolderIcon,
  ButtonListIcon,
  BackIcon,
  AddressIcon,
  ADAGreen,
  TimeIcon
} from "../../../../commons/resources";
import cadarnoSystem from "../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg";
import DelegationCertificateIcon from "../../../../commons/resources/icons/Staking/DelegationCertificateIcon.svg";
import Line from "../../../Line";
import { FeeBox, IconButton, IconButtonBack, Info, InfoGroup, InfoText, StepInfo } from "./styles";
import { AdaLogoIcon } from "../../../commons/ADAIcon";
import ArrowDiagram from "../../../ArrowDiagram";
import RecentDelegations from "./RecentDelegations";
import { useHistory, useParams } from "react-router";
import useFetch from "../../../../commons/hooks/useFetch";
import { API } from "../../../../commons/utils/api";
import PopoverStyled from "../../../commons/PopoverStyled";
import PopupStaking from "../../../commons/PopupStaking";
import StyledModal from "../../../commons/StyledModal";
import CopyButton from "../../../commons/CopyButton";
import { formatADAFull, formatDateTimeLocal, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import { details } from "../../../../commons/routers";
import CustomTooltip from "../../../commons/CustomTooltip";
import { StyledCopyButton } from "../../SPOLifecycle/Registration/styles";
import { useScreen } from "~/commons/hooks/useScreen";

const Delegation = ({
  containerPosition,
  handleResize
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
}) => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [selected, setSelected] = useState<DelegationItem | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleSelect = (delegation: DelegationItem | null) => {
    setSelected(delegation);
  };

  const handleToggleModal = () => setOpenModal((state) => !state);

  const { isLargeTablet } = useScreen();

  return (
    <Box>
      <DelegationCertificateModal
        txHash={selected?.txHash || ""}
        open={openModal}
        handleCloseModal={handleToggleModal}
        stake={stakeId}
      />
      <Box>
        <RecentDelegations onSelect={handleSelect} />
      </Box>
      <Box>
        {!!selected && isLargeTablet ? (
          <DelegationTimelineMobile
            handleResize={handleResize}
            setSelected={setSelected}
            containerPosition={containerPosition}
            selected={selected}
            toggleModal={handleToggleModal}
          />
        ) : selected ? (
          <DelegationTimeline
            handleResize={handleResize}
            setSelected={setSelected}
            containerPosition={containerPosition}
            selected={selected}
            toggleModal={handleToggleModal}
          />
        ) : null}
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
  handleResize,
  selected,
  toggleModal
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  setSelected: (item: DelegationItem | null) => void;
  handleResize: () => void;
  selected: DelegationItem | null;
  toggleModal: () => void;
}) => {
  const theme = useTheme();
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const history = useHistory();
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

  const handleBack = () => {
    history.push(details.staking(stakeId, "timeline", "delegation"));
  };

  if (loading) {
    return (
      <Box>
        <StepInfo>
          <IconButtonBack onClick={handleBack}>
            <BackIcon />
          </IconButtonBack>
          <InfoGroup>
            <Info>
              <AddressIcon fill='#438F68' />
              <Box component={Skeleton} ml={1} variant='rectangular' width={145} height={18} />
            </Info>
            <Info>
              <ADAGreen />
              <Box component={Skeleton} ml={1} variant='rectangular' width={60} height={18} />
            </Info>
            <Info>
              <TimeIcon />
              <Box component={Skeleton} ml={1} variant='rectangular' width={130} height={18} />
            </Info>
          </InfoGroup>
        </StepInfo>
        <Box component={Skeleton} width={"100%"} height={400} variant='rectangular' borderRadius={12} />
      </Box>
    );
  }

  return (
    <Box>
      <StepInfo>
        <IconButtonBack onClick={handleBack}>
          <BackIcon />
        </IconButtonBack>
        <InfoGroup>
          <Info>
            <AddressIcon fill='#438F68' />
            <CustomTooltip title={data?.txHash}>
              <InfoText>{getShortHash(data?.txHash || "")}</InfoText>
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
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
          <Box ref={adaHolderRef} width={190} height={215}>
            <ADAHolderIcon />
          </Box>
          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Box display={"flex"} flex={1}>
              <PopoverStyled
                render={({ handleClick }) => (
                  <FeeBox ref={feeRef} width={184} height={35}>
                    <Box>
                      <Box
                        component={"span"}
                        fontSize={"18px"}
                        fontWeight={"bold"}
                        mr={1}
                        color={(theme) => theme.palette.common.black}
                      >
                        {formatADAFull(data?.fee || 0)}
                      </Box>
                      <AdaLogoIcon fontSize={14} color={theme.palette.text.secondary} />
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
            <img src={cadarnoSystem} alt='carrdano' />
          </Box>

          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100vw",
              zIndex: "-1"
            }}
          >
            <Line
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={feeRef}
              pointTo='border'
              pointFrom='border'
              orient='vertical'
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={feeRef}
              toRef={cadarnoSystemRef}
              pointTo='border'
              pointFrom='border'
              orient='vertical'
            />
            <Line
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={fake1Ref}
              orient='horizontal'
              pointFrom='border'
              pointTo='center'
            />
            <Line
              containerPosition={containerPosition}
              fromRef={fake1Ref}
              toRef={registrationRef}
              pointTo='border'
              pointFrom='center'
              orient='vertical'
            />
            <Line
              containerPosition={containerPosition}
              fromRef={registrationRef}
              toRef={fake2Ref}
              orient='vertical'
              pointFrom='border'
              pointTo='center'
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={fake2Ref}
              toRef={cadarnoSystemRef}
              orient='horizontal'
              pointFrom='center'
              pointTo='border'
            />
          </svg>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} position={"relative"} top={"-60px"}>
          <Box ref={fake1Ref} width={"190px"} height={220}></Box>
          <Box component={IconButton} p={0} onClick={toggleModal}>
            <Box ref={registrationRef} width={220} height={220}>
              <Box
                component={"img"}
                borderRadius={2}
                border={({ palette }) => `2px solid ${palette.green[600]}`}
                src={DelegationCertificateIcon}
                alt='RegistrationCertificateIcon'
              />
            </Box>
          </Box>
          <Box ref={fake2Ref} width={"190px"} height={220}></Box>
        </Box>
      </Box>
    </Box>
  );
};
const DelegationTimelineMobile = ({
  containerPosition,
  setSelected,
  handleResize,
  selected,
  toggleModal
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  setSelected: (item: DelegationItem | null) => void;
  handleResize: () => void;
  selected: DelegationItem | null;
  toggleModal: () => void;
}) => {
  const theme = useTheme();
  const history = useHistory();
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
  const { isMobile } = useScreen();

  useEffect(() => {
    handleResize();
  }, [loading, registrationRef.current]);

  const handleBack = () => {
    history.goBack();
  };

  if (loading) {
    return (
      <Box>
        <StepInfo>
          <IconButtonBack onClick={handleBack}>
            <BackIcon />
          </IconButtonBack>
          <InfoGroup>
            <Info>
              <AddressIcon fill='#438F68' />
              <Box component={Skeleton} ml={1} variant='rectangular' width={145} height={18} />
            </Info>
            <Info>
              <ADAGreen />
              <Box component={Skeleton} ml={1} variant='rectangular' width={60} height={18} />
            </Info>
            <Info>
              <TimeIcon />
              <Box component={Skeleton} ml={1} variant='rectangular' width={130} height={18} />
            </Info>
          </InfoGroup>
        </StepInfo>
        <Box component={Skeleton} width={"100%"} height={400} variant='rectangular' borderRadius={12} />
      </Box>
    );
  }

  return (
    <Box>
      <StepInfo>
        <IconButtonBack onClick={handleBack}>
          <BackIcon />
        </IconButtonBack>
        <InfoGroup>
          <Info>
            <AddressIcon fill='#438F68' />
            <CustomTooltip title={data?.txHash}>
              <InfoText>{getShortHash(data?.txHash || "")}</InfoText>
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
      <Box margin='0 auto' width={"350px"}>
        <Box ref={adaHolderRef} width={190} height={215} margin='0 auto' mt={3}>
          <ADAHolderIcon />
        </Box>
        <Box display='flex' justifyContent='space-between' mt={8} marginX={2}>
          <Box>
            <Box component={IconButton} p={0} onClick={toggleModal}>
              <Box ref={registrationRef}>
                <img width={140} src={DelegationCertificateIcon} alt='RegistrationCertificateIcon' />
              </Box>
            </Box>
          </Box>
          <Box display='flex' alignItems='center' ml={3}>
            <PopoverStyled
              render={({ handleClick }) => (
                <FeeBox ref={feeRef} width={120} height={10}>
                  <Box>
                    <Box
                      component={"span"}
                      fontSize={"16px"}
                      fontWeight={"bold"}
                      color={(theme) => theme.palette.common.black}
                    >
                      {formatADAFull(data?.fee || 0)}
                    </Box>
                    <AdaLogoIcon fontSize={14} color={theme.palette.text.secondary} />
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
        <Box ref={cadarnoSystemRef} width={192} height={70} margin='0 auto' mt={5} mb={15}>
          <img style={{ width: 190, height: 215 }} src={cadarnoSystem} alt='carrdano' />
          <Box ref={fake2Ref} width={"190px"} height={220}></Box>
        </Box>

        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: isMobile ? "150vh" : "100vh",
            width: "100vw",
            zIndex: "-1"
          }}
        >
          <ArrowDiagram
            containerPosition={containerPosition}
            fromRef={adaHolderRef}
            toRef={cadarnoSystemRef}
            pointTo='border'
            pointFrom='border'
            orient='vertical'
            isCentalHorizontalFrom
          />
          <ArrowDiagram
            containerPosition={containerPosition}
            fromRef={adaHolderRef}
            toRef={cadarnoSystemRef}
            pointTo='border'
            pointFrom='border'
            orient='vertical'
            isCentalHorizontalFrom
            connectToReverse
          />
        </svg>
      </Box>
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
    <StyledModal {...props} title='Delegation certificate'>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Pool ID
            </Box>
            {loading && <Skeleton variant='rectangular' />}
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
            {loading && <Skeleton variant='rectangular' />}
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
            {loading && <Skeleton variant='rectangular' />}
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
