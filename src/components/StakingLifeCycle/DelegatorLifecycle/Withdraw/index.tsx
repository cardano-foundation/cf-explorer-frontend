import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import {
  ADAHolderIcon,
  ButtonListIcon,
  BackIcon,
  AddressIcon,
  ADAGreen,
  TimeIcon,
} from "../../../../commons/resources";
import cadarnoSystem from "../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg";
import WithdrawCertificate from "../../../../commons/resources/icons/Staking/RegistrationCertificateIcon.svg";

import Line from "../../../Line";
import { FeeBox, HoldBox, IconButton, IconButtonBack, Info, InfoText } from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import ArrowDiagram from "../../../ArrowDiagram";
import RecentWithdraws from "./RecentWithdraws";
import useFetch from "../../../../commons/hooks/useFetch";
import { API } from "../../../../commons/utils/api";
import { useParams } from "react-router";

const Withdraw = ({
  containerPosition,
  handleResize,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
}) => {
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [show, setShow] = useState<"list" | "timeline">("list");
  const [hash, setHash] = useState("");
  const { data } = useFetch(hash && stakeId && API.STAKE_LIFECYCLE.WITHDRAW_DETAIL(stakeId, hash));

  const handleSelect = (hash: string) => {
    setHash(hash);
    setShow("timeline");
  };

  return (
    <Box>
      <Box>{show === "list" && <RecentWithdraws onSelect={handleSelect} />}</Box>
      <Box>
        {show === "timeline" && (
          <WithdrawTimeline handleResize={handleResize} setShow={setShow} containerPosition={containerPosition} />
        )}
      </Box>
    </Box>
  );
};
export default Withdraw;

const WithdrawTimeline = ({
  containerPosition,
  setShow,
  handleResize,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
  setShow: (show: "list" | "timeline") => void;
}) => {
  const [loading, setLoading] = useState(true);
  const adaHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const fake1Ref = useRef(null);
  const fake2Ref = useRef(null);
  const WithdrawRef = useRef(null);

  useEffect(() => {
    handleResize();
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return <Box>loading</Box>;
  }
  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={1} mb={2}>
        <IconButtonBack onClick={() => setShow("list")}>
          <BackIcon />
        </IconButtonBack>
        <Box display={"flex"}>
          <Info>
            <AddressIcon />
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
          <Box ref={adaHolderRef}>
            <ADAHolderIcon />
          </Box>

          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Box display={"flex"} flex={1}>
              <HoldBox ref={holdRef} ml={1}>
                <Box>
                  <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                    2.0
                  </Box>
                  <ADAicon fontSize="18px" />
                </Box>
                <IconButton>
                  <ButtonListIcon />
                </IconButton>
              </HoldBox>
              <FeeBox ref={feeRef}>
                <Box>
                  <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                    0.174433
                  </Box>
                  <ADAicon fontSize="18px" />
                </Box>
                <IconButton>
                  <ButtonListIcon />
                </IconButton>
              </FeeBox>
            </Box>
          </Box>
          <Box ref={cadarnoSystemRef} width={190} height={215}>
            {/* <CadarnoSystemIcon /> */}
            <img src={cadarnoSystem} alt="carrdano" />
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
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={holdRef}
              pointTo="border"
              pointFrom="border"
              orient="vertical"
            />
            <Line
              containerPosition={containerPosition}
              pointTo="border"
              pointFrom="border"
              orient="vertical"
              fromRef={holdRef}
              toRef={feeRef}
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={feeRef}
              toRef={cadarnoSystemRef}
              pointTo="border"
              pointFrom="border"
              orient="vertical"
            />
            <Line
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={fake1Ref}
              orient="horizontal"
              pointFrom="border"
              pointTo="center"
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={fake1Ref}
              toRef={WithdrawRef}
              pointTo="border"
              pointFrom="center"
              orient="vertical"
            />
            <Line
              containerPosition={containerPosition}
              fromRef={WithdrawRef}
              toRef={fake2Ref}
              orient="vertical"
              pointFrom="border"
              pointTo="center"
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={fake2Ref}
              toRef={cadarnoSystemRef}
              orient="horizontal"
              pointFrom="center"
              pointTo="border"
            />
          </svg>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} position={"relative"} top={"-60px"}>
          <Box ref={fake1Ref} width={"190px"} height={220}></Box>
          <Box ref={WithdrawRef} height={220} width={220}>
            <img style={{ marginLeft: "5px" }} src={WithdrawCertificate} alt="WithdrawCertificateIcon" />
          </Box>
          <Box ref={fake2Ref} width={"190px"} height={220}></Box>
        </Box>
      </Box>
    </Box>
  );
};
