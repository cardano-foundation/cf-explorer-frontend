import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CircularProgress, Stack } from "@mui/material";
import moment from "moment";

import { useScreen } from "src/commons/hooks/useScreen";
import useToast from "src/commons/hooks/useToast";
import { lists } from "src/commons/routers";
import { generateStakeKeyReport, generateStakePoolReport } from "src/commons/utils/userRequest";
import { getPoolEventType } from "src/components/PoolLifecycle";
import { getEventType } from "src/components/StakekeySummary";
import CustomModal from "src/components/commons/CustomModal";
import CustomTooltip from "src/components/commons/CustomTooltip";

import { EVENTS_NAME, ReportType } from "./FilledInfoModal";
import {
  Container,
  OverViewItem,
  OverViewValue,
  StyledBackButton,
  StyledButton,
  StyledStack,
  TextLabelReview,
  TextOverFlow,
  TextRequired,
  TextValueReview
} from "./styles";

import { IPropsModal, STEPS } from ".";

const StepReviewModal: React.FC<IPropsModal> = ({ open, handleCloseModal, params, gotoStep }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { isMobile } = useScreen();
  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const start = params?.dateRange ? params?.dateRange[0] : null;
      const end = params?.dateRange ? params?.dateRange[1] : null;
      let defaultReportName = `Report_stake_${params.address}_${moment(start).format("MM/DD/yyyy")}_${moment(
        end
      ).format("MM/DD/yyyy")}`;
      if (isPoolReport) {
        defaultReportName = `Report_pool_${params.address}_${params.epochRange[0]}_${params.epochRange[1]}`;
        const paramsStakeKeyReport = {
          ...getPoolEventType(params?.eventsKey),
          poolId: params.address,
          reportName: params.reportName || defaultReportName,
          isPoolSize: params.poolSize === "YES",
          isFeesPaid: params.feesPaid === "YES",
          event: params?.eventsKey,
          epochRanges: params.epochRange
        };
        await generateStakePoolReport(paramsStakeKeyReport);
      } else {
        const events = params?.eventsKey?.map((event: string) => ({ type: event }));
        const paramsStakeKeyReport = {
          stakeKey: params.address,
          reportName: params.reportName || defaultReportName,
          fromDate: moment(start).format("yyyy/MM/DD hh:mm:ss"),
          toDate: moment(end).format("yyyy/MM/D hh:mm:ss"),
          isADATransfer: params.adaTransfers === "YES",
          isFeesPaid: params.feesPaid === "YES",
          ...getEventType(events.map((item: { type: string }) => item.type))
        };
        await generateStakeKeyReport(paramsStakeKeyReport);
      }

      toast.success("Generate report success");
      handleCloseModal();
      setTimeout(() => {
        history.push(lists.dashboard(isPoolReport ? "pool-reports" : "stake-key-reports"));
      }, 2000);
    } catch (err: any) {
      console.error(err);
      toast.error("This stake key has no transaction history");
    }
    setLoading(false);
  };

  const [start, end] = params.dateRange || [];
  const [epochStart, epochEnd] = params.epochRange || [];
  const events = EVENTS_NAME.filter(({ value }) => params?.eventsKey?.includes(value))
    .map(({ label }) => label)
    .join(", ");

  const isPoolReport = params.reportType === ReportType.PoolReport;

  const list = [
    {
      label: "Report name",
      value: (
        <CustomTooltip title={`${params.reportName}`.replaceAll("-", " ")}>
          <TextOverFlow>{`${params.reportName}`.replaceAll("-", " ")}</TextOverFlow>
        </CustomTooltip>
      )
    },
    {
      label: isPoolReport ? "Epoch range" : "Date range",
      value: (
        <TextOverFlow>
          {isPoolReport
            ? `Epoch ${epochStart} -  Epoch ${epochEnd}`
            : `${moment(start).format("MM/DD/yyyy")} - ${moment(end).format("MM/DD/yyyy")}`}
        </TextOverFlow>
      )
    },
    {
      label: isPoolReport ? "Pool ID" : "Stake key details",
      value: (
        <CustomTooltip title={params.address}>
          <TextOverFlow>{params.address}</TextOverFlow>
        </CustomTooltip>
      )
    },
    {
      label: isPoolReport ? "Pool size" : "ADA transfers",
      value: <TextOverFlow>{isPoolReport ? params.poolSize : params.adaTransfers}</TextOverFlow>
    },
    {
      label: isPoolReport ? "Pool Report by event" : "Staking lifecycle events",
      value: <TextOverFlow sx={{ whiteSpace: "normal" }}>{events}</TextOverFlow>
    }
  ];
  return (
    <CustomModal open={open} onClose={handleCloseModal} title="Report composer" width={500}>
      <Container>
        <TextRequired>
          Before proceeding with your report creation, we just want to double-check and confirm that you’ve filled out
          all the details correctly?
        </TextRequired>
        <Stack marginBottom="35px">
          {list.map(({ label, value }) => {
            return (
              <OverViewItem key={label}>
                <OverViewValue>
                  <TextLabelReview>{label}</TextLabelReview>
                  <TextValueReview>{value} </TextValueReview>
                </OverViewValue>
              </OverViewItem>
            );
          })}
        </Stack>
        <StyledStack direction={"row"} display={"flex"} alignContent={"space-between"} gap={"20px"}>
          <StyledBackButton
            sx={{ fontSize: isMobile ? 14 : 16 }}
            width={isMobile ? 120 : 100}
            onClick={() => gotoStep?.(STEPS.step1)}
          >
            I’d like to double-check
          </StyledBackButton>
          <StyledButton disabled={loading} onClick={handleGenerateReport} sx={{ fontSize: isMobile ? 14 : 16 }}>
            {loading && <CircularProgress color="info" size={20} />}Generate report
          </StyledButton>
        </StyledStack>
      </Container>
    </CustomModal>
  );
};

export default StepReviewModal;
