import { Box, styled } from "@mui/material";
import DatePicker from "react-datepicker";

export const StyledDatePicker = styled(DatePicker)`
  border: 1.5px solid #e3e5e9;
  height: 40px;
  border-radius: 8px;
  padding-left: 20px;
  width: calc(100% - 20px);
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
