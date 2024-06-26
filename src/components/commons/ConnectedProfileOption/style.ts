import { Box, ButtonBase, Popover, styled } from "@mui/material";

export const WrapContent = styled(Popover)`
  .MuiPaper-root {
    background: ${({ theme }) => theme.palette.secondary[0]};
    margin-top: 6px;
    border-radius: 20px;
    width: 220px;
    height: 120px;
    display: flex;
    align-items: center;
  }
`;

export const Content = styled(Box)`
  padding: 16px 24px;
  & > div {
    cursor: pointer;
  }
`;

export const Profile = styled(Box)`
  display: flex;
  align-items: center;
  h4 {
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

export const Disconnect = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 26px;
  h4 {
    color: ${(props) => props.theme.palette.error[700]};
  }
`;

export const Icon = styled("img")`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export const Name = styled("h4")`
  margin: 0px;
`;

export const StyledButton = styled(ButtonBase)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  gap: 8px;
  background: ${({ theme }) => (theme.mode === "light" ? theme.palette.secondary.main : theme.palette.primary.main)};
  border-radius: 8px;
  cursor: pointer;
  height: auto;
  border: none;
  font-size: var(--font-size-text);
  line-height: 1;
  height: 40px;
`;

export const Span = styled("span")`
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  color: ${(props) => props.theme.palette.secondary[0]};
  white-space: nowrap;
  line-height: 1;
`;
