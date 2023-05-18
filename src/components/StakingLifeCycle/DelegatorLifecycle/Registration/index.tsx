import { alpha, Box, Skeleton, useTheme } from "@mui/material";
import { useRef, useState, useEffect } from "react";

import {
  ADAHolderIcon,
  ButtonListIcon,
  BackIcon,
  AddressIcon,
  ADAGreen,
  TimeIcon
} from "../../../../commons/resources";
import cadarnoSystem from "../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg";
import RegistrationCertificate from "../../../../commons/resources/icons/Staking/RegistrationCertificateIcon.svg";
import RegistrationCertificateMobile from "../../../../commons/resources/icons/Staking/RegistrationCertificateMobile.svg";

import Line from "../../../Line";
import { FeeBox, HoldBox, IconButton, IconButtonBack, Info, InfoText, StakeLink } from "./styles";
import { AdaLogoIcon } from "../../../commons/ADAIcon";
import ArrowDiagram from "../../../ArrowDiagram";
import RecentRegistrations from "./RecentRegistrations";
import PopoverStyled from "../../../commons/PopoverStyled";
import { formatADAFull, getShortHash } from "../../../../commons/utils/helper";
import moment from "moment";
import PopupStaking from "../../../commons/PopupStaking";
import StyledModal from "../../../commons/StyledModal";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../../../../commons/hooks/useFetch";
import { API } from "../../../../commons/utils/api";
import { details } from "../../../../commons/routers";
import CopyButton from "../../../commons/CopyButton";
import CustomTooltip from "../../../commons/CustomTooltip";
import { StyledCopyButton } from "../../SPOLifecycle/Registration/styles";
import { useScreen } from "~/commons/hooks/useScreen";

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
  const [selected, setSelected] = useState<RegistrationItem | null>(null);

  const handleSelect = (registration: RegistrationItem | null) => {
    setSelected(registration);
  };

  const { isLargeTablet } = useScreen();

  return (
    <Box>
       <Box>
        <RecentRegistrations onSelect={handleSelect} />
      </Box>
      <Box>
        {selected && (isLargeTablet ? (
          <RegistrationTimelineMobile
            handleResize={handleResize}
            setSelected={setSelected}
            containerPosition={containerPosition}
            registration={selected}
          />
        ) : (<RegistrationTimeline
          handleResize={handleResize}
          containerPosition={containerPosition}
          registration={selected}
        />))}
      </Box>
    </Box>
  );
};
export default Registration;

