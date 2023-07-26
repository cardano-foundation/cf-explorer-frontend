import { styled, Box } from "@mui/material";

export const GridBox = styled("div")<{ sidebar?: number }>(({ theme, sidebar }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "repeat(1, 1fr)",
  gridGap: "20px 10px",
  [theme.breakpoints.down("xl")]: {
    gridTemplateColumns: `repeat(${sidebar ? 3 : 4}, 1fr)`,
    gridTemplateRows: `repeat(${sidebar ? 3 : 4}, 1fr)`
  },
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: `repeat(${sidebar ? 2 : 3}, 1fr)`,
    gridTemplateRows: `repeat(${sidebar ? 2 : 3}, 1fr)`
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
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.secondary.light,
  [theme.breakpoints.down("sm")]: {
    fontSize: 12
  }
}));

export const StyledContainer = styled(Box)(({ theme }) => ({
  marginTop: 25,
  [theme.breakpoints.down("sm")]: {
    marginTop: 15
  }
}));

export const StyledList = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
  [theme.breakpoints.down("sm")]: {
    alignItems: "center"
  }
}));
