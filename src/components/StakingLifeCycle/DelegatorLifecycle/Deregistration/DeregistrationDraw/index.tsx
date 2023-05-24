import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import AdaHolder from "~/components/commons/AdaHolder";
import CardanoSystem from "~/components/commons/CardanoSystem";
import DrawPath from "~/components/commons/DrawPath";
import { LineArrowItem } from "~/components/commons/LineArrow";
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
  const withDrawRef = useRef(null);
  const feeRef = useRef(null);
  const registrationRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const { sidebar } = useSelector(({ user }: RootState) => user);

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: adaHolderRef,
        startPosition: { 0: ["left", "bottom"], sm: ["left", "middle"], lg: ["center", "bottom"] },
        end: registrationRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [22, -40], sm: [10, 0], lg: [0] },
        endOffset: { 0: [0, 0], lg: [0, 0] },
        fold: {
          sm: "horizontal",
          lg: "vertical"
        }
      },
      {
        start: registrationRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: cadarnoSystemRef,
        endPosition: { 0: ["left", "top"], sm: ["left", "middle"], lg: ["center", "bottom"] },
        startOffset: { 0: [0, 0] },
        endOffset: { 0: [21.6, 44], sm: [10, 0], lg: [0] },
        arrow: { 0: "top", sm: "left", lg: "bottom" },
        fold: {
          sm: "vertical",
          lg: "horizontal"
        }
      },
      {
        start: adaHolderRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: feeRef,
        endPosition: { 0: ["left", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [0], lg: [-8, 0] },
        endOffset: { 0: [15.1, 0], sm: [46, 0], lg: [0, 0] }
      },
      {
        start: feeRef,
        startPosition: { 0: ["left", "top"], sm: ["left", "bottom"], lg: ["right", "middle"] },
        end: cadarnoSystemRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [15.1, 0], sm: [46, 0], lg: [0, 0] },
        endOffset: { 0: [0], lg: [8, 0] },
        arrow: { 0: "top", lg: "left" }
      },
      {
        start: cadarnoSystemRef,
        startPosition: { 0: ["right", "middle"], lg: ["left", "top"] },
        end: withDrawRef,
        endPosition: { 0: ["right", "bottom"], sm: ["center", "bottom"], lg: ["right", "middle"] },
        startOffset: { 0: [-6, 0], sm: [-10, 0], lg: [10, 54] },
        endOffset: { 0: [-16, 0], sm: [0, 0], lg: [0, 0] },
        fold: {
          xs: "horizontal",
          lg: "none"
        }
      },
      {
        start: withDrawRef,
        startPosition: { 0: ["right", "top"], sm: ["center", "top"], lg: ["left", "middle"] },
        end: adaHolderRef,
        endPosition: { 0: ["right", "middle"], lg: ["right", "top"] },
        startOffset: { 0: [-16, 0], sm: [0, 0], lg: [0] },
        endOffset: { 0: [-12, 0], lg: [-16, 54.2] },
        fold: {
          xs: "vertical",
          lg: "none"
        },
        arrow: { xs: "right" }
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
            ref={withDrawRef}
            value={Math.abs(data?.deposit || 0)}
            txHash={data?.txHash || ""}
          />
          <StyledFreeBox sidebar={+sidebar} ref={feeRef} value={data?.fee} txHash={data?.txHash || ""} />
        </BoxGroup>
        <StyledCertificateShape onClick={toggleCertificateModal} sidebar={+sidebar} ref={registrationRef}>
          Deregistration Certificate
        </StyledCertificateShape>
      </MiddleGroup>
      <CardanoSystem ref={cadarnoSystemRef} />
      <DrawPath paths={paths} />
    </DrawContainer>
  );
};

export default DeregistrationDraw;
