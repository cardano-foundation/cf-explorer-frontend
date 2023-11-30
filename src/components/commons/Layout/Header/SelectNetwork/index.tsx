import { MenuItem, Select, SelectChangeEvent, styled } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BiChevronDown } from "react-icons/bi";

import { FRONT_END_NETWORK, NETWORK, NETWORKS, NETWORK_NAMES, STORAGE_KEYS } from "src/commons/utils/constants";
import { setOnDetailView } from "src/stores/user";

export const StyledSelect = styled(Select)(({ theme }) => ({
  fontFamily: "var(--font-family-title)",
  border: `2px solid ${theme.mode === "light" ? theme.palette.primary[200] : theme.palette.secondary[600]}`,
  background: "transparent",
  color: theme.palette.secondary.main,
  borderRadius: "8px",
  "& > div": {
    padding: "6.5px 12px",
    fontWeight: "var(--font-weight-bold)",
    cursor: "pointer",
    color: theme.palette.secondary["light"]
  },
  "& > fieldset": {
    top: 0,
    border: "none !important"
  },
  "& > svg": {
    color: theme.palette.secondary["light"],
    fontSize: "20px"
  }
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.secondary.main,
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary[200]
  },
  "&:hover": {
    backgroundColor: theme.palette.primary[200] + " !important"
  }
}));

const SelectNetwork: React.FC = () => {
  const { t } = useTranslation();
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
      MenuProps={{
        style: { zIndex: 1303 },
        MenuListProps: {
          sx: {
            bgcolor: ({ palette }) => `${palette.secondary[0]} !important`
          }
        },
        PaperProps: {
          sx: {
            bgcolor: ({ palette }) => `${palette.secondary[0]} !important`
          }
        }
      }}
      onOpen={handleOpen}
    >
      {Object.entries(NETWORK_NAMES).map(([key, value]) => (
        <StyledMenuItem data-testid="network-options" key={key} value={key}>
          {t(`network.${String(value).toLowerCase()}`)}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
};

export default SelectNetwork;
