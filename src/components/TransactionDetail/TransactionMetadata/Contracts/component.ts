import { Box, styled } from "@mui/material";

export const Wrapper = styled(Box)(({ theme }) => ({
  minHight: "400px",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textOverflow: "clip",
  padding: "25px 0",
}));

export const Img = styled("img")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "15px 0 0",
  margin: "0 auto",
}));
