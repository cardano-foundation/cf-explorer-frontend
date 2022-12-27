import { Box, Modal, Skeleton } from "@mui/material";
import { HiArrowLongLeft } from "react-icons/hi2";

import { details, routers } from "../../../commons/routers";
import delegatedIcon from "../../../commons/resources/icons/delegated.svg";
import totalStakeIcon from "../../../commons/resources/icons/totalStake.svg";
import rewardIcon from "../../../commons/resources/icons/reward.svg";
import rewardWithdrawIcon from "../../../commons/resources/icons/rewardWithdraw.svg";
import infoIcon from "../../../commons/resources/icons/info.svg";
import policyIcon from "../../../commons/resources/icons/policyIcon.svg";
import timeIcon from "../../../commons/resources/icons/time.svg";
import closeIcon from "../../../commons/resources/icons/closeIcon.svg";

import { numberWithCommas } from "../../../commons/utils/helper";

import CopyButton from "../../commons/CopyButton";

import {
  BackButton,
  BackText,
  ButtonClose,
  ButtonView,
  CardInfoOverview,
  CardItem,
  HeaderContainer,
  HeaderTitle,
  LabelStatus,
  ModalContainer,
  SlotLeader,
  SlotLeaderContainer,
  SlotLeaderSkeleton,
  TitleCard,
  ValueCard,
  ViewJson,
} from "./styles";
import useFetch from "../../../commons/hooks/useFetch";
import { useHistory, useParams } from "react-router-dom";
import React, { useState } from "react";
import ReactJson from "react-json-view";

const PolicyOverview = () => {
  const { policyId } = useParams<{ policyId: string }>();
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const { data, loading } = useFetch<PolicyDetail>(`/policy/${policyId}`);

  return (
    <Box>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
        <Box>
          <BackButton onClick={() => history.goBack()}>
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
                  <Box fontWeight={400} color={"#344054"}>
                    Policy Id:{" "}
                  </Box>{" "}
                  <Box ml={2}>{data?.policyId}</Box> <CopyButton text={data?.policyId} />
                </SlotLeader>
              </Box>
            )}
          </SlotLeaderContainer>
        </Box>
      </Box>

      <CardInfoOverview>
        <CardItem display={"flex"} gap={2}>
          <Box>
            <img src={policyIcon} alt="" />
          </Box>
          <Box display={"flex"} flexDirection="column" height={"100%"} justifyContent="space-between">
            <Box
              color={props => props.colorGreenLight}
              fontWeight="bold"
              fontFamily={'"Space Mono", monospace, sans-serif'}
              fontSize={"1.125rem"}
              component="button"
              border={"none"}
              bgcolor="transparent"
              padding={0}
              onClick={() => setOpenModal(true)}
              style={{ cursor: "pointer" }}
            >
              Policy Script
            </Box>
            <Box>
              <Box display={"flex"} alignItems="center">
                <TitleCard mr={1}> Total Tokens </TitleCard>
                <img src={infoIcon} alt="info icon" />
              </Box>
              <ValueCard mt={1}>{numberWithCommas(data?.totalToken || 0)}</ValueCard>
            </Box>
          </Box>
        </CardItem>
        <CardItem>
          <Box>
            <img src={timeIcon} alt="" />
          </Box>
          <Box display={"flex"} alignItems="center">
            <TitleCard my={2} mr={1}>
              Policy Asset Holders{" "}
            </TitleCard>
            <img src={infoIcon} alt="info icon" />
          </Box>
          <ValueCard>
            <ButtonView to={details.policyAssetHolder(policyId)}>View</ButtonView>
          </ValueCard>
        </CardItem>
      </CardInfoOverview>
      <ScriptModal open={openModal} onClose={() => setOpenModal(false)} script={data?.policyScript} />
    </Box>
  );
};

export default PolicyOverview;

interface ScriptModalProps {
  open: boolean;
  onClose: () => void;
  script?: string;
}
const ScriptModal: React.FC<ScriptModalProps> = ({ script, ...props }) => {
  return (
    <Modal {...props}>
      <ModalContainer>
        <ButtonClose onClick={props.onClose}>
          <img src={closeIcon} alt="icon close" />
        </ButtonClose>
        <Box textAlign={"left"} fontSize="1.5rem" fontWeight="bold" fontFamily={'"Space Mono", monospace, sans-serif'}>
          Policy script
        </Box>
        <ViewJson>
          <ReactJson
            name={false}
            src={JSON.parse(script || "")}
            enableClipboard={false}
            displayDataTypes={false}
            style={{ padding: 0, background: "none", color: "#344054" }}
            displayObjectSize={false}
            collapsed={false}
            shouldCollapse={() => false}
          />
        </ViewJson>
      </ModalContainer>
    </Modal>
  );
};
