import { styled, Container } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "20px 0 40px",
  [theme.breakpoints.down("sm")]: {
    padding: "0 0 40px",
    "& > div > div:nth-child(2)": {
      margin: "0 16px",
    },
    "& > div > div:last-child": {
      paddingLeft: "16px",
    },
  },
}));

export const StyledColorBlueDard = styled("span")`
  color: ${props => props.theme.palette.text.primary};
`;

export const Index = styled(StyledColorBlueDard)``;

export const Status = styled("span")<{ status: string }>`
  font-family: var(--font-family-title);
  font-weight: var(--font-weight-bold);
  border-radius: 2px;
  text-transform: uppercase;
  font-size: 10px;
  color: ${({ status, theme }) =>
    status === "finished"
      ? theme.palette.info.main
      : status === "rewarding"
      ? theme.palette.success.main
      : theme.palette.warning.main};
`;

export const Blocks = styled(StyledColorBlueDard)``;

export const Output = styled(Blocks)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;
