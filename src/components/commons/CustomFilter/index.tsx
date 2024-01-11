import { Box, Button, ClickAwayListener, IconButton, MenuList, useTheme } from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  ArrowFromBottomIcon,
  ArrowFromTopIcon,
  CalenderIcon,
  FilterIC,
  HeaderSearchIconComponent,
  ResetIcon
} from "src/commons/resources";

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
import DateRangeModal, { DATETIME_PARTTEN } from "./DateRangeModal";
import { AdditionContainer, StyledInput, StyledListItemIcon } from "./styles";

export interface FilterParams {
  sort?: string;
  fromDate?: string;
  toDate?: string;
  search?: string;
}

export interface Props {
  onChange?: (params: FilterParams | null) => void;
  filterValue?: FilterParams | null;
  sortKey?: string;
  excludes?: string[];
  searchLabel: string;
}

const CustomFilter: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { onChange, filterValue, sortKey = "time", excludes = [], searchLabel } = props;
  const [open, setOpen] = useState(false);
  const [openDateRange, setOpenDateRange] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const theme = useTheme();

  const options: Option[] = [
    {
      label: t("filter.latestFirst"),
      icon: <CustomIcon icon={ArrowFromTopIcon} fill={theme.palette.secondary.light} width={20} />,
      value: "latest",
      active: filterValue?.sort === `${sortKey},DESC`
    },
    {
      label: t("filter.firstLatest"),
      icon: <CustomIcon icon={ArrowFromBottomIcon} fill={theme.palette.secondary.light} width={20} />,
      value: "first",
      active: filterValue?.sort === `${sortKey},ASC`
    },
    {
      label: t("filter.daterange"),
      icon: <CustomIcon icon={CalenderIcon} fill={theme.palette.secondary.light} width={20} />,
      value: "dateRange",
      active: !!(filterValue?.toDate && filterValue?.fromDate)
    },
    {
      label: searchLabel,
      icon: (
        <CustomIcon
          icon={HeaderSearchIconComponent}
          stroke={theme.palette.secondary.light}
          fill={theme.palette.secondary[0]}
          height={22}
        />
      ),
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
    onChange?.(null);
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
                data-testid="filter-icon"
                icon={FilterIC}
                width={18}
                fill={theme.mode === "dark" ? theme.palette.primary.main : theme.palette.secondary.light}
              />
            </FilterIconContainer>
          }
        >
          {t("common.filter")}
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
                      <CustomIcon
                        icon={HeaderSearchIconComponent}
                        stroke={theme.palette.secondary.light}
                        fill={theme.palette.secondary[0]}
                        height={22}
                      />
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
              color={({ palette }) => `${palette.primary.main} !important`}
              onClick={handleReset}
            >
              <Box mr={1}>{t("common.reset")}</Box>
              <CustomIcon icon={ResetIcon} fill={theme.palette.primary.main} width={18} />
            </Box>
          </FilterContent>
        )}
      </FilterContainer>
    </ClickAwayListener>
  );
};

export default CustomFilter;
