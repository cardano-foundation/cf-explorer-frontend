import { Box, styled } from "@mui/material";

import Card from "src/components/commons/Card";

export const Item = styled(Card)`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => (theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[700])};
  box-shadow: 2px 2px 10px 0px #43465633;
  &:hover {
    box-shadow: ${({ theme }) =>
      theme.isDark ? ` 2px 2px 10px 0px ${theme.palette.secondary[100]}` : theme.shadow.cardHover};
  }
`;

export const Row = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    color: theme.palette.secondary.light,
    marginBottom: theme.spacing(2),
    ":last-child": {
      marginBottom: 0
    }
  };
});

export const Title = styled(Box)(({ theme }) => {
  return {
    fontSize: "16px",
    fontWeight: "bold",
    marginRight: theme.spacing(1)
  };
});

export const Chip = styled(Box)(({ theme }) => {
  return {
    padding: theme.spacing(0.5, 1),
    border: `1px solid ${theme.palette.primary.main}`,
    background: theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200],
    borderRadius: theme.spacing(2),
    marginRight: theme.spacing(0.5),
    fontSize: 12,
    maxWidth: "120px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: 20
  };
});
