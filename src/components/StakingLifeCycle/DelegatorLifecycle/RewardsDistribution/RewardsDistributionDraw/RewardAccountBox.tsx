import { BoxProps, Typography, useTheme } from "@mui/material";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

import { RewardAccountIconDarkUrl, RewardAccountIconUrl, WalletIconRewardGreen } from "src/commons/resources";
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
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <RewardAccountCcontainer ref={boxRef} onClick={toggleRewardModal}>
      <RewardBoxImg src={theme.isDark ? RewardAccountIconDarkUrl : RewardAccountIconUrl} />
      <Typography
        fontWeight={700}
        fontSize={20}
        width="100% !important"
        color={({ palette }) => palette.secondary.main}
      >
        {t("glossary.rewardAccount")}
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