const RegistrationTimeline = ({
  containerPosition,
  handleResize,
  registration
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
  registration: RegistrationItem;
}) => {
  const { deposit, fee, time, txHash } = registration;
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const history = useHistory();
  const theme = useTheme();

  const adaHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const fake1Ref = useRef(null);
  const fake2Ref = useRef(null);
  const registrationRef = useRef(null);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    handleResize();
  }, [registration]);

  const handleBack = () => {
    history.push(details.staking(stakeId, "timeline", "registration"));
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
            <CustomTooltip title={txHash}>
              <InfoText>{getShortHash(txHash || "")}</InfoText>
            </CustomTooltip>
            <StyledCopyButton text={txHash} />
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADAFull(deposit + fee || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{moment(time).format("MM/DD/yyyy HH:mm:ss")}</InfoText>
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
                render={({ handleClick }: any) => (
                  <HoldBox ref={holdRef} style={{ transform: "translateX(8px)" }} height={35} width={200}>
                    <Box>
                      <Box
                        component={"span"}
                        fontSize={"18px"}
                        fontWeight={"bold"}
                        mr={1}
                        color={(theme) => theme.palette.common.black}
                      >
                        {formatADAFull(deposit || 0, 1)}
                      </Box>
                      <AdaLogoIcon fontSize={14} color={theme.palette.text.secondary} />
                    </Box>
                    <IconButton onClick={() => holdRef?.current && handleClick(holdRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </HoldBox>
                )}
                content={<PopupStaking hash={txHash} />}
              />
              <PopoverStyled
                render={({ handleClick }) => (
                  <FeeBox ref={feeRef} height={35} width={200}>
                    <Box>
                      <Box
                        component={"span"}
                        fontSize={"18px"}
                        fontWeight={"bold"}
                        mr={1}
                        color={(theme) => theme.palette.common.black}
                      >
                        {formatADAFull(fee || 0)}
                      </Box>
                      <AdaLogoIcon fontSize={14} color={theme.palette.text.secondary} />
                    </Box>
                    <IconButton onClick={() => feeRef?.current && handleClick(feeRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </FeeBox>
                )}
                content={<PopupStaking hash={txHash} />}
              />
            </Box>
          </Box>
          <Box ref={cadarnoSystemRef} width={200} height={220}>
            <img style={{ margin: "0px 5px", width: 190, height: 215 }} src={cadarnoSystem} alt='carrdano' />
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
          <Box ref={fake1Ref} width={"190px"}></Box>
          <Box
            component={IconButton}
            bgcolor={"transparent"}
            onClick={() => setOpenModal(true)}
            ref={registrationRef}
            width={220}
            height={220}
          >
            <Box
              component={"img"}
              style={{ marginLeft: "5px" }}
              src={RegistrationCertificate}
              alt='RegistrationCertificateIcon'
            />
          </Box>
          <Box ref={fake2Ref} width={"200px"}></Box>
        </Box>
      </Box>
      <RegistrationCertificateModal open={openModal} handleCloseModal={() => setOpenModal(false)} stake={stakeId} />
    </Box>
  );
};
const RegistrationTimelineMobile = ({
  containerPosition,
  setSelected,
  handleResize,
  registration
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  setSelected: (registration: RegistrationItem | null) => void;
  handleResize: () => void;
  registration: RegistrationItem;
}) => {
  const { deposit, fee, time, txHash } = registration;
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const theme = useTheme();

  const adaHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const registrationRef = useRef(null);
  const history = useHistory();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    handleResize();
  }, [registration]);

  const handleBack = () => {
    history.goBack()
  };

  return (
    <Box>
      <Box display='flex' alignItems='flex-start' justifyContent='space-between' mt={1}>
        <IconButtonBack onClick={handleBack}>
          <BackIcon />
        </IconButtonBack>
        <Box display={"flex"} flexDirection='column'>
          <Info>
            <AddressIcon fill='#438F68' />
            <CustomTooltip title={txHash}>
              <InfoText>{getShortHash(txHash || "")}</InfoText>
            </CustomTooltip>
            <StyledCopyButton text={txHash} />
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADAFull(deposit + fee || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{moment(time).format("MM/DD/yyyy HH:mm:ss")}</InfoText>
          </Info>
        </Box>
      </Box>
      <Box margin="0 auto" width={"350px"}>
        <Box>
          <Box ref={adaHolderRef} width={190} height={215} margin='0 auto' mt={3} >
            <ADAHolderIcon />
          </Box>
          <Box display='flex' mt={5}>
            <Box>
              <Box
                component={IconButton}
                bgcolor={"transparent"}
                onClick={() => setOpenModal(true)}
                ref={registrationRef}
                width={140}
                height={210}
              >
                <img
                  style={{ marginLeft: "5px" }}
                  src={RegistrationCertificateMobile}
                  alt='RegistrationCertificateMobile'
                />
              </Box>
              <Box width={"200px"}></Box>
            </Box>
            <Box display='flex' flexDirection='column' justifyContent='space-between' mb={2}>
              <PopoverStyled
                render={({ handleClick }: any) => (
                  <HoldBox ref={holdRef} style={{ transform: "translateX(8px)" }} height={25} width={100}>
                    <Box>
                      <Box
                        component={"span"}
                        fontSize={"18px"}
                        fontWeight={"bold"}
                        mr={1}
                        color={(theme) => theme.palette.common.black}
                      >
                        {formatADAFull(deposit || 0, 1)}
                      </Box>
                      <AdaLogoIcon fontSize={14} color={theme.palette.text.secondary} />
                    </Box>
                    <IconButton onClick={() => holdRef?.current && handleClick(holdRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </HoldBox>
                )}
                content={<PopupStaking hash={txHash} />}
              />
              <PopoverStyled
                render={({ handleClick }) => (
                  <FeeBox ref={feeRef} height={25} width={100}>
                    <Box>
                      <Box
                        component={"span"}
                        fontSize={"18px"}
                        fontWeight={"bold"}
                        mr={1}
                        color={(theme) => theme.palette.common.black}
                      >
                        {formatADAFull(fee || 0)}
                      </Box>
                      <AdaLogoIcon fontSize={14} color={theme.palette.text.secondary} />
                    </Box>
                    <IconButton onClick={() => feeRef?.current && handleClick(feeRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </FeeBox>
                )}
                content={<PopupStaking hash={txHash} />}
              />
            </Box>
          </Box>

          <Box position={"relative"} mb={15}>
            <Box ref={cadarnoSystemRef} width={190} height={70} margin='0 auto' mt={5}>
              <img style={{ width: 190, height: 215 }} src={cadarnoSystem} alt='carrdano' />
            </Box>
          </Box>
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
            orient='vertical'
            pointFrom='border'
            pointTo='border'
            isCentalHorizontalFrom={true}
          />
          <ArrowDiagram
            containerPosition={containerPosition}
            fromRef={adaHolderRef}
            toRef={holdRef}
            orient='horizontal'
            pointFrom='center'
            pointTo='border'
            connectToReverse
            isCentalHorizontalFrom
          />
          <ArrowDiagram
            containerPosition={containerPosition}
            fromRef={holdRef}
            toRef={cadarnoSystemRef}
            orient='vertical'
            pointFrom='border'
            pointTo='border'
            isCentalHorizontalFrom
            connectToReverse
          />
        </svg>
      </Box>
      <RegistrationCertificateModal open={openModal} handleCloseModal={() => setOpenModal(false)} stake={stakeId} />
    </Box>
  );
};

export const RegistrationCertificateModal = ({
  stake,
  ...props
}: {
  stake: string;
  open: boolean;
  handleCloseModal: () => void;
}) => {
  const { data, loading } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stake}`, undefined, false);

  return (
    <StyledModal width={530} {...props} title='Registration certificate'>
      <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
        {loading && <Skeleton variant='rectangular' width={500} height={90} />}
        {!loading && (
          <Box>
            <Box fontWeight={"bold"} mb={1} fontSize={"1rem"} color={({ palette }) => palette.grey[400]}>
              STAKE KEY
            </Box>
            {data && (
              <Box>
                <StakeLink to={details.stake(stake)}>{stake || ""}</StakeLink>
                <CopyButton text={stake} />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </StyledModal>
  );
};
