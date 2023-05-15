import { Box } from '@mui/material';
import FilledInfoModal from './FilledInfoModal';
import StepTransferModal from './StepTransferModal';
import StepEventsModal from './StepEventsModal';
import StepReviewModal from './StepReviewModal';
import { useCallback, useEffect, useState } from 'react';

export interface IPropsModal {
  open: boolean;
  handleCloseModal: () => void;
  saveParams?: (params: any) => void;
  gotoStep?: (step: number) => void;
  defaultParams?: any;
}

export enum STEPS {
  step1 = 1,
  step2 = 2,
  step3 = 3,
  step4 = 4
}

const ReportComposerModal = ({ open, handleCloseModal }: IPropsModal) => {
  const [paramsStep1, setParamsStep1] = useState({});
  const [paramsStep2, setParamsStep2] = useState({});
  const [paramsStep3, setParamsStep3] = useState({});
  const [currentStep, setCurrentStep] = useState<STEPS>();

  const gotoStep = useCallback((step?: STEPS) => {
    setCurrentStep(step);
  }, []);

  useEffect(() => {
    if (open) {
      setCurrentStep(STEPS.step1);
    } else {
      setCurrentStep(undefined);
    }
  }, [open]);

  const defaultParams = [paramsStep1, paramsStep2, paramsStep3];

  return (
    <Box data-testid="steps-modal">
      <FilledInfoModal
        open={currentStep === STEPS.step1}
        handleCloseModal={handleCloseModal}
        saveParams={setParamsStep1}
        gotoStep={gotoStep}
      />
      <StepTransferModal
        open={currentStep === STEPS.step2}
        handleCloseModal={handleCloseModal}
        saveParams={setParamsStep2}
        gotoStep={gotoStep}
        defaultParams={defaultParams}
      />
      <StepEventsModal
        open={currentStep === STEPS.step3}
        handleCloseModal={handleCloseModal}
        saveParams={setParamsStep3}
        gotoStep={gotoStep}
        defaultParams={defaultParams}
      />
      <StepReviewModal
        open={currentStep === STEPS.step4}
        handleCloseModal={handleCloseModal}
        defaultParams={defaultParams}
        gotoStep={gotoStep}
      />
    </Box>
  );
};

export default ReportComposerModal;
