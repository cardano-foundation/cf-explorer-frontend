import React, { useEffect, useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import { Box, useTheme } from "@mui/material";

import { BalanceIcon, RewardsIcon } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";
import { useScreen } from "src/commons/hooks/useScreen";
import CustomModal from "src/components/commons/CustomModal";

import WalletActivity from "./WalletActivity";
import RewardActivity from "./RewardActivity";
import { CustomTab, StyledBox, StyledTab, StyledTabs } from "./styles";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
}

enum ActivityType {
  WALLET = "WALLET",
  REWARDS = "REWARDS"
}

const ADATransferModal: React.FC<IProps> = ({ open, handleCloseModal }) => {
  const [activityType, setActivityType] = useState<ActivityType>(ActivityType.WALLET);
  const { isGalaxyFoldSmall } = useScreen();
  const theme = useTheme();
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
    <CustomModal title={"ADA Transfers"} open={open} onClose={handleCloseModal} width={1200}>
      <TabContext value={activityType}>
        <StyledBox overflow={!isGalaxyFoldSmall ? "auto" : "hidden"}>
          <StyledTabs
            value={activityType}
            onChange={onChangeTab}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.border.main}`, color: "red" }}
            TabIndicatorProps={{ sx: { backgroundColor: (theme) => theme.palette.primary.main, height: 4 } }}
            scrollButtons="auto"
            variant="scrollable"
          >
            <StyledTab
              value={ActivityType.WALLET}
              label={
                <Box display="flex" alignItems="center" justifyContent={"center"}>
                  <CustomIcon
                    icon={BalanceIcon}
                    width={23}
                    color={(theme) => theme.palette.primary.main}
                    stroke="currentColor"
                  />
                  <CustomTab
                    color={activityType === ActivityType.WALLET ? theme.palette.green[200] : theme.palette.grey[300]}
                  >
                    Wallet Activity
                  </CustomTab>
                </Box>
              }
            />
            <StyledTab
              value={ActivityType.REWARDS}
              label={
                <Box display="flex" alignItems="center" justifyContent={"center"}>
                  <CustomIcon
                    icon={RewardsIcon}
                    width={23}
                    color={(theme) => theme.palette.primary.main}
                    fill="currentColor"
                  />
                  <CustomTab
                    color={activityType === ActivityType.REWARDS ? theme.palette.green[200] : theme.palette.grey[300]}
                  >
                    Rewards Activity
                  </CustomTab>
                </Box>
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
