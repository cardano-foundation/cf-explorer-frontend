import { Box } from "@mui/material";
import { HiArrowLongLeft } from "react-icons/hi2";
import policyIcon from "../../../commons/resources/icons/policyIcon.svg";
import CopyButton from "../../commons/CopyButton";
import {
  BackButton,
  BackText,
  CardItem,
  HeaderContainer,
  HeaderTitle,
  SlotLeader,
  SlotLeaderContainer,
  SlotLeaderSkeleton,
} from "./styles";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

import ScriptModal from "../../ScriptModal";

interface Props {
  data: PolicyDetail | null;
  loading: boolean;
}

const PolicyOverview: React.FC<Props> = ({ data, loading }) => {
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();

  return (
    <Box>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
        <Box>
          <BackButton onClick={history.goBack}>
            <HiArrowLongLeft />
            <BackText>Back</BackText>
          </BackButton>
          <HeaderContainer>
            <HeaderTitle>Policy Details</HeaderTitle>
          </HeaderContainer>
          <SlotLeaderContainer>
            {loading ? (
              <SlotLeaderSkeleton variant="rectangular" />
            ) : (
              <Box>
                <SlotLeader>
                  <Box fontWeight={400} color={theme => theme.palette.text.secondary}>
                    Policy ID:{" "}
                  </Box>{" "}
                  <Box ml={2}>{data?.policyId}</Box> <CopyButton text={data?.policyId} />
                </SlotLeader>
              </Box>
            )}
          </SlotLeaderContainer>
        </Box>
        <CardItem
          color={theme => theme.palette.primary.main}
          fontWeight="bold"
          fontFamily={'"Roboto", sans-serif'}
          fontSize={"1.125rem"}
          component="button"
          border={"none"}
          bgcolor="transparent"
          padding={0}
          onClick={() => setOpenModal(true)}
          style={{ cursor: "pointer" }}
        >
          <Box>
            <img src={policyIcon} alt="" width={"40%"} />
          </Box>
          <Box display={"flex"} flexDirection="column" height={"100%"} justifyContent="space-between">
            <Box>Policy Script</Box>
          </Box>
        </CardItem>
      </Box>

      <ScriptModal open={openModal} onClose={() => setOpenModal(false)} policy={data?.policyId || ""} />
    </Box>
  );
};

export default PolicyOverview;
