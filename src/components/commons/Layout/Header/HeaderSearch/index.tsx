import React, { FormEvent, useState, useEffect } from "react";
import { Backdrop, Box, Button, SelectChangeEvent } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { HeaderSearchIcon } from "../../../../../commons/resources";
import { routers } from "../../../../../commons/routers";
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

interface Props {
  home: boolean;
}
interface FormValues {
  filter: FilterParams;
  search: string;
}
interface Option {
  value: FilterParams;
  label: React.ReactNode;
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
  },
  {
    value: "blocks",
    label: "Blocks",
  },
  {
    value: "txs",
    label: "Transactions",
  },
  {
    value: "tokens",
    label: "Tokens",
  },
  {
    value: "stakes",
    label: "Stake keys",
  },
  {
    value: "addresses",
    label: "Addresses",
  },
  {
    value: "delegations/pool-detail-header",
    label: "Pools",
  },
];

const HeaderSearch: React.FC<Props> = ({ home }) => {
  const history = useHistory();
  const [{ search, filter }, setValues] = useState<FormValues>({ ...intitalValue });
  const [showOption, setShowOption] = useState(false);
  useEffect(() => {
    if (!search) {
      setShowOption(false);
    }
  }, [search]);
  useEffect(() => {
    setValues({ ...intitalValue });
  }, [history.location.pathname]);

  const handleSearch = (e?: FormEvent, filterParams?: FilterParams) => {
    e?.preventDefault();
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

  return (
    <Box position={"relative"} component={Form} onSubmit={handleSearch} home={home ? 1 : 0}>
      <Backdrop sx={{ backgroundColor: "unset" }} open={showOption} onClick={() => setShowOption(false)} />
      <StyledSelect onChange={handleChangeFilter} value={filter} IconComponent={BiChevronDown} home={home ? 1 : 0}>
        {options.map(({ value, label }) => (
          <SelectOption key={value} value={value} home={home ? 1 : 0}>
            {label}
          </SelectOption>
        ))}
      </StyledSelect>
      <StyledInput
        home={home ? 1 : 0}
        required
        type="search"
        value={search}
        spellCheck={false}
        placeholder={home ? "Search transactions, address, blocks, epochs, pools..." : "Search ..."}
        onChange={handleChangeSearch}
        disableUnderline
        onFocus={() => onFocus()}
      />
      <OptionsSearch home={home} show={showOption} value={search} handleSearch={handleSearch} />
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
    <OptionsWrapper display={show ? "block" : "none"} home={home}>
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
