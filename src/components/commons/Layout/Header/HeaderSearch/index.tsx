import React, { FormEvent, useState, useEffect, useCallback } from "react";
import { Backdrop, Box, SelectChangeEvent } from "@mui/material";
import { stringify } from "qs";
import { BiChevronDown } from "react-icons/bi";
import { GoChevronRight } from "react-icons/go";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { HeaderSearchIcon } from "src/commons/resources";
import { details, routers } from "src/commons/routers";
import { useScreen } from "src/commons/hooks/useScreen";

import {
  Form,
  Image,
  Option,
  OptionsWrapper,
  SelectOption,
  StyledInput,
  StyledSelect,
  SubmitButton,
  ValueOption
} from "./style";

interface FormValues {
  filter: FilterParams;
  search: string;
}

interface Option {
  value: FilterParams;
  label: React.ReactNode;
  paths?: (typeof routers)[keyof typeof routers][];
  detail?: (typeof details)[keyof typeof details];
}
const intitalValue: FormValues = {
  filter: "all",
  search: ""
};

const options: Option[] = [
  {
    value: "all",
    label: "All Filters"
  },
  {
    value: "epochs",
    label: "Epochs",
    paths: [routers.EPOCH_LIST, routers.EPOCH_DETAIL],
    detail: details.epoch
  },
  {
    value: "blocks",
    label: "Blocks",
    paths: [routers.BLOCK_LIST, routers.BLOCK_DETAIL],
    detail: details.block
  },
  {
    value: "txs",
    label: "Transactions",
    paths: [routers.TRANSACTION_LIST, routers.TRANSACTION_DETAIL],
    detail: details.transaction
  },
  {
    value: "tokens",
    label: "Tokens",
    paths: [routers.TOKEN_LIST, routers.TOKEN_DETAIL],
    detail: details.token
  },
  {
    value: "addresses",
    label: "Addresses",
    paths: [
      routers.ADDRESS_LIST,
      routers.CONTRACT_LIST,
      routers.ADDRESS_DETAIL,
      routers.STAKE_LIST,
      routers.TOP_DELEGATOR,
      routers.STAKE_DETAIL
    ],
    detail: details.address
  },
  {
    value: "delegations/pool-detail-header",
    label: "Pools",
    paths: [routers.DELEGATION_POOLS, routers.DELEGATION_POOL_DETAIL],
    detail: details.delegation
  },
  {
    value: "policies",
    label: "Policy Id",
    paths: [routers.POLICY_DETAIL],
    detail: details.policyDetail
  }
];

interface Props extends RouteComponentProps {
  home: boolean;
  callback?: () => void;
  setShowErrorMobile?: (show: boolean) => void;
}

