import { Box, Button, Divider, FormHelperText, IconButton, Input, styled } from "@mui/material";

import { User2RC } from "src/commons/resources";

export const Container = styled(Box)`
  display: flex;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  min-height: 100vh;
  min-width: 100vw;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;

export const CloseButton = styled(IconButton)<{ saving: number }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid ${(props) => props.theme.palette.grey["A100"]};
  cursor: ${(props) => (props.saving ? `wait` : `pointer`)};
  &:hover {
    ${(props) => (props.saving ? `background: none;` : ``)}
  }
`;

export const WrapContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

export const WrapTitle = styled(Box)`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.text.primary};
  line-height: 42px;
`;

export const WrapHintText = styled(Box)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.palette.grey[400]};
  display: flex;
  gap: 5px;
`;

export const WrapForm = styled(Box)(({ theme }) => ({
  margin: "10px 30px 0 30px",
  background: theme.palette.common.white,
  borderRadius: "12px",
  display: "flex",
  position: "relative",
  flexDirection: "column",
  gap: "10px",
  width: "min(74vw,420px)",
  padding: "35px 40px 40px",
  [theme.breakpoints.down("md")]: {
    padding: "20px 15px",
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

export const Label = styled(Box)`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  opacity: 0.8;
`;

export const ForgotPassword = styled("span")`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.palette.blue[800]};
  text-decoration: underline;
  cursor: pointer;
`;

export const UserCustomIcon = styled(User2RC)`
  path {
    fill: ${({ theme }) => theme.palette.grey[400]};
  }
`;

export const WrapButton = styled(Button)`
  background: ${({ theme }) => theme.palette.grey[700]};
  padding: 15px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
`;

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
  background-color: ${({ theme }) => theme.palette.grey[300]};
`;

export const Title = styled(Box)`
  font-weight: 700;
  font-size: 20px;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

export const WrapOr = styled(Box)`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.palette.grey[300]};
  text-transform: uppercase;
`;

export const WrapEmail = styled("span")`
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

export const LabelInfo = styled(Box)`
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.grey[400]};
`;

export const WrapSignUp = styled(Box)`
  cursor: pointer;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

export const InputCustom = styled(Input, { shouldForwardProp: (prop) => prop !== "error" })<{ error?: boolean }>(
  ({ theme, error }) => ({
    borderRadius: "8px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: error ? "#DD4343" : theme.palette.grey[300],
    "&::before": {
      display: "none"
    },
    "&::after": {
      display: "none"
    },
    padding: "5px 10px",
    backgroundColor: error ? "rgba(247, 94, 94, 0.05)" : ""
  })
);

export const FormHelperTextCustom = styled(FormHelperText)`
  font-size: 14px
  line-height: 16px;
`;

export const BackButton = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  textAlign: "left",
  alignItems: "center",
  gap: "10px",
  marginBottom: "10px",
  cursor: "pointer",
  position: "absolute",
  top: "15px",
  left: "25px",
  [theme.breakpoints.down("md")]: {
    top: "10px",
    left: "12px"
  }
}));

export const BackText = styled("small")`
  color: ${(props) => props.theme.palette.grey[400]};
  font-weight: var(--font-weight-bold);
`;
