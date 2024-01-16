import { Button, styled } from "@mui/material";

export const LinkButtonStaking = styled(Button)`
  display: flex;
  gap: 8px;
  color: ${(props) => (props.theme.isDark ? props.theme.palette.secondary[100] : props.theme.palette.secondary[0])};
  background: ${(props) => props.theme.palette.primary.main};
  width: 100%;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  padding: 12px;
  text-transform: none;
  //font-size: 16px;
  font-weight: 500;
  height: 48px;
  width: 48px;
  ${({ theme }) => theme.breakpoints.up("sm")} {
    width: 48px;
  }

  &:hover {
    background: ${(props) => props.theme.palette.primary.main};
    opacity: 0.8;
  }
`;
