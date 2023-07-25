import { useMemo, useRef } from "react";

import { ADADisnableIcon, ADAOrangeIcon } from "src/commons/resources";
import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";
import CustomIcon from "src/components/commons/CustomIcon";
import { RECEIVED_REWARDS } from "src/commons/utils/constants";

import { AdaAmountWrapper, AdaBox, DrawContainer, HolderWrapper, StyledCardanoBlockchain } from "./styles";
import ADAHolderRect from "./ADAHolderRect";
import ADAOperatorRewardRect from "./ADAOperatorRewardRect";
import RewardAccountBox from "./RewardAccountBox";
export interface IRewarsDistributionDrawProps {
  data?: IStakeKeyDetail | null;
  toggleRewardModal: () => void;
  setTypeRewardModal: (type: RECEIVED_REWARDS) => void;
}

const RewardsDistributionDraw: React.FC<IRewarsDistributionDrawProps> = ({
  data,
  toggleRewardModal,
  setTypeRewardModal
}) => {
  const cardanoBlockchainRef = useRef(null);
  const adaAmountFirstRef = useRef(null);
  const adaAmountSecondRef = useRef(null);
  const holderGroupRef = useRef(null);
  const adaHolderRef = useRef(null);
  const operatorRewardRef = useRef(null);
  const rewardAccountRef = useRef(null);

  const isRewardPool = data?.rewardPools?.length || 0 > 0;

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: cardanoBlockchainRef,
        startPosition: { 0: ["right", "bottom"], sm: ["center", "middle"] },
        end: adaAmountFirstRef,
        endPosition: { 0: ["center", "middle"] },
        startOffset: { 0: [0, -50], sm: [0, 0] },
        autoAlign: { 0: "end-vertical", lg: "end-horizontal" }
      },
      {
        start: cardanoBlockchainRef,
        startPosition: { 0: ["left", "bottom"], sm: ["right", "middle"] },
        end: adaAmountSecondRef,
        endPosition: { 0: ["center", "middle"] },
        startOffset: { 0: [0, -50], sm: [0, -15], lg: [-15, 0] },
        autoAlign: { 0: "end-vertical", lg: "end-horizontal" },
        dashed: !isRewardPool
      },
      {
        start: adaAmountFirstRef,
        end: adaHolderRef,
        startPosition: { 0: ["center", "middle"] },
        endPosition: { 0: ["right", "top"], lg: ["left", "middle"] },
        arrow: { 0: "top", lg: "left" },
        autoAlign: { 0: "start-vertical", lg: "start-horizontal" }
      },
      {
        start: adaAmountSecondRef,
        end: operatorRewardRef,
        startPosition: { 0: ["center", "middle"] },
        endPosition: { 0: ["left", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [0, 20], sm: [0, 40], lg: [20, 0] },
        arrow: { 0: "top", lg: "left" },
        autoAlign: { 0: "start-vertical", lg: "start-horizontal" },
        dashed: !isRewardPool
      },
      {
        start: holderGroupRef,
        end: rewardAccountRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        arrow: { 0: "top", lg: "left" }
      }
    ];
  }, [isRewardPool]);

  const handleToggleModal = (type: RECEIVED_REWARDS) => {
    toggleRewardModal();
    setTypeRewardModal(type);
  };

  return (
    <DrawContainer>
      <StyledCardanoBlockchain ref={cardanoBlockchainRef} />
      <AdaAmountWrapper>
        <AdaBox ref={adaAmountFirstRef} onClick={() => handleToggleModal(RECEIVED_REWARDS.MEMBER)}>
          <CustomIcon icon={ADAOrangeIcon} height={70} />
        </AdaBox>
        <AdaBox ref={adaAmountSecondRef} onClick={() => isRewardPool && handleToggleModal(RECEIVED_REWARDS.LEADER)}>
          <CustomIcon icon={isRewardPool ? ADAOrangeIcon : ADADisnableIcon} height={70} />
        </AdaBox>
      </AdaAmountWrapper>
      <HolderWrapper ref={holderGroupRef}>
        <ADAHolderRect ref={adaHolderRef} />
        <ADAOperatorRewardRect ref={operatorRewardRef} disabled={!isRewardPool} />
      </HolderWrapper>
      <RewardAccountBox
        toggleRewardModal={() => handleToggleModal(RECEIVED_REWARDS.ALL)}
        value={data?.rewardAvailable}
        ref={rewardAccountRef}
      />
      <DrawPath paths={paths} />
    </DrawContainer>
  );
};

export default RewardsDistributionDraw;
