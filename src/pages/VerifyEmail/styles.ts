import { alpha, Box, Button, Divider, Input, styled } from "@mui/material";

import { User2RC } from "src/commons/resources";

export const Container = styled(Box)`
  display: flex;
  background-color: ${({ theme }) =>
    theme.mode === "light" ? theme.palette.primary[100] : theme.palette.secondary[100]};
  min-width: 100vw;
  justify-content: center;
  align-items: center;
`;

export const Title = styled(Box)`
  font-weight: 700;
  font-size: 20px;
  color: ${({ theme }) => (theme.mode === "dark" ? theme.palette.common.white : theme.palette.secondary.light)};
`;

export const WrapContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  transform: translateY(-45px);
`;

export const WrapTitle = styled(Box)`
  text-transform: uppercase;
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.text.primary};
  line-height: 42px;
`;

export const WrapHintText = styled(Box)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.palette.secondary.light};
  display: flex;
  gap: 5px;
`;

export const WrapForm = styled(Box)(({ theme }) => ({
  margin: "10px 30px 0 30px",
  background: theme.palette.secondary[0],
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
  width: "min(80vw,420px)",
  padding: "35px 40px 40px",
  [theme.breakpoints.down("md")]: {
    padding: "40px 15px 20px 15px",
    gap: "15px"
  }
}));

export const WrapInput = styled(Box)`
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
`;

export const InputCustom = styled(Input, { shouldForwardProp: (prop) => prop !== "error" })<{ error?: boolean }>(
  ({ theme, error }) => ({
    borderRadius: "8px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: error ? theme.palette.error.main : theme.palette.secondary.light,
    "&::before": {
      display: "none"
    },
    "&::after": {
      display: "none"
    },
    padding: "5px 10px",
    backgroundColor: error ? (theme.isDark ? "" : "rgba(247, 94, 94, 0.05)") : theme.palette.secondary[0],
    "&.MuiInputBase-root.Mui-focused": {
      borderColor: error ? "" : theme.palette.primary.main
    }
  })
);

export const Label = styled(Box)`
  color: ${({ theme }) => theme.palette.secondary.light};
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  opacity: 0.8;
`;

export const ForgotPassword = styled(Box)`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: underline;
  cursor: pointer;
`;

export const UserCustomIcon = styled(User2RC)`
  path {
    fill: ${({ theme }) => theme.palette.secondary.light};
  }
`;

export const WrapButton = styled(Button)(({ theme }) => ({
  background: theme.mode === "dark" ? theme.palette.primary.main : theme.palette.secondary.main,
  padding: "15px 20px",
  borderRadius: "8px",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "19px",
  textAlign: "center",
  color: theme.palette.secondary[0],
  "&:hover": {
    background: theme.isDark ? "" : theme.palette.secondary.main
  },
  "&.Mui-disabled": {
    color: theme.mode === "dark" ? theme.palette.secondary[0] : theme.palette.secondary.main,
    background:
      theme.mode === "dark" ? alpha(theme.palette.secondary.light, 0.3) : alpha(theme.palette.common.black, 0.26)
  },
  textTransform: "none"
}));

export const WrapButtonConnectWallet = styled(Button)`
  border-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  padding: 14px 20px;
`;

export const WrapDivider = styled(Divider)`
  width: 45%;
  background-color: ${({ theme }) => theme.palette.secondary.light};
`;

export const WrapOr = styled(Box)`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.palette.secondary.light};
  text-transform: uppercase;
`;

export const WrapSignUp = styled(Box)`
  cursor: pointer;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.palette.primary.main};
`;
