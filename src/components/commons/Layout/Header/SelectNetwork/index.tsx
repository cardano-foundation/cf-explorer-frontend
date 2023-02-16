import { NetworkType, useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { MenuItem, Select, SelectChangeEvent, styled } from "@mui/material";
import React from "react";
import { BiChevronDown } from "react-icons/bi";
import { useLocalStorage } from "react-use";
import { NETWORK, NETWORKS, NETWORK_NAMES } from "../../../../../commons/utils/constants";
import { removeAuthInfo } from "../../../../../commons/utils/helper";
import StorageUtils from "../../../../../commons/utils/storage";
import { signOut } from "../../../../../commons/utils/userRequest";
import { BookMark } from "../../../../../types/bookmark";

const StyledSelect = styled(Select)<{ home: number }>`
  font-family: var(--font-family-title);
  border: 2px solid ${props => (props.home ? "#FFFFFF48" : "#c8cdd8")};
  background: transparent;
  color: ${props => (props.home ? props.theme.textColorReverse : "#344054")};
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
    color: ${props => (props.home ? props.theme.textColorReverse : "#344054")};
    font-size: 20px;
  }
`;

interface Props {
  home?: boolean;
}

const SelectNetwork: React.FC<Props> = props => {
  const { disconnect } = useCardano({
    limitNetwork: NETWORK === NETWORKS.mainnet ? NetworkType.MAINNET : NetworkType.TESTNET,
  });
  const [, , clearBookmark] = useLocalStorage<BookMark[]>("bookmark", []);

  const handleChange = async (e: SelectChangeEvent<unknown>) => {
    try {
      await signOut({
        refreshJwt: localStorage.getItem("refreshToken") || "",
        username: localStorage.getItem("username") || "",
      });
    } catch (error) {
    } finally {
      clearBookmark();
      removeAuthInfo();
      disconnect();
      StorageUtils.setNetwork(e.target.value as NETWORKS);
      window.location.href = "/";
    }
  };

  return (
    <StyledSelect onChange={handleChange} value={NETWORK} IconComponent={BiChevronDown} home={props.home ? 1 : 0}>
      {Object.entries(NETWORK_NAMES).map(([value, name]) => (
        <MenuItem key={value} value={value}>
          {name}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default SelectNetwork;
