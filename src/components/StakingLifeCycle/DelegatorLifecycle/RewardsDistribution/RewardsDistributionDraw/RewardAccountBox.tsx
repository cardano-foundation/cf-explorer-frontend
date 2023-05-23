import { BoxProps, Typography } from "@mui/material";
import { RewardBoxIcon, WalletIconRewardGreen } from "~/commons/resources";
import { formatADAFull } from "~/commons/utils/helper";
import ADAicon from "~/components/commons/ADAIcon";
import { ClickAbleButton, RewardAccountCcontainer, RewardBoxImg, RewardValueLabel } from "./styles";
import { forwardRef } from "react";

export interface IRewardAccountBoxProps extends BoxProps {
  value?: number;
  toggleRewardModal?: () => void;
}

const RewardAccountBox: React.FC<IRewardAccountBoxProps> = forwardRef(({ value, toggleRewardModal }, boxRef) => {
  return (
    <RewardAccountCcontainer ref={boxRef}>
      <RewardBoxImg src={RewardBoxIcon} />
      <Typography fontWeight={700} fontSize={20} width='100% !important'>
        Reward Account
      </Typography>
      <RewardValueLabel>
        <ClickAbleButton onClick={toggleRewardModal}>
          <WalletIconRewardGreen />
        </ClickAbleButton>
        <Typography fontSize={14}>
          {formatADAFull(value || 0)} <ADAicon fontSize={14} />
        </Typography>
      </RewardValueLabel>
    </RewardAccountCcontainer>
  );
});

RewardAccountBox.displayName = "RewardAccountBox";

export default RewardAccountBox;
