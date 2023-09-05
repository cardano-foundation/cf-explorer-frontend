import { styled, Button, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLinearProgress = styled(LinearProgress)<{ saturation: number }>`
  display: inline-block;
  width: 150px;
  height: 8px;
  border-radius: 34px;
  background: ${(props) => props.theme.palette.primary[200]};
  margin-left: 8px;
  & > .MuiLinearProgress-barColorPrimary {
    border-radius: 34px;
    background: ${({ theme, saturation }) =>
      saturation > 100 ? theme.palette.error[700] : theme.palette.primary.main};
  }
`;

export const PoolName = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${({ theme }) => theme.palette.primary.main} !important;
`;

export const SearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  width: "100%",
  maxWidth: 360,
  background: theme.palette.background.paper,
  padding: "0 12px",
  borderRadius: 8,
  marginBottom: 15,
  height: 35,
  border: `1.5px solid ${theme.palette.grey[200]}`,
  "&:focus-within": {
    outline: `1.5px solid ${theme.palette.primary.main}`
  },
  [theme.breakpoints.down("sm")]: {
    width: "unset",
    maxWidth: "unset"
  }
}));

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
  min-width: 35px;
  width: 35px;
  height: 35px;
`;
export const Image = styled("img")`
  width: 20px;
  height: 20px;
`;
