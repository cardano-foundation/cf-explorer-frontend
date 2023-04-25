import { alpha, Box, Skeleton, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link as LinkDom, useParams } from "react-router-dom";

import {
  ADAHolderIcon,
  ButtonListIcon,
  BackIcon,
  AddressIcon,
  ADAGreen,
  TimeIcon,
} from "../../../../commons/resources";
import cadarnoSystem from "../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg";
import DeregistrationCertificate from "../../../../commons/resources/icons/Staking/DeregistrationCertificateIcon.svg";

import Line from "../../../Line";
import { FeeBox, HoldBox, IconButton, IconButtonBack, Info, InfoText } from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import ArrowDiagram from "../../../ArrowDiagram";
import RecentDeregistrations from "./RecentDeregistration";
import { formatADA, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import moment from "moment";
import PopoverStyled from "../../../commons/PopoverStyled";
import PopupStaking from "../../../commons/PopupStaking";
import { details } from "../../../../commons/routers";
import StyledModal from "../../../commons/StyledModal";
import useFetch from "../../../../commons/hooks/useFetch";
import { API } from "../../../../commons/utils/api";
import CopyButton from "../../../commons/CopyButton";

const Deregistration = ({
  containerPosition,
  handleResize,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
}) => {
  const [selected, setSelected] = useState<DeregistrationItem | null>(null);
  const handleSelect = (deregistration: DeregistrationItem) => {
    setSelected(deregistration);
  };

  return (
    <Box>
      <Box>{selected === null && <RecentDeregistrations onSelect={handleSelect} />}</Box>
      <Box>
        {!!selected && (
          <DeregistrationTimeline
            handleResize={handleResize}
            setSelected={setSelected}
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
  setSelected,
  handleResize,
  selected,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
  setSelected: (deregistration: DeregistrationItem | null) => void;
  selected: DeregistrationItem;
}) => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();

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
  }, [selected]);

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={1} mb={2}>
        <IconButtonBack onClick={() => setSelected(null)}>
          <BackIcon />
        </IconButtonBack>
        <Box display={"flex"}>
          <Info>
            <AddressIcon fill="#438F68" />
            <InfoText>{getShortHash(selected.txHash || "")}</InfoText>
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADA(selected.deposit + selected.fee || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{moment(selected.time).format("MM/DD/yyyy HH:mm:ss")}</InfoText>
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
                  <HoldBox ref={holdRef} ml={1}>
                    <Box>
                      <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                        {formatADA(selected.deposit || 0)}
                      </Box>
                      <ADAicon fontSize="18px" />
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
                  <FeeBox ref={feeRef}>
                    <Box>
                      <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                        {formatADA(selected.fee || 0)}
                      </Box>
                      <ADAicon fontSize="18px" />
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
          <Box ref={cadarnoSystemRef}>
            {/* <CadarnoSystemIcon /> */}
            <img style={{ marginLeft: "5px" }} src={cadarnoSystem} alt="carrdano" />
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
              fromRef={cadarnoSystemRef}
              toRef={holdRef}
              orient="vertical"
              pointFrom="border"
              pointTo="center"
              connectToReverse={true}
              connectFromReverse={true}
              isCentalVertical={false}
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={holdRef}
              toRef={adaHolderRef}
              pointTo="border"
              pointFrom="border"
              orient="vertical"
              connectToReverse={true}
              connectFromReverse={true}
              isCentalHorizontal={false}
            />
            <Line
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={fake1Ref}
              orient="horizontal"
              pointFrom="border"
              pointTo="center"
            />
            <ArrowDiagram
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
          <Box
            p={0}
            component={IconButton}
            bgcolor={"transparent"}
            onClick={() => setOpenModal(true)}
            ref={registrationRef}
            width={220}
            height={220}
          >
            <img src={DeregistrationCertificate} alt="DeregistrationCertificate" />
          </Box>
          <Box ref={fake2Ref} width={"190px"} height={220}></Box>
        </Box>
      </Box>
      <DeregistrationCertificateModal open={openModal} handleCloseModal={() => setOpenModal(false)} stake={stakeId} />
    </Box>
  );
};

const DeregistrationCertificateModal = ({
  stake,
  ...props
}: {
  stake: string;
  open: boolean;
  handleCloseModal: () => void;
}) => {
  const { data, loading } = useFetch<IStakeKeyDetail>(`${API.STAKE.DETAIL}/${stake}`, undefined, false);

  return (
    <StyledModal {...props} title="Registration certificate">
      <Box>
        {loading && <Skeleton variant="rectangular" width={500} height={90} />}
        {!loading && (
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Stake Key
            </Box>
            {data && (
              <Box>
                <Link to={details.stake(stake)}>{getShortWallet(stake || "")}</Link> <CopyButton text={stake} />
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
  color: `${theme.palette.blue[800]} !important`,
}));
