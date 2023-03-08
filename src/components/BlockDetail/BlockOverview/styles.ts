import { Box } from "@mui/material";
import { styled } from "@mui/material";

export const Flex = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLink = styled("span")`
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.linkColor} !important;
`;

export const StyledSpan = styled("span")`
  display: flex;
  align-items: center;
`;

export const StyledImage = styled("img")`
  margin-left: 10px;
`;
export const TitleCard = styled(Box)(({ theme }) => ({
  color: `${theme.black_50}`,
  fontSize: "0.875rem",
}));
