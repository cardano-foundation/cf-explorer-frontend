import React, { useState } from "react";
import { ClickAwayListener, ListItemIcon, MenuList } from "@mui/material";
import { useTranslation } from "react-i18next";

import { FilterIC } from "src/commons/resources";

import CustomIcon from "../CustomIcon";
import {
  FilterButton,
  FilterContainer,
  FilterContent,
  FilterIconContainer,
  FilterListItemText,
  FilterMenuItem
} from "./styles";

export interface FilterProps {
  options?: Option[];
  onOptionChange?: (value: string, option?: Option) => void;
}

export interface Option {
  value: string;
  label?: string | React.ReactNode;
  icon: React.ReactNode;
  active?: boolean;
}

const Filter: React.FC<FilterProps> = ({ options, onOptionChange }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const onClickAway = () => {
    setOpen(false);
  };

  const onFilterButtonClick = () => setOpen((pre) => !pre);
  const onOptionClick = (value: string, option: Option) => {
    onFilterButtonClick();
    onOptionChange?.(option.value, option);
  };
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <FilterContainer>
        <FilterButton
          onClick={onFilterButtonClick}
          startIcon={
            <FilterIconContainer>
              <CustomIcon
                data-testid="filter-icon"
                icon={FilterIC}
                width={18}
                color={(theme) => theme.palette.primary.main}
                fill="currentColor"
              />
            </FilterIconContainer>
          }
        >
          {t("common.filter")}
        </FilterButton>
        {open && options && (
          <FilterContent>
            <MenuList>
              {options.map((option) => (
                <FilterMenuItem key={option.value} onClick={() => onOptionClick(option.value, option)}>
                  <ListItemIcon>
                    <FilterIconContainer>{option.icon}</FilterIconContainer>
                  </ListItemIcon>
                  <FilterListItemText>{option.label}</FilterListItemText>
                </FilterMenuItem>
              ))}
            </MenuList>
          </FilterContent>
        )}
      </FilterContainer>
    </ClickAwayListener>
  );
};

export default Filter;
