import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText, FormLabel, InputBase, styled } from "@mui/material";

export const WrapRowItem = styled(Box)`
  position: relative;
`;
export const StyledRowItem = styled(Box)`
  display: flex;
  align-items: center;
  height: 40px;
  margin-top: 4px;
`;

export const StyledLabel = styled(FormLabel)`
  font-size: var(--font-size-text-small);
`;

export const StyledHelper = styled(FormHelperText)`
  position: absolute;
  top: 60px;
  font-size: var(--font-size-text-small);
  color: ${({ theme }) => theme.palette.error[700]};
`;

export const StyledInput = styled(InputBase)`
  border: 1.5px solid ${(props) => props.theme.palette.border.main};
  border-radius: 8px;
  height: 40px;
  padding: 12px 14px;
  font-size: var(--font-size-text);
  flex: 1;
  max-width: 500px;
`;

export const StyledButton = styled(LoadingButton)`
  height: 40px;
  margin-left: 10px;
  padding: 0 20px;
  font-size: var(--font-size-text-small);
  font-weight: var(--font-weight-bold);
  color: ${(props) => props.theme.palette.primary.main};
  font-family: var(--font-family-title);
  text-transform: unset;
  border: 2px solid ${(props) => props.theme.palette.primary.main};
  border-radius: 6px;
`;
