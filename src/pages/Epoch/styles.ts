import { Box } from "@mui/material";
import { styled, Container } from "@mui/material";

import { EPOCH_STATUS } from "src/commons/utils/constants";

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "20px 0 40px",
  [theme.breakpoints.down("sm")]: {
    padding: "10px 0 40px",
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
  color: ${(props) => props.theme.palette.text.primary};
`;

export const Status = styled("span")<{ status: keyof typeof EPOCH_STATUS }>(({ theme, status }) => ({
  fontFamily: "var(--font-family-title)",
  fontWeight: "var(--font-weight-bold)",
  borderRadius: "2px",
  textTransform: "uppercase",
  fontSize: "10px",
  color:
    status === "REWARDING"
      ? theme.palette.green[200]
      : status === "FINISHED"
      ? theme.palette.blue[100]
      : theme.palette.yellow[100],
  [theme.breakpoints.down("md")]: {
    fontSize: "7px"
  }
}));

export const Blocks = styled(BlueText)``;

export const Output = styled(Blocks)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

export const StyledBox = styled(Box)`
  width: 41px;
  margin: auto;
  color: ${(props) => props.theme.palette.secondary.main} !important;
`;
