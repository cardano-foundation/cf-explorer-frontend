import { InputBase, Switch, Typography, styled } from "@mui/material";

export const HashName = styled(Typography)(({ theme }) => ({
  paddingBottom: "15px",
  fontSize: "32px",
  fontWeight: 600,
  lineHeight: "28px",
  textAlign: "center",
  paddingLeft: "20px",
  color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light,
  paddingLeft: "20px",
  [theme.breakpoints.down("lg")]: {
    fontSize: "24px"
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px"
  }
}));

export const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 56,
  height: 32,
  padding: 0,
  display: "flex",
  borderRadius: 20,
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 24
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
        backgroundColor: theme.palette.primary.main
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: theme.palette.secondary[100]
      }
    }
  },
  "& .MuiSwitch-thumb": {
    marginTop: "2px",
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: theme.palette.secondary[600],
    transition: theme.transitions.create(["width", "background"], {
      duration: 200
    })
  },
  "& .MuiSwitch-track": {
    borderRadius: 20,
    opacity: 1,
    backgroundColor: theme.palette.secondary[100],
    border: `1px solid ${theme.palette.secondary.background}`,
    boxSizing: "border-box"
  }
}));
export const StyledArea = styled(InputBase)`
  .MuiInputBase-input {
    padding: 14px 14px;
    border: 1.5px solid ${({ theme, error }) => (error ? theme.palette.error.main : theme.palette.primary[200])};
    border-radius: var(--border-radius-sm);
    box-sizing: border-box;
  }
`;
