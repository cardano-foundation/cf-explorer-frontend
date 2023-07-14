import { Box, Grid, styled } from "@mui/material";

import { EPOCH_STATUS } from "src/commons/utils/constants";

export const EpochCard = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.common.white,
  cursor: "pointer",
  borderRadius: 12,
  padding: 24,
  marginBottom: 24,
  flexDirection: "column",
  alignItems: "flex-start",
  overflowX: "scroll"
}));

export const Container = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  "& > div > div:first-of-type": {
    display: "none"
  },
  [theme.breakpoints.up("lg")]: {
    "& .MuiGrid-container": {
      alignItems: "center"
    },
    "& .MuiGrid-item:not(:first-of-type)": {
      marginTop: 30
    }
  },
  [theme.breakpoints.down("lg")]: {
    "& .MuiGrid-item": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    "& .MuiGrid-item:first-of-type > div:last-of-type > div > div": {
      width: "60px !important"
    },
    "& .MuiGrid-item:first-of-type > div:nth-of-type(2)": {
      margin: 0
    },
    "& .MuiGrid-item:first-of-type > div:last-of-type span": {
      fontSize: "7px !important"
    }
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiGrid-item > div:last-of-type": {
      fontSize: 12
    }
  }
}));

export const EpochNumber = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 20,
  marginBottom: 8,
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    marginTop: "-8px"
  },
  color: theme.palette.secondary.main
}));

export const TitleCard = styled(Box)(({ theme }) => ({
  color: theme.palette.grey[300],
  fontSize: "0.875rem"
}));

export const EpochText = styled("span")`
  color: ${(props) => props.theme.palette.grey[300]};
  text-transform: uppercase;
`;

export const EpochProgress = styled("h3")<{ status: keyof typeof EPOCH_STATUS }>(({ theme, status }) => ({
  color:
    status === "REWARDING"
      ? theme.palette.green[200]
      : status === "FINISHED"
      ? theme.palette.blue[100]
      : theme.palette.yellow[100],
  margin: 0,
  [theme.breakpoints.down("lg")]: {
    fontSize: 14
  }
}));

export const EpochValue = styled(Box)(({ theme }) => ({
  color: theme.palette.common.black,
  fontSize: 25,
  fontWeight: 600,
  marginTop: 12
}));

export const CardItem = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  paddingLeft: 16,
  borderLeft: `1px solid ${theme.palette.grey[200]}`,
  minWidth: 250,
  margin: "8px 0"
}));

export const CardItemTitle = styled(Box)(({ theme }) => ({
  color: theme.palette.grey[300],
  marginLeft: 8
}));

export const MaxSlot = styled("span")`
  color: ${(props) => props.theme.palette.grey[300]};
  font-size: 20px;
`;

export const Date = styled("div")`
  font-size: 1.25rem;
  margin-top: 8px;
  font-weight: 600;
`;

export const Time = styled("div")`
  font-size: 1.25rem;
  color: ${(props) => props.theme.palette.grey[300]};
`;

export const Content = styled("span")`
  color: ${(props) => props.theme.palette.grey[400]};
  font-size: 18px;
`;

export const SubContent = styled("span")`
  font-size: 16px;
  font-weight: normal;
  color: ${(props) => props.theme.palette.grey[300]};
`;
