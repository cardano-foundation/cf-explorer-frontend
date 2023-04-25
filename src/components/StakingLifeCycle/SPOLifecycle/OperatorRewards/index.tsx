import { Box } from "@mui/material";
import { useRef, useState } from "react";

import {
  SPOStalking,
  BackIcon,
  AddressIcon,
  ADAGreen,
  TimeIcon,
  ADAOrangeIcon,
} from "../../../../commons/resources";
import cadarnoSystem from "../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg";

import Line from "../../../Line";
import { IconButtonBack, Info, InfoText } from "./styles";
import ArrowDiagram from "../../../ArrowDiagram";

const OperatorReward = ({
  containerPosition,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
}) => {
  // To do: chonj default là list sau đó clickdetail nhấn sang timelne. Đổi trong tương lai
  const [show, setShow] = useState<"list" | "timeline">("timeline");
  return (
    <Box>
      <Box>{show === "list" && <OperatorRewardList />}</Box>
      <Box>
        {show === "timeline" && <OperatorRewardTimeline setShow={setShow} containerPosition={containerPosition} />}
      </Box>
    </Box>
  );
};
export default OperatorReward;

const OperatorRewardList = () => {
  return <Box>list OperatorReward</Box>;
};

const OperatorRewardTimeline = ({
  containerPosition,
  setShow,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  setShow: (show: "list" | "timeline") => void;
}) => {
  const SPOHolderRef = useRef(null);
  const feeRef = useRef(null);
  const cadarnoSystemRef = useRef(null);

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={1} mb={2}>
        <IconButtonBack onClick={() => setShow("list")}>
          <BackIcon />
        </IconButtonBack>
        <Box display={"flex"}>
          <Info>
            <AddressIcon fill="#438F68"  />
            <InfoText>e0c5c3d4e5...c3e04c2</InfoText>
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>2.174433</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>10/24/2022 14:09:02</InfoText>
          </Info>
        </Box>
      </Box>
      <Box>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
          <Box ref={cadarnoSystemRef}>
            <img src={cadarnoSystem} alt="carrdano" />
          </Box>
          <Box ref={feeRef}>
            <ADAOrangeIcon />
          </Box>
          <Box ref={SPOHolderRef}>
            <SPOStalking />
          </Box>

          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100vw",
              zIndex: "-1",
            }}
          >
            <Line
              containerPosition={containerPosition}
              fromRef={cadarnoSystemRef}
              toRef={feeRef}
              pointTo="border"
              pointFrom="border"
              orient="vertical"
            />

            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={feeRef}
              toRef={SPOHolderRef}
              pointTo="border"
              pointFrom="border"
              orient="vertical"
            />
          </svg>
        </Box>
      </Box>
    </Box>
  );
};
