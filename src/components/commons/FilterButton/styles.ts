import { Button, styled } from "@mui/material";

export const OutlineButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: 8px;
  background: ${(props) => props.theme.palette.green[200_10]};
  color: ${(props) => props.theme.palette.primary.dark};
  font-weight: 700;
  font-size: 14px;
  height: 35px;
  text-transform: none;
`;
export const WrapPopoverContent = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.palette.green[200_10]};
  }
`;
