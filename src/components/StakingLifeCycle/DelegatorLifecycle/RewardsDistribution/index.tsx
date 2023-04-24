import { Box } from "@mui/material";
import { useRef } from "react";

import { ADAHolderIcon, ADAOrangeIcon, ButtonListIcon } from "../../../../commons/resources";
import cadarnoSystem from "../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg";
import RegistrationCertificate from "../../../../commons/resources/icons/Staking/RegistrationCertificateIcon.svg";

import Line from "../../../Line";
import { FeeBox, IconButton } from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import ArrowDiagram from "../../../ArrowDiagram";
import PopoverStyled from "../../../commons/PopoverStyled";
import TransactionHash from "../../../commons/TransactionHash";

const RewardsDistribution = ({
  containerPosition,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
}) => {
  const cadarnoSystemRef = useRef(null);
  const adaIcon1Ref = useRef(null);
  const adaIcon2Ref = useRef(null);
  const adaHolderRef = useRef(null);
  const operatorRewardRef = useRef(null);
  const feeRef = useRef(null);
  const fee2Ref = useRef(null);
  return (
    <Box mt={3}>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
        <Box display={"flex"} flex={3} justifyContent={"space-between"}>
          <Box ref={cadarnoSystemRef}>
            <ADAHolderIcon />
          </Box>
          <Box py={3} display={"flex"} flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"}>
            <Box>
              <ADAOrangeIcon ref={adaIcon1Ref} />
            </Box>
            <Box>
              <ADAOrangeIcon ref={adaIcon2Ref} />
            </Box>
          </Box>
          <Box display={"flex"} py={3} flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"}>
            <Box display={"flex"} ref={adaHolderRef}>
              <PopoverStyled
                render={({ handleClick }: any) => (
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
            <Box display={"flex"} ref={operatorRewardRef}>
              <PopoverStyled
                render={({ handleClick }: any) => (
                  <FeeBox ref={fee2Ref}>
                    <Box>
                      <Box component={"span"} fontSize={"18px"} fontWeight={"bold"} mr={1}>
                        0.174433
                      </Box>
                      <ADAicon fontSize="18px" />
                    </Box>
                    <IconButton onClick={() => fee2Ref?.current && handleClick(fee2Ref.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </FeeBox>
                )}
                content={<TransactionHash hash={"1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy"} />}
              />
            </Box>
          </Box>
        </Box>
        <Box flex={1} textAlign={'end'}>
          <img style={{ marginLeft: "5px" }} src={cadarnoSystem} alt="carrdano" />
        </Box>
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
          toRef={adaIcon1Ref}
          pointTo="border"
          pointFrom="border"
          orient="vertical"
          isCentalVertical={false}
        />
        <Line
          containerPosition={containerPosition}
          fromRef={cadarnoSystemRef}
          toRef={adaIcon2Ref}
          pointTo="border"
          pointFrom="border"
          isCentalVertical={false}
          orient="vertical"
        />
        <ArrowDiagram
          containerPosition={containerPosition}
          fromRef={adaIcon1Ref}
          toRef={adaHolderRef}
          pointTo="border"
          pointFrom="border"
          orient="vertical"
        />
        <ArrowDiagram
          containerPosition={containerPosition}
          fromRef={adaIcon2Ref}
          toRef={operatorRewardRef}
          pointTo="border"
          pointFrom="border"
          orient="vertical"
        />
      </svg>
    </Box>
  );
};
export default RewardsDistribution;
