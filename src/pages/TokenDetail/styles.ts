import { Container, Skeleton, styled } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: "30px",
  [theme.breakpoints.down("sm")]: {
    "& > div": {
      padding: "0 16px"
    },
    "& > div:nth-of-type(3)": {
      paddingRight: "0px"
    },
    "& > div:nth-of-type(n+3)": {
      padding: "0px 16px !important"
    },
    "& h2": {
      paddingLeft: "0px"
    },
    marginTop: "0px !important"
  }
}));

export const AnalyticSkeleton = styled(Skeleton)`
  height: 300px;
  width: 100%;
  border-radius: 4px;
`;

export const DataTableSkeleton = styled(Skeleton)`
  height: 300px;
  width: 100%;
  border-radius: 4px;
`;
