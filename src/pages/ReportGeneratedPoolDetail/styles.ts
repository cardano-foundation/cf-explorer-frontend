import { Box, styled } from "@mui/material";

export const TopHeader = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const BackButton = styled(Box)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-top: 30px;
    position: relative;
    top: 5px;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    margin-top: 0px;
  }
`;

export const BackText = styled("small")`
  color: ${(props) => props.theme.palette.secondary.light};
  font-weight: var(--font-weight-bold);
`;
