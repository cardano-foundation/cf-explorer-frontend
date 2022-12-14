import { styled, Box } from "@mui/material";

export const BoxInfo = styled(Box)(({ theme }) => ({
  height: `100%`,
  background: "#344054",
  borderRadius: theme.borderRadius,
  color: "white",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
}));

export const BoxInfoItem = styled(Box)(({ theme }) => ({
  height: "100%",
  paddingTop: theme.spacing(2),
  width: "80%",
  margin: "0 auto",
  ":first-child": {
    borderTop: "1px solid #424d60",
  },
}));

export const Title = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  padding: `${theme.spacing(2)} 0`,
}));

export const ValueInfo = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "2rem",
}));
