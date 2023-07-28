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
  border: `2px solid ${theme.palette.primary[200]}`,
  color: active ? `${theme.palette.secondary[0]} !important` : theme.palette.secondary.main,
  fontWeight: "bold",
  backgroundColor: active ? theme.palette.secondary.light : theme.palette.secondary[0],
  marginLeft: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    border: `1.5px solid ${theme.palette.primary[200]}`,
    borderRadius: 5,
    height: 28,
    width: 70
  }
}));
export const TransactionContainer = styled(BoxRaised)`
  margin-bottom: 24px;
  padding: 20px;
  height: calc(100% - 56px);
  [class*="highcharts-container"] {
    height: 230px;
    max-height: 300px;
    width: 100%;
    [class*="highcharts-xaxis-labels"] {
      background: red;
      text {
        &:last-child {
          text-anchor: end !important;
        }
      }
    }
  }
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
  color: ${(props) => props.theme.palette.secondary.main};
  &::after {
    position: absolute;
    top: 100%;
    left: 0;
    content: "";
    width: 50px;
    height: 4px;
    background: ${({ theme }) => theme.palette.primary[200]};
  }
`;

export const BoxInfo = styled(Box)(({ theme }) => ({
  height: "calc(100% - 12px)",
  minHeight: "200px",
  borderRadius: "12px",
  padding: "6px 0",
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
export const InfoItem = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary[200]}`,
  paddingBottom: theme.spacing(1),
  ":last-child": {
    paddingBottom: 0,
    borderBottom: "none"
  }
}));
export const Skeleton = styled(SkeletonMUI)(() => ({
  height: 300,
  borderRadius: 12
}));

export const ColorChart = styled(Box)<{ type: TypeChart }>(({ theme, type }) => {
  const bgColor = (type: TypeChart) => {
    switch (type) {
      case "trx":
        return theme.palette.success[700];
      case "simple":
        return theme.palette.primary[500];
      case "complex":
        return theme.palette.warning[700];

      default:
        return theme.palette.success[700];
    }
  };

  return {
    width: "16px",
    height: "16px",
    borderRadius: "4px",
    background: bgColor(type),
    marginRight: theme.spacing(1)
  };
});

export const StyledTransactionTypes = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "20px",
  textAlign: "left",
  color: theme.palette.secondary.main,
  [theme.breakpoints.between("lg", "xl")]: {
    textWrap: "nowrap"
  }
}));

export const StyledTransactionTypeItem = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: "0.8125rem"
}));

export const ValueChart = styled(Box)(({ theme }) => ({
  textAlign: "left",
  color: theme.palette.secondary.light,
  fontWeight: "bold",
  fontSize: "20px"
}));
