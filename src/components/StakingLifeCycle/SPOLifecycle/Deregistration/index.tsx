import { alpha, Box, Grid, styled } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { Link as LinkDom } from "react-router-dom";

import {
  SPOStalking,
  ButtonListIcon,
  BackIcon,
  AddressIcon,
  ADAGreen,
  TimeIcon,
  SPOInfo,
  SPOKey,
} from "../../../../commons/resources";
import cadarnoSystem from "../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg";
import DelegationCertificateIcon from "../../../../commons/resources/icons/Staking/DelegationCertificateIcon.svg";

import Line from "../../../Line";
import { FeeBox, HoldBox, IconButton, IconButtonBack, Info, InfoText } from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import ArrowDiagram from "../../../ArrowDiagram";
import PopoverStyled from "../../../commons/PopoverStyled";
import RecentDeregistrations from "./RecentDeregistrations";
import { formatADA, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import moment from "moment";
import CustomTooltip from "../../../commons/CustomTooltip";
import { ButtonSPO, PoolName, PoolNamePopup } from "../Registration/styles";
import { details } from "../../../../commons/routers";
import CopyButton from "../../../commons/CopyButton";
import StyledModal from "../../../commons/StyledModal";
import PopupStaking from "../../../commons/PopupStaking";

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
  const [selected, setSelected] = useState<SPODeregistration | null>(null);

  return (
    <Box>
      <Box>{selected === null && <RecentDeregistrations onSelect={registration => setSelected(registration)} />}</Box>
      <Box>
        {!!selected && (
          <DeregistrationTimeline
            handleResize={handleResize}
            selected={selected}
            containerPosition={containerPosition}
            setSelected={setSelected}
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
  setSelected,
  handleResize,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
  setSelected: (registration: SPODeregistration | null) => void;
  selected: SPODeregistration | null;
}) => {
  const [openModal, setOpenModal] = useState(false);

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

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={1} mb={2}>
        <IconButtonBack onClick={() => setSelected(null)}>
          <BackIcon />
        </IconButtonBack>
        <Box display={"flex"}>
          <Info>
            <AddressIcon fill="#438F68" />
            <CustomTooltip title={selected?.txHash}>
              <InfoText>{getShortHash(selected?.txHash || "")}</InfoText>
            </CustomTooltip>
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
                    <Box fontSize="1.125rem" color={({ palette }) => palette.grey[400]}>
                      Pool ID:
                    </Box>
                    <PoolNamePopup to={details.delegation(selected?.poolView)}>
                      {getShortHash(selected?.poolView || "")}
                    </PoolNamePopup>
                    <CopyButton text={selected?.poolView} />
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    <Box fontSize="1.125rem" color={({ palette }) => palette.grey[400]}>
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
                  <SPOKey fill="#438F68" />
                </ButtonSPO>
              )}
              content={
                <Box display={"flex"} alignItems={"center"}>
                  {selected?.stakeKeys && selected.stakeKeys.length > 0 && (
                    <>
                      <SPOKey fill="#108AEF" />
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

          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Box display={"flex"} flex={1}>
              <PopoverStyled
                render={({ handleClick }) => (
                  <HoldBox ref={holdRef} ml={1}>
                    <Box>
                      <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                        {formatADA(selected?.poolHold)}
                      </Box>
                      <ADAicon fontSize="18px" />
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
                      <ADAicon fontSize="18px" />
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
            ref={registrationRef}
            width={220}
            height={220}
            component={IconButton}
            p={0}
            onClick={() => setOpenModal(true)}
          >
            <img style={{ marginLeft: "5px" }} src={DelegationCertificateIcon} alt="RegistrationCertificateIcon" />
          </Box>
          <Box ref={fake2Ref} width={"190px"} height={220}></Box>
        </Box>
      </Box>
      <DeregistrationCertificateModal data={selected} handleCloseModal={() => setOpenModal(false)} open={openModal} />
    </Box>
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
    <StyledModal {...props} title="Pool registration certificate">
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Pool ID
            </Box>
            {data && (
              <Box>
                <Link to={details.delegation(data?.poolView || "")}>{getShortWallet(data?.poolId || "")}</Link>{" "}
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
            {data && <Box fontSize={"0.875rem"}>{data?.retiringEpoch}</Box>}
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
