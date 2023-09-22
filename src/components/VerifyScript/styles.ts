import { Box, Typography, styled } from "@mui/material";

export const Wrapper = styled(Box)`
  & h2 {
    width: 100%;
  }
`;

export const VerifyScriptContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
`;

export const StyledVerifyButton = styled(Box)<{ verified: number }>(({ verified, theme }) => ({
  color: verified ? theme.palette.success[800] : theme.palette.secondary[0],
  background: verified
    ? theme.palette.success[100]
    : theme.mode === "light"
    ? theme.palette.secondary.light
    : theme.palette.secondary[800],
  cursor: "pointer",
  borderRadius: 2,
  padding: "4px 14px",
  fontWeight: 700,
  lineHeight: 1.2,
  fontSize: "14px",
  height: "24px",
  boxSizing: "border-box"
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
