import { alpha, Box, Grid, styled } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { Link as LinkDom, useHistory, useParams } from "react-router-dom";

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
import DeregistrationCertificateIcon from "../../../../commons/resources/icons/Staking/DeregistrationCertificateIcon.svg";
import DeregistrationCertificateMobile from "../../../../commons/resources/icons/Staking/DeregistrationCertificateMobile.svg";

import Line from "../../../Line";
import {
  CustomLink,
  DetailRetirement,
  FeeBox,
  HoldBox,
  HoldBoxText,
  IconButton,
  IconButtonBack,
  Info,
  InfoText,
  StyledBox
} from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import ArrowDiagram from "../../../ArrowDiagram";
import PopoverStyled from "../../../commons/PopoverStyled";
import RecentDeregistrations from "./RecentDeregistrations";
import { formatADA, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import moment from "moment";
import CustomTooltip from "../../../commons/CustomTooltip";
import { ButtonSPO, PoolName, PoolNamePopup, StyledCopyButton } from "../Registration/styles";
import { details } from "../../../../commons/routers";
import CopyButton from "../../../commons/CopyButton";
import StyledModal from "../../../commons/StyledModal";
import PopupStaking from "../../../commons/PopupStaking";
import { StyledLink } from "../styles";
import { useScreen } from "../../../../commons/hooks/useScreen";
const Deregistration = ({
  containerPosition,
  handleResize
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
}) => {
  const [selected, setSelected] = useState<SPODeregistration | null>(null);
  const { isLargeTablet } = useScreen();

  const handleSelect = (deregistration: SPODeregistration | null) => {
    setSelected(deregistration);
  };
  return (
    <Box>
      <Box>
        <RecentDeregistrations onSelect={handleSelect} />
      </Box>
      <Box>
        {!!selected && !isLargeTablet && (
          <DeregistrationTimeline
            handleResize={handleResize}
            selected={selected}
            containerPosition={containerPosition}
          />
        )}
        {!!selected && isLargeTablet && (
          <DeregistrationTimelineMobile
            handleResize={handleResize}
            selected={selected}
            containerPosition={containerPosition}
          />
        )}
      </Box>
    </Box>
  );
};
export default Deregistration;

const DeregistrationTimeline = ({
  containerPosition,
  selected,
  handleResize
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
  selected: SPODeregistration | null;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const { poolId = "" } = useParams<{ poolId: string }>();
  const history = useHistory();

  const adaHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const fake1Ref = useRef(null);
  const fake2Ref = useRef(null);
  const registrationRef = useRef(null);
  const SPOInfoRef = useRef(null);
  const SPOKeyRef = useRef(null);

  useEffect(() => {
    handleResize();
  }, [adaHolderRef.current]);

  const handleBack = () => {
    history.push(details.spo(poolId, "timeline", "deregistration"));
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={1} mb={2}>
        <IconButtonBack onClick={handleBack}>
          <BackIcon />
        </IconButtonBack>
        <Box display={"flex"}>
          <Info>
            <AddressIcon fill='#438F68' />
            <CustomTooltip title={selected?.txHash}>
              <InfoText>
                <StyledLink to={details.transaction(selected?.txHash)}>
                  {getShortHash(selected?.txHash || "")}
                </StyledLink>
              </InfoText>
            </CustomTooltip>
            <StyledCopyButton text={selected?.txHash} />
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADA(selected?.totalFee || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{moment(selected?.time).format("MM/DD/yyyy HH:mm:ss")}</InfoText>
          </Info>
        </Box>
      </Box>
      <Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
          <Box ref={adaHolderRef} width={190} height={245} position={"relative"}>
            <SPOStalking />
            <CustomTooltip title={selected?.poolName}>
              <PoolName> {selected?.poolName}</PoolName>
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
                    <PoolNamePopup to={details.delegation(selected?.poolView)}>
                      {getShortHash(selected?.poolView || "")}
                    </PoolNamePopup>
                    <CopyButton text={selected?.poolView} />
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    <Box fontSize='1.125rem' color={({ palette }) => palette.grey[400]}>
                      Pool name:
                    </Box>
                    <PoolNamePopup to={details.delegation(selected?.poolView)}>{selected?.poolName}</PoolNamePopup>
                  </Box>
                </Box>
              }
            >
              <ButtonSPO ref={SPOInfoRef} component={IconButton} left={"33%"}>
                <SPOInfo />
              </ButtonSPO>
            </CustomTooltip>
            <Link to={details.stake(selected?.stakeKeys[0] || "")}>
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
                    {selected?.stakeKeys && selected.stakeKeys.length > 0 && (
                      <>
                        <SPOKey fill='#108AEF' />
                        <PoolNamePopup to={details.stake(selected?.stakeKeys[0] || "")}>
                          {getShortWallet(selected?.stakeKeys[0] || "")}
                        </PoolNamePopup>
                        <CopyButton text={selected?.stakeKeys[0]} />
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
                      <HoldBoxText mr={1} component={"span"}>
                        {formatADA(selected?.poolHold)}
                      </HoldBoxText>
                      <ADAicon fontSize='18px' />
                    </Box>
                    <IconButton onClick={() => holdRef?.current && handleClick(holdRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </HoldBox>
                )}
                content={<PopupStaking hash={selected?.txHash || ""} />}
              />
              <PopoverStyled
                render={({ handleClick }) => (
                  <FeeBox ref={feeRef}>
                    <Box>
                      <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                        {formatADA(selected?.fee)}
                      </Box>
                      <ADAicon fontSize='18px' />
                    </Box>
                    <IconButton onClick={() => feeRef?.current && handleClick(feeRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </FeeBox>
                )}
                content={<PopupStaking hash={selected?.txHash || ""} />}
              />
            </Box>
          </Box>
          <Box ref={cadarnoSystemRef}>
            {/* <CadarnoSystemIcon /> */}
            <img style={{ marginLeft: "5px" }} src={cadarnoSystem} alt='carrdano' />
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
              fromRef={cadarnoSystemRef}
              toRef={holdRef}
              orient='vertical'
              pointFrom='border'
              pointTo='border'
              connectToReverse={true}
              connectFromReverse={true}
              isCentalVertical={false}
              isCentalHorizontal
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={holdRef}
              toRef={adaHolderRef}
              pointTo='border'
              pointFrom='border'
              orient='vertical'
              connectToReverse={true}
              connectFromReverse={true}
              isCentalHorizontal={false}
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
            onClick={() => setOpenModal(true)}
          >
            <img style={{ marginLeft: "5px" }} src={DeregistrationCertificateIcon} alt='RegistrationCertificateIcon' />
          </Box>
          <Box ref={fake2Ref} width={"190px"} height={220}></Box>
        </Box>
      </Box>

      <DeregistrationCertificateModal data={selected} handleCloseModal={() => setOpenModal(false)} open={openModal} />
    </Box>
  );
};

const DeregistrationTimelineMobile = ({
  containerPosition,
  selected,
  handleResize
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
  selected: SPODeregistration | null;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const { poolId = "" } = useParams<{ poolId: string }>();

  const adaHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const fake1Ref = useRef(null);
  const fake2Ref = useRef(null);
  const registrationRef = useRef(null);
  const SPOInfoRef = useRef(null);
  const SPOKeyRef = useRef(null);
  const fake1CardanoSystemRef = useRef(null);
  const fake2CardanoSystemRef = useRef(null);
  const adaHolderRefImg = useRef(null);
  const cadarnoSystemRefImg = useRef(null);

  const handleBack = () => {
    history.push(details.spo(poolId, "timeline", "deregistration"));
  };

  useEffect(() => {
    handleResize();
  }, [adaHolderRef.current]);

  return (
    <StyledBox>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={1} mb={2}>
        <IconButtonBack onClick={handleBack}>
          <BackIcon />
        </IconButtonBack>
        <Box display={"flex"}>
          <Info>
            <AddressIcon fill='#438F68' />
            <CustomTooltip title={selected?.txHash}>
              <InfoText>{getShortHash(selected?.txHash || "")}</InfoText>
            </CustomTooltip>
            <StyledCopyButton text={selected?.txHash} />
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADA(selected?.totalFee || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{moment(selected?.time).format("MM/DD/yyyy HH:mm:ss")}</InfoText>
          </Info>
        </Box>
      </Box>

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
            <CustomTooltip title={selected?.poolName}>
              <PoolName> {selected?.poolName}</PoolName>
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
                    <PoolNamePopup to={details.delegation(selected?.poolView)}>
                      {getShortHash(selected?.poolView || "")}
                    </PoolNamePopup>
                    <CopyButton text={selected?.poolView} />
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    <Box fontSize='1.125rem' color={({ palette }) => palette.grey[400]}>
                      Pool name:
                    </Box>
                    <PoolNamePopup to={details.delegation(selected?.poolView)}>{selected?.poolName}</PoolNamePopup>
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
                  {selected?.stakeKeys && selected.stakeKeys.length > 0 && (
                    <>
                      <SPOKey fill='#108AEF' />
                      <PoolNamePopup to={details.stake(selected?.stakeKeys[0] || "")}>
                        {getShortWallet(selected?.stakeKeys[0] || "")}
                      </PoolNamePopup>
                      <CopyButton text={selected?.stakeKeys[0]} />
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
            onClick={() => setOpenModal(true)}
          >
            <img
              src={DeregistrationCertificateMobile}
              width={"90px"}
              height={"150px"}
              alt='RegistrationCertificateIcon'
            />
          </Box>

          <Box display={"flex"} flexDirection={"column"} position={"relative"}>
            <PopoverStyled
              render={({ handleClick }) => (
                <HoldBox ref={holdRef} ml={1}>
                  <Box>
                    <HoldBoxText mr={1} component={"span"}>
                      {formatADA(selected?.poolHold)}
                    </HoldBoxText>
                    <ADAicon fontSize='18px' />
                  </Box>
                  <IconButton onClick={() => holdRef?.current && handleClick(holdRef.current)}>
                    <ButtonListIcon />
                  </IconButton>
                </HoldBox>
              )}
              content={<PopupStaking hash={selected?.txHash || ""} />}
            />
            <PopoverStyled
              render={({ handleClick }) => (
                <FeeBox ref={feeRef}>
                  <Box>
                    <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                      {formatADA(selected?.fee)}
                    </Box>
                    <ADAicon fontSize='18px' />
                  </Box>
                  <IconButton onClick={() => feeRef?.current && handleClick(feeRef.current)}>
                    <ButtonListIcon />
                  </IconButton>
                </FeeBox>
              )}
              content={<PopupStaking hash={selected?.txHash || ""} />}
            />
          </Box>
        </Box>

        <Box
          position={"relative"}
          ref={cadarnoSystemRef}
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

      <DeregistrationCertificateModal data={selected} handleCloseModal={() => setOpenModal(false)} open={openModal} />
    </StyledBox>
  );
};
export const DeregistrationCertificateModal = ({
  data,
  ...props
}: {
  open: boolean;
  data: SPODeregistration | null;
  handleCloseModal: () => void;
}) => {
  return (
    <StyledModal {...props} title='Deregistration certificate'>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Pool ID
            </Box>
            {data && (
              <Box>
                <CustomTooltip title={data?.poolId || ""}>
                  <CustomLink to={details.delegation(data?.poolView || "")}>
                    {getShortWallet(data?.poolId || "")}
                  </CustomLink>
                </CustomTooltip>
                <CopyButton text={data?.poolId || ""} />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Retirement in Epoch
            </Box>
            {data && (
              <DetailRetirement pt={"3px"} pb={"5px"}>
                {data?.retiringEpoch}
              </DetailRetirement>
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
