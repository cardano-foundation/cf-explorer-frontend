import { IconButton, Box, styled } from "@mui/material";
import DatePicker from "react-datepicker";

export const StyledDatePicker = styled(DatePicker)`
  border: 1.5px solid #e3e5e9;
  height: 40px;
  border-radius: 8px;
  padding-left: 20px;
  width: calc(100% - 20px);
  &.react-datepicker__header {
    background-color: #fff !important;
    border-bottom: 0px !important;
    padding-bottom: 5px !important;
  }

  &.react-datepicker__month-container {
    padding: 10px !important;
  }

  &.react-datepicker__day--selected,
  &.react-datepicker__day--keyboard-selected {
    background-color: red !important;
    color: white;
  }

  &.react-datepicker__day--selected:hover,
  &.react-datepicker__day--keyboard-selected:hover {
    background-color: blue !important;
    color: white;
  }

  &.react-datepicker__day--in-selecting-range {
    background-color: yellow !important;
    color: white;
  }

  &.react-datepicker__day--in-range {
    background-color: green !important;
    color: white;
  }
`;

export const SelectDateButton = styled(Box)(() => ({
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer"
}));

export const WrapCustomDatePicker = styled(Box)(({ theme }) => ({
  position: "relative",
  border: `1.5px solid ${theme.palette.border.main}`,
  borderRadius: "8px",
  backgroundColor: theme.palette.common.white,
  padding: "12px 14px",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  minHeight: "18px",
  minWidth: "200px",
  fontSize: "16px",
  fontWeight: 400
}));

export const CloseButtonLeft = styled(IconButton)<{ saving: number }>`
  position: absolute;
  top: -10px;
  right: 0;
  width: 16px;
  height: 16px;
  padding: 0;
  border: 1px solid ${(props) => props.theme.palette.grey["A100"]};
  cursor: ${(props) => (props.saving ? `wait` : `pointer`)};
  &:hover {
    ${(props) => (props.saving ? `background: none;` : ``)}
  }
  @media (min-width: 750px) {
    display: none;
  }
`;

export const CloseButtonRight = styled(IconButton)<{ saving: number }>`
  position: absolute;
  top: -10px;
  right: 0;
  width: 16px;
  height: 16px;
  padding: 0;
  border: 1px solid ${(props) => props.theme.palette.grey["A100"]};
  cursor: ${(props) => (props.saving ? `wait` : `pointer`)};
  &:hover {
    ${(props) => (props.saving ? `background: none;` : ``)}
  }
  @media (max-width: 750px) {
    display: none;
  }
`;

export const MyGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridGap: "8px",
  padding: "10px 6px"
}));

export const WrapContainerPickerStart = styled(Box)`
  position: absolute;
  @media (min-width: 750px) {
    top: 66%;
    left: -10%;
  }
  @media (max-width: 750px) {
    top: -350px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
`;
export const WrapContainerPickerEnd = styled(Box)`
  position: absolute;
  @media (min-width: 750px) {
    top: 66%;
    right: 49%;
  }
  @media (max-width: 750px) {
    top: 300px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
`;

export const HiddenScroll = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "-10%",
  width: "fit-content",
  height: "200px",
  overflow: "auto",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
  borderRadius: "8px",
  zIndex: 1,
  "&::-webkit-scrollbar": {
    width: "5px"
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent"
  },
  "&::-webkit-scrollbar-thumb": {
    background: "transparent"
  },
  "&:hover": {
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.grey[300]
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.grey[100]
    }
  }
}));

export const SelectYear = styled(Box)<{ isActive: number }>(({ theme, isActive }) => ({
  padding: "8px 16px",
  cursor: "pointer",
  borderRadius: "18px",
  backgroundColor: isActive ? theme.palette.primary.main : "transparent",
  color: isActive ? "#fff" : theme.palette.text.primary,
  "&:hover": {
    backgroundColor: isActive ? theme.palette.primary.main : theme.palette.grey[100]
  }
}));
