import React, { useEffect, useState } from "react";
import { Box, Button, ClickAwayListener, IconButton, MenuList } from "@mui/material";
import moment from "moment";

import {
  ArrowFromBottomIcon,
  ArrowFromTopIcon,
  CalenderIcon,
  FilterIC,
  ResetIcon,
  SearchIcon
} from "src/commons/resources";

import CustomIcon from "../commons/CustomIcon";
import { Option } from "../commons/Filter";
import {
  FilterButton,
  FilterContainer,
  FilterContent,
  FilterIconContainer,
  FilterListItemText,
  FilterMenuItem
} from "../commons/Filter/styles";
import { StyledInput } from "../share/styled";
import DateRangeModal, { DATETIME_PARTTEN } from "./DateRangeModal";
import { AdditionContainer } from "./styles";
import { StyledListItemIcon } from "../StakingLifeCycle/DelegatorLifecycle/Withdraw/RecentWithdraws/styles";

interface StakingOption extends Option {
  addition?: React.FC<any>;
}

export interface FilterParams {
  sort?: string;
  fromDate?: string;
  toDate?: string;
  txHash?: string;
}

export interface StackingFilterProps {
  onFilterValueChange?: (params: FilterParams) => void;
  filterValue?: FilterParams;
  sortKey?: string;
  fullFilter?: boolean;
}

const StackingFilter: React.FC<StackingFilterProps> = ({
  onFilterValueChange,
  filterValue,
  sortKey = "time",
  fullFilter = true
}) => {
  const [open, setOpen] = useState(false);
  const [isOpenSelectRange, setIsOpenSelectRange] = useState(false);
  const [openSearchTransaction, setOpenSearchTransaction] = useState(false);
  const [selected, setSelected] = useState("");
  const [textSearch, setTextSearch] = useState("");

  const filterOptions: StakingOption[] = [
    {
      label: "Latest - First",
      icon: <CustomIcon icon={ArrowFromTopIcon} fill="currentColor" width={20} />,
      value: "latest"
    },
    {
      label: "First - Latest",
      icon: <CustomIcon icon={ArrowFromBottomIcon} fill="currentColor" width={20} />,
      value: "first"
    },
    {
      label: "Date range",
      icon: <CustomIcon icon={CalenderIcon} fill="currentColor" width={20} />,
      value: "dateRange"
    },
    {
      label: "Search transaction",
      icon: <CustomIcon icon={SearchIcon} stroke="currentColor" width={22} />,
      value: "search"
    }
  ];

  const onClickAway = () => {
    setOpen(false);
    setTextSearch("");
  };

  const onDateRangeModalClose = () => {
    setIsOpenSelectRange(false);
  };
  const onFilterButtonClick = () => setOpen((pre) => !pre);
  const onOptionClick = (value: string) => {
    switch (value) {
      case "latest": {
        onFilterValueChange?.({ sort: `${sortKey},DESC` });
        setSelected(value);
        setOpen(false);
        break;
      }
      case "first": {
        onFilterValueChange?.({ sort: `${sortKey},ASC` });
        setSelected(value);
        setOpen(false);
        break;
      }
      case "dateRange": {
        setIsOpenSelectRange(true);
        break;
      }
      case "search": {
        setOpenSearchTransaction((prev) => !prev);
        break;
      }
    }
  };

  useEffect(() => {
    setTextSearch(filterValue?.txHash ?? "");
    console.timeLog(filterValue?.txHash);
  }, [filterValue?.txHash]);

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <FilterContainer>
        <FilterButton
          onClick={onFilterButtonClick}
          startIcon={
            <FilterIconContainer>
              <CustomIcon
                icon={FilterIC}
                width={18}
                color={(theme) => theme.palette.secondary.light}
                fill="currentColor"
              />
            </FilterIconContainer>
          }
        >
          Filter
        </FilterButton>
        {open && filterOptions && (
          <FilterContent>
            <MenuList>
              {(fullFilter ? filterOptions : filterOptions.slice(0, 3)).map((option) => (
                <FilterMenuItem
                  active={+(option.value === selected)}
                  key={option.value}
                  onClick={() => onOptionClick(option.value)}
                >
                  <StyledListItemIcon>{option.icon}</StyledListItemIcon>
                  <FilterListItemText>{option.label}</FilterListItemText>
                </FilterMenuItem>
              ))}
            </MenuList>
            <AdditionContainer>
              {openSearchTransaction && (
                <StyledInput
                  endAdornment={
                    <IconButton
                      onClick={() => {
                        setSelected("search");
                        onFilterValueChange?.({ txHash: textSearch });
                        setOpenSearchTransaction(false);
                        setOpen(false);
                      }}
                    >
                      <CustomIcon icon={SearchIcon} width={20} />
                    </IconButton>
                  }
                  value={textSearch}
                  onChange={({ target: { value } }) => setTextSearch(value)}
                />
              )}

              <DateRangeModal
                open={isOpenSelectRange}
                value={{ fromDate: filterValue?.fromDate, toDate: filterValue?.toDate }}
                onDateRangeChange={({ fromDate, toDate }) => {
                  setSelected("dateRange");
                  onFilterValueChange?.({
                    fromDate: moment(fromDate, DATETIME_PARTTEN).utc().format(DATETIME_PARTTEN),
                    toDate: moment(toDate, DATETIME_PARTTEN).utc().format(DATETIME_PARTTEN)
                  });
                  setOpen(false);
                }}
                onClose={onDateRangeModalClose}
              />
            </AdditionContainer>
            <Box
              component={Button}
              width={"100%"}
              textTransform={"capitalize"}
              display={"flex"}
              alignItems={"center"}
              color={({ palette }) => `${palette.primary.main} !important`}
              onClick={() => {
                onFilterValueChange?.({ fromDate: undefined, sort: undefined, toDate: undefined, txHash: undefined });
                setOpen(false);
                setSelected("");
              }}
            >
              <Box mr={1}>Reset</Box>
              <ResetIcon />
            </Box>
          </FilterContent>
        )}
      </FilterContainer>
    </ClickAwayListener>
  );
};

export default StackingFilter;
