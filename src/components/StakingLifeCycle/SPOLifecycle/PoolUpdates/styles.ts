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

export const Info = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(2)
}));
export const InfoText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(1),
  fontWeight: 500,
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
  [theme.breakpoints.down("sm")]: {
    "& > div:nth-of-type(1)": {
      alignItems: "center"
    },
    "& > p": {
      marginRight: "10px"
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

export const StyledBox = styled(Box)(({ theme }) => ({
  ".list-images": {
    maxWidth: "390px",
    margin: "0px auto"
  },
  [theme.breakpoints.down("md")]: {
    "& > div:nth-of-type(1)": {
      alignItems: "flex-start",
      "& > div:nth-of-type(1)": {
        flexDirection: "column",
        gap: "5px"
      }
    },
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
