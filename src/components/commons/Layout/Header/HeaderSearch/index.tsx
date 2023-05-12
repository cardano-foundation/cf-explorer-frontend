import React, { FormEvent, useState, useEffect } from "react";
import { Backdrop, Box, SelectChangeEvent } from "@mui/material";
import { useHistory } from "react-router-dom";
import { HeaderSearchIcon } from "../../../../../commons/resources";
import { details, routers } from "../../../../../commons/routers";
import { stringify } from "qs";
import { BiChevronDown } from "react-icons/bi";
import { GoChevronRight } from "react-icons/go";
import {
  Form,
  Image,
  Option,
  OptionsWrapper,
  SelectOption,
  StyledInput,
  StyledSelect,
  SubmitButton,
  ValueOption,
} from "./style";
import { useSelector } from "react-redux";
import { useScreen } from "../../../../../commons/hooks/useScreen";
import defaultAxios from "../../../../../commons/utils/axios";
import { API } from "../../../../../commons/utils/api";
import qs from "qs";

interface Props {
  home: boolean;
  callback?: () => void;
}
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
  search: "",
};

const options: Option[] = [
  {
    value: "all",
    label: "All Filters",
  },
  {
    value: "epochs",
    label: "Epochs",
    paths: [routers.EPOCH_LIST],
  },
  {
    value: "blocks",
    label: "Blocks",
    paths: [routers.BLOCK_LIST],
  },
  {
    value: "txs",
    label: "Transactions",
    paths: [routers.TRANSACTION_LIST],
  },
  {
    value: "tokens",
    label: "Tokens",
    paths: [routers.TOKEN_LIST],
  },
  {
    value: "stakes",
    label: "Stake keys",
    paths: [routers.STAKE_LIST, routers.TOP_DELEGATOR],
  },
  {
    value: "addresses",
    label: "Addresses",
    paths: [routers.ADDRESS_LIST, routers.CONTRACT_LIST],
  },
  {
    value: "delegations/pool-detail-header",
    label: "Pools",
    paths: [routers.DELEGATION_POOLS, routers.REGISTRATION_POOLS],
  },
  {
    value: "delegation-lifecycle",
    label: "Delegation Lifecycle",
    paths: [routers.DELEGATOR_LIFECYCLE],
    detail: details.staking,
  },
  {
    value: "spo-lifecycle",
    label: "SPO Lifecycle",
    paths: [routers.SPO_LIFECYCLE],
    detail: details.spo,
  },
];

const HeaderSearch: React.FC<Props> = ({ home, callback }) => {
  const history = useHistory();
  const [{ search, filter }, setValues] = useState<FormValues>({ ...intitalValue });
  const [showOption, setShowOption] = useState(false);
  useEffect(() => {
    if (!search) {
      setShowOption(false);
    }
    if (filter !== "all") {
      setShowOption(false);
    }
  }, [search, filter]);

  const currentPath = history.location.pathname.split("/")[1];
  const checkIncludesPath = (paths: Option["paths"]) => paths?.find(path => path?.split("/")[1] === currentPath);

  useEffect(() => {
    const filter: FilterParams = options.find(item => checkIncludesPath(item.paths))?.value || "all";

    setValues({ ...intitalValue, filter });
  }, [history.location.pathname]);

  const handleSearch = async (e?: FormEvent, filterParams?: FilterParams) => {
    e?.preventDefault();
    const option = options.find(item => item.value === filter);

    callback?.();
    if (option?.value === "spo-lifecycle" && option?.detail) {
      const data = await defaultAxios
        .get(`${API.DELEGATION.POOL_LIST}?${qs.stringify({ search })}`)
        .then(res => res.data.data);
      if (data && data.length) return history.push(option?.detail(data[0].poolId));
    }
    if (option?.detail) return history.push(option?.detail(search));
    if (search) {
      history.push(
        `${routers.SEARCH}?${stringify({ search, filter: filterParams || (filter !== "all" ? filter : undefined) })}`
      );
      setValues({ ...intitalValue });
    }
  };

  const handleChangeFilter = (e: SelectChangeEvent<unknown>) => {
    setValues({ search, filter: e.target.value as Option["value"] });
  };

  const handleChangeSearch = (e?: React.ChangeEvent) => {
    setValues({ filter, search: (e?.target as HTMLInputElement)?.value });
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
    <Box position={"relative"} component={Form} onSubmit={handleSearch} home={home ? 1 : 0}>
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
            ? "Search Stake key, Pool ID or Pool Name"
            : "Search ..."
        }
        title={
          home && !isMobile
            ? "Search transactions, address, blocks, epochs, pools..."
            : isStakingLifecycle && !isMobile
            ? "Search Stake key, Pool ID or Pool Name"
            : "Search ..."
        }
        onChange={handleChangeSearch}
        disableUnderline
        onFocus={() => onFocus()}
      />
      {!isMobile && <OptionsSearch home={home} show={showOption} value={search} handleSearch={handleSearch} />}
      <SubmitButton type="submit" home={home ? 1 : 0} disabled={!search}>
        <Image src={HeaderSearchIcon} alt="search" home={home ? 1 : 0} />
      </SubmitButton>
    </Box>
  );
};

export default HeaderSearch;

const OptionsSearch = ({
  show,
  home,
  value,
  handleSearch,
}: {
  show: boolean;
  home: boolean;
  value: string;
  handleSearch: (e?: FormEvent, filterParams?: FilterParams) => void;
}) => {
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  const submitSearch = (filter: FilterParams) => {
    handleSearch(undefined, filter);
  };

  return (
    <OptionsWrapper display={show ? "block" : "none"} home={+home}>
      {+value <= (currentEpoch?.no || 0) && (
        <Option onClick={() => submitSearch("epochs")}>
          <Box>
            Search for an epoch <ValueOption> {value}</ValueOption>
          </Box>
          <GoChevronRight />
        </Option>
      )}
      <Option onClick={() => submitSearch("blocks")}>
        <Box>
          Search for a block by number <ValueOption>{value}</ValueOption>
        </Box>
        <GoChevronRight />
      </Option>
    </OptionsWrapper>
  );
};
