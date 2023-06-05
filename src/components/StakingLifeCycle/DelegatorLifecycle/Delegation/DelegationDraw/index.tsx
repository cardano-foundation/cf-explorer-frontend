import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";

import CardanoSystem from "src/components/commons/CardanoSystem";
import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";

import { DelegationDetail } from "../index";
import { DrawContainer, FeeBox, MiddleGroup, StyledAdaHolder, StyledCertificateShape } from "./styles";

export interface IDelegationDrawProps {
  data?: DelegationDetail | null;
  toggleCertificateModal: () => void;
}

const DelegationDraw: React.FC<IDelegationDrawProps> = ({ data, toggleCertificateModal }) => {
  const adaHolderRef = useRef(null);
  const feeRef = useRef(null);
  const certificateRef = useRef(null);
  const cadarnoSystemRef = useRef(null);

  const { sidebar } = useSelector(({ user }: RootState) => user);

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: adaHolderRef,
        startPosition: { 0: ["right", "bottom"], sm: ["right", "middle"], lg: ["center", "middle"] },
        end: feeRef,
        endPosition: { 0: ["center", "top"], sm: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [-25, -40], sm: [-10, 0], lg: [0] },
        endOffset: { sm: [0, 10], lg: [20] },
        fold: { sm: "horizontal", lg: "none" },
        arrow: { 0: "top" },
        autoAlign: { 0: "start-vertical", sm: "none" }
      },
      {
        start: feeRef,
        startPosition: { 0: ["center", "bottom"], sm: ["center", "bottom"], lg: ["center", "middle"] },
        end: cadarnoSystemRef,
        endPosition: { 0: ["right", "top"], sm: ["right", "middle"], lg: ["left", "middle"] },
        endOffset: { 0: [-25, 40], sm: [-10, 0], lg: [10, 0] },
        startOffset: { sm: [0], lg: [0] },
        fold: { sm: "vertical", lg: "horizontal" },
        arrow: { 0: "top", sm: "right", lg: "left" },
        autoAlign: { 0: "end-vertical", sm: "none" }
      },
      {
        start: adaHolderRef,
        startPosition: { 0: ["left", "bottom"], sm: ["left", "middle"], lg: ["center", "middle"] },
        end: certificateRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [25, -40], sm: [10, 0], lg: [0] },
        endOffset: { sm: [0], lg: [0] },
        fold: { sm: "horizontal", lg: "vertical" },
        autoAlign: { 0: "start-vertical", sm: "none" }
      },
      {
        start: certificateRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cadarnoSystemRef,
        endPosition: { 0: ["left", "top"], sm: ["left", "middle"], lg: ["center", "bottom"] },
        endOffset: { 0: [25, 40], sm: [10], lg: [0, 3] },
        arrow: { 0: "top", sm: "left", lg: "bottom" },
        fold: { xs: "none", sm: "vertical", lg: "horizontal" },
        autoAlign: { 0: "end-vertical", sm: "none" }
      }
    ];
  }, []);
  return (
    <DrawContainer sidebar={+sidebar}>
      <StyledAdaHolder ref={adaHolderRef} value={data?.stakeTotalAmount} />
      <MiddleGroup sidebar={+sidebar}>
        <FeeBox ref={feeRef} value={data?.fee || 0} txHash={data?.txHash || ""} />
        <StyledCertificateShape onClick={toggleCertificateModal} ref={certificateRef}>
          Delegation Certificate
        </StyledCertificateShape>
      </MiddleGroup>
      <CardanoSystem ref={cadarnoSystemRef} />
      <DrawPath paths={paths} />
    </DrawContainer>
  );
};

export default DelegationDraw;
