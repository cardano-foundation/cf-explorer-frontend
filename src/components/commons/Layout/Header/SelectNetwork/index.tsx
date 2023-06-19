import { NetworkType, useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { MenuItem, Select, SelectChangeEvent, styled } from "@mui/material";
import React, { useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useLocalStorage } from "react-use";
import { useSelector } from "react-redux";

import { FRONT_END_NETWORK, NETWORK, NETWORKS, NETWORK_NAMES, STORAGE_KEYS } from "src/commons/utils/constants";
import { removeAuthInfo } from "src/commons/utils/helper";
import { signOut } from "src/commons/utils/userRequest";

const StyledSelect = styled(Select)(({ theme }) => ({
  fontFamily: "var(--font-family-title)",
  border: `2px solid ${theme.palette.border.hint}`,
  background: "transparent",
  color: theme.palette.text.secondary,
  borderRadius: "8px",
  "& > div": {
    padding: "6.5px 12px",
    fontWeight: "var(--font-weight-bold)",
    cursor: "pointer"
  },
  "& > fieldset": {
    top: 0,
    border: "none !important"
  },
  "& > svg": {
    color: theme.palette.text.secondary,
    fontSize: "20px"
  },
  [theme.breakpoints.down("md")]: {
    background: theme.palette.background.paper
  }
}));

const SelectNetwork: React.FC = () => {
  const { userData } = useSelector(({ user }: RootState) => user);
  const { disconnect } = useCardano({
    limitNetwork: NETWORK === NETWORKS.mainnet ? NetworkType.MAINNET : NetworkType.TESTNET
  });
  const [, , clearBookmark] = useLocalStorage<Bookmark[]>("bookmark", []);

  const handleChange = async (e?: SelectChangeEvent<unknown>) => {
    try {
      if (userData) {
        await signOut({
          refreshJwt: localStorage.getItem("refreshToken") || "",
          username: localStorage.getItem("username") || ""
        });
        clearBookmark();
        disconnect();
        removeAuthInfo();
      }
    } catch (error) {
      //To do
    }
    if (e) {
      if (FRONT_END_NETWORK[e.target.value as NETWORKS]) {
        window.open(FRONT_END_NETWORK[e.target.value as NETWORKS], "_blank", "noopener,noreferrer");
      }
    }
  };

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.NETWORK && e.oldValue !== e.newValue) handleChange();
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledSelect
      data-testid="network-selection-dropdown"
      onChange={handleChange}
      value={NETWORK}
      IconComponent={BiChevronDown}
      MenuProps={{ style: { zIndex: 1303 } }}
    >
      {Object.entries(NETWORK_NAMES).map(([value, name]) => (
        <MenuItem data-testid="network-options" key={value} value={value}>
          {name}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default SelectNetwork;
