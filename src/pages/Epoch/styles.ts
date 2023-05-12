import { styled, Container } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "20px 0 40px",
  [theme.breakpoints.down("sm")]: {
    padding: "0 0 40px",
    "& > div:nth-of-type(1)": {
      "& > div:nth-of-type(1)": {
        padding: "0 16px",
      },
    },
    "& > div > div:nth-of-type(2)": {
      margin: "0 16px",
    },
    "& > div > div:nth-of-type(3)": {
      paddingLeft: "16px",
    },
  },
}));

export const StyledColorBlueDard = styled("span")`
  color: ${props => props.theme.palette.text.primary};
`;

export const Index = styled(StyledColorBlueDard)``;


export const Status = styled("span")<{ status: string }>(({ status, theme }) => ({
  fontFamily: "var(--font-family-title)",
  fontWeight: "var(--font-weight-bold)",
  borderRadius: "2px",
  textTransform: "uppercase",
  fontSize: "10px",
  color: status === "finished" ? theme.palette.info.main : status === "rewarding" ? theme.palette.success.main : theme.palette.warning.main,
  [theme.breakpoints.down(theme.breakpoints.values.md)]: {
    fontSize: "7px",
  }
}))

export const Blocks = styled(StyledColorBlueDard)``;

export const Output = styled(Blocks)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;
