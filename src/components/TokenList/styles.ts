import { styled } from "@mui/material";

export const FontWeightBold = styled("span")`
  font-weight: var(--font-weight-bold);
`;

export const AssetName = styled(FontWeightBold)`
  color: ${props => props.theme.colorBlue};
`;

export const Logo = styled("img")`
  width: 30px;
  height: 30px;
`;
