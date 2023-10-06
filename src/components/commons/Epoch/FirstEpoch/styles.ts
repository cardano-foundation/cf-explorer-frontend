import { Box, styled } from "@mui/material";

import { EPOCH_STATUS } from "src/commons/utils/constants";

export const Container = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  "& > div > div:first-of-type": {
    display: "none"
  },
  "& .MuiGrid-container": {
    background: theme.palette.secondary[0]
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
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: 20,
  marginBottom: 8,
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    marginTop: "-8px"
  }
}));

export const TitleCard = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: "0.875rem",
  textTransform: "capitalize"
}));

export const EpochProgress = styled("h3")<{ status: keyof typeof EPOCH_STATUS }>(({ theme }) => ({
  color: theme.palette.secondary.main,
  // status === "REWARDING"
  //   ? theme.palette.success[800]
  //   : status === "FINISHED"
  //   ? theme.palette.primary.main
  //   : theme.palette.warning[800],
  margin: 0,
  [theme.breakpoints.down("lg")]: {
    fontSize: 14
  }
}));

export const MaxSlot = styled("span")`
  color: ${(props) => props.theme.palette.secondary.light};
  font-size: 20px;
`;

export const Date = styled("div")`
  font-size: 1.25rem;
  margin-top: 8px;
  font-weight: 600;
`;

export const Content = styled("span")`
  color: ${(props) => props.theme.palette.secondary.main};
  font-size: 18px;
`;

export const SubContent = styled("span")`
  font-size: 16px;
  font-weight: normal;
  color: ${(props) => props.theme.palette.secondary.light};
`;
