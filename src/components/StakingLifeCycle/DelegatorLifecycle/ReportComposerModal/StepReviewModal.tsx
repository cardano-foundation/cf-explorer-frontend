import { Box, Stack } from '@mui/material';
import { Container } from '../../../Account/ActivityLogModal/styles';
import StyledModal from '../../../commons/StyledModal';
import {
  ModalTitle,
  StyledBackButton,
  StyledButton,
  StyledStack,
  TextLabelReview,
  TextOverFlow,
  TextRequired,
  TextValueReview
} from './styles';
import { IPropsModal, STEPS } from '.';
import moment from 'moment';
import { EVENTS_NAME } from './StepEventsModal';
import { PencilIcon } from '../../../../commons/resources';
import { ReportType } from './FilledInfoModal';
import { generateStakeKeyReport, generateStakePoolReport } from '../../../../commons/utils/userRequest';
import useToast from '../../../../commons/hooks/useToast';
import { useHistory } from 'react-router-dom';
import { routers } from '../../../../commons/routers';

const StepReviewModal: React.FC<IPropsModal> = ({ open, handleCloseModal, defaultParams, gotoStep }) => {
  const toast = useToast();
  const [step1, step2, step3] = defaultParams || [];

  const history = useHistory();
  const handleGenerateReport = async () => {
    try {
      const [step1, step2, step3] = defaultParams || {};
      // eslint-disable-next-line no-unsafe-optional-chaining
      const [start, end] = step1 && step1?.dateRange;

      const defaultReportName = `Report_stake_${step1.address}_${step1}_${moment(start).format('MM/DD/yyyy')}_${moment(
        end
      ).format('MM/DD/yyyy')}`;

      if (isPoolReport) {
        const paramsStakeKeyReport = {
          poolId: step1.address,
          reportName: step1.reportName || defaultReportName,
          isPoolSize: step2.poolSize === 'YES',
          isFeesPaid: step2.adaTransfers === 'YES',
          event: step3?.eventsKey,
          epochRanges: step1.epochRange
        };
        await generateStakePoolReport(paramsStakeKeyReport);
      } else {
        const events = step3?.eventsKey?.map((event: string) => ({ type: event }));
        const paramsStakeKeyReport = {
          stakeKey: step1.address,
          reportName: step1.reportName || defaultReportName,
          fromDate: moment(start).format('yyyy/MM/DD hh:mm:ss'),
          toDate: moment(end).format('yyyy/MM/D hh:mm:ss'),
          isADATransfer: step2.adaTransfers === 'YES',
          isFeesPaid: step2.adaTransfers === 'YES',
          stakingLifeCycleEvents: events
        };
        await generateStakeKeyReport(paramsStakeKeyReport);
      }

      toast.success('Generate report success');
      handleCloseModal();
      setTimeout(() => {
        history.push(`${routers.REPORT_GENERATED}`);
      }, 2000);
    } catch (err: any) {
      console.error(err);
      toast.error('This stake key has no transaction history');
    }
  };

  const [start, end] = step1.dateRange || [];
  const [epochStart, epochEnd] = step1.epochRange || [];
  const events = EVENTS_NAME.filter(({ value }) => step3?.eventsKey?.includes(value))
    .map(({ label }) => label)
    .join(', ');

  const isPoolReport = step1.reportType === ReportType.PoolReport;

  const list = [
    {
      label: 'Report name',
      value: <TextOverFlow>{step1.reportName}</TextOverFlow>,
      step: STEPS.step1
    },
    {
      label: isPoolReport ? 'Epoch range' : 'Date range',
      value: isPoolReport
        ? `Epoch ${epochStart} -  Epoch ${epochEnd}`
        : `${moment(start).format('d MM yy')} - ${moment(end).format('d MM yy')}`,
      step: STEPS.step1
    },
    {
      label: 'Address details',
      value: <TextOverFlow>{step1.address}</TextOverFlow>,
      step: STEPS.step1
    },
    {
      label: isPoolReport ? 'Pool size' : 'ADA transfers',
      value: isPoolReport ? step2.poolSize : step2.adaTransfers,
      step: STEPS.step2
    },
    {
      label: 'Fees paid',
      value: step2.feesPaid,
      step: STEPS.step2
    },
    {
      label: 'Staking lifecycle events',
      value: events,
      step: STEPS.step3
    }
  ];

  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal} width={555}>
      <Container>
        <ModalTitle>Report composer</ModalTitle>
        <TextRequired>
          Before proceeding with your report creation, we just want to double-check and confirm that you’ve filled out
          all the details correctly?
        </TextRequired>
        <Stack>
          {list.map(({ label, value, step }, index: number) => {
            return (
              <Box
                display={'flex'}
                key={label}
                padding={'10px 0px'}
                justifyContent={'space-between'}
                borderBottom={index === list.length - 1 ? 'none' : '1px solid #000000'}
              >
                <TextLabelReview>{label}</TextLabelReview>
                <Stack direction={'row'} spacing={1} justifyContent='center'>
                  <TextValueReview>{value}</TextValueReview>
                  <PencilIcon onClick={() => gotoStep?.(step as number)} />
                </Stack>
              </Box>
            );
          })}
        </Stack>
        <StyledStack direction={'row'} display={'flex'} alignContent={'space-between'} gap={'20px'}>
          <StyledBackButton onClick={() => gotoStep?.(STEPS.step1)}>I’d like to double-check</StyledBackButton>
          <StyledButton isDisabled={false} onClick={handleGenerateReport}>
            Generate report
          </StyledButton>
        </StyledStack>
      </Container>
    </StyledModal>
  );
};

export default StepReviewModal;
