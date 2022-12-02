import { MenuItem, Select, SelectChangeEvent, styled } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { NETWORKS } from "../../../../../commons/utils/constants";
import { RootState } from "../../../../../stores/types";
import { setNetwork } from "../../../../../stores/user";

const StyledSelect = styled(Select)`
  font-family: var(--font-family-title);
  border-color: ${props => props.theme.colorBlueDark};
  background: ${props => props.theme.colorBlueDark};
  color: ${props => props.theme.textColorReverse};
  border-radius: 8px;
  & > div {
    padding: 8.5px 12px;
    font-weight: var(--font-weight-bold);
  }
  & > fieldset {
    top: 0;
    border: none !important;
  }
  & > svg {
    color: ${props => props.theme.textColorReverse};
  }
  @media screen and (max-width: 1199px) {
    width: 160px;
  }
`;

const SelectNetwork: React.FC = () => {
  const { network } = useSelector(({ user }: RootState) => user);

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    setNetwork(e.target.value as keyof typeof NETWORKS);
  };

  return (
    <StyledSelect onChange={handleChange} value={network}>
      {Object.entries(NETWORKS).map(([value, name]) => (
        <MenuItem key={value} value={value}>
          {value === "testnet" ? "Testnet" : name}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default SelectNetwork;
