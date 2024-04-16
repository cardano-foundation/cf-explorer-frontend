import { styled, Button, LinearProgress, Box, Switch } from "@mui/material";
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
  background: theme.palette.secondary[0],
  padding: "0 12px",
  borderRadius: 8,
  height: 35,
  border: `1.5px solid ${theme.mode === "light" ? theme.palette.primary[200] : theme.palette.secondary[700]}`,
  "&:focus-within": {
    borderColor: theme.palette.secondary.light
  },
  [theme.breakpoints.down("sm")]: {
    width: "unset",
    maxWidth: "unset"
  }
}));

export const StyledInput = styled("input")`
  border: none;
  width: 100%;
  background: ${({ theme }) => theme.palette.secondary[0]};
  color: ${({ theme }) => theme.palette.secondary.main};
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

export const TopSearchContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

export const ShowRetiredPools = styled(Box)`
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.secondary.light};
  gap: 12px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 48,
  height: 24,
  padding: 0,
  display: "flex",
  borderRadius: 77,
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 18
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(23px)"
    }
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    transform: "translateX(2px)",
    "&.Mui-checked": {
      transform: "translateX(23px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.primary[200]
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: theme.palette.primary.main
      }
    }
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 19,
    height: 19,
    borderRadius: 9,
    transition: theme.transitions.create(["width", "background"], {
      duration: 200
    })
  },
  "& .MuiSwitch-track": {
    borderRadius: 19 / 2,
    opacity: 1,
    backgroundColor: theme.palette.secondary[600],
    boxSizing: "border-box"
  }
}));
