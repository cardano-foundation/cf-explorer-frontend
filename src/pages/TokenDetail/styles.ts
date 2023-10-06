import { Container, styled } from "@mui/material";

import { CommonSkeleton } from "src/components/commons/CustomSkeleton";

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

export const AnalyticSkeleton = styled(CommonSkeleton)`
  height: 300px;
  width: 100%;
  border-radius: 4px;
`;

export const DataTableSkeleton = styled(CommonSkeleton)`
  height: 300px;
  width: 100%;
  border-radius: 4px;
`;
