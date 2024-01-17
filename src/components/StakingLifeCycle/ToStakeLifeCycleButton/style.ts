import { Button, styled } from "@mui/material";

export const LinkButtonStaking = styled(Button)`
  display: flex;
  color: ${(props) => (props.theme.isDark ? props.theme.palette.secondary[100] : props.theme.palette.secondary[0])};
  background: ${(props) => props.theme.palette.primary.main};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  text-transform: none;
  //font-size: 16px;
  font-weight: 500;
  box-sizing: border-box;
  height: 48px;
  width: 48px;
  min-width: unset;
  ${({ theme }) => theme.breakpoints.up("sm")} {
    height: 48px;
    width: 48px;
  }

  &:hover {
    background: ${(props) => props.theme.palette.primary.main};
    opacity: 0.8;
  }
`;
