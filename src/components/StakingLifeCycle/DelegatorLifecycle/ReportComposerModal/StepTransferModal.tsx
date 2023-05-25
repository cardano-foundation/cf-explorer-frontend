import StyledModal from "../../../commons/StyledModal";
import { Container, ModalTitle, StyledBackButton, StyledButton, StyledStack } from "./styles";
import { useMemo, useState } from "react";
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from "@mui/material";
import { IPropsModal, STEPS } from ".";
import { ReportType } from "./FilledInfoModal";
import { get } from "lodash";
import { useScreen } from "../../../../commons/hooks/useScreen";

export enum RatioGroupValue {
  yes = "YES",
  no = "NO",
  unTicked = "UN_TICKED"
}

export enum OptionTransfer {
  adaTransfer = "ADA_TRANSFER",
  feesPaid = "FEES_PAID",
  poolSize = "POOL_SIZE"
}

const StepTransferModal: React.FC<IPropsModal> = ({ open, handleCloseModal, defaultParams, saveParams, gotoStep }) => {
  const [adaTransfers, setADATransfer] = useState<RatioGroupValue>(RatioGroupValue.unTicked);
  const [feesPaid, setFeesPaid] = useState<RatioGroupValue>(RatioGroupValue.unTicked);
  const [poolSize, setPoolSize] = useState<RatioGroupValue>(RatioGroupValue.unTicked);

  const reportType = useMemo(() => get(defaultParams, "0.reportType"), [defaultParams]);

  const { isMobile } = useScreen();

  const isDisabled = useMemo(() => {
    if (reportType === ReportType.PoolReport) {
      return poolSize === RatioGroupValue.unTicked || feesPaid === RatioGroupValue.unTicked;
    }
    return adaTransfers === RatioGroupValue.unTicked || feesPaid === RatioGroupValue.unTicked;
  }, [feesPaid, adaTransfers, poolSize, reportType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: OptionTransfer) => {
    const value = e.target.value as RatioGroupValue;
    if (key === OptionTransfer.adaTransfer) {
      setADATransfer(value);
    } else if (key === OptionTransfer.poolSize) {
      setPoolSize(value);
    } else {
      setFeesPaid(value);
    }
  };

  const handleClickRadio = (key: OptionTransfer) => {
    switch (key) {
      case OptionTransfer.adaTransfer:
        if (adaTransfers !== RatioGroupValue.unTicked) {
          setADATransfer(RatioGroupValue.unTicked);
        }
        break;
      case OptionTransfer.feesPaid:
        if (feesPaid !== RatioGroupValue.unTicked) {
          setFeesPaid(RatioGroupValue.unTicked);
        }
        break;
      case OptionTransfer.poolSize:
        if (poolSize !== RatioGroupValue.unTicked) {
          setPoolSize(RatioGroupValue.unTicked);
        }
        break;
      default:
        break;
    }
  };

  const OPTIONS_TRANSFER = [
    {
      key: OptionTransfer.adaTransfer,
      label: "ADA transfers",
      value: adaTransfers,
      type: [ReportType.StakeKeyReport]
    },
    {
      key: OptionTransfer.poolSize,
      label: "Pool size",
      value: poolSize,
      type: [ReportType.PoolReport]
    }
  ];

  const handleSubmit = () => {
    saveParams?.({
      adaTransfers,
      feesPaid,
      poolSize
    });
    gotoStep?.(STEPS.step3);
  };

  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal} width={450}>
      <Container>
        <ModalTitle sx={{ fontSize: `${isMobile ? "20px" : "24px"}` }}>Report composer</ModalTitle>
        <Box marginBottom={"20px"}>
          {OPTIONS_TRANSFER.filter(({ type }) => type.includes(reportType)).map(({ key, label, value }) => {
            return (
              <Box key={key}>
                <FormControl sx={{ width: "100%" }}>
                  <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <FormLabel id='demo-controlled-radio-buttons-group'>{label}</FormLabel>
                    <RadioGroup
                      aria-labelledby={key}
                      name={key}
                      value={value}
                      onChange={(e: any) => handleChange(e, key)}
                    >
                      <Stack direction={"row"}>
                        <FormControlLabel
                          value={RatioGroupValue.yes}
                          control={<Radio onClick={() => handleClickRadio(key)} />}
                          label='Yes'
                        />
                        <FormControlLabel
                          value={RatioGroupValue.no}
                          control={<Radio onClick={() => handleClickRadio(key)} />}
                          label='No'
                        />
                      </Stack>
                    </RadioGroup>
                  </Box>
                </FormControl>
              </Box>
            );
          })}
        </Box>
        <StyledStack direction={"row"} display={"flex"} alignContent={"space-between"} gap={3}>
          <StyledBackButton onClick={() => gotoStep?.(STEPS.step1)}>Previous</StyledBackButton>
          <StyledButton disabled={isDisabled} onClick={handleSubmit}>
            Next
          </StyledButton>
        </StyledStack>
      </Container>
    </StyledModal>
  );
};

export default StepTransferModal;
