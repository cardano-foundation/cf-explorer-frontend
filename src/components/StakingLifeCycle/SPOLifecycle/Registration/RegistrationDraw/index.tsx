import { useRef, useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { BackIcon, AddressIcon, TimeIcon, AddressIconDark2, TimeIconDark } from "src/commons/resources";
import { LineArrowItem } from "src/components/commons/LineArrow";
import DrawPath from "src/components/commons/DrawPath";
import CardanoBlockchain from "src/components/commons/CardanoBlockchain";
import { details } from "src/commons/routers";
import CustomIcon from "src/components/commons/CustomIcon";
import SPOHolder from "src/components/commons/SPOHolder";
import ADAicon from "src/components/commons/ADAIcon";
import { StyledADASymbol } from "src/components/commons/SVGIcon/styles";

import { StyledCopyButton } from "../../../SPOLifecycle/Registration/styles";
import { StyledLink } from "../../styles";
import {
  DrawContainer,
  BoxGroup,
  StyledCertificateShape,
  IconButtonBack,
  Info,
  InfoGroup,
  InfoText,
  MiddleGroup,
  StepInfo,
  StyledHoldBox,
  StyledFeeBox
} from "./styles";

export interface ISPOPropsData {
  poolName?: string;
  poolView?: string;
  stakeKeys?: string[];
  txHash?: string;
}
interface Props {
  selected: SPORegistration;
  toggleModal?: () => void;
  data: ISPOPropsData | null;
  showBackButton?: boolean;
}

export const RegistrationDraw = ({ selected, toggleModal, data, showBackButton }: Props) => {
  const { t } = useTranslation();
  const { poolHold, fee, time, txHash } = selected;
  const { poolName, poolView, stakeKeys } = data ?? {};

  const theme = useTheme();
  const SPOPoolRef = useRef(null);
  const poolHoldRef = useRef(null);
  const feeRef = useRef(null);
  const certificateRef = useRef(null);
  const cardanoBlockchainRef = useRef(null);
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: SPOPoolRef,
        startPosition: { 0: ["right", "bottom"], sm: ["right", "middle"], lg: ["center", "middle"] },
        end: poolHoldRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [-5, -50], sm: [-10, 0], lg: [0] },
        endOffset: { 0: [0, -15], lg: [0] },
        arrow: { 0: "top", lg: "left" },
        fold: { sm: "horizontal", lg: "none" },
        autoAlign: { 0: "start-vertical", sm: "none" }
      },
      {
        start: poolHoldRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cardanoBlockchainRef,
        endPosition: { 0: ["right", "top"], sm: ["right", "middle"], lg: ["left", "middle"] },
        endOffset: { 0: [-20, 49], sm: [-10], lg: [10] },
        fold: { sm: "vertical", lg: "none" },
        arrow: { 0: "top", sm: "right", lg: "left" },
        autoAlign: { 0: "end-vertical", sm: "none" }
      },
      {
        start: SPOPoolRef,
        startPosition: { 0: ["left", "bottom"], sm: ["left", "middle"], lg: ["center", "middle"] },
        end: certificateRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [5, -50], sm: [10, 0], lg: [0] },
        fold: { sm: "horizontal", lg: "vertical" },
        autoAlign: { 0: "start-vertical", sm: "none" }
      },
      {
        start: certificateRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cardanoBlockchainRef,
        endPosition: { 0: ["left", "top"], sm: ["left", "middle"], lg: ["center", "bottom"] },
        endOffset: { 0: [20, 49], sm: [10], lg: [0, 3] },
        fold: { sm: "vertical", lg: "horizontal" },
        arrow: { 0: "top", sm: "left", lg: "bottom" },
        autoAlign: { 0: "end-vertical", sm: "none" }
      }
    ];
  }, []);

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
            <CustomIcon
              icon={theme.isDark ? AddressIconDark2 : AddressIcon}
              height={30}
              fill={theme.palette.secondary.light}
            />
            <CustomTooltip title={txHash}>
              <InfoText>
                <StyledLink to={details.transaction(data?.txHash)}>{getShortHash(txHash || "")}</StyledLink>
              </InfoText>
            </CustomTooltip>
            <StyledCopyButton text={txHash} />
          </Info>
          <Info>
            <StyledADASymbol>
              <ADAicon />
            </StyledADASymbol>
            <InfoText>{formatADAFull(poolHold + fee || 0)}</InfoText>
          </Info>
          <Info>
            <CustomIcon
              icon={theme.isDark ? TimeIconDark : TimeIcon}
              height={30}
              fill={theme.palette.secondary.light}
            />
            <InfoText>{formatDateTimeLocal(time || "")}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <DrawContainer>
        <SPOHolder ref={SPOPoolRef} data={{ poolName, poolView, stakeKeys }} />
        <MiddleGroup>
          <BoxGroup>
            <StyledHoldBox ref={poolHoldRef} value={poolHold} txHash={txHash} />
            <StyledFeeBox ref={feeRef} value={fee} txHash={txHash} />
          </BoxGroup>
          <StyledCertificateShape onClick={toggleModal} ref={certificateRef}>
            {t("common.poolRegisCert")}
          </StyledCertificateShape>
        </MiddleGroup>
        <Box mt={2}>
          <CardanoBlockchain ref={cardanoBlockchainRef} />
        </Box>
        <DrawPath paths={paths} />
      </DrawContainer>
    </Box>
  );
};
