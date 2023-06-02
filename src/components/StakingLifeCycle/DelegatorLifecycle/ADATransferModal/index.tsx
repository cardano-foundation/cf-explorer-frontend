import React, { useEffect, useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import { Box } from "@mui/material";

import StyledModal from "src/components/commons/StyledModal";
import { BalanceIcon, RewardsIcon } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";
import { useScreen } from "src/commons/hooks/useScreen";

import WalletActivity from "./WalletActivity";
import RewardActivity from "./RewardActivity";
import { CustomTab, StyledTab, StyledTabs } from "./styles";

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

  const { isMobile } = useScreen();

  return (
    <StyledModal
      title={"ADA Transfers"}
      open={open}
      handleCloseModal={handleCloseModal}
      width={1200}
      height={isMobile ? "83vh" : "72vh"}
    >
      <TabContext value={activityType}>
        <Box overflow={!isGalaxyFoldSmall ? "auto" : "hidden"} maxHeight={isMobile ? "80vh" : "70vh"}>
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
                  <CustomTab>Wallet Activity</CustomTab>
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
                  <CustomTab>Rewards Activity</CustomTab>
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
        </Box>
      </TabContext>
    </StyledModal>
  );
};

export default ADATransferModal;
