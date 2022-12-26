import { MenuItem, Select, styled, Box } from "@mui/material";

export const Title = styled("h2")``;


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

export const OptionSelect = styled(MenuItem)(({ theme }) => ({
  padding: "6px 20px",
  textAlign: "center",
  height: "40px",
}));

export const DelegationData = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
