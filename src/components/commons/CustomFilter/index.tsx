import React, { useEffect, useRef, useState } from "react";
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

import DateRangeModal, { DATETIME_PARTTEN } from "./DateRangeModal";
import CustomIcon from "../CustomIcon";
import { Option } from "../Filter";
import {
  FilterButton,
  FilterContainer,
  FilterContent,
  FilterIconContainer,
  FilterListItemText,
  FilterMenuItem
} from "../Filter/styles";
import { AdditionContainer, StyledInput, StyledListItemIcon } from "./styles";

export interface FilterParams {
  sort?: string;
  fromDate?: string;
  toDate?: string;
  search?: string;
}

export interface Props {
  onChange?: (params: FilterParams) => void;
  filterValue?: FilterParams;
  sortKey?: string;
  excludes?: string[];
  searchLabel: string;
}

const CustomFilter: React.FC<Props> = (props) => {
  const { onChange, filterValue, sortKey = "time", excludes = [], searchLabel } = props;
  const [open, setOpen] = useState(false);
  const [openDateRange, setOpenDateRange] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const options: Option[] = [
    {
      label: "Latest - First",
      icon: <CustomIcon icon={ArrowFromTopIcon} fill="currentColor" width={20} />,
      value: "latest",
      active: filterValue?.sort === `${sortKey},DESC`
    },
    {
      label: "First - Latest",
      icon: <CustomIcon icon={ArrowFromBottomIcon} fill="currentColor" width={20} />,
      value: "first",
      active: filterValue?.sort === `${sortKey},ASC`
    },
    {
      label: "Date range",
      icon: <CustomIcon icon={CalenderIcon} fill="currentColor" width={20} />,
      value: "dateRange",
      active: !!(filterValue?.toDate && filterValue?.fromDate)
    },
    {
      label: searchLabel,
      icon: <CustomIcon icon={SearchIcon} stroke="currentColor" width={22} />,
      value: "search",
      active: !!filterValue?.search
    }
  ];

  const onSelect = (value: string) => {
    switch (value) {
      case "latest": {
        onChange?.({ ...filterValue, sort: `${sortKey},DESC` });
        setOpen(false);
        break;
      }
      case "first": {
        onChange?.({ ...filterValue, sort: `${sortKey},ASC` });
        setOpen(false);
        break;
      }
      case "dateRange": {
        setOpenDateRange(true);
        break;
      }
      case "search": {
        setOpenSearch((prev) => !prev);
        if (!openSearch) {
          if (timeout.current) clearTimeout(timeout.current);
          timeout.current = setTimeout(() => inputRef.current?.focus(), 100);
        }
        break;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  useEffect(() => {
    if (!open && filterValue?.search !== search) {
      setOpenSearch(false);
      setSearch(filterValue?.search || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleReset = () => {
    onChange?.({});
    setOpen(false);
    setSearch("");
  };

  const filterOptions = options.filter((item) => !excludes.includes(item.value));

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <FilterContainer>
        <FilterButton
          onClick={() => setOpen((pre) => !pre)}
          startIcon={
            <FilterIconContainer>
              <CustomIcon
                icon={FilterIC}
                width={18}
                color={(theme) => theme.palette.primary.main}
                fill="currentColor"
              />
            </FilterIconContainer>
          }
        >
          Filter
        </FilterButton>
        {open && (
          <FilterContent>
            <MenuList>
              {filterOptions.map((option) => (
                <FilterMenuItem active={+!!option.active} key={option.value} onClick={() => onSelect(option.value)}>
                  <StyledListItemIcon>{option.icon}</StyledListItemIcon>
                  <FilterListItemText>{option.label}</FilterListItemText>
                </FilterMenuItem>
              ))}
            </MenuList>
            <AdditionContainer>
              {openSearch && (
                <StyledInput
                  inputRef={inputRef}
                  endAdornment={
                    <IconButton
                      onClick={() => {
                        onChange?.({ ...filterValue, search: search });
                        setOpenSearch(false);
                        setOpen(false);
                      }}
                      sx={{ marginLeft: "5px" }}
                    >
                      <CustomIcon icon={SearchIcon} width={20} />
                    </IconButton>
                  }
                  value={search}
                  onChange={({ target: { value } }) => setSearch(value)}
                />
              )}

              <DateRangeModal
                open={openDateRange}
                value={{ fromDate: filterValue?.fromDate, toDate: filterValue?.toDate }}
                onDateRangeChange={({ fromDate, toDate }) => {
                  onChange?.({
                    ...filterValue,
                    fromDate: moment(fromDate, DATETIME_PARTTEN).startOf("d").utc().format(DATETIME_PARTTEN),
                    toDate: moment(toDate, DATETIME_PARTTEN).endOf("d").utc().format(DATETIME_PARTTEN)
                  });
                  setOpen(false);
                }}
                onClose={() => setOpenDateRange(false)}
              />
            </AdditionContainer>
            <Box
              component={Button}
              width={"100%"}
              textTransform={"capitalize"}
              display={"flex"}
              alignItems={"center"}
              color={({ palette }) => `${palette.blue[100]} !important`}
              onClick={handleReset}
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

export default CustomFilter;
