import { Box, Button, Divider, FormHelperText, styled } from "@mui/material";
import { User2RC } from "../../commons/resources";
import { Input } from "@mui/material";

export const Container = styled(Box)`
  display: flex;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

export const WrapContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
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
  color: ${({ theme }) => theme.palette.grey[400]};
  display: flex;
  gap: 5px;
`;

export const WrapForm = styled(Box)`
  margin-top: 15px;
  background: ${({ theme }) => theme.palette.common.white};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 420px;
  padding: 35px 40px 40px;
`;

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

export const ForgotPassword = styled('span')`
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

export const WrapOr = styled(Box)`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.palette.grey[300]};
  text-transform: uppercase;
`;

export const WrapSignUp = styled(Box)`
  cursor: pointer;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

export const InputCustom = styled(Input)`
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.palette.grey[300]};
  &::before {
    display: none;
  }
  &::after {
    display: none;
  }
  padding: 5px 10px;
`;

export const FormHelperTextCustom = styled(FormHelperText)`
  font-size: 14px
  line-height: 16px;
`;
