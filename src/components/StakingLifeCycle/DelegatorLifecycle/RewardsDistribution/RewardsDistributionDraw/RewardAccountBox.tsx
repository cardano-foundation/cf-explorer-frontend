import { BoxProps, Typography } from "@mui/material";
import { forwardRef } from "react";

import { RewardAccountIconUrl, WalletIconRewardGreen } from "src/commons/resources";
import { formatADAFull } from "src/commons/utils/helper";

import {
  ClickAbleButton,
  RewardAccountCcontainer,
  RewardBoxImg,
  RewardValue,
  RewardValueLabel,
  StyledAdaLogoIcon
} from "./styles";

export interface IRewardAccountBoxProps extends BoxProps {
  value?: number;
  toggleRewardModal?: () => void;
}

const RewardAccountBox: React.FC<IRewardAccountBoxProps> = forwardRef(({ value, toggleRewardModal }, boxRef) => {
  return (
    <RewardAccountCcontainer ref={boxRef} onClick={toggleRewardModal}>
      <RewardBoxImg src={RewardAccountIconUrl} />
      <Typography fontWeight={700} fontSize={20} width="100% !important" color={({ palette }) => palette.grey[400]}>
        Reward Account
      </Typography>
      <RewardValueLabel>
        <ClickAbleButton data-testid="toggle-reward-modal">
          <WalletIconRewardGreen />
        </ClickAbleButton>
        <RewardValue>
          {formatADAFull(value || 0)}
          <StyledAdaLogoIcon />
        </RewardValue>
      </RewardValueLabel>
    </RewardAccountCcontainer>
  );
});

RewardAccountBox.displayName = "RewardAccountBox";

export default RewardAccountBox;
