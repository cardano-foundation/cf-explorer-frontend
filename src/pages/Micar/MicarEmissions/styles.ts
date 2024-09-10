import { Box, Button, Card, styled, Typography } from "@mui/material";

export const StyledTitle = styled(Typography)(() => ({
  fontWeight: 700,
  textAlign: "left",
  marginTop: "42px",
  marginBottom: "20px"
}));
export const StyledCard = styled(Card)(() => ({
  padding: "2rem",
  borderRadius: "2rem",
  textAlign: "center",
  margin: "auto",
  marginTop: "2rem"
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  background: theme.palette.secondary[0],
  paddingLeft: 30,
  borderRadius: 10,
  marginBottom: 35,
  marginTop: 25,
  height: 58,
  border: `1.5px solid ${theme.palette.primary[200]}`,
  "&:focus-within": {
    borderColor: theme.palette.secondary.light
  },
  [theme.breakpoints.down("sm")]: {
    width: "unset",
    maxWidth: "unset"
  }
}));

export const StyledInput = styled("input")`
  border: none;
  width: 100%;
  font-size: var(--font-size-text-small);
  border-radius: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  background: ${({ theme }) => theme.palette.secondary[0]};
  color: ${({ theme }) => theme.palette.secondary.light};

  &::-webkit-search-cancel-button {
    filter: ${({ theme }) => (theme.mode === "dark" ? "brightness(0) invert(0.8)" : "brightness(0) invert(0.4)")};
    cursor: pointer;
  }
`;

export const SubmitButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: 50%;
  min-width: 60px;
  width: 60px;
  height: 60px;
`;