const HeaderSearch: React.FC<Props> = ({ home, callback, setShowErrorMobile, history }) => {
  const [{ search, filter }, setValues] = useState<FormValues>({ ...intitalValue });
  const [showOption, setShowOption] = useState(false);
  const [error, setError] = useState("");
  const { sidebar } = useSelector(({ user }: RootState) => user);
  useEffect(() => {
    if (!search) {
      setShowOption(false);
    }
  }, [search, filter]);

  const currentPath = history.location.pathname.split("/")[1];

  const checkIncludesPath = useCallback(
    (paths: Option["paths"]) => paths?.find((path) => path?.split("/")[1] === currentPath),
    [currentPath]
  );

  useEffect(() => {
    const filter: FilterParams = options.find((item) => checkIncludesPath(item.paths))?.value || "all";
    if ("/" + currentPath !== routers.SEARCH) setValues({ ...intitalValue, filter });
    setError("");
    setShowErrorMobile?.(false);
  }, [currentPath, checkIncludesPath, setError, setShowErrorMobile, setValues]);

  const handleSearch = async (e?: FormEvent, filterParams?: FilterParams) => {
    e?.preventDefault();
    const option = options.find((item) => item.value === (filterParams || filter));

    if (option?.value === "lifecycle") {
      if (search.startsWith("stake")) {
        history.push(details.staking(search, "timeline"));
        callback?.();
      } else if (search.startsWith("pool")) {
        history.push(details.spo(search, "timeline"));
        callback?.();
      } else {
        setError("No results found");
        setShowErrorMobile?.(true);
        setShowOption(true);
      }
      return;
    }

    if (option?.value === "addresses") {
      if (search.startsWith("stake")) {
        history.push(details.stake(search));
        callback?.();
        return;
      }
      history.push(details.address(search));
    }

    callback?.();
    const isPoolTicketName =
      option?.value === "delegations/pool-detail-header" && !search?.toLowerCase().startsWith("pool");

    if (option?.detail && !isPoolTicketName) return history.push(option?.detail(search));

    if (option?.value === "all" && search.startsWith("stake")) {
      history.push(details.stake(search));
      callback?.();
      return;
    }

    if (search) {
      const params = { search, filter: filterParams || (filter !== "all" ? filter : undefined) };
      history.push(`${routers.SEARCH}?${stringify(params)}`);
      setError("");
      setShowErrorMobile?.(false);
    }
  };

  const handleChangeFilter = (e: SelectChangeEvent<unknown>) => {
    setValues({ search, filter: e.target.value as Option["value"] });
    setError("");
    setShowErrorMobile?.(false);
  };

  const handleChangeSearch = (e?: React.ChangeEvent) => {
    setValues({ filter, search: (e?.target as HTMLInputElement)?.value });
    setError("");
    setShowErrorMobile?.(false);
    onFocus((e?.target as HTMLInputElement)?.value);
  };
  const onFocus = (newValue?: string) => {
    if (!isNaN(+(newValue ?? search)) && (newValue ?? search) && filter === "all") {
      setShowOption(true);
    } else {
      setShowOption(false);
    }
  };

  const isStakingLifecycle = checkIncludesPath([routers.DELEGATOR_LIFECYCLE, routers.SPO_LIFECYCLE]);

  const { isMobile } = useScreen();

  return (
    <Form onSubmit={handleSearch} home={+home} sidebar={+sidebar} data-testid="header-search">
      <Backdrop sx={{ backgroundColor: "unset" }} open={showOption} onClick={() => setShowOption(false)} />
      <StyledSelect
        data-testid="all-filters-dropdown"
        onChange={handleChangeFilter}
        value={filter}
        IconComponent={BiChevronDown}
        home={home ? 1 : 0}
      >
        {options.map(({ value, label }) => (
          <SelectOption data-testid="filter-options" key={value} value={value} home={home ? 1 : 0}>
            {label}
          </SelectOption>
        ))}
      </StyledSelect>
      <StyledInput
        data-testid="search-bar"
        home={home ? 1 : 0}
        required
        type="search"
        value={search}
        spellCheck={false}
        placeholder={
          home && !isMobile
            ? "Search transactions, address, blocks, epochs, pools..."
            : isStakingLifecycle && !isMobile
            ? "Search Stake Address, Pools"
            : "Search ..."
        }
        title={
          home && !isMobile
            ? "Search transactions, address, blocks, epochs, pools..."
            : isStakingLifecycle && !isMobile
            ? "Search Stake Address, Pools"
            : "Search ..."
        }
        onChange={handleChangeSearch}
        disableUnderline
        onFocus={() => onFocus()}
      />

      <OptionsSearch error={error} home={home} show={showOption} value={search} handleSearch={handleSearch} />

      <SubmitButton type="submit" home={home ? 1 : 0} disabled={!search}>
        <Image src={HeaderSearchIcon} alt="search" home={home ? 1 : 0} />
      </SubmitButton>
    </Form>
  );
};

export default withRouter(HeaderSearch);

interface OptionProps {
  show: boolean;
  home: boolean;
  value: string;
  error: string;
  handleSearch: (e?: FormEvent, filterParams?: FilterParams) => void;
}

export const OptionsSearch = ({ show, home, value, handleSearch, error }: OptionProps) => {
  const { currentEpoch } = useSelector(({ system }: RootState) => system);

  const submitSearch = (filter: FilterParams) => handleSearch(undefined, filter);

  return (
    <OptionsWrapper display={show ? "block" : "none"} home={+home}>
      {!error && (
        <>
          {+value <= (currentEpoch?.no || 0) && (
            <Option onClick={() => submitSearch("epochs")} data-testid="option-search-epoch">
              <Box>
                Search for an epoch <ValueOption> {value}</ValueOption>
              </Box>
              <GoChevronRight />
            </Option>
          )}
          <Option onClick={() => submitSearch("blocks")} data-testid="option-search-block">
            <Box>
              Search for a block by number <ValueOption>{value}</ValueOption>
            </Box>
            <GoChevronRight />
          </Option>
        </>
      )}
      {!!error && (
        <Box component={Option} color={({ palette }) => palette.red[700]} justifyContent={"center"}>
          <Box>{error}</Box>
        </Box>
      )}
    </OptionsWrapper>
  );
};
