import { MenuItem, Select, SelectChangeEvent, styled } from "@mui/material";
import React, { useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";

import { FRONT_END_NETWORK, NETWORK, NETWORKS, NETWORK_NAMES, STORAGE_KEYS } from "src/commons/utils/constants";
import { setOnDetailView } from "src/stores/user";

const StyledSelect = styled(Select)(({ theme }) => ({
  fontFamily: "var(--font-family-title)",
  border: `2px solid ${theme.palette.primary[200]}`,
  background: "transparent",
  color: theme.palette.secondary.main,
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
  const handleChange = async (e?: SelectChangeEvent<unknown>) => {
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
  const handleOpen = () => {
    setOnDetailView(false);
  };

  return (
    <StyledSelect
      data-testid="header-network"
      onChange={handleChange}
      value={NETWORK}
      IconComponent={BiChevronDown}
      MenuProps={{ style: { zIndex: 1303 } }}
      onOpen={handleOpen}
    >
      {Object.entries(NETWORK_NAMES).map(([key, value]) => (
        <MenuItem data-testid="network-options" key={key} value={key}>
          {String(value)}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default SelectNetwork;
