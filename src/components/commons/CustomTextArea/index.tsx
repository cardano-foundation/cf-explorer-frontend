import { styled, TextareaAutosize } from "@mui/material";

const CustomTextArea = styled(TextareaAutosize)`
  background: #ffffff;
  border: 1.5px solid #e3e5e9;
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
