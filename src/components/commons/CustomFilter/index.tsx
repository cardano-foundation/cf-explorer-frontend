import { Box, Button, ClickAwayListener, MenuList, useTheme } from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillCheckCircleFill } from "react-icons/bs";

import {
  ArrowFromBottomIcon,
  ArrowFromTopIcon,
  CalenderIcon,
  FilterIC,
  HeaderSearchIconComponent,
  ResetIcon
} from "src/commons/resources";
import { useScreen } from "src/commons/hooks/useScreen";

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
import { AdditionContainer, ApplyFilterButton, StyledInput, StyledListItemIcon } from "./styles";

export interface FilterParams {
  sort?: string;
  fromDate?: string;
  toDate?: string;
  search?: string;
}

export interface Props {
  onChange?: (params: FilterParams | null) => void;
  onSubmit?: (params: FilterParams) => void;
  filterValue?: FilterParams | null;
  filter?: FilterParams | null;
  sortKey?: string;
  excludes?: string[];
  searchLabel: string;
}

const CustomFilter: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { onSubmit, filterValue, sortKey = "time", excludes = [], searchLabel } = props;

  const [open, setOpen] = useState(false);
  const [openDateRange, setOpenDateRange] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [params, setParams] = useState<FilterParams | null>(filterValue || {});
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const theme = useTheme();
  const { isMobile } = useScreen();

  const options: Option[] = [
    {
      label: (
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          {t("filter.latestFirst")}
          {params?.sort && params.sort.includes(`${sortKey},DESC`) && (
            <BsFillCheckCircleFill size={16} color={theme.palette.secondary.main} />
          )}{" "}
        </Box>
      ),

      icon: <CustomIcon icon={ArrowFromTopIcon} fill={theme.palette.secondary.light} width={20} />,
      value: "latest",
      active: filterValue?.sort === `${sortKey},DESC`
    },
    {
      label: (
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          {t("filter.firstLatest")}
          {params?.sort && params.sort.includes(`${sortKey},ASC`) && (
            <BsFillCheckCircleFill size={16} color={theme.palette.secondary.main} />
          )}
        </Box>
      ),
      icon: <CustomIcon icon={ArrowFromBottomIcon} fill={theme.palette.secondary.light} width={20} />,
      value: "first",
      active: filterValue?.sort === `${sortKey},ASC`
    },
    {
      label: (
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          {t("filter.daterange")}
          {params?.fromDate && <BsFillCheckCircleFill size={16} color={theme.palette.secondary.main} />}
        </Box>
      ),
      icon: <CustomIcon icon={CalenderIcon} fill={theme.palette.secondary.light} width={20} />,
      value: "dateRange",
      active: !!(filterValue?.toDate && filterValue?.fromDate)
    },
    {
      label: (
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          {searchLabel}
          {params?.search && <BsFillCheckCircleFill size={16} color={theme.palette.secondary.main} />}
        </Box>
      ),
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
        setParams?.({ ...params, sort: `${sortKey},DESC` });
        break;
      }
      case "first": {
        setParams?.({ ...params, sort: `${sortKey},ASC` });
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
    setParams?.(filterValue || null);
    if (!open && filterValue?.search !== search) {
      setOpenSearch(false);
      setSearch(filterValue?.search || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleReset = () => {
    setParams?.(null);
    if (onSubmit) {
      onSubmit?.({});
    }
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
          <FilterContent isMobile={isMobile}>
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
                  placeholder={searchLabel}
                  value={search}
                  onChange={({ target: { value } }) => setSearch(value)}
                />
              )}

              <DateRangeModal
                open={openDateRange}
                value={{ fromDate: filterValue?.fromDate, toDate: filterValue?.toDate }}
                onDateRangeChange={({ fromDate, toDate }) => {
                  setParams?.({
                    ...params,
                    fromDate: moment(fromDate, DATETIME_PARTTEN).startOf("d").utc().format(DATETIME_PARTTEN),
                    toDate: moment(toDate, DATETIME_PARTTEN).endOf("d").utc().format(DATETIME_PARTTEN)
                  });
                }}
                onClose={() => setOpenDateRange(false)}
              />
            </AdditionContainer>
            <Box my={1}>
              <ApplyFilterButton
                data-testid="apply-filters"
                onClick={() => {
                  if (onSubmit) {
                    onSubmit?.({ ...params, search: search });
                    setOpenSearch(false);
                    setOpen(false);
                  }
                }}
              >
                {t("common.applyFilters")}
              </ApplyFilterButton>
            </Box>
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
