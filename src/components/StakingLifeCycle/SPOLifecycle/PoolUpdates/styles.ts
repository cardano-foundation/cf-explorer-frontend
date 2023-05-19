import { Box, styled, IconButton as IconButtonMui, Grid } from "@mui/material";

export const HoldBox = styled(Box)(({ theme }) => ({
  width: "200px",
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.red[600]}`,
  borderRadius: "10px",
  marginRight: theme.spacing(5),
  position: "relative",
  background: theme.palette.common.white,
  "::after": {
    content: '"HOLD"',
    borderRadius: "4px",
    fontWeight: "bold",
    color: theme.palette.common.white,
    padding: "6px 8px",
    fontSize: "14px",
    position: "absolute",
    top: "-50%",
    left: theme.spacing(2),
    background: theme.palette.red[600],
    transform: " translate(0, 60%)"
  }
}));
export const FeeBox = styled(Box)(({ theme }) => ({
  width: "184px",
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  border: `2px solid ${theme.palette.red[600]}`,
  borderRadius: "10px",
  background: theme.palette.common.white,
  position: "relative",
  marginLeft: "10px",
  "::after": {
    content: '"FEES"',
    borderRadius: "4px",
    fontWeight: "bold",
    color: theme.palette.common.white,
    padding: "6px 8px",
    fontSize: "14px",
    position: "absolute",
    top: "-50%",
    left: theme.spacing(2),
    background: theme.palette.red[600],
    transform: " translate(0, 60%)"
  },
  [theme.breakpoints.down("md")]: {
    width: "155px"
  }
}));

export const IconButton = styled(IconButtonMui)(({ theme }) => ({
  background: theme.palette.grey[100]
}));
export const IconButtonBack = styled(IconButtonMui)(({ theme }) => ({
  padding: 0
}));

export const Info = styled(Box)(() => ({
  display: "flex",
  alignItems: "center"
}));

export const InfoText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(1),
  fontWeight: 600,
  fontSize: "14px",
  cursor: "pointer"
}));

export const CardBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const FeeBoxText = styled(Box)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "bold",
  color: theme.palette.common.black
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
  marginBottom: 20,
  [theme.breakpoints.down("sm")]: {
    alignItems: "center",
    "& > p": {
      marginRight: 20
    }
  }
}));

export const StyledGridContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    wordBreak: "break-all",
    "& > div": {
      height: "100%"
    },
    "& > div > div": {
      padding: "20px 15px",
      gap: "8px",
      minHeight: "40px"
    }
  }
}));

export const GridBox = styled("div")<{ sidebar?: number }>(({ theme, sidebar }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "repeat(2, 1fr)",
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

export const StyledBox = styled(Box)(({ theme }) => ({
  ".list-images": {
    maxWidth: "390px",
    margin: "0px auto"
  },
  [theme.breakpoints.down("md")]: {
    ".list-images": {
      "& > div": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
      "& > div:nth-of-type(2)": {
        justifyContent: "space-between",
        "& > div:nth-of-type(1)": {
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          img: {
            width: "90px",
            height: "150px"
          }
        },
        "& > div:nth-of-type(2)": {
          "& > div": {
            marginLeft: "0px",
            padding: "20px 5px 15px 15px",
            alignItems: "center"
          },
          span: {
            fontSize: "16px"
          }
        }
      }
    }
  }
}));

export const ViewMoreButton = styled(IconButton)`
  width: 30px;
  height: 30px;
  margin-left: 6px;
`;

export const DotsIcon = styled(Box)`
  border-radius: 50%;
  background-color: #667085;
  width: 3.6px;
  height: 3.6px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 3.6px;
    height: 3.6px;
    right: -7px;
    top: 0px;
    border-radius: 50%;
    background-color: #667085;
  }
  &::after {
    content: "";
    position: absolute;
    display: block;
    width: 3.6px;
    height: 3.6px;
    left: -7px;
    top: 0px;
    border-radius: 50%;
    background-color: #667085;
  }
`;

export const StepInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 20,
  marginBottom: 36,
  [theme.breakpoints.down("sm")]: {
    alignItems: "flex-start",
    marginBottom: 30
  }
}));

export const InfoGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 20,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5
  }
}));
