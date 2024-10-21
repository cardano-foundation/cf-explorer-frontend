import { Box, styled, Container } from "@mui/material";
import { Link } from "react-router-dom";

import { EPOCH_STATUS } from "src/commons/utils/constants";

export const StyledContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    padding: "0px 0 40px",
    "& > div:nth-of-type(1)": {
      "& > div:nth-of-type(1)": {
        padding: "0 16px"
      },
      "& > div:nth-of-type(2)": {
        "& > div:nth-of-type(2)": {
          marginTop: "0px"
        }
      }
    },
    "& > div > div:nth-of-type(2)": {
      margin: "0 16px"
    },
    "& > div > div:nth-of-type(3)": {
      padding: "0 16px"
    },
    marginTop: "0px !important"
  }
}));

export const BlueText = styled("span")`
  color: ${(props) => props.theme.palette.secondary.light};
`;

export const Status = styled("span")<{ status: keyof typeof EPOCH_STATUS }>(({ theme }) => ({
  fontFamily: "var(--font-family-title)",
  fontWeight: "var(--font-weight-bold)",
  borderRadius: "2px",
  textTransform: "uppercase",
  fontSize: "10px",
  color: theme.palette.secondary.light,
  // status === "REWARDING"
  //   ? theme.palette.success[800]
  //   : status === "FINISHED"
  //   ? theme.palette.primary.main
  //   : theme.palette.warning[800],
  [theme.breakpoints.down("md")]: {
    fontSize: "7px"
  }
}));

export const StatusTableRow = styled(Status)<{ status: string }>(({ theme, status }) => ({
  backgroundColor:
    status === "REWARDING"
      ? theme.palette.success[100]
      : status === "FINISHED"
      ? theme.mode === "light"
        ? theme.palette.primary[100]
        : theme.palette.secondary[100]
      : theme.palette.warning[100],
  padding: "5px 10px",
  borderRadius: "3px",
  color:
    status === "REWARDING"
      ? theme.palette.success[800]
      : status === "FINISHED"
      ? theme.palette.primary.main
      : theme.palette.warning[800]
}));

export const Blocks = styled(BlueText)``;

export const Output = styled(Blocks)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

export const StyledBox = styled(Box)`
  width: "max-content";
  margin-right: 10px;
`;

export const EpochNumber = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.primary.main} !important;
`;
