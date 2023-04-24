import { Box } from "@mui/material";
import { useRef, useState } from "react";

import {
  SPOStalking,
  ButtonListIcon,
  BackIcon,
  AddressIcon,
  ADAGreen,
  TimeIcon,
} from "../../../../commons/resources";
import cadarnoSystem from "../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg";
import RegistrationCertificate from "../../../../commons/resources/icons/Staking/RegistrationCertificateIcon.svg";

import Line from "../../../Line";
import { FeeBox, HoldBox, IconButton, IconButtonBack, Info, InfoText } from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import ArrowDiagram from "../../../ArrowDiagram";
import PopoverStyled from "../../../commons/PopoverStyled";
import TransactionHash from "../../../commons/TransactionHash";

const Registration = ({
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
      <Box>{show === "list" && <RegistrationList />}</Box>
      <Box>
        {show === "timeline" && <RegistrationTimeline setShow={setShow} containerPosition={containerPosition} />}
      </Box>
    </Box>
  );
};
export default Registration;

const RegistrationList = () => {
  return <Box>list Registration</Box>;
};

const RegistrationTimeline = ({
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
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const fake1Ref = useRef(null);
  const fake2Ref = useRef(null);
  const registrationRef = useRef(null);

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
            <SPOStalking />
          </Box>

          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Box display={"flex"} flex={1}>
              <PopoverStyled
                render={({ handleClick }) => (
                  <HoldBox ref={holdRef} ml={1}>
                    <Box>
                      <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                        2.0
                      </Box>
                      <ADAicon fontSize="18px" />
                    </Box>
                    <IconButton onClick={() => holdRef?.current && handleClick(holdRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </HoldBox>
                )}
                content={<TransactionHash hash={"1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy"} />}
              />
              <PopoverStyled
                render={({ handleClick }) => (
                  <FeeBox ref={feeRef}>
                    <Box>
                      <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                        0.174433
                      </Box>
                      <ADAicon fontSize="18px" />
                    </Box>
                    <IconButton onClick={() => feeRef?.current && handleClick(feeRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </FeeBox>
                )}
                content={<TransactionHash hash={"1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy"} />}
              />
            </Box>
          </Box>
          <Box ref={cadarnoSystemRef}>
            {/* <CadarnoSystemIcon /> */}
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
              toRef={registrationRef}
              pointTo="border"
              pointFrom="center"
              orient="vertical"
            />
            <Line
              containerPosition={containerPosition}
              fromRef={registrationRef}
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
          <Box ref={fake1Ref} width={"190px"}></Box>
          <Box ref={registrationRef}>
            <img style={{ marginLeft: "5px" }} src={RegistrationCertificate} alt="RegistrationCertificateIcon" />
          </Box>
          <Box ref={fake2Ref} width={"190px"}></Box>
        </Box>
      </Box>
    </Box>
  );
};
