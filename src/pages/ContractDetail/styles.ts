import { Box, Container, styled } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: "30px 16px 0px",
  [theme.breakpoints.down("md")]: {
    paddingTop: 0
  }
}));

export const WrapHeader = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingTop: "30px"
  }
}));

export const BackButton = styled(Box)`
  display: inline-flex;
  text-align: left;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const BackText = styled("small")`
  color: ${(props) => props.theme.palette.secondary.light};
  font-weight: var(--font-weight-bold);
`;
