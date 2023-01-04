import { styled, Button, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLinearProgress = styled(LinearProgress)`
  display: inline-block;
  width: 100%;
  height: 8px;
  border-radius: 34px;
  background: rgba(0, 0, 0, 0.1);
  margin-left: 8px;
  & > .MuiLinearProgress-barColorPrimary {
    border-radius: 34px;
    background: ${props => props.theme.linearGradientGreen};
  }
`;

export const PoolName = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: var(--color-blue) !important; ;
`;

export const SearchContainer = styled("div")`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  padding: 12px 14px;
  border-radius: 8px;
  margin-bottom: 15px;
`;

export const StyledInput = styled("input")`
  border: none;
  width: 100%;
  font-size: var(--font-size-text-small);
  border-radius: 8px;
`;

export const SubmitButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: 12.5%;
  min-width: 44px;
  width: 44px;
  height: 44px;
`;
export const Image = styled("img")`
  width: 20px;
  height: 20px;
`;
