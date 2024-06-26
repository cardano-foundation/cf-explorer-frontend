import { Box, Typography, styled } from "@mui/material";

import Card from "../Card";

export const CardGovernanceVote = styled(Card)`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[700])};
  box-shadow: 2px 2px 10px 0px #43465633;
  cursor: pointer;
  &:hover {
    box-shadow: ${({ theme }) =>
      theme.isDark ? ` 2px 2px 10px 0px ${theme.palette.secondary[100]}` : theme.shadow.cardHover};
  }
`;
export const StatusContainer = styled(Box)`
  & > div:first-child {
    padding: 4px 12px !important;
    margin: unset !important;
    border-radius: 20px;
  }
`;

export const TitleCard = styled(Typography)(({ theme }) => ({
  paddingRight: "3px",
  wordBreak: "break-word",
  fontWeight: 600,
  lineHeight: "28px",
  color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light,
  fontSize: "24px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px"
  }
}));
