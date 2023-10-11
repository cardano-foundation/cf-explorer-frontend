import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { HiArrowLongLeft } from "react-icons/hi2";

import policyIcon from "src/commons/resources/icons/policyIcon.svg";
import ScriptModal from "src/components/ScriptModal";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { PolicyDark } from "src/commons/resources";

import {
  BackButton,
  BackText,
  CardItem,
  HeaderContainer,
  HeaderTitle,
  OverViewContainer,
  PolicyIdContainer,
  SlotLeader,
  SlotLeaderContainer,
  SlotLeaderSkeleton
} from "./styles";

interface Props {
  data: PolicyDetail | null;
  loading: boolean;
}

const PolicyOverview: React.FC<Props> = ({ data, loading }) => {
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const history = useHistory();

  return (
    <Box data-testid="container">
      <OverViewContainer display={"flex"} justifyContent="space-between" alignItems={"center"}>
        <Box>
          <BackButton onClick={history.goBack}>
            <HiArrowLongLeft color={theme.palette.secondary.light} />
            <BackText>Back</BackText>
          </BackButton>
          <HeaderContainer>
            <HeaderTitle>Policy Details</HeaderTitle>
          </HeaderContainer>
          <SlotLeaderContainer>
            {loading ? (
              <SlotLeaderSkeleton data-testid="loading-element" variant="rectangular" />
            ) : (
              <Box>
                <SlotLeader>
                  <Box fontWeight={400} color={(theme) => theme.palette.secondary.light} sx={{ textWrap: "nowrap" }}>
                    Policy ID:{" "}
                  </Box>{" "}
                  <PolicyIdContainer>
                    <DynamicEllipsisText value={data?.policyId || ""} isCoppy={true} />
                  </PolicyIdContainer>
                </SlotLeader>
              </Box>
            )}
          </SlotLeaderContainer>
        </Box>
        <CardItem
          color={(theme) => theme.palette.primary.main}
          fontWeight="bold"
          fontFamily={'"Roboto", sans-serif'}
          fontSize={"1.125rem"}
          component="button"
          border={"none"}
          bgcolor="transparent"
          padding={0}
          onClick={() => setOpenModal(true)}
          style={{ cursor: "pointer" }}
          data-testid="open-modal-button"
        >
          <Box>
            <img src={theme.isDark ? PolicyDark : policyIcon} alt="" width={"40%"} />
          </Box>
          <Box display={"flex"} flexDirection="column" height={"100%"} justifyContent="space-between">
            <Box>Policy Script</Box>
          </Box>
        </CardItem>
      </OverViewContainer>

      <ScriptModal open={openModal} onClose={() => setOpenModal(false)} policy={data?.policyId || ""} />
    </Box>
  );
};

export default PolicyOverview;
