import { Select, styled } from "@mui/material";

const CustomSelect = styled(Select)`
  font-family: var(--font-family-text);
  background: ${(props) => props.theme.palette.secondary[0]};
  color: ${(props) => props.theme.palette.secondary.main};
  border-radius: 8px;
  min-width: 250px;
  & > div {
    padding: 7.5px 14px;
    cursor: pointer;
    font-weight: 400;
    text-align: left;
  }
  & > fieldset {
    top: 0;
    border: none !important;
  }
  & > svg {
    color: ${(props) => props.theme.palette.secondary.main};
    font-size: 20px;
  }
`;

export default CustomSelect;
