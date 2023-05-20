import { alpha, Box, Grid, Skeleton, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link as LinkDom } from "react-router-dom";

import {
  SPOStalking,
  ButtonListIcon,
  BackIcon,
  AddressIcon,
  ADAGreen,
  TimeIcon,
  SPOInfo,
  SPOKey
} from "../../../../commons/resources";
import cadarnoSystem from "../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg";
import RegistrationCertificate from "../../../../commons/resources/icons/Staking/PoolRegistrationCertificateIcon.svg";
import PoolCertificateMobile from "../../../../commons/resources/icons/Staking/PoolCertificateMobile.svg";

import Line from "../../../Line";
import {
  ButtonSPO,
  FeeBox,
  HoldBox,
  HoldBoxText,
  IconButton,
  IconButtonBack,
  Info,
  InfoText,
  PoolName,
  PoolNamePopup,
  StyledCopyButton,
  StyledGridContainer,
  StyledSkeletonContainer,
  StyledBox,
  StepInfo,
  InfoGroup
} from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import ArrowDiagram from "../../../ArrowDiagram";
import PopoverStyled from "../../../commons/PopoverStyled";
import CustomTooltip from "../../../commons/CustomTooltip";
import RecentRegistrations from "./RecentRegistrations";
import useFetch from "../../../../commons/hooks/useFetch";
import { API } from "../../../../commons/utils/api";
import { useHistory, useParams } from "react-router";
import { formatADA, getShortHash, getShortWallet, numberWithCommas } from "../../../../commons/utils/helper";
import moment from "moment";
import PopupStaking from "../../../commons/PopupStaking";
import CopyButton from "../../../commons/CopyButton";
import { details } from "../../../../commons/routers";
import StyledModal from "../../../commons/StyledModal";
import { StyledLink } from "../styles";
import { useScreen } from "../../../../commons/hooks/useScreen";

const Registration = ({
  containerPosition,
  handleResize
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
}) => {
  const { poolId = "" } = useParams<{ poolId: string }>();
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<SPORegistration | null>(null);
  const history = useHistory();
  const handleSelect = (registration: SPORegistration | null) => {
    setSelected(registration);
  };
  const { data, loading } = useFetch<SPORegistrationDetail>(
    selected?.poolUpdateId ? API.SPO_LIFECYCLE.SPO_REGISTRATION_DETAIl(poolId, selected?.poolUpdateId) : ""
  );

  const handleBack = () => {
    history.push(details.spo(poolId, "timeline", "registration"));
  };

  const { isLargeTablet } = useScreen();

  const handleToggleCertificateModal = () => setOpenModal((state) => !state);
  return (
    <Box>
      <RecentRegistrations onSelect={handleSelect} />
      {selected ? (
        <>
          <StepInfo>
            <IconButtonBack onClick={handleBack}>
              <BackIcon />
            </IconButtonBack>
            <InfoGroup>
              <Info>
                <AddressIcon fill='#438F68' />
                <CustomTooltip title={data?.txHash}>
                  <InfoText>
                    <StyledLink to={details.transaction(data?.txHash)}>{getShortHash(data?.txHash || "")}</StyledLink>
                  </InfoText>
                </CustomTooltip>
                <StyledCopyButton text={data?.txHash} />
              </Info>
              <Info>
                <ADAGreen />
                <InfoText>{formatADA(data?.totalFee || 0)}</InfoText>
              </Info>
              <Info>
                <TimeIcon />
                <InfoText>{moment(data?.time).format("MM/DD/yyyy HH:mm:ss")}</InfoText>
              </Info>
            </InfoGroup>
          </StepInfo>
          {isLargeTablet ? (
            <RegistrationTimelineMobile
              handleResize={handleResize}
              setSelected={setSelected}
              data={data}
              loading={loading}
              containerPosition={containerPosition}
              toggleCertificateModal={handleToggleCertificateModal}
            />
          ) : (
            <RegistrationTimeline
              handleResize={handleResize}
              data={data}
              loading={loading}
              containerPosition={containerPosition}
              toggleCertificateModal={handleToggleCertificateModal}
            />
          )}
        </>
      ) : null}
      <RegistrationCertificateModal
        poolId={poolId}
        poolUpdateId={selected?.poolUpdateId || 0}
        handleCloseModal={handleToggleCertificateModal}
        open={openModal}
      />
    </Box>
  );
};
export default Registration;

