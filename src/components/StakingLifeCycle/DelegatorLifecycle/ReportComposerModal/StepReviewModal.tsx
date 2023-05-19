import { Box, CircularProgress, Stack } from "@mui/material";
import StyledModal from "../../../commons/StyledModal";
import {
  Container,
  ModalTitle,
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
import moment from "moment";
import { EVENTS_NAME } from "./StepEventsModal";
import { PencilIcon } from "../../../../commons/resources";
import { ReportType } from "./FilledInfoModal";
import { generateStakeKeyReport, generateStakePoolReport } from "../../../../commons/utils/userRequest";
import useToast from "../../../../commons/hooks/useToast";
import { useHistory } from "react-router-dom";
import { details, routers } from "../../../../commons/routers";
import { useState } from "react";
import { getEventType } from "../../../StakekeySummary";
import { getPoolEventType } from "../../../PoolLifecycle";
import { useScreen } from "../../../../commons/hooks/useScreen";

const StepReviewModal: React.FC<IPropsModal> = ({ open, handleCloseModal, defaultParams, gotoStep }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [step1, step2, step3] = defaultParams || [];

  const history = useHistory();
  const { isMobile } = useScreen();
  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const [step1, step2, step3] = defaultParams || {};
      // eslint-disable-next-line no-unsafe-optional-chaining
      const [start, end] = step1?.dateRange;

      let defaultReportName = `Report_stake_${step1.address}_${step1}_${moment(start).format("MM/DD/yyyy")}_${moment(
        end
      ).format("MM/DD/yyyy")}`;
      if (isPoolReport) {
        defaultReportName = `Report_pool_${step1.address}_${step1}_${moment(start).format("MM/DD/yyyy")}_${moment(
          end
        ).format("MM/DD/yyyy")}`;
        const paramsStakeKeyReport = {
          ...getPoolEventType(step3?.eventsKey),
          poolId: step1.address,
          reportName: step1.reportName || defaultReportName,
          isPoolSize: step2.poolSize === "YES",
          isFeesPaid: step2.feesPaid === "YES",
          event: step3?.eventsKey,
          epochRanges: step1.epochRange
        };
        await generateStakePoolReport(paramsStakeKeyReport);
      } else {
        const events = step3?.eventsKey?.map((event: string) => ({ type: event }));
        const paramsStakeKeyReport = {
          stakeKey: step1.address,
          reportName: step1.reportName || defaultReportName,
          fromDate: moment(start).format("yyyy/MM/DD hh:mm:ss"),
          toDate: moment(end).format("yyyy/MM/D hh:mm:ss"),
          isADATransfer: step2.adaTransfers === "YES",
          isFeesPaid: step2.feesPaid === "YES",
          ...getEventType(events.map((item: { type: string }) => item.type))
        };
        await generateStakeKeyReport(paramsStakeKeyReport);
      }

      toast.success("Generate report success");
      handleCloseModal();
      setTimeout(() => {
        history.push(details.generated_report(isPoolReport ? "pools" : "stake-key"));
      }, 2000);
    } catch (err: any) {
      console.error(err);
      toast.error("This stake key has no transaction history");
    }
    setLoading(false);
  };

  const [start, end] = step1.dateRange || [];
  const [epochStart, epochEnd] = step1.epochRange || [];
  const events = EVENTS_NAME.filter(({ value }) => step3?.eventsKey?.includes(value))
    .map(({ label }) => label)
    .join(", ");

  const isPoolReport = step1.reportType === ReportType.PoolReport;

  const list = [
    {
      label: "Report name",
      value: <TextOverFlow>{step1.reportName}</TextOverFlow>,
      step: STEPS.step1
    },
    {
      label: isPoolReport ? "Epoch range" : "Date range",
      value: isPoolReport
        ? `Epoch ${epochStart} -  Epoch ${epochEnd}`
        : `${moment(start).format("MM/DD/yyyy")} - ${moment(end).format("MM/DD/yyyy")}`,
      step: STEPS.step1
    },
    {
      label: isPoolReport ? "Pool ID" : "Stake key details",
      value: <TextOverFlow>{step1.address}</TextOverFlow>,
      step: STEPS.step1
    },
    {
      label: isPoolReport ? "Pool size" : "ADA transfers",
      value: isPoolReport ? step2.poolSize : step2.adaTransfers,
      step: STEPS.step2
    },
    {
      label: "Fees paid",
      value: step2.feesPaid,
      step: STEPS.step2
    },
    {
      label: isPoolReport ? "Pool Report by event" : "Staking lifecycle events",
      value: events,
      step: STEPS.step3
    }
  ];
  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal} width={555}>
      <Container>
        <ModalTitle sx={{ fontSize: `${isMobile ? "20px" : "24px"}` }}>Report composer</ModalTitle>
        <TextRequired>
          Before proceeding with your report creation, we just want to double-check and confirm that you’ve filled out
          all the details correctly?
        </TextRequired>
        <Stack marginBottom='35px'>
          {list.map(({ label, value, step }) => {
            return (
              <OverViewItem key={label}>
                <OverViewValue>
                  <TextLabelReview>{label}</TextLabelReview>
                  <TextOverFlow>
                    <TextValueReview>{value}</TextValueReview>
                  </TextOverFlow>
                </OverViewValue>
                <PencilIcon style={{ paddingLeft: "10px" }} onClick={() => gotoStep?.(step as number)} />
              </OverViewItem>
            );
          })}
        </Stack>
        <StyledStack direction={"row"} display={"flex"} alignContent={"space-between"} gap={"20px"}>
          <StyledBackButton
            sx={{ fontSize: `${isMobile ? "14px" : "16px"}` }}
            width={isMobile ? 120 : 100}
            onClick={() => gotoStep?.(STEPS.step1)}
          >
            I’d like to double-check
          </StyledBackButton>
          <StyledButton
            disabled={loading}
            onClick={handleGenerateReport}
            sx={{ fontSize: `${isMobile ? "14px" : "16px"}` }}
          >
            {loading && <CircularProgress color='info' size={20} />}Generate report
          </StyledButton>
        </StyledStack>
      </Container>
    </StyledModal>
  );
};

export default StepReviewModal;
