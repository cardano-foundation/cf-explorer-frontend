import React, { useState } from "react";
import { StyledTab, StyledTabs } from "../../pages/RegistrationPools/styles";
import { Container } from "../Account/ActivityLogModal/styles";
import StyledModal from "../commons/StyledModal";
import { TabContext, TabPanel } from "@mui/lab";
import WalletActivity from "./WalletActivity";
import { CustomTab, ModalTitle } from "./styles";
import UserInfo from "./UserInfo";
import { Box } from "@mui/material";

import RewardActivity from "./RewardActivity";
import { BalanceIcon, RewardIcon } from "../../commons/resources";

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

  const onChangeTab = () => {
    if (activityType === ActivityType.WALLET) {
      setActivityType(ActivityType.REWARDS);
    } else {
      setActivityType(ActivityType.WALLET);
    }
  };

  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal}>
      <TabContext value={activityType}>
        <ModalTitle>ADA Transfers</ModalTitle>
        <Container>
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
                  <BalanceIcon />
                  <CustomTab>&nbsp;Wallet Activity</CustomTab>
                </Box>
              }
            />
            <StyledTab
              value={ActivityType.REWARDS}
              label={
                <Box display="flex" alignItems="center" justifyContent={"center"}>
                  <RewardIcon />
                  <CustomTab>&nbsp;Wallet Activity</CustomTab>
                </Box>
              }
            />
          </StyledTabs>
          <TabPanel value={ActivityType.WALLET}>
            <Box>
              <UserInfo />
              <WalletActivity />
            </Box>
          </TabPanel>
          <TabPanel value={ActivityType.REWARDS}>
            <Box>
              <UserInfo />
              <RewardActivity />
            </Box>
          </TabPanel>
        </Container>
      </TabContext>
    </StyledModal>
  );
};

export default ADATransferModal;
