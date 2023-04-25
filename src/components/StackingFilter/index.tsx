import React, { useEffect, useMemo, useState } from "react";
import { Option } from "../commons/Filter";
import CustomIcon from "../commons/CustomIcon";
import { ArrowFromBottomIcon, ArrowFromTopIcon, CalenderIcon, FilterIC, SearchIcon } from "../../commons/resources";

import { ClickAwayListener, IconButton, ListItemIcon, MenuList } from "@mui/material";

import {
  FilterButton,
  FilterContainer,
  FilterContent,
  FilterIconContainer,
  FilterListItemText,
  FilterMenuItem,
} from "../commons/Filter/styles";
import { StyledInput } from "../share/styled";
import DateRangeModal from "./DateRangeModal";

interface StakingOption extends Option {
  addition?: React.FC<any>;
}

const filterOptions: StakingOption[] = [
  { label: "Latest - First", icon: <CustomIcon icon={ArrowFromTopIcon} width={20} />, value: "latest" },
  { label: "First - Latest", icon: <CustomIcon icon={ArrowFromBottomIcon} width={20} />, value: "first" },
  { label: "Date range", icon: <CustomIcon icon={CalenderIcon} width={20} />, value: "dateRange" },
  {
    label: "Search transaction",
    icon: <CustomIcon icon={SearchIcon} width={20} />,
    value: "search",
  },
];

export interface FilterParams {
  sort?: string[];
  fromDate?: string;
  toDate?: string;
  txHash?: string;
}

export interface StackingFilterProps {
  onFilterValueChange?: (params: FilterParams) => void;
  filterValue?: FilterParams;
}
const StackingFilter: React.FC<StackingFilterProps> = ({ onFilterValueChange, filterValue }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const onClickAway = () => {
    setOpen(false);
  };

  const onDateRangeModalClose = () => {
    setSelected("");
  };
  const onFilterButtonClick = () => setOpen(pre => !pre);
  const onOptionClick = (value: string, option: Option) => {
    setSelected(pre => (pre === value ? "" : value));

    if (value === "latest") {
      onFilterValueChange?.({ sort: ["time", "DESC"] });
      setOpen(pre => !pre);
    }
    else if (value === "first") {
      onFilterValueChange?.({ sort: ["time", "ESC"] });
      setOpen(pre => !pre)
    } 
    else onFilterValueChange?.({ sort: undefined });
  };

  useEffect(() => {
    setTextSearch(filterValue?.txHash ?? '');
    console.timeLog(filterValue?.txHash)
  }, [filterValue?.txHash]);
  

  const addition = useMemo(() => {
    switch (selected) {
      case "dateRange":
        return (
          <DateRangeModal
            value={{ fromDate: filterValue?.fromDate, toDate: filterValue?.toDate }}
            onDateRangeChange={({ fromDate, toDate }) => {
              onFilterValueChange?.({ fromDate, toDate })
            }}
            onClose={onDateRangeModalClose}
          />
        );
      case "search":
        return (
          <StyledInput
            endAdornment={
              <IconButton onClick={() => onFilterValueChange?.({ txHash: textSearch })}>
                <CustomIcon icon={SearchIcon} width={20} />
              </IconButton>
            }
            value={textSearch}
            onChange={({ target: { value } }) => setTextSearch(value)}
          />
        );
    }
  }, [selected, filterValue, textSearch]);

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <FilterContainer>
        <FilterButton
          onClick={onFilterButtonClick}
          startIcon={
            <FilterIconContainer>
              <CustomIcon icon={FilterIC} width={18} color={theme => theme.palette.primary.main} fill="currentColor" />
            </FilterIconContainer>
          }
        >
          Filter
        </FilterButton>
        {open && filterOptions && (
          <FilterContent>
            <MenuList>
              {filterOptions.map(option => (
                <FilterMenuItem key={option.value} onClick={() => onOptionClick(option.value, option)}>
                  <ListItemIcon>
                    <FilterIconContainer>{option.icon}</FilterIconContainer>
                  </ListItemIcon>
                  <FilterListItemText>{option.label}</FilterListItemText>
                </FilterMenuItem>
              ))}
            </MenuList>
            {addition}
          </FilterContent>
        )}
      </FilterContainer>
    </ClickAwayListener>
  );
};

export default StackingFilter;
