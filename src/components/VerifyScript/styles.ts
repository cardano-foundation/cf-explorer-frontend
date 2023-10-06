import { alpha, Box, Typography, styled } from "@mui/material";

export const Wrapper = styled(Box)`
  & h2 {
    width: 100%;
  }
`;

export const VerifyScriptContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

export const StyledVerifyButton = styled(Box)(({ theme }) => ({
  backgroundColor: theme.mode === "dark" ? theme.palette.secondary.main : theme.palette.primary.main,
  color: theme.mode === "light" ? theme.palette.common.white : theme.palette.secondary[0],
  padding: "10px 20px",
  ":hover": {
    backgroundColor: theme.isDark ? theme.palette.primary.dark : alpha(theme.palette.secondary.main, 0.8)
  },
  borderRadius: 8,
  width: "auto",
  [theme.breakpoints.down("sm")]: {
    width: "100%"
  }
}));

export const Container = styled(Box)(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    label: {
      "*": {
        fontSize: 14,
        lineHeight: "16px"
      }
    }
  }
}));

export const ModalTitle = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.palette.secondary.main};
  margin-bottom: 48px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: 20px;
  }
`;

export const VerifyButton = styled(Box)<{ disabled: boolean }>`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: ${(props) => props.theme.palette.secondary[0]};
  background: ${(props) =>
    props.theme.mode === "light" ? props.theme.palette.secondary.main : props.theme.palette.primary.main};
  border-radius: 8px;
  padding: 10px 20px;
  position: absolute;
  width: 150px;
  height: 24px;
  left: 0;
  right: 0;
  bottom: 0;
  margin-left: auto;
  margin-right: auto;
  &:hover {
    opacity: 0.85;
  }
  pointer-events: ${(props) => (props.disabled ? "none" : "unset")};
  cursor: pointer;
`;

export const ErrorMessage = styled(Box)`
  color: ${(props) => props.theme.palette.error[700]};
  height: 132px;
  margin: 20px 0px;
`;
