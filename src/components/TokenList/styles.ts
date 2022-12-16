import { Select } from "@mui/material";
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

export const StyledSelect = styled(Select)`
  font-family: var(--font-family-text);
  background: #fff;
  color: #344054;
  border-radius: 8px;
  min-width: 250px;
  & > div {
    padding: 6.5px 14px;
    cursor: pointer;
    font-weight: 400;
    text-align: left;
  }
  & > fieldset {
    top: 0;
    border: none !important;
  }
  & > svg {
    color: #344054;
    font-size: 20px;
  }
`;
