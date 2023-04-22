import { Box } from "@mui/material";
import { useRef, useState } from "react";

import {
  ADAHolderIcon,
  ButtonListIcon,
  BackIcon,
  AddressIcon,
  ADAGreen,
  TimeIcon,
} from "../../../../commons/resources";
import cadarnoSystem from "../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg";
import RegistrationCertificate from "../../../../commons/resources/icons/Staking/RegistrationCertificateIcon.svg";

import Line from "../../../Line";
import { FeeBox, IconButton, IconButtonBack, Info, InfoText, NetAmount, Payment, RoundBox, Withdrawn } from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import ArrowDiagram from "../../../ArrowDiagram";

const RewardsWithdrawal = ({
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
      <Box>{show === "list" && <RewardsWithdrawalList />}</Box>
      <Box>
        {show === "timeline" && <RewardsWithdrawalTimeline setShow={setShow} containerPosition={containerPosition} />}
      </Box>
    </Box>
  );
};
export default RewardsWithdrawal;

const RewardsWithdrawalList = () => {
  return <Box>list RewardsWithdrawal</Box>;
};

const RewardsWithdrawalTimeline = ({
  containerPosition,
  setShow,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  setShow: (show: "list" | "timeline") => void;
}) => {
  const adaHolderRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const boxWalletRef = useRef(null);
  const withdrawnRef = useRef(null);
  const feesRef = useRef(null);
  const netAmountRef = useRef(null);

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
          <Payment ref={boxWalletRef}>
            <NetAmount>
              <Box>
                <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                  2.0
                </Box>
                <ADAicon fontSize="18px" />
              </Box>
              <IconButton>
                <ButtonListIcon />
              </IconButton>
            </NetAmount>
            <NetAmount>
              <Box>
                <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                  2.0
                </Box>
                <ADAicon fontSize="18px" />
              </Box>
              <IconButton>
                <ButtonListIcon />
              </IconButton>
            </NetAmount>
          </Payment>
          <RoundBox>
            <NetAmount ref={netAmountRef}>
              <Box>
                <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                  2.0
                </Box>
                <ADAicon fontSize="18px" />
              </Box>
              <IconButton>
                <ButtonListIcon />
              </IconButton>
            </NetAmount>
            <Withdrawn ref={withdrawnRef}>
              <Box>
                <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                  2.0
                </Box>
                <ADAicon fontSize="18px" />
              </Box>
              <IconButton>
                <ButtonListIcon />
              </IconButton>
            </Withdrawn>
          </RoundBox>

          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <FeeBox ml={1} ref={feesRef}>
              <Box>
                <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                  2.0
                </Box>
                <ADAicon fontSize="18px" />
              </Box>
              <IconButton>
                <ButtonListIcon />
              </IconButton>
            </FeeBox>
          </Box>

          <Box ref={cadarnoSystemRef}>
            <img style={{ marginLeft: "5px" }} src={cadarnoSystem} alt="carrdano" />
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
              toRef={boxWalletRef}
              pointTo="border"
              pointFrom="border"
              orient="vertical"
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={boxWalletRef}
              toRef={withdrawnRef}
              pointTo="border"
              pointFrom="border"
              orient="vertical"
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={withdrawnRef}
              toRef={cadarnoSystemRef}
              pointTo="border"
              pointFrom="border"
              orient="vertical"
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={cadarnoSystemRef}
              toRef={feesRef}
              pointTo="border"
              pointFrom="border"
              orient="vertical"
              connectToReverse={true}
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={feesRef}
              toRef={netAmountRef}
              pointTo="border"
              connectFromReverse={true}
              pointFrom="border"
              connectToReverse={true}
              orient="vertical"
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={netAmountRef}
              toRef={boxWalletRef}
              pointTo="border"
              pointFrom="border"
              connectToReverse={true}
              connectFromReverse={true}
              orient="vertical"
            />
          </svg>
        </Box>
      </Box>
    </Box>
  );
};