const RegistrationTimeline = ({
  containerPosition,
  handleResize,
  data,
  loading,
  toggleCertificateModal
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
  toggleCertificateModal: () => void;
  data: SPORegistrationDetail | null;
  loading: boolean;
}) => {
  useEffect(() => {
    handleResize();
  }, [loading]);

  const adaHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const fake1Ref = useRef(null);
  const fake2Ref = useRef(null);
  const registrationRef = useRef(null);
  const SPOInfoRef = useRef(null);
  const SPOKeyRef = useRef(null);

  if (loading) {
    return (
      <StyledSkeletonContainer>
        <Box component={Skeleton} width={"100%"} height={400} variant='rectangular' borderRadius={12} />
      </StyledSkeletonContainer>
    );
  }

  return (
    <StyledBox>
      <Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
          <Box ref={adaHolderRef} width={190} height={245} position={"relative"}>
            <SPOStalking />
            <CustomTooltip title={data?.poolName}>
              <PoolName> {data?.poolName}</PoolName>
            </CustomTooltip>
            <CustomTooltip
              wOpacity={false}
              componentsProps={{
                transition: {
                  style: {
                    backgroundColor: "white",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
                    padding: "10px"
                  }
                },
                arrow: {
                  style: {
                    color: "white"
                  }
                }
              }}
              title={
                <Box>
                  <Box display={"flex"} alignItems={"center"}>
                    <Box fontSize='1.125rem' color={({ palette }) => palette.grey[400]}>
                      Pool ID:
                    </Box>
                    <PoolNamePopup to={details.delegation(data?.poolView)}>
                      {getShortHash(data?.poolView || "")}
                    </PoolNamePopup>
                    <CopyButton text={data?.poolView} />
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    <Box fontSize='1.125rem' color={({ palette }) => palette.grey[400]}>
                      Pool name:
                    </Box>
                    <PoolNamePopup to={details.delegation(data?.poolView)}>{data?.poolName}</PoolNamePopup>
                  </Box>
                </Box>
              }
            >
              <ButtonSPO ref={SPOInfoRef} component={IconButton} left={"33%"}>
                <SPOInfo />
              </ButtonSPO>
            </CustomTooltip>
            <Link to={details.stake(data?.stakeKeys[0] || "")}>
              <CustomTooltip
                wOpacity={false}
                componentsProps={{
                  transition: {
                    style: {
                      backgroundColor: "white",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
                      padding: "10px"
                    }
                  },
                  arrow: {
                    style: {
                      color: "white"
                    }
                  }
                }}
                title={
                  <Box display={"flex"} alignItems={"center"}>
                    {data?.stakeKeys && data.stakeKeys.length > 0 && (
                      <>
                        <SPOKey fill='#108AEF' />
                        <PoolNamePopup to={details.stake(data?.stakeKeys[0] || "")}>
                          {getShortWallet(data?.stakeKeys[0] || "")}
                        </PoolNamePopup>
                        <CopyButton text={data?.stakeKeys[0]} />
                      </>
                    )}
                  </Box>
                }
              >
                <ButtonSPO ref={SPOKeyRef} component={IconButton} left={"52%"}>
                  <SPOKey fill='#438F68' />
                </ButtonSPO>
              </CustomTooltip>
            </Link>
          </Box>

          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Box display={"flex"} flex={1}>
              <PopoverStyled
                render={({ handleClick }) => (
                  <HoldBox ref={holdRef} ml={1}>
                    <Box>
                      <HoldBoxText component={"span"} mr={1}>
                        {formatADA(data?.deposit || 0)}
                      </HoldBoxText>
                      <ADAicon fontSize='18px' />
                    </Box>
                    <IconButton onClick={() => holdRef?.current && handleClick(holdRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </HoldBox>
                )}
                content={<PopupStaking hash={data?.txHash || ""} />}
              />
              <PopoverStyled
                render={({ handleClick }) => (
                  <FeeBox ref={feeRef}>
                    <Box>
                      <HoldBoxText component={"span"} mr={1}>
                        {formatADA(data?.fee || 0)}
                      </HoldBoxText>
                      <ADAicon fontSize='18px' />
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
          <Box ref={cadarnoSystemRef} height={215} width={190}>
            {/* <CadarnoSystemIcon /> */}
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
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={holdRef}
              pointTo='border'
              pointFrom='border'
              orient='vertical'
            />
            <Line
              containerPosition={containerPosition}
              pointTo='border'
              pointFrom='border'
              orient='vertical'
              fromRef={holdRef}
              toRef={feeRef}
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
            <ArrowDiagram
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
          <Box
            ref={registrationRef}
            width={220}
            height={220}
            component={IconButton}
            p={0}
            onClick={toggleCertificateModal}
          >
            <Box
              component={"img"}
              style={{ marginLeft: "5px" }}
              src={RegistrationCertificate}
              alt='RegistrationCertificateIcon'
            />
          </Box>
          <Box ref={fake2Ref} width={"190px"} height={220}></Box>
        </Box>
      </Box>
    </StyledBox>
  );
};
const RegistrationTimelineMobile = ({
  containerPosition,
  setSelected,
  handleResize,
  data,
  loading,
  toggleCertificateModal
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
  setSelected: (registration: SPORegistration | null) => void;
  data: SPORegistrationDetail | null;
  loading: boolean;
  toggleCertificateModal: () => void;
}) => {
  useEffect(() => {
    handleResize();
  }, [loading]);

  const adaHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const registrationRef = useRef(null);
  const SPOInfoRef = useRef(null);
  const SPOKeyRef = useRef(null);
  const fake1Ref = useRef(null);
  const fake2Ref = useRef(null);
  const fake1CardanoSystemRef = useRef(null);
  const fake2CardanoSystemRef = useRef(null);
  const adaHolderRefImg = useRef(null);
  const cadarnoSystemRefImg = useRef(null);

  if (loading) {
    return (
      <StyledSkeletonContainer>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={1} mb={2}>
          <IconButtonBack onClick={() => setSelected(null)}>
            <BackIcon />
          </IconButtonBack>
          <Box display={"flex"}>
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
          </Box>
        </Box>
        <Box component={Skeleton} width={"100%"} height={400} variant='rectangular' borderRadius={12} />
      </StyledSkeletonContainer>
    );
  }

  return (
    <StyledBox>
      <Box>
        <Box className='list-images' display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"50px"}>
          <Box
            ref={adaHolderRef}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            width={"100%"}
            position={"relative"}
          >
            <Box ref={fake1Ref} width={"2px"} height={"190px"}></Box>
            <Box ref={adaHolderRefImg} width={190} height={245} position={"relative"}>
              <SPOStalking />
              <CustomTooltip title={data?.poolName}>
                <PoolName> {data?.poolName}</PoolName>
              </CustomTooltip>
              <PopoverStyled
                render={({ handleClick }) => (
                  <ButtonSPO
                    ref={SPOInfoRef}
                    component={IconButton}
                    left={"33%"}
                    onClick={() => SPOInfoRef?.current && handleClick(SPOInfoRef.current)}
                  >
                    <SPOInfo />
                  </ButtonSPO>
                )}
                content={
                  <Box>
                    <Box display={"flex"} alignItems={"center"}>
                      <Box fontSize='1.125rem' color={({ palette }) => palette.grey[400]}>
                        Pool ID:
                      </Box>
                      <PoolNamePopup to={details.delegation(data?.poolView)}>
                        {getShortHash(data?.poolView || "")}
                      </PoolNamePopup>
                      <CopyButton text={data?.poolView} />
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                      <Box fontSize='1.125rem' color={({ palette }) => palette.grey[400]}>
                        Pool name:
                      </Box>
                      <PoolNamePopup to={details.delegation(data?.poolView)}>{data?.poolName}</PoolNamePopup>
                    </Box>
                  </Box>
                }
              />
              <PopoverStyled
                render={({ handleClick }) => (
                  <ButtonSPO
                    ref={SPOKeyRef}
                    component={IconButton}
                    left={"52%"}
                    onClick={() => SPOKeyRef?.current && handleClick(SPOKeyRef.current)}
                  >
                    <SPOKey fill='#438F68' />
                  </ButtonSPO>
                )}
                content={
                  <Box display={"flex"} alignItems={"center"}>
                    {data?.stakeKeys && data.stakeKeys.length > 0 && (
                      <>
                        <SPOKey fill='#108AEF' />
                        <PoolNamePopup to={details.stake(data?.stakeKeys[0] || "")}>
                          {getShortWallet(data?.stakeKeys[0] || "")}
                        </PoolNamePopup>
                        <CopyButton text={data?.stakeKeys[0]} />
                      </>
                    )}
                  </Box>
                }
              />
            </Box>
            <Box ref={fake2Ref} position={"absolute"} width={"1px"} height={"100%"} right={"0px"}></Box>
          </Box>

          <Box display={"flex"} width={"100%"} flexDirection={"row"} justifyContent={"space-between"}>
            <Box
              ref={registrationRef}
              padding={"24px"}
              sx={{ background: "#fff", borderRadius: "12px" }}
              onClick={toggleCertificateModal}
            >
              <img src={PoolCertificateMobile} width={"90px"} height={"150px"} alt='RegistrationCertificateIcon' />
            </Box>

            <Box display={"flex"} flexDirection={"column"} position={"relative"}>
              <PopoverStyled
                render={({ handleClick }) => (
                  <HoldBox ref={holdRef} ml={1}>
                    <Box>
                      <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                        {formatADA(data?.deposit || 0)}
                      </Box>
                      <ADAicon fontSize='18px' />
                    </Box>
                    <IconButton onClick={() => holdRef?.current && handleClick(holdRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </HoldBox>
                )}
                content={<PopupStaking hash={data?.txHash || ""} />}
              />
              <PopoverStyled
                render={({ handleClick }) => (
                  <FeeBox ref={feeRef}>
                    <Box>
                      <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                        {formatADA(data?.fee || 0)}
                      </Box>
                      <ADAicon fontSize='18px' />
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

          <Box
            ref={cadarnoSystemRef}
            height={215}
            width={190}
            position={"relative"}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"row"}
            alignItems={"flex-end"}
            sx={{ width: "100%", paddingTop: "3px" }}
          >
            <Box ref={fake1CardanoSystemRef} width={"1px"} height={"170px"}></Box>
            <Box ref={cadarnoSystemRefImg}>
              <img src={cadarnoSystem} alt='carrdano' />
            </Box>
            <Box ref={fake2CardanoSystemRef} position={"absolute"} width={"1px"} height={"100%"} right={"0px"}></Box>
          </Box>

          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "150vh",
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
              orient='horizontal'
              connectToReverse
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={fake1Ref}
              toRef={fake1CardanoSystemRef}
              pointTo='border'
              pointFrom='border'
              orient='horizontal'
              connectToReverse
            />
            <Line
              containerPosition={containerPosition}
              fromRef={cadarnoSystemRefImg}
              toRef={cadarnoSystemRef}
              pointTo='border'
              pointFrom='border'
              orient='vertical'
              connectToReverse
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={adaHolderRefImg}
              pointTo='border'
              pointFrom='border'
              orient='vertical'
              connectToReverse
            />
            <Line
              containerPosition={containerPosition}
              fromRef={fake2CardanoSystemRef}
              toRef={fake2Ref}
              pointTo='center'
              pointFrom='center'
              orient='horizontal'
              isCentalHorizontal
            />
          </svg>
        </Box>
      </Box>
    </StyledBox>
  );
};

export const RegistrationCertificateModal = ({
  poolId,
  poolUpdateId,
  ...props
}: {
  open: boolean;
  poolId: string;
  poolUpdateId: number;
  handleCloseModal: () => void;
}) => {
  const { data, loading } = useFetch<SPORegistrationDetail>(
    poolUpdateId ? API.SPO_LIFECYCLE.SPO_REGISTRATION_DETAIl(poolId, poolUpdateId) : ""
  );
  const { isMobile } = useScreen();

  return (
    <StyledModal {...props} title='Pool Registration certificate'>
      <StyledGridContainer container spacing={1}>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Transaction ID
            </Box>
            {loading && <Skeleton variant='rectangular' />}
            {data && !loading && (
              <Box>
                <Link to={details.transaction(data?.txHash || "")}>
                  {isMobile ? getShortWallet(data?.txHash || "") : getShortHash(data?.txHash || "")}
                </Link>{" "}
                <CopyButton text={data?.txHash || ""} />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Pool ID
            </Box>
            {loading && <Skeleton variant='rectangular' />}
            {data && !loading && (
              <Box>
                <Link to={details.delegation(data?.poolView || "")}>
                  {isMobile ? getShortWallet(data?.poolView || "") : getShortHash(data?.poolView || "")}
                </Link>{" "}
                <CopyButton text={data?.poolView || ""} />
              </Box>
            )}
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              VRF Key
            </Box>
            {loading && <Skeleton variant='rectangular' />}
            {data && !loading && (
              <Box>
                <Box display={"inline"} fontSize='0.875rem' color={({ palette }) => palette.blue[800]}>
                  {isMobile ? getShortWallet(data?.vrfKey || "") : getShortHash(data?.vrfKey || "")}
                </Box>{" "}
                <CopyButton text={data?.vrfKey || ""} />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Owners
            </Box>
            {loading && <Skeleton variant='rectangular' />}
            {data && !loading && (
              <>
                {(data.stakeKeys || []).map((item) => (
                  <>
                    <Box key={item}>
                      <Link to={details.stake(item || "")}>{getShortWallet(item)}</Link>{" "}
                      <CopyButton text={item || ""} />
                    </Box>
                  </>
                ))}
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Reward Account
            </Box>
            {loading && <Skeleton variant='rectangular' />}
            {data && !loading && (
              <Box>
                <Link to={details.stake(data?.rewardAccount || "")}>{getShortWallet(data?.rewardAccount || "")}</Link>{" "}
                <CopyButton text={data?.rewardAccount || ""} />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Margin
            </Box>
            {loading && <Skeleton variant='rectangular' />}
            {data && !loading && (
              <Box display={"inline"} fontSize='0.875rem'>
                {data?.margin ? numberWithCommas(data?.margin * 100, 2) : 0}%
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Pledge
            </Box>
            {loading && <Skeleton variant='rectangular' />}
            {data && !loading && (
              <Box display={"inline"} fontSize='0.875rem'>
                {formatADA(data?.pledge)} <ADAicon />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Cost
            </Box>
            {loading && <Skeleton variant='rectangular' />}
            {data && !loading && (
              <Box display={"inline"} fontSize='0.875rem'>
                {formatADA(data?.cost)} <ADAicon />
              </Box>
            )}
          </Box>
        </Grid>
      </StyledGridContainer>
    </StyledModal>
  );
};

const Link = styled(LinkDom)(({ theme }) => ({
  fontSize: "0.875rem",
  color: `${theme.palette.blue[800]} !important`
}));
