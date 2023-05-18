import { Popover, Button, styled, Box } from "@mui/material";

export const GridBox = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "repeat(2, 1fr)",
  gridGap: "20px 10px",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)"
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(4, 1fr)"
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto",
    "& > span": {
      width: "100% !important"
    },
    "& > div": {
      maxWidth: "100%"
    }
  }
}));

export const WrapFilterDescription = styled("span")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 400,
  color: theme.palette.grey[400],
  [theme.breakpoints.down("md")]: {
    fontSize: "12px"
  }
}));

export const StyledList = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    alignItems: "center",
    "& > p": {
      marginRight: "10px"
    }
  }
}));
