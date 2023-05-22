import { alpha, Box, Skeleton, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link as LinkDom, useHistory, useParams } from "react-router-dom";

import {
  ADAHolderIcon,
  ButtonListIcon,
  BackIcon,
  AddressIcon,
  ADAGreen,
  TimeIcon
} from "../../../../commons/resources";
import cadarnoSystem from "../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg";
import DeregistrationCertificate from "../../../../commons/resources/icons/Staking/DeregistrationCertificateIcon.svg";
import DeregistrationCertificateMobile from "../../../../commons/resources/icons/Staking/DeregistrationCertificateMobile.svg";

import Line from "../../../Line";
import { FeeBox, HoldBox, IconButton, IconButtonBack, Info, InfoGroup, InfoText, StepInfo } from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import ArrowDiagram from "../../../ArrowDiagram";
import RecentDeregistrations from "./RecentDeregistration";
import { formatADA, formatDateTimeLocal, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import moment from "moment";
import PopoverStyled from "../../../commons/PopoverStyled";
import PopupStaking from "../../../commons/PopupStaking";
import { details } from "../../../../commons/routers";
import StyledModal from "../../../commons/StyledModal";
import useFetch from "../../../../commons/hooks/useFetch";
import { API } from "../../../../commons/utils/api";
import CopyButton from "../../../commons/CopyButton";
import CustomTooltip from "../../../commons/CustomTooltip";
import { StyledCopyButton } from "../../SPOLifecycle/Registration/styles";
import { useScreen } from "../../../../commons/hooks/useScreen";
import { StakeLink } from "../Registration/styles";
import { FilterParams } from "~/components/StackingFilter";

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
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [selected, setSelected] = useState<DeregistrationItem | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });
  const handleSelect = (deregistration: DeregistrationItem | null) => {
    setSelected(deregistration);
  };

  const handleToggleModal = () => setOpenModal((state) => !state);

  const { isLargeTablet } = useScreen();

  return (
    <Box>
      <DeregistrationCertificateModal open={openModal} handleCloseModal={handleToggleModal} stake={stakeId} />
      <Box>
        <RecentDeregistrations onSelect={handleSelect} params={params} setParams={setParams} />
      </Box>
      {selected &&
        (isLargeTablet ? (
          <DeregistrationTimelineMobile
            handleResize={handleResize}
            setSelected={setSelected}
            selected={selected}
            containerPosition={containerPosition}
            toggleModal={handleToggleModal}
          />
        ) : (
          <DeregistrationTimeline
            handleResize={handleResize}
            selected={selected}
            containerPosition={containerPosition}
            toggleModal={handleToggleModal}
          />
        ))}
    </Box>
  );
};
export default Deregistration;

