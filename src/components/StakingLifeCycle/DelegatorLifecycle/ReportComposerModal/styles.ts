import { styled, Stack, Box, Button, TextField } from "@mui/material";
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
    borderRight: "1px solid #E3E5E9",
  },
}));

export const ModalTitle = styled("div")`
  font-weight: 700;
  font-size: 24px;
  color: #13152f;
  margin-bottom: 25px;
`;

export const StyledStack = styled(Stack)`
  margin-bottom: 20px;
  margin-top: 40px;
`;

export const TextWarning = styled("div")`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.5);
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

export const StyledButton = styled(Button)<{ isDisabled: boolean }>`
  background: #13152f;
  opacity: ${props => {
    return props.isDisabled ? 0.3 : 1;
  }};
  width: 100%;
  border-radius: 8px;
  height: 44px;
  padding: 10px 20px;
  text-align: center;
  color: #fff;
  font-weight: 700;
  line-height: 19px;
  pointer-events: ${props => {
    return props.isDisabled ? "none" : "auto";
  }};
  &:hover {
    background: #13152f;
    opacity: 0.8;
  }
`;
export const StyledBackButton = styled(Button)`
  width: 100%;
  border-radius: 8px;
  height: 44px;
  padding: 10px 20px;
  text-align: center;
  color: #344054;
  line-height: 19px;
  font-weight: 500;
  font-size: 16px;
  border: 2px solid #c8cdd8;
  border-radius: 8px;
  &:hover {
    opacity: 0.8;
  }
`;

export const SubText = styled("div")`
  color: #000000;
  font-weight: 500;
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

export const ButtonEvent = styled(Button)<{ isSelected: boolean }>`
  background: ${props => (props.isSelected ? "#667085" : "#f2f2f2")};
  color: ${props => (props.isSelected ? "#fff" : "#667085")};
  border-radius: 6px;
  height: 44px;
  align-items: center;
  padding: 13px 20px;
  gap: 10px;
  &:hover {
    background: ${props => (props.isSelected ? "#f2f2f2" : "#667085")};
    color: ${props => (props.isSelected ? "#667085" : "#fff")};
  }
`;

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
