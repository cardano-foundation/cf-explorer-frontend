import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { ADADisnableIcon, ADAOrangeIcon } from "src/commons/resources";
import CardanoSystem from "src/components/commons/CardanoSystem";
import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";
import ADAHolderRect from "./ADAHolderRect";
import ADAOperatorRewardRect from "./ADAOperatorRewardRect";
import RewardAccountBox from "./RewardAccountBox";
import { AdaAmountWrapper, AdaBox, DrawContainer, HolderWrapper } from "./styles";
import CustomIcon from "src/components/commons/CustomIcon";

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

  const isRewardPool = data?.rewardPools?.length || 0 > 0;

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: cadarnoSystemRef,
        startPosition: { 0: ["right", "bottom"], sm: ["center", "middle"] },
        end: adaAmountFirstRef,
        endPosition: { 0: ["center", "middle"] },
        startOffset: { 0: [0, -50], sm: [0, 0] },
        autoAlign: { 0: "end-vertical", lg: "end-horizontal" }
      },
      {
        start: cadarnoSystemRef,
        startPosition: { 0: ["left", "bottom"], sm: ["right", "middle"] },
        end: adaAmountSecondRef,
        endPosition: { 0: ["center", "middle"] },
        startOffset: { 0: [0, -50], sm: [0, -15], lg: [-15, 0] },
        autoAlign: { 0: "end-vertical", lg: "end-horizontal" },
        dashed: !isRewardPool
      },
      {
        start: adaAmountFirstRef,
        end: holderRef,
        startPosition: { 0: ["center", "middle"] },
        endPosition: { 0: ["right", "top"], lg: ["left", "middle"] },
        endOffset: { sm: [0, 0], lg: [35, 0] },
        arrow: { 0: "top", lg: "left" },
        autoAlign: { 0: "start-vertical", lg: "start-horizontal" }
      },
      {
        start: adaAmountSecondRef,
        end: holderRef,
        startPosition: { 0: ["center", "middle"] },
        endPosition: { 0: ["left", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [0, 20], sm: [0, 40], lg: [20, 0] },
        endOffset: { sm: [0, 0], lg: [35, 0] },
        arrow: { 0: "top", lg: "left" },
        autoAlign: { 0: "start-vertical", lg: "start-horizontal" },
        dashed: !isRewardPool
      },
      {
        start: holderRef,
        end: rewardAccountRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        arrow: { 0: "top", lg: "left" }
      }
    ];
  }, [isRewardPool]);

  const { sidebar } = useSelector(({ user }: RootState) => user);
  return (
    <DrawContainer sidebar={+sidebar}>
      <CardanoSystem ref={cadarnoSystemRef} />
      <AdaAmountWrapper sidebar={+sidebar}>
        <AdaBox ref={adaAmountFirstRef}>
          <CustomIcon icon={ADAOrangeIcon} height={70} />
        </AdaBox>
        <AdaBox ref={adaAmountSecondRef}>
          <CustomIcon icon={isRewardPool ? ADAOrangeIcon : ADADisnableIcon} height={70} />
        </AdaBox>
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
