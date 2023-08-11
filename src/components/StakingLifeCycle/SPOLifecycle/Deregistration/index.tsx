import { Box, Grid, useTheme } from "@mui/material";
import { useRef, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";

import { BackIcon, AddressIcon, ADAsymbol, TimeIcon } from "src/commons/resources";
import { formatADAFull, formatDateTimeLocal, getShortHash, getShortWallet } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";
import CopyButton from "src/components/commons/CopyButton";
import StyledModal from "src/components/commons/StyledModal";
import SPOHolder from "src/components/commons/SPOHolder";
import HoldBoxSPO from "src/components/commons/HoldBoxSPO";
import FeeBoxSPO from "src/components/commons/FeeBoxSPO";
import CardanoBlockchain from "src/components/commons/CardanoBlockchain";
import { LineArrowItem } from "src/components/commons/LineArrow";
import DrawPath from "src/components/commons/DrawPath";

import { StyledLink } from "../styles";
import { AditionalLabel } from "./RecentDeregistrations/styles";
import RecentDeregistrations from "./RecentDeregistrations";
import {
  CustomLink,
  DetailRetirement,
  IconButtonBack,
  Info,
  InfoGroup,
  InfoText,
  StepInfo,
  DrawContainer,
  MiddleGroup,
  BoxGroup,
  StyledCertificateShape,
  StyledCopyButton,
  StyledGridItem
} from "./styles";

const Deregistration = () => {
  const [selected, setSelected] = useState<SPODeregistration | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  const handleSelect = (deregistration: SPODeregistration | null) => {
    setSelected(deregistration);
  };

  const handleToggleModal = () => setOpenModal((state) => !state);

  return (
    <Box>
      <DeregistrationCertificateModal data={selected} handleCloseModal={handleToggleModal} open={openModal} />
      <RecentDeregistrations onSelect={handleSelect} setShowBackButton={setShowBackButton} />
      {selected && (
        <DeregistrationTimeline selected={selected} toggleModal={handleToggleModal} showBackButton={showBackButton} />
      )}
    </Box>
  );
};
export default Deregistration;

type DeregistrationTimelineProps = {
  selected: SPODeregistration | null;
  toggleModal: () => void;
  showBackButton?: boolean;
};

export const DeregistrationTimeline = ({ selected, toggleModal, showBackButton }: DeregistrationTimelineProps) => {
  const history = useHistory();
  const theme = useTheme();

  const SPOHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const cardanoBlockchainRef = useRef(null);
  const deregistrationRef = useRef(null);

  const handleBack = () => {
    history.goBack();
  };

  const isPoolHold = !!selected?.poolHold;
  const paths = useMemo((): LineArrowItem[] => {
    if (isPoolHold)
      return [
        {
          start: SPOHolderRef,
          startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
          end: cardanoBlockchainRef,
          endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
          startOffset: { 0: [0], lg: [-10, -15] },
          endOffset: { 0: [0, 0], lg: [0] },
          arrow: { 0: "top", lg: "left" },
          fold: { 0: "none" }
        },
        {
          start: SPOHolderRef,
          startPosition: { 0: ["left", "bottom"], sm: ["left", "middle"], lg: ["center", "bottom"] },
          end: deregistrationRef,
          endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
          startOffset: { 0: [4, -54], sm: [0], lg: [0, 0] },
          endOffset: { 0: [0, 30], lg: [0] },
          arrow: { 0: "top", lg: "left" },
          fold: { 0: "none", sm: "horizontal", lg: "vertical" }
        },
        {
          start: deregistrationRef,
          startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
          end: cardanoBlockchainRef,
          endPosition: { 0: ["center", "top"], sm: ["left", "middle"], lg: ["center", "bottom"] },
          startOffset: { 0: [0], lg: [0, 0] },
          endOffset: { 0: [-94, 50], sm: [10, 0], lg: [0] },
          arrow: { 0: "top", sm: "left", lg: "bottom" },
          fold: { 0: "none", sm: "vertical", lg: "horizontal" }
        },
        {
          start: cardanoBlockchainRef,
          startPosition: { 0: ["right", "middle"], lg: ["left", "middle"] },
          end: holdRef,
          endPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
          startOffset: { 0: [-10], lg: [50, -70] },
          endOffset: { 0: [50, -10], sm: [0, -10], lg: [0] },
          arrow: { 0: "bottom", lg: "right" },
          fold: { 0: "horizontal", lg: "none" }
        },
        {
          start: holdRef,
          startPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
          end: SPOHolderRef,
          endPosition: { 0: ["right", "middle"], lg: ["right", "middle"] },
          startOffset: { 0: [50], sm: [0], lg: [0] },
          endOffset: { 0: [0, 0], lg: [-5, -84] },
          arrow: { 0: "right", lg: "right" },
          fold: { 0: "vertical", lg: "none" }
        }
      ];
    return [
      {
        start: SPOHolderRef,
        startPosition: { 0: ["right", "bottom"], sm: ["right", "middle"], lg: ["right", "middle"] },
        end: feeRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [-5, -50], sm: [0], lg: [-10, -15] },
        endOffset: { 0: [0, 0], lg: [0] },
        fold: { 0: "none", sm: "horizontal", lg: "none" }
      },
      {
        start: feeRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cardanoBlockchainRef,
        endPosition: { 0: ["right", "top"], sm: ["right", "middle"], lg: ["left", "middle"] },
        startOffset: { 0: [0] },
        endOffset: { 0: [-22, 45], sm: [-10, 0], lg: [10, 0] },
        arrow: { 0: "top", sm: "right", lg: "left" },
        fold: { 0: "none", sm: "vertical", lg: "none" }
      },
      {
        start: SPOHolderRef,
        startPosition: { 0: ["right", "middle"], lg: ["center", "bottom"] },
        end: deregistrationRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [0], lg: [0, 0] },
        endOffset: { 0: [0, 30], lg: [0] },
        arrow: { 0: "top", lg: "left" },
        fold: { 0: "horizontal", lg: "vertical" }
      },
      {
        start: deregistrationRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cardanoBlockchainRef,
        endPosition: { 0: ["center", "top"], sm: ["left", "middle"], lg: ["center", "bottom"] },
        startOffset: { 0: [0], lg: [0, 0] },
        endOffset: { 0: [-94, 45], sm: [10, 0], lg: [0] },
        arrow: { 0: "top", sm: "left", lg: "bottom" },
        fold: { 0: "none", sm: "vertical", lg: "horizontal" }
      }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

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
            <AddressIcon fill={theme.palette.secondary.light} />
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
            <ADAsymbol />
            <InfoText>
              {formatADAFull(selected?.poolHold ? selected?.poolHold - selected?.fee : selected?.fee || 0)}
            </InfoText>
          </Info>
          <Info>
            <TimeIcon fill={theme.palette.secondary.light} />
            <InfoText>{formatDateTimeLocal(selected?.time || "")}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <DrawContainer>
        <SPOHolder
          ref={SPOHolderRef}
          data={{ poolName: selected?.poolName, poolView: selected?.poolView, stakeKeys: selected?.stakeKeys }}
        />
        <MiddleGroup hold={+isPoolHold}>
          <BoxGroup>
            {isPoolHold && (
              <Box>
                <HoldBoxSPO ref={holdRef} value={selected?.poolHold || ""} txHash={selected?.txHash || ""} />
              </Box>
            )}
            <Box display="flex" justifyContent={isPoolHold ? "unset" : "center"}>
              <FeeBoxSPO ref={feeRef} value={selected?.fee || ""} txHash={selected?.txHash || ""} />
            </Box>
          </BoxGroup>
          <StyledCertificateShape onClick={toggleModal} ref={deregistrationRef}>
            Deregistration Certificate
          </StyledCertificateShape>
        </MiddleGroup>
        <CardanoBlockchain ref={cardanoBlockchainRef} />
        <DrawPath paths={paths} />
      </DrawContainer>
      {!isPoolHold && (
        <AditionalLabel>
          Pool hold paid during registration is refunded 1 epoch after the retirement epoch to the reward address of the
          pool operator
        </AditionalLabel>
      )}
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
    <StyledModal {...props} title="Deregistration certificate">
      <Grid container spacing={1}>
        <StyledGridItem item xs={6}>
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.secondary.light}>
              Pool ID
            </Box>
            {data && (
              <Box>
                <CustomTooltip title={data?.poolView || ""}>
                  <CustomLink to={details.delegation(data?.poolView || "")}>
                    {getShortWallet(data?.poolView || "")}
                  </CustomLink>
                </CustomTooltip>
                <CopyButton text={data?.poolView || ""} />
              </Box>
            )}
          </Box>
        </StyledGridItem>
        <StyledGridItem item xs={6}>
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.secondary.light}>
              Retirement in Epoch
            </Box>
            {data && (
              <DetailRetirement pt={"3px"} pb={"5px"}>
                {data?.retiringEpoch}
              </DetailRetirement>
            )}
          </Box>
        </StyledGridItem>
      </Grid>
    </StyledModal>
  );
};
