import { Container } from "../../../Account/ActivityLogModal/styles";
import StyledModal from "../../../commons/StyledModal";
import { ModalTitle, StyledBackButton, StyledButton, StyledStack } from "./styles";
import { useMemo, useState } from "react";
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from "@mui/material";
import { IPropsModal, STEPS } from ".";

export enum RatioGroupValue {
  yes = "YES",
  no = "NO",
  unTicked = "UN_TICKED",
}

export enum OptionTransfer {
  adaTransfer = "ADA_TRANSFER",
  feesPaid = "FEES_PAID",
}

const StepTransferModal: React.FC<IPropsModal> = ({ open, handleCloseModal, defaultParams, saveParams, gotoStep }) => {
  const [adaTransfers, setADATransfer] = useState<RatioGroupValue>(RatioGroupValue.unTicked);
  const [feesPaid, setFeesPaid] = useState<RatioGroupValue>(RatioGroupValue.unTicked);

  const isDisabled = useMemo(() => {
    return adaTransfers === RatioGroupValue.unTicked || feesPaid === RatioGroupValue.unTicked;
  }, [feesPaid, adaTransfers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: OptionTransfer) => {
    const value = e.target.value as RatioGroupValue;
    if (key === OptionTransfer.adaTransfer) {
      setADATransfer(value);
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
      default:
        break;
    }
  };

  const OPTIONS_TRANSFER = [
    {
      key: OptionTransfer.adaTransfer,
      label: "ADA transfers",
      value: adaTransfers,
      onChange: setADATransfer,
    },
    {
      label: "Fees paid",
      key: OptionTransfer.feesPaid,
      value: feesPaid,
      onChange: setFeesPaid,
    },
  ];

  const handleSubmit = () => {
    saveParams?.({
      adaTransfers,
      feesPaid,
    });
    gotoStep?.(STEPS.step3);
  };

  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal} width={450}>
      <Container>
        <ModalTitle>Report composer</ModalTitle>
        <Container sx={{ marginBottom: 2 }}>
          {OPTIONS_TRANSFER.map(({ key, label, value, onChange }) => {
            return (
              <Box>
                <FormControl sx={{ width: "100%", marginBottom: 1 }}>
                  <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                    <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>
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
                          label="Yes"
                        />
                        <FormControlLabel
                          value={RatioGroupValue.no}
                          control={<Radio onClick={() => handleClickRadio(key)} />}
                          label="No"
                        />
                      </Stack>
                    </RadioGroup>
                  </Box>
                </FormControl>
              </Box>
            );
          })}
        </Container>
        <StyledStack direction={"row"} display={"flex"} alignContent={"space-between"} gap={3}>
          <StyledBackButton onClick={() => gotoStep?.(STEPS.step1)}>Previous</StyledBackButton>
          <StyledButton isDisabled={isDisabled} onClick={handleSubmit}>
            Next
          </StyledButton>
        </StyledStack>
      </Container>
    </StyledModal>
  );
};

export default StepTransferModal;
