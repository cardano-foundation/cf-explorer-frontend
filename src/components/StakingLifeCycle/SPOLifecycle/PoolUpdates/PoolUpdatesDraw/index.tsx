import { useRef, useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { LineArrowItem } from "src/components/commons/LineArrow";
import DrawPath from "src/components/commons/DrawPath";
import CustomIcon from "src/components/commons/CustomIcon";
import CardanoBlockchain from "src/components/commons/CardanoBlockchain";
import FeeBox from "src/components/commons/FeeBox";
import { details } from "src/commons/routers";
import { AddressIcon, AddressIconDark2, BackDarkIcon, BackIcon, TimeIcon, TimeIconDark } from "src/commons/resources";
import SPOHolder from "src/components/commons/SPOHolder";
import CopyButton from "src/components/commons/CopyButton";
import ADAicon from "src/components/commons/ADAIcon";
import { StyledADASymbol } from "src/components/commons/SVGIcon/styles";

import {
  BoxGroup,
  DrawContainer,
  IconButtonBack,
  Info,
  InfoGroup,
  InfoText,
  MiddleGroup,
  StepInfo,
  StyledCertificateShape,
  StyledLink
} from "./styles";

interface ISPOPropsData {
  poolName?: string;
  poolView?: string;
  stakeKeys?: string[];
  txHash?: string;
}
interface Props {
  poolUpdates: PoolUpdateItem;
  toggleModal?: () => void;
  data: ISPOPropsData | null;
  showBackButton?: boolean;
}

export const PoolUpdatesDraw = ({ poolUpdates, toggleModal, data, showBackButton }: Props) => {
  const { t } = useTranslation();
  const { fee, time, txHash } = poolUpdates;
  const { poolName, poolView, stakeKeys } = data ?? {};
  const theme = useTheme();
  const SPOPoolRef = useRef(null);
  const feeRef = useRef(null);
  const registrationRef = useRef(null);
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
        end: feeRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [-1.5, -55], sm: [-10, 0], lg: [0] },
        endOffset: { 0: [8, 0], lg: [0] },
        arrow: { 0: "top", lg: "left" },
        fold: { sm: "horizontal", lg: "none" },
        autoAlign: { 0: "end-vertical", sm: "none" }
      },
      {
        start: feeRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cardanoBlockchainRef,
        endPosition: { 0: ["right", "top"], sm: ["right", "middle"], lg: ["left", "middle"] },
        startOffset: { 0: [8, -15], lg: [0] },
        endOffset: { 0: [-18, 40], sm: [-10], lg: [10] },
        fold: { sm: "vertical", lg: "none" },
        arrow: { 0: "top", sm: "right", lg: "left" },
        autoAlign: { 0: "start-vertical", sm: "none" }
      },
      {
        start: SPOPoolRef,
        startPosition: { 0: ["left", "bottom"], sm: ["left", "middle"], lg: ["center", "middle"] },
        end: registrationRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [3, -55], sm: [10, 0], lg: [0] },
        fold: { sm: "horizontal", lg: "vertical" },
        autoAlign: { 0: "end-vertical", sm: "none" }
      },
      {
        start: registrationRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cardanoBlockchainRef,
        endPosition: { 0: ["left", "top"], sm: ["left", "middle"], lg: ["center", "bottom"] },
        endOffset: { 0: [18, 40], sm: [10], lg: [0, 3] },
        fold: { sm: "vertical", lg: "horizontal" },
        arrow: { 0: "top", sm: "left", lg: "bottom" },
        autoAlign: { 0: "start-vertical", sm: "none" }
      }
    ];
  }, []);

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
            <CustomTooltip title={txHash}>
              <InfoText>
                <StyledLink to={details.transaction(data?.txHash)}>{getShortHash(txHash || "")}</StyledLink>
              </InfoText>
            </CustomTooltip>
            <CopyButton text={txHash} sx={{ marginLeft: "5px" }} />
          </Info>
          <Info>
            <StyledADASymbol>
              <ADAicon fill={theme.isDark ? theme.palette.primary.main : theme.palette.secondary.light} />
            </StyledADASymbol>
            <InfoText>{formatADAFull(fee || 0)}</InfoText>
          </Info>
          <Info>
            <CustomIcon
              icon={theme.isDark ? TimeIconDark : TimeIcon}
              height={30}
              fill={theme.isDark ? theme.palette.primary.main : theme.palette.secondary.light}
            />
            <InfoText>{formatDateTimeLocal(time || "")}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <DrawContainer>
        <SPOHolder ref={SPOPoolRef} data={{ poolName, poolView, stakeKeys }} />
        <MiddleGroup>
          <BoxGroup>
            <FeeBox ref={feeRef} value={fee} txHash={txHash} />
          </BoxGroup>
          <StyledCertificateShape onClick={toggleModal} ref={registrationRef}>
            {t("common.poolCertificate")}
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
