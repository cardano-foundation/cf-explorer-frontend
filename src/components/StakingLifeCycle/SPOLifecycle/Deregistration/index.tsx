import { alpha, Box, Grid } from "@mui/material";
import { useRef, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { BackIcon, AddressIcon, ADAGreen, TimeIcon } from "../../../../commons/resources";
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
import RecentDeregistrations from "./RecentDeregistrations";
import { formatADA, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import moment from "moment";
import CustomTooltip from "../../../commons/CustomTooltip";
import { details } from "../../../../commons/routers";
import CopyButton from "../../../commons/CopyButton";
import StyledModal from "../../../commons/StyledModal";
import { StyledLink } from "../styles";
import { useSelector } from "react-redux";
import SPOHolder from "~/components/commons/SPOHolder";
import HoldBoxSPO from "~/components/commons/HoldBoxSPO";
import FeeBoxSPO from "~/components/commons/FeeBoxSPO";
import CardanoSystem from "~/components/commons/CardanoSystem";
import { LineArrowItem } from "~/components/commons/LineArrow";
import DrawPath from "~/components/commons/DrawPath";

const Deregistration = () => {
  const [selected, setSelected] = useState<SPODeregistration | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleSelect = (deregistration: SPODeregistration | null) => {
    setSelected(deregistration);
  };

  const handleToggleModal = () => setOpenModal((state) => !state);

  return (
    <Box>
      <DeregistrationCertificateModal data={selected} handleCloseModal={handleToggleModal} open={openModal} />
      <RecentDeregistrations onSelect={handleSelect} />
      {selected && <DeregistrationTimeline selected={selected} toggleModal={handleToggleModal} />}
    </Box>
  );
};
export default Deregistration;

type DeregistrationTimelineProps = {
  selected: SPODeregistration | null;
  toggleModal: () => void;
};

const DeregistrationTimeline = ({ selected, toggleModal }: DeregistrationTimelineProps) => {
  const history = useHistory();

  const SPOHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const deregistrationRef = useRef(null);

  const handleBack = () => {
    history.goBack();
  };

  const { sidebar } = useSelector(({ user }: RootState) => user);

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: SPOHolderRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cadarnoSystemRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [0], lg: [-10, -15] },
        endOffset: { 0: [0, 0], lg: [0] },
        arrow: { 0: "top", lg: "left" },
        fold: { 0: "none" }
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
        end: cadarnoSystemRef,
        endPosition: { 0: ["center", "top"], sm: ["left", "middle"], lg: ["center", "bottom"] },
        startOffset: { 0: [0], lg: [0, 0] },
        endOffset: { 0: [-94, 45], sm: [10, 0], lg: [0] },
        arrow: { 0: "top", sm: "left", lg: "bottom" },
        fold: { 0: "none", sm: "vertical", lg: "horizontal" }
      },
      {
        start: cadarnoSystemRef,
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
  }, []);

  return (
    <Box>
      <StepInfo>
        <IconButtonBack onClick={handleBack}>
          <BackIcon />
        </IconButtonBack>
        <InfoGroup>
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
            <InfoText>
              {formatADA(selected?.poolHold ? selected?.poolHold - selected?.fee : selected?.fee || 0)}
            </InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{moment(selected?.time).format("MM/DD/yyyy HH:mm:ss")}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <DrawContainer sidebar={+sidebar}>
        <SPOHolder
          ref={SPOHolderRef}
          data={{ poolName: selected?.poolName, poolView: selected?.poolView, stakeKeys: selected?.stakeKeys }}
        />
        <MiddleGroup sidebar={+sidebar}>
          <BoxGroup sidebar={+sidebar}>
            <Box>
              <HoldBoxSPO
                sidebar={sidebar}
                ref={holdRef}
                value={selected?.poolHold || ""}
                txHash={selected?.txHash || ""}
              />
            </Box>
            <Box>
              <FeeBoxSPO sidebar={sidebar} ref={feeRef} value={selected?.fee || ""} txHash={selected?.txHash || ""} />
            </Box>
          </BoxGroup>
          <StyledCertificateShape onClick={toggleModal} ref={deregistrationRef}>
            Deregistration Certificate
          </StyledCertificateShape>
        </MiddleGroup>
        <CardanoSystem ref={cadarnoSystemRef} />

        <DrawPath paths={paths} />
      </DrawContainer>
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
    <StyledModal {...props} title='Deregistration certificate'>
      <Grid container spacing={1}>
        <StyledGridItem item xs={6}>
          <Box>
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
        </StyledGridItem>
        <StyledGridItem item xs={6}>
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
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