const DeregistrationTimeline = ({
  containerPosition,
  handleResize,
  selected,
  toggleModal
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
  selected: DeregistrationItem;
  toggleModal: () => void;
}) => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const history = useHistory();

  const adaHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const fake1Ref = useRef(null);
  const fake2Ref = useRef(null);
  const registrationRef = useRef(null);

  useEffect(() => {
    handleResize();
  }, [selected]);

  const handleBack = () => {
    history.push(details.staking(stakeId, "timeline", "deregistration"));
  };

  return (
    <Box>
      <StepInfo>
        <IconButtonBack onClick={handleBack}>
          <BackIcon />
        </IconButtonBack>
        <InfoGroup>
          <Info>
            <AddressIcon fill='#438F68' />
            <CustomTooltip title={selected.txHash}>
              <InfoText>{getShortHash(selected.txHash || "")}</InfoText>
            </CustomTooltip>
            <StyledCopyButton text={selected.txHash} />
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADA(Math.abs(selected.deposit) - selected.fee || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{formatDateTimeLocal(selected.time)}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
          <Box ref={adaHolderRef} width={190} height={215}>
            <ADAHolderIcon />
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"relative"}
            bottom={"-20px"}
          >
            <Box display={"flex"} flex={1}>
              <PopoverStyled
                render={({ handleClick }) => (
                  <HoldBox ref={holdRef} ml={1} width={200}>
                    <Box>
                      <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                        {formatADA(Math.abs(selected.deposit || 0))}
                      </Box>
                      <ADAicon fontSize='18px' />
                    </Box>
                    <IconButton onClick={() => holdRef?.current && handleClick(holdRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </HoldBox>
                )}
                content={<PopupStaking hash={selected.txHash || ""} />}
              />
              <PopoverStyled
                render={({ handleClick }) => (
                  <FeeBox ref={feeRef} width={200}>
                    <Box>
                      <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                        {formatADA(selected.fee || 0)}
                      </Box>
                      <ADAicon fontSize='18px' />
                    </Box>
                    <IconButton onClick={() => feeRef?.current && handleClick(feeRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </FeeBox>
                )}
                content={<PopupStaking hash={selected.txHash || ""} />}
              />
            </Box>
          </Box>
          <Box ref={cadarnoSystemRef} width={190} height={215}>
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
            <Line
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={feeRef}
              pointTo='border'
              pointFrom='border'
              orient='vertical'
              isCentalVertical={false}
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={feeRef}
              toRef={cadarnoSystemRef}
              pointTo='border'
              pointFrom='border'
              isCentalHorizontal={false}
              orient='vertical'
            />
            <Line
              containerPosition={containerPosition}
              fromRef={cadarnoSystemRef}
              toRef={holdRef}
              orient='vertical'
              pointFrom='border'
              pointTo='center'
              connectToReverse={true}
              connectFromReverse={true}
              isCentalVertical={false}
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
        <Box display={"flex"} justifyContent={"space-between"} position={"relative"} top={"-20px"}>
          <Box ref={fake1Ref} width={"190px"} height={220}></Box>
          <Box
            p={0}
            component={IconButton}
            bgcolor={"transparent"}
            onClick={toggleModal}
            ref={registrationRef}
            width={220}
            height={220}
          >
            <Box component={"img"} borderRadius={2} src={DeregistrationCertificate} alt='DeregistrationCertificate' />
          </Box>
          <Box ref={fake2Ref} width={"190px"} height={220}></Box>
        </Box>
      </Box>
    </Box>
  );
};
const DeregistrationTimelineMobile = ({
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
  handleResize: () => void;
  setSelected: (deregistration: DeregistrationItem | null) => void;
  selected: DeregistrationItem;
  toggleModal: () => void;
}) => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();

  const adaHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const imgCadarnoSystemRef = useRef(null);
  const fake1Ref = useRef(null);
  const fake2Ref = useRef(null);
  const registrationRef = useRef(null);
  const history = useHistory();
  const { isMobile } = useScreen();

  useEffect(() => {
    handleResize();
  }, [selected]);

  const handleBack = () => {
    history.goBack();
    setSelected(null);
  };

  return (
    <Box>
      <StepInfo>
        <IconButtonBack onClick={handleBack}>
          <BackIcon />
        </IconButtonBack>
        <InfoGroup>
          <Info>
            <AddressIcon fill='#438F68' />
            <CustomTooltip title={selected.txHash}>
              <InfoText>{getShortHash(selected.txHash || "")}</InfoText>
            </CustomTooltip>
            <StyledCopyButton text={selected.txHash} />
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADA(Math.abs(selected.deposit) - selected.fee || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{formatDateTimeLocal(selected.time)}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <Box margin='0 auto' width={"350px"}>
        <Box>
          <Box ref={adaHolderRef} width={190} height={215} margin='0 auto' mt={5} pr={2} position={"relative"}>
            <ADAHolderIcon />
            <Box
              ref={fake2Ref}
              width={"300px"}
              height={645}
              position={"absolute"}
              right={"-100%"}
              bottom={"-100%"}
            ></Box>
          </Box>
          <Box display='flex' mt={5}>
            <Box p={0} component={IconButton} bgcolor={"transparent"} onClick={toggleModal} ref={registrationRef}>
              <img src={DeregistrationCertificateMobile} alt='DeregistrationCertificateMobile' />
            </Box>
            <Box mt={11}>
              <PopoverStyled
                render={({ handleClick }) => (
                  <HoldBox ref={holdRef} width={125} marginLeft={4}>
                    <Box>
                      <Box component={"span"} fontSize={"18px"} fontWeight={"bold"}>
                        {formatADA(Math.abs(selected.deposit || 0))}
                      </Box>
                      <ADAicon fontSize='18px' />
                    </Box>
                    <IconButton onClick={() => holdRef?.current && handleClick(holdRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </HoldBox>
                )}
                content={<PopupStaking hash={selected.txHash || ""} />}
              />
              <PopoverStyled
                render={({ handleClick }) => (
                  <FeeBox ref={feeRef} width={125}>
                    <Box>
                      <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                        {formatADA(selected.fee || 0)}
                      </Box>
                      <ADAicon fontSize='18px' />
                    </Box>
                    <IconButton onClick={() => feeRef?.current && handleClick(feeRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </FeeBox>
                )}
                content={<PopupStaking hash={selected.txHash || ""} />}
              />
            </Box>
          </Box>
          <Box ref={cadarnoSystemRef} width={190} height={70} margin='0 auto' mt={5} mb={15} position={"relative"}>
            <Box ref={imgCadarnoSystemRef} height={200}>
              <img src={cadarnoSystem} alt='carrdano' />
            </Box>
            <Box
              ref={fake1Ref}
              width={"250px"}
              height={70}
              position={"absolute"}
              right={"-100%"}
              bottom={"-100%"}
            ></Box>
          </Box>

          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: isMobile ? "150vh" : "115vh",
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
              connectFromReverse
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={cadarnoSystemRef}
              pointTo='center'
              pointFrom='center'
              orient='vertical'
              isCentalHorizontalFrom
              connectFromReverse
            />
            <Line
              containerPosition={containerPosition}
              fromRef={imgCadarnoSystemRef}
              toRef={fake1Ref}
              pointTo='center'
              pointFrom='center'
              orient='vertical'
              isCentalHorizontal
            />
            <Line
              containerPosition={containerPosition}
              fromRef={fake1Ref}
              toRef={fake2Ref}
              pointTo='center'
              pointFrom='center'
              orient='horizontal'
              isCentalHorizontal
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={fake2Ref}
              toRef={adaHolderRef}
              pointTo='border'
              pointFrom='center'
              orient='vertical'
              isCentalHorizontal
              connectToReverse
            />
          </svg>
        </Box>
      </Box>
    </Box>
  );
};

export const DeregistrationCertificateModal = ({
  stake,
  ...props
}: {
  stake: string;
  open: boolean;
  handleCloseModal: () => void;
}) => {
  const { data, loading } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stake}`, undefined, false);

  return (
    <StyledModal {...props} width={550} title='Deregistration certificate'>
      <Box>
        {loading && <Skeleton variant='rectangular' width={500} height={90} />}
        {!loading && (
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Stake Key
            </Box>
            {data && (
              <Box>
                <Box>
                  <StakeLink to={details.stake(stake)}>{stake || ""}</StakeLink>
                  <CopyButton text={stake} />
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </StyledModal>
  );
};

const Link = styled(LinkDom)(({ theme }) => ({
  fontSize: "0.875rem",
  color: `${theme.palette.blue[800]} !important`
}));
