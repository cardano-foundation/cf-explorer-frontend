import { Box } from "@mui/material";
import { useRef, useMemo } from "react";

import {
  DrawContainer,
  BoxGroup,
  StyledCertificateShape,
  IconButtonBack,
  Info,
  InfoGroup,
  InfoText,
  MiddleGroup,
  StepInfo
} from "./styles";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "../../../../../commons/utils/helper";
import moment from "moment";
import { useHistory } from "react-router-dom";
import CustomTooltip from "../../../../commons/CustomTooltip";
import { StyledCopyButton } from "../../../SPOLifecycle/Registration/styles";
import { BackIcon, AddressIcon, ADAGreen, TimeIcon } from "src/commons/resources";
import { LineArrowItem } from "src/components/commons/LineArrow";
import DrawPath from "src/components/commons/DrawPath";
import { useSelector } from "react-redux";
import AdaHolder from "src/components/commons/AdaHolder";
import CardanoSystem from "src/components/commons/CardanoSystem";
import HoldBox from "src/components/commons/HoldBox";
import FeeBox from "src/components/commons/FeeBox";
import { StyledLink } from "../styles";
import { details } from "src/commons/routers";

interface Props {
  selected: RegistrationItem;
  toggleModal: () => void;
  showBackButton?: boolean;
}

export const RegistrationDraw = ({ selected, toggleModal, showBackButton = false }: Props) => {
  const { deposit, fee, time, txHash } = selected;

  const adaHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const registrationRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const history = useHistory();
  const { sidebar } = useSelector(({ user }: RootState) => user);

  const handleBack = () => {
    history.goBack();
  };

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: adaHolderRef,
        startPosition: { 0: ["right", "bottom"], sm: ["right", "middle"], lg: ["center", "middle"] },
        end: holdRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [-18, -50], sm: [-10, 0], lg: [0] },
        endOffset: { 0: [8, -10], lg: [0] },
        arrow: { 0: "top", lg: "left" },
        fold: { sm: "horizontal", lg: "none" }
      },
      {
        start: holdRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cadarnoSystemRef,
        endPosition: { 0: ["right", "top"], sm: ["right", "middle"], lg: ["left", "middle"] },
        startOffset: { 0: [8, -15], lg: [0] },
        endOffset: { 0: [-18, 45], sm: [-10], lg: [10] },
        fold: { sm: "vertical", lg: "none" },
        arrow: { 0: "top", sm: "right", lg: "left" }
      },
      {
        start: adaHolderRef,
        startPosition: { 0: ["left", "bottom"], sm: ["left", "middle"], lg: ["center", "middle"] },
        end: registrationRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [18, -50], sm: [10, 0], lg: [0] },
        fold: { sm: "horizontal", lg: "vertical" }
      },
      {
        start: registrationRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cadarnoSystemRef,
        endPosition: { 0: ["left", "top"], sm: ["left", "middle"], lg: ["center", "bottom"] },
        endOffset: { 0: [18, 45], sm: [10], lg: [0, 3] },
        fold: { sm: "vertical", lg: "horizontal" },
        arrow: { 0: "top", sm: "left", lg: "bottom" }
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
            <AddressIcon fill="#438F68" />
            <CustomTooltip title={txHash}>
              <InfoText>
                <StyledLink to={details.transaction(txHash)}>{getShortHash(txHash || "")}</StyledLink>
              </InfoText>
            </CustomTooltip>
            <StyledCopyButton text={txHash} />
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADAFull(deposit + fee || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{formatDateTimeLocal(time)}</InfoText>
          </Info>
        </InfoGroup>
      </StepInfo>
      <DrawContainer sidebar={+sidebar}>
        <AdaHolder ref={adaHolderRef} />
        <MiddleGroup sidebar={+sidebar}>
          <BoxGroup sidebar={+sidebar}>
            <HoldBox ref={holdRef} value={deposit} txHash={txHash} roundingNumber={1} />
            <FeeBox ref={feeRef} value={fee} txHash={txHash} />
          </BoxGroup>
          <StyledCertificateShape onClick={toggleModal} ref={registrationRef}>
            Registration Certificate
          </StyledCertificateShape>
        </MiddleGroup>
        <CardanoSystem ref={cadarnoSystemRef} />
        <DrawPath paths={paths} />
      </DrawContainer>
    </Box>
  );
};
