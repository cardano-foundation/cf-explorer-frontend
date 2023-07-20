import { Box, Skeleton as SkeletonMUI, styled } from "@mui/material";

import { BoxRaised } from "src/components/commons/BoxRaised";

import { TypeChart } from ".";

export const Tabs = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    textAlign: "end"
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-between"
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(2),
    overflow: "auto"
  }
}));

export const Tab = styled("button")<{ active: number }>(({ theme, active }) => ({
  boxSizing: "border-box",
  width: "50px",
  height: "28px",
  cursor: "pointer",
  textTransform: "lowercase",
  borderRadius: 5,
  border: `2px solid ${theme.palette.green[300_20]}`,
  color: active ? `${theme.palette.primary.contrastText} !important` : theme.palette.grey[300],
  fontWeight: "bold",
  backgroundColor: active ? theme.palette.primary.main : theme.palette.common.white,
  ":hover": {
    color: active ? `${theme.palette.primary.contrastText} !important` : theme.palette.grey[300],
    backgroundColor: active ? theme.palette.primary.main : "none"
  },
  [theme.breakpoints.down("sm")]: {
    border: `1.5px solid ${theme.palette.green[300_20]}`,
    borderRadius: 5,
    height: 28,
    width: 70
  }
}));
export const TransactionContainer = styled(BoxRaised)`
  margin-bottom: 24px;
  padding: 20px;
  height: calc(100% - 56px);
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 25px 15px;
    height: auto;
  }
`;

export const WrapHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start"
  }
}));

export const Title = styled("h3")`
  position: relative;
  text-align: left;
  margin-top: 0px;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  color: ${(props) => props.theme.palette.grey[400]};
  &::after {
    position: absolute;
    top: 100%;
    left: 0;
    content: "";
    width: 50px;
    height: 4px;
    background: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const BoxInfo = styled(Box)(({ theme }) => ({
  height: `calc(88% - ${theme.spacing(3)} - ${theme.spacing(3)})`,
  minHeight: "200px",
  borderRadius: "12px",
  padding: theme.spacing(3),
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 0,
    paddingRight: 0
  },
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    border: "none",
    padding: 0,
    minHeight: 0,
    gap: 20
  }
}));
export const InfoItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "center"
}));
export const Skeleton = styled(SkeletonMUI)(() => ({
  height: 300,
  borderRadius: 12
}));

export const ColorChart = styled(Box)<{ type: TypeChart }>(({ theme, type }) => {
  const bgColor = (type: TypeChart) => {
    switch (type) {
      case "trx":
        return theme.palette.yellow[100];
      case "simple":
        return theme.palette.blue[100];
      case "complex":
        return theme.palette.green[200];

      default:
        return theme.palette.yellow[100];
    }
  };

  return {
    width: "38px",
    height: "38px",
    borderRadius: "5px",
    background: bgColor(type),
    marginRight: theme.spacing(3)
  };
});

export const StyledTransactionTypes = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.5rem",
  textAlign: "left",
  color: theme.palette.grey[400],
  [theme.breakpoints.between("lg", "xl")]: {
    textWrap: "nowrap"
  }
}));

export const StyledTransactionTypeItem = styled(Box)(({ theme }) => ({
  color: `${theme.palette.grey[300]}`,
  fontSize: "0.8125rem"
}));
