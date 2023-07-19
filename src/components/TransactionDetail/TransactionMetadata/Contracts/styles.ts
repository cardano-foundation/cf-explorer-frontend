import { Button, Box, styled } from "@mui/material";

export const Wrapper = styled(Box)(({ theme }) => ({
  minHight: "400px",
  background: theme.palette.background.paper,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textOverflow: "clip",
  padding: "25px 0"
}));

export const Img = styled("img")(() => ({
  display: "flex",
  alignItems: "center",
  padding: "15px 0 0",
  margin: "0 auto"
}));

export const WrapAddress = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  wordBreak: "break-all"
}));

export const Title = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontFamily: "var(--font-family-title)"
}));

export const CopyButtonMui = styled(Button)(({ theme }) => {
  return {
    display: "block",
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
    marginTop: theme.spacing(2),
    textTransform: "capitalize",
    fontWeight: "bold",
    fontFamily: "var(--font-family-title)"
  };
});
