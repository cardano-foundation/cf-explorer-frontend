import { Box, Typography } from "@mui/material";
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
import RegistrationCertificate from "../../../../commons/resources/icons/Staking/RegistrationCertificateIcon.svg";

import Line from "../../../Line";
import {
  FeeBox,
  FilterDateLabel,
  IconButton,
  IconButtonBack,
  Info,
  InfoText,
  NetAmount,
  Payment,
  RoundBox,
  Withdrawn,
} from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import ArrowDiagram from "../../../ArrowDiagram";
import useFetchList from "../../../../commons/hooks/useFetchList";
import { useParams } from "react-router-dom";
import { API } from "../../../../commons/utils/api";
import OverviewStaking from "../../../commons/OverviewStaking";
import { GridBox, WrapFilterDescription } from "../Withdraw/RecentWithdraws/styles";
import StackingFilter, { FilterParams } from "../../../StackingFilter";
import moment from "moment";
import { formatDateTimeLocal } from "../../../../commons/utils/helper";

const RewardsWithdrawal = ({
  containerPosition,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
}) => {
  // To do: chonj default là list sau đó clickdetail nhấn sang timelne. Đổi trong tương la

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
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined,
  });
  const { data, total } = useFetchList<WithdrawItem>(stakeId ? API.STAKE_LIFECYCLE.WITHDRAW(stakeId) : "", {
    page: 0,
    size: 1000,
    ...params,
  });

  return (
    <Box marginTop="32px">
      <Box display={"flex"} justifyContent={"space-between"} marginBottom={"10px"}>
        <span>Recent Withdrawals</span>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>Showing {total} results</WrapFilterDescription>
          {params.fromDate && params.toDate && (
            <FilterDateLabel>
              Date range: {moment(params.fromDate).format("MM/DD/YYYY")} -{" "}
              {moment(params.toDate).format("MM/DD/YYYY")}
            </FilterDateLabel>
          )}
          <StackingFilter
            filterValue={params}
            onFilterValueChange={params => setParams(pre => ({ ...pre, ...params }))}
          />
        </Box>
      </Box>
      <GridBox>
        {data.map((item, index) => {
          return <OverviewStaking key={index} onClick={() => {}} hash={item.txHash} amount={item.value} time={item.time} />;
        })}
      </GridBox>
    </Box>
  );
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
  const feesBrigeRef = useRef(null);
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

          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"relative"}
          >
            <FeeBox ml={1} ref={feesRef}>
              <Box ref={feesBrigeRef} width={236} height={71} position={"absolute"} top={"-76px"} left={0}></Box>
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

          <Box>
            <img ref={cadarnoSystemRef} style={{ marginLeft: "5px" }} src={cadarnoSystem} alt="carrdano" />
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
              isCentalVertical={false}
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={withdrawnRef}
              toRef={cadarnoSystemRef}
              pointTo="border"
              pointFrom="border"
              isCentalHorizontal={false}
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
            <Line
              containerPosition={containerPosition}
              fromRef={feesRef}
              toRef={feesBrigeRef}
              pointTo="center"
              pointFrom="border"
              orient="horizontal"
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={feesBrigeRef}
              toRef={netAmountRef}
              pointTo="border"
              connectFromReverse={true}
              pointFrom="center"
              connectToReverse={true}
              orient="vertical"
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={netAmountRef}
              toRef={boxWalletRef}
              pointTo="border"
              pointFrom="border"
              isCentalHorizontal={false}
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
