import { Box, Container, styled } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "30px 0 40px",
  [theme.breakpoints.down("md")]: {
    paddingTop: 0
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: "10px"
  }
}));

export const WrapHeader = styled(Box)(({ theme }) => ({
  padding: 0,
  [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
    padding: "0 20px"
  }
}));

export const BackButton = styled(Box)`
  display: inline-flex;
  text-align: left;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const BackText = styled("small")`
  color: ${(props) => props.theme.palette.text.secondary};
  font-weight: var(--font-weight-bold);
`;
