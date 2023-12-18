import React, { useEffect, useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import { useTranslation } from "react-i18next";

import { BalanceIcon, RewardsIcon } from "src/commons/resources";
import { useScreen } from "src/commons/hooks/useScreen";
import CustomModal from "src/components/commons/CustomModal";
import CustomTabTitle from "src/components/commons/CustomTabTitle";
import { Capitalize } from "src/components/commons/CustomText/styles";

import WalletActivity from "./WalletActivity";
import RewardActivity from "./RewardActivity";
import { StyledBox, StyledTab, StyledTabs } from "./styles";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
}

enum ActivityType {
  WALLET = "WALLET",
  REWARDS = "REWARDS"
}

const ADATransferModal: React.FC<IProps> = ({ open, handleCloseModal }) => {
  const { t } = useTranslation();
  const [activityType, setActivityType] = useState<ActivityType>(ActivityType.WALLET);
  const { isGalaxyFoldSmall } = useScreen();

  useEffect(() => {
    if (!open) setActivityType(ActivityType.WALLET);
  }, [open]);

  const onChangeTab = () => {
    if (activityType === ActivityType.WALLET) {
      setActivityType(ActivityType.REWARDS);
    } else {
      setActivityType(ActivityType.WALLET);
    }
  };

  return (
    <CustomModal title={t("common.adaTransfers")} open={open} onClose={handleCloseModal} width={1200}>
      <TabContext value={activityType}>
        <StyledBox overflow={!isGalaxyFoldSmall ? "auto" : "hidden"}>
          <StyledTabs
            value={activityType}
            onChange={onChangeTab}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.primary[200]}`, color: "red" }}
            TabIndicatorProps={{ sx: { backgroundColor: (theme) => theme.palette.primary.main, height: 4 } }}
            scrollButtons="auto"
            variant="scrollable"
          >
            <StyledTab
              value={ActivityType.WALLET}
              label={
                <CustomTabTitle icon={BalanceIcon} active={activityType === ActivityType.WALLET}>
                  <Capitalize>{t("common.walletActivity")}</Capitalize>
                </CustomTabTitle>
              }
            />
            <StyledTab
              value={ActivityType.REWARDS}
              label={
                <CustomTabTitle icon={RewardsIcon} active={activityType === ActivityType.REWARDS}>
                  {t("common.rewardsActivity")}
                </CustomTabTitle>
              }
            />
          </StyledTabs>
          <TabPanel value={ActivityType.WALLET} style={{ padding: 0, paddingTop: 12 }}>
            <WalletActivity />
          </TabPanel>
          <TabPanel value={ActivityType.REWARDS} style={{ padding: 0, paddingTop: 12 }}>
            <RewardActivity />
          </TabPanel>
        </StyledBox>
      </TabContext>
    </CustomModal>
  );
};

export default ADATransferModal;
