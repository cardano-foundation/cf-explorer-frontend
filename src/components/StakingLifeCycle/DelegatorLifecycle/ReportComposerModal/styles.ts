import { styled, Stack, Box, Button, TextField, Slider } from "@mui/material";
import { SelectMui } from "../../../commons/Table/styles";

export const StyledLabel = styled("div")`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  margin: 6px 0px;
`;

export const StyledSelect = styled(SelectMui)(() => ({
  width: 200,
  textAlign: "left",
  paddingLeft: 14,
  ".MuiOutlinedInput-notchedOutline": {
    border: 0,
    borderRadius: 0,
    borderRight: "1px solid #E3E5E9"
  }
}));

export const ModalTitle = styled("div")`
  font-weight: 700;
  color: #13152f;
  margin-bottom: 25px;
`;

export const StyledStack = styled(Stack)`
  margin-bottom: 20px;
`;

export const TextWarning = styled("div")`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
`;
export const TextError = styled(TextWarning)`
  color: ${({ theme }) => theme.palette.error.main};
  margin-top: -10px;
  margin-bottom: 20px;
`;

export const StyledAddressSelect = styled(Box)`
  border: 1.5px solid #e3e5e9;
  border-radius: 8px;
  padding: 4px 0px;
  .MuiInputBase-root {
    border-radius: 0;
    border: 0;
  }
`;

export const StyledButton = styled(Button)`
  background: #13152f;
  width: 100%;
  border-radius: 8px;
  height: 44px;
  padding: 10px 20px;
  text-align: center;
  color: #fff;
  font-weight: 700;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-transform: none;
  &:disabled {
    background: #13152f;
    opacity: 0.3;
    color: #fff;
  }
  &:hover {
    background: #13152f;
    opacity: 0.8;
  }
`;
export const StyledBackButton = styled(Button)<{ width?: number | string }>(({ width = 140 }) => ({
  width: `${width}%`,
  borderRadius: "8px",
  height: "44px",
  textAlign: "center",
  color: "#344054",
  lineHeight: "19px",
  fontWeight: 700,
  border: "2px solid #c8cdd8",
  ":hover": {
    opacity: 0.8
  },
  textTransform: "none"
}));

export const SubText = styled("div")`
  color: #000000;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
`;

export const TextRequired = styled("div")`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #667085;
  line-height: 22px;
`;

export const ButtonEvent = styled(Button)<{ active: boolean }>(({ theme, active }) => ({
  background: active ? "#667085" : "#f2f2f2",
  color: active ? "#fff" : "#667085",
  borderRadius: "6px",
  height: "44px",
  alignItems: "center",
  padding: "13px 20px",
  gap: "10px",
  textTransform: "capitalize",
  "&:hover": {
    background: active ? "#667085" : "#f2f2f2",
    color: active ? "#fff" : "#667085"
  },
}));

export const TextLabelReview = styled("div")`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  opacity: 0.6;
`;

export const TextValueReview = styled("div")`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  max-width: 300px;
  color: #000000;
`;

export const TextOverFlow = styled("div")`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledGroupField = styled(TextField)`
  .MuiInputBase-root {
    padding: 0 9px;
    height: 40px;
    border-radius: 8px;
    width: calc(100% - 23px);
  }
  .MuiFormControl-root {
  }
  .MuiInputBase-input {
    font-size: 14px;
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;
export const StyledSlider = styled(Slider)`
  & .MuiSlider-valueLabel {
    transform: translateY(160%) scale(1);
    &::before {
      top: -8px;
    }
  }
  margin-bottom: 12px;
`;
