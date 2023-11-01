import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import CustomModal from "src/components/commons/CustomModal";

import { RewardsModalContent } from "./styles";

interface StakePoolOperatorRewardsModalProps {
  open?: boolean;
  onClose?: () => void;
}

const StakePoolOperatorRewardsModal: React.FC<StakePoolOperatorRewardsModalProps> = ({ open = false, onClose }) => {
  const { t } = useTranslation();
  return (
    <CustomModal open={open} onClose={() => onClose?.()} title={t("slc.operatorRewards")}>
      <RewardsModalContent>
        <Typography>{t("explain.operatorRewardSPO")}</Typography>
      </RewardsModalContent>
    </CustomModal>
  );
};

export default StakePoolOperatorRewardsModal;
