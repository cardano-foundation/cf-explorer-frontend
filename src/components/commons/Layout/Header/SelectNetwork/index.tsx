import { NetworkType, useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { MenuItem, Select, SelectChangeEvent, styled } from "@mui/material";
import React from "react";
import { BiChevronDown } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { listRouters } from "../../../../../commons/routers";
import { NETWORK, NETWORKS, NETWORK_NAMES } from "../../../../../commons/utils/constants";
import { removeAuthInfo } from "../../../../../commons/utils/helper";
import StorageUtils from "../../../../../commons/utils/storage";
import { signOut } from "../../../../../commons/utils/userRequest";

const StyledSelect = styled(Select)`
  font-family: var(--font-family-title);
  border: 2px solid ${({ theme }) => theme.palette.border.hint};
  background: transparent;
  color: ${({ theme }) => theme.palette.text.secondary};
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
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: 20px;
  }
`;

const SelectNetwork: React.FC = () => {
  const { location } = useHistory();
  const { disconnect } = useCardano({
    limitNetwork: NETWORK === NETWORKS.mainnet ? NetworkType.MAINNET : NetworkType.TESTNET,
  });
  const [, , clearBookmark] = useLocalStorage<Bookmark[]>("bookmark", []);

  const refreshPage = () => {
    const currentPath = "/" + location.pathname?.split("/")[1];
    if (listRouters.includes(currentPath)) window.location.href = location.pathname;
    else window.location.href = "/";
  };

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
      removeAuthInfo();
      StorageUtils.setNetwork(e.target.value as NETWORKS);
      refreshPage();
    }
  };

  return (
    <StyledSelect onChange={handleChange} value={NETWORK} IconComponent={BiChevronDown}>
      {Object.entries(NETWORK_NAMES).map(([value, name]) => (
        <MenuItem key={value} value={value}>
          {name}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default SelectNetwork;
