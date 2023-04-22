import React, { useEffect, useState } from "react";
import StyledModal from "../../../commons/StyledModal";
import { TabContext, TabPanel } from "@mui/lab";
import WalletActivity from "./RewardActivity";
import { CustomTab, ModalTitle, StyledTab, StyledTabs } from "./styles";
import { Box } from "@mui/material";

import RewardActivity from "./WalletActivity";
import { BalanceIcon, RewardsIcon } from "../../../../commons/resources";
import CustomIcon from "../../../commons/CustomIcon";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
}

enum ActivityType {
  WALLET = "WALLET",
  REWARDS = "REWARDS",
}

const ADATransferModal: React.FC<IProps> = ({ open, handleCloseModal }) => {
  const [activityType, setActivityType] = useState<ActivityType>(ActivityType.WALLET);

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
    <StyledModal open={open} handleCloseModal={handleCloseModal} width={1200}>
      <TabContext value={activityType}>
        <ModalTitle>ADA Transfers</ModalTitle>
        <Box overflow={"auto"} maxHeight={"70vh"}>
          <StyledTabs
            value={activityType}
            onChange={onChangeTab}
            sx={{ borderBottom: theme => `1px solid ${theme.palette.border.main}`, color: "red" }}
            TabIndicatorProps={{ sx: { backgroundColor: theme => theme.palette.primary.main, height: 4 } }}
          >
            <StyledTab
              value={ActivityType.WALLET}
              label={
                <Box display="flex" alignItems="center" justifyContent={"center"}>
                  <CustomIcon
                    icon={BalanceIcon}
                    width={23}
                    color={theme => theme.palette.primary.main}
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
                    color={theme => theme.palette.primary.main}
                    fill="currentColor"
                  />
                  <CustomTab>Wallet Activity</CustomTab>
                </Box>
              }
            />
          </StyledTabs>
          <TabPanel value={ActivityType.WALLET}>
            <WalletActivity />
          </TabPanel>
          <TabPanel value={ActivityType.REWARDS}>
            <RewardActivity />
          </TabPanel>
        </Box>
      </TabContext>
    </StyledModal>
  );
};

export default ADATransferModal;
