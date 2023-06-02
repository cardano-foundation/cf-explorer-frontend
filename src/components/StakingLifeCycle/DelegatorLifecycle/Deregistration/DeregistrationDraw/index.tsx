import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";

import AdaHolder from "src/components/commons/AdaHolder";
import CardanoSystem from "src/components/commons/CardanoSystem";
import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";

import {
  BoxGroup,
  DrawContainer,
  MiddleGroup,
  StyledCertificateShape,
  StyledFreeBox,
  StyledWithHoldBox
} from "./styles";

export interface IDeregistrationDrawProps {
  data?: RegistrationItem;
  toggleCertificateModal: () => void;
}

const DeregistrationDraw: React.FC<IDeregistrationDrawProps> = ({ data, toggleCertificateModal }) => {
  const adaHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const certificateRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const { sidebar } = useSelector(({ user }: RootState) => user);

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: adaHolderRef,
        startPosition: { 0: ["left", "bottom"], sm: ["left", "middle"], lg: ["center", "bottom"] },
        end: certificateRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [22, -40], sm: [10, 0], lg: [0] },
        fold: { sm: "horizontal", lg: "vertical" },
        autoAlign: { 0: "start-vertical", sm: "none" }
      },
      {
        start: certificateRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cadarnoSystemRef,
        endPosition: { 0: ["left", "top"], sm: ["left", "middle"], lg: ["center", "bottom"] },
        endOffset: { 0: [22, 40], sm: [10, 0], lg: [0] },
        arrow: { 0: "top", sm: "left", lg: "bottom" },
        fold: { sm: "vertical", lg: "horizontal" },
        autoAlign: { 0: "end-vertical", sm: "none" }
      },
      {
        start: adaHolderRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: feeRef,
        endPosition: { 0: ["left", "top"], lg: ["left", "middle"] },
        startOffset: { lg: [-8, 0] },
        endOffset: { sm: [46, 0], lg: [0] },
        autoAlign: { 0: "start-vertical", md: "none" }
      },
      {
        start: feeRef,
        startPosition: { 0: ["left", "top"], sm: ["left", "bottom"], lg: ["right", "middle"] },
        end: cadarnoSystemRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { sm: [46, 0], lg: [0] },
        endOffset: { lg: [8, 0] },
        arrow: { 0: "top", lg: "left" },
        autoAlign: { 0: "end-vertical", md: "none" }
      },
      {
        start: cadarnoSystemRef,
        startPosition: { 0: ["right", "middle"], lg: ["left", "top"] },
        end: holdRef,
        endPosition: { 0: ["right", "bottom"], sm: ["center", "bottom"], lg: ["right", "middle"] },
        startOffset: { 0: [-6, 0], sm: [-10, 0], lg: [10, 54] },
        endOffset: { 0: [-16, 0], sm: [0, 0] },
        fold: { 0: "horizontal", lg: "none" }
      },
      {
        start: holdRef,
        startPosition: { 0: ["right", "top"], sm: ["center", "top"], lg: ["left", "middle"] },
        end: adaHolderRef,
        endPosition: { 0: ["right", "middle"], lg: ["right", "top"] },
        startOffset: { 0: [-16, 0], sm: [0] },
        endOffset: { 0: [-12, 0], lg: [-16, 54.2] },
        fold: { 0: "vertical", lg: "none" },
        arrow: { 0: "right" }
      }
    ];
  }, []);
  return (
    <DrawContainer sidebar={+sidebar}>
      <AdaHolder ref={adaHolderRef} />
      <MiddleGroup sidebar={+sidebar}>
        <BoxGroup sidebar={+sidebar}>
          <StyledWithHoldBox
            roundingNumber={1}
            sidebar={+sidebar}
            ref={holdRef}
            value={Math.abs(data?.deposit || 0)}
            txHash={data?.txHash || ""}
          />
          <StyledFreeBox sidebar={+sidebar} ref={feeRef} value={data?.fee} txHash={data?.txHash || ""} />
        </BoxGroup>
        <StyledCertificateShape onClick={toggleCertificateModal} sidebar={+sidebar} ref={certificateRef}>
          Deregistration Certificate
        </StyledCertificateShape>
      </MiddleGroup>
      <CardanoSystem ref={cadarnoSystemRef} />
      <DrawPath paths={paths} />
    </DrawContainer>
  );
};

export default DeregistrationDraw;
