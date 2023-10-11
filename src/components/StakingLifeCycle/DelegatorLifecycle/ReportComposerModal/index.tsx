import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { IReportParams } from "src/types/report";

import FilledInfoModal from "./FilledInfoModal";
import StepReviewModal from "./StepReviewModal";

export interface IPropsModal {
  open: boolean;
  handleCloseModal: () => void;
  saveParams?: (params: IReportParams) => void;
  gotoStep?: (step: number) => void;
  params?: IReportParams;
  currentStep?: number;
}

export enum STEPS {
  step1 = 1,
  step2 = 2
}

const ReportComposerModal = ({ open, handleCloseModal }: IPropsModal) => {
  const [params, setParams] = useState<IReportParams>();
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
  return (
    <Box data-testid="report-compose-modal">
      <FilledInfoModal
        open={currentStep === STEPS.step1}
        currentStep={currentStep}
        handleCloseModal={handleCloseModal}
        saveParams={setParams}
        gotoStep={gotoStep}
      />
      {currentStep === STEPS.step2 && (
        <StepReviewModal open handleCloseModal={handleCloseModal} params={params} gotoStep={gotoStep} />
      )}
    </Box>
  );
};

export default ReportComposerModal;
