import { Box } from "@mui/material";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { ADADisnableIcon, ADAOrangeIcon } from "~/commons/resources";
import CardanoSystem from "~/components/commons/CardanoSystem";
import DrawPath from "~/components/commons/DrawPath";
import { LineArrowItem } from "~/components/commons/LineArrow";
import ADAHolderRect from "./ADAHolderRect";
import ADAOperatorRewardRect from "./ADAOperatorRewardRect";
import RewardAccountBox from "./RewardAccountBox";
import { AdaAmountWrapper, DrawContainer, HolderWrapper } from "./styles";

export interface IRewarsDistributionDrawProps {
  data?: IStakeKeyDetail | null;
  toggleRewardModal: () => void;
}

const RewarsDistributionDraw: React.FC<IRewarsDistributionDrawProps> = ({ data, toggleRewardModal }) => {
  const cadarnoSystemRef = useRef(null);
  const adaAmountFirstRef = useRef(null);
  const adaAmountSecondRef = useRef(null);
  const holderRef = useRef(null);
  const rewardAccountRef = useRef(null);
  const isRewardPool = (data?.rewardPools || []).length > 0;

  const paths = useMemo((): LineArrowItem[] => {
    adaAmountFirstRef;
    return [
      {
        start: cadarnoSystemRef,
        startPosition: { 0: ["left", "bottom"], lg: ["right", "middle"] },
        end: adaAmountSecondRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [18, -45], sm: [54.2, -20], lg: [-10, 55] },
        endOffset: { 0: [0] },
        dashed: !isRewardPool
      },
      {
        start: cadarnoSystemRef,
        startPosition: { 0: ["right", "bottom"], lg: ["right", "middle"] },
        end: adaAmountFirstRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [-17, -45], sm: [-53, -20], lg: [-10, -54] },
        endOffset: { 0: [0], lg: [0] }
      },
      {
        start: adaAmountSecondRef,
        end: holderRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        endPosition: { 0: ["left", "top"], lg: ["left", "middle"] },
        endOffset: { 0: [67, 0], sm: [114, 0], lg: [34, 55] },
        dashed: !isRewardPool,
        arrow: { 0: "top", lg: "left" }
      },
      {
        start: adaAmountFirstRef,
        end: holderRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        endPosition: { 0: ["right", "top"], lg: ["left", "middle"] },
        endOffset: { 0: [-67, 0], sm: [-113.6, 0], lg: [34, -54] },
        arrow: { 0: "top", lg: "left" }
      },
      {
        start: holderRef,
        end: rewardAccountRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        endOffset: { 0: [0] },
        arrow: { 0: "top", lg: "left" }
      }
    ];
  }, []);

  const { sidebar } = useSelector(({ user }: RootState) => user);
  return (
    <DrawContainer sidebar={+sidebar}>
      <CardanoSystem ref={cadarnoSystemRef} />
      <AdaAmountWrapper sidebar={+sidebar}>
        <Box ref={adaAmountFirstRef}>
          <ADAOrangeIcon />
        </Box>
        <Box ref={adaAmountSecondRef}>{!isRewardPool ? <ADADisnableIcon /> : <ADAOrangeIcon />}</Box>
      </AdaAmountWrapper>
      <HolderWrapper ref={holderRef}>
        <ADAHolderRect />
        <ADAOperatorRewardRect disabled={!isRewardPool} />
      </HolderWrapper>
      <RewardAccountBox toggleRewardModal={toggleRewardModal} value={data?.rewardAvailable} ref={rewardAccountRef} />
      <DrawPath paths={paths} />
    </DrawContainer>
  );
};

export default RewarsDistributionDraw;
