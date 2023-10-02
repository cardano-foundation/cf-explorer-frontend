import { Box, Grid, useTheme } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { BackIcon, AddressIcon, TimeIcon, AddressIconDark2, TimeIconDark, BackDarkIcon } from "src/commons/resources";
import { formatADAFull, formatDateTimeLocal, getShortHash, getShortWallet } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import ADAicon from "src/components/commons/ADAIcon";
import CustomIcon from "src/components/commons/CustomIcon";
import CardanoBlockchain from "src/components/commons/CardanoBlockchain";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DrawPath from "src/components/commons/DrawPath";
import FeeBoxSPO from "src/components/commons/FeeBoxSPO";
import { LineArrowItem } from "src/components/commons/LineArrow";
import SPOHolder from "src/components/commons/SPOHolder";
import { StyledADASymbol } from "src/components/commons/SVGIcon/styles";
import StyledModal from "src/components/commons/StyledModal";

import { StyledLink } from "../styles";
import RecentDeregistrations from "./RecentDeregistrations";
import { AditionalLabel } from "./RecentDeregistrations/styles";
import {
  BoxGroup,
  CustomLink,
  DetailRetirement,
  DrawContainer,
  IconButtonBack,
  Info,
  InfoGroup,
  InfoText,
  MiddleGroup,
  StepInfo,
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
  const feeRef = useRef(null);
  const cardanoBlockchainRef = useRef(null);
  const deregistrationRef = useRef(null);

  const handleBack = () => {
    history.goBack();
  };
  const { t } = useTranslation();
  const paths = useMemo((): LineArrowItem[] => {
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
          <IconButtonBack onClick={handleBack}>{theme.isDark ? <BackDarkIcon /> : <BackIcon />}</IconButtonBack>
        ) : (
          <Box />
        )}
        <InfoGroup>
          <Info>
            <CustomIcon
              icon={theme.isDark ? AddressIconDark2 : AddressIcon}
              height={30}
              fill={theme.isDark ? theme.palette.primary.main : theme.palette.secondary.light}
            />
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
            <StyledADASymbol>
              <ADAicon fill={theme.isDark ? theme.palette.primary.main : theme.palette.secondary.light} />
            </StyledADASymbol>
            <InfoText>{formatADAFull(selected?.fee || 0)}</InfoText>
          </Info>
          <Info>
            <CustomIcon
              icon={theme.isDark ? TimeIconDark : TimeIcon}
              height={30}
              fill={theme.isDark ? theme.palette.primary.main : theme.palette.secondary.light}
            />
            <InfoText>{formatDateTimeLocal(selected?.time || "")}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <DrawContainer>
        <SPOHolder
          ref={SPOHolderRef}
          data={{ poolName: selected?.poolName, poolView: selected?.poolView, stakeKeys: selected?.stakeKeys }}
        />
        <MiddleGroup>
          <BoxGroup>
            <Box display="flex" justifyContent={"center"}>
              <FeeBoxSPO ref={feeRef} value={selected?.fee || ""} txHash={selected?.txHash || ""} />
            </Box>
          </BoxGroup>
          <StyledCertificateShape onClick={toggleModal} ref={deregistrationRef}>
            {t("common.deregistrationCert")}
          </StyledCertificateShape>
        </MiddleGroup>
        <CardanoBlockchain ref={cardanoBlockchainRef} />
        <DrawPath paths={paths} />
      </DrawContainer>
      <AditionalLabel>{t("common.holdBoxLimitWarning")}</AditionalLabel>
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
  const { t } = useTranslation();
  return (
    <StyledModal {...props} title={t("common.deregistrationCert")}>
      <Grid container spacing={1}>
        <StyledGridItem item xs={6}>
          <Box>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.secondary.light}>
              {t("common.poolID")}
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
              {t("glossary.retirementsEpoch")}
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
