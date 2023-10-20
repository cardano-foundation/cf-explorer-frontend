import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";
import { RECEIVED_REWARDS } from "src/commons/utils/constants";
import InfoSolidIcon from "src/components/commons/InfoSolidIcon";

import {
  DrawContainer,
  HolderWrapper,
  IconWrapper,
  OperatorRewardContainer,
  OperatorRewardWrapper,
  RewardAccountTitle,
  StyledCardanoBlockchain
} from "./styles";
import ADAHolderRect from "./ADAHolderRect";
import ADAOperatorRewardRect from "./ADAOperatorRewardRect";
import StakePoolOperatorRewardsModal from "./StakePoolOperatorRewardsModal";
export interface IRewarsDistributionDrawProps {
  data?: RewardDistributionStaking | null;
  toggleRewardModal: () => void;
  setTypeRewardModal: (type: RECEIVED_REWARDS) => void;
}

const RewardsDistributionDraw: React.FC<IRewarsDistributionDrawProps> = ({
  data,
  toggleRewardModal,
  setTypeRewardModal
}) => {
  const { t } = useTranslation();
  const cardanoBlockchainRef = useRef(null);
  const holderGroupRef = useRef(null);
  const adaHolderRef = useRef(null);
  const operatorRewardRef = useRef(null);

  const isRewardPool = data?.hasLeaderReward;
  const isADAHolder = data?.hasMemberReward;

  const [openRewardsModal, setOpenRewardsModal] = useState(false);

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: cardanoBlockchainRef,
        startPosition: { 0: ["center", "bottom"], lg: ["right", "middle"] },
        end: holderGroupRef,
        endPosition: { 0: ["center", "top"], lg: ["left", "middle"] },
        startOffset: { 0: [0, 0], lg: [-10, 0] },
        arrow: { 0: "top", lg: "left" },
        autoAlign: { 0: "none", lg: "end-horizontal" }
      }
    ];
  }, [isRewardPool, isADAHolder]);

  return (
    <DrawContainer>
      <StakePoolOperatorRewardsModal open={openRewardsModal} onClose={() => setOpenRewardsModal(false)} />
      <StyledCardanoBlockchain ref={cardanoBlockchainRef} />
      <HolderWrapper onClick={toggleRewardModal} ref={holderGroupRef}>
        <RewardAccountTitle>{t("rewardAccount")}</RewardAccountTitle>
        <ADAHolderRect
          onClick={(e) => {
            e.stopPropagation();
            setTypeRewardModal(RECEIVED_REWARDS.MEMBER);
            toggleRewardModal();
          }}
          ref={adaHolderRef}
          disabled={!isADAHolder}
        />
        <OperatorRewardContainer
          onClick={(e) => {
            e.stopPropagation();
            if (isRewardPool) {
              setTypeRewardModal(RECEIVED_REWARDS.LEADER);
              toggleRewardModal();
            }
          }}
        >
          <OperatorRewardWrapper isRewardPool={+!isRewardPool}>
            <ADAOperatorRewardRect ref={operatorRewardRef} disabled={!isRewardPool} />
          </OperatorRewardWrapper>
          <IconWrapper>
            <InfoSolidIcon width="35px" height="35px" onClick={() => setOpenRewardsModal(!openRewardsModal)} />
          </IconWrapper>
        </OperatorRewardContainer>
      </HolderWrapper>
      <DrawPath paths={paths} />
    </DrawContainer>
  );
};

export default RewardsDistributionDraw;
