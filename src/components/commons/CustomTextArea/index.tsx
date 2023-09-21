import { styled, TextareaAutosize } from "@mui/material";

const CustomTextArea = styled(TextareaAutosize)`
  background: ${({ theme }) => theme.palette.secondary[0]};
  border: 1.5px solid
    ${({ theme }) => (theme.mode === "light" ? theme.palette.primary[200] : theme.palette.secondary[700])};
  border-radius: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  width: 100%;
  min-height: 160px;
  max-height: 160px;
  resize: none;
  padding: 12px 14px;
  box-sizing: border-box;
  font-family: inherit;
  overflow-y: auto !important;
`;

export default CustomTextArea;
