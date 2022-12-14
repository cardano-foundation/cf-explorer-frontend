import { MenuItem, Select, SelectChangeEvent, styled } from "@mui/material";
import React from "react";
import { BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";
import { NETWORKS } from "../../../../../commons/utils/constants";
import { RootState } from "../../../../../stores/types";
import { setNetwork } from "../../../../../stores/user";

const StyledSelect = styled(Select)`
  font-family: var(--font-family-title);
  border: 2px solid #c8cdd8;
  background: transparent;
  color: #344054;
  border-radius: 8px;
  & > div {
    padding: 6.5px 12px;
    font-weight: var(--font-weight-bold);
    cursor: pointer;
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

const SelectNetwork: React.FC = () => {
  const { network } = useSelector(({ user }: RootState) => user);

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    setNetwork(e.target.value as keyof typeof NETWORKS);
  };

  return (
    <StyledSelect onChange={handleChange} value={network} IconComponent={BiChevronDown}>
      {Object.entries(NETWORKS).map(([value, name]) => (
        <MenuItem key={value} value={value}>
          {value === "testnet" ? "Testnet" : name}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default SelectNetwork;
