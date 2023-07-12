import { Box, Popover, Button, styled } from "@mui/material";

export const SubmitButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: 8px;
  background: ${(props) => props.theme.palette.primary.dark};
  color: ${(props) => props.theme.palette.background.paper};
  font-weight: 700;
  font-size: 14px;
  height: 38px;
  text-transform: none;
`;
export const OutlineButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: 8px;
  background: ${(props) => props.theme.palette.green[200_10]};
  color: ${(props) => props.theme.palette.primary.dark};
  font-weight: 700;
  font-size: 14px;
  height: 35px;
  text-transform: none;
`;

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
  color: theme.palette.grey[300],
  [theme.breakpoints.down("sm")]: {
    fontSize: 12
  }
}));

export const WrapPopover = styled(Popover)`
  .MuiPaper-root {
    margin-top: 6px;
    border-radius: 20px;
    width: 220px;
    height: 120px;
    display: flex;
    align-items: center;
  }
`;

export const WrapPopoverContent = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.palette.green[200_10]};
  }
`;

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
