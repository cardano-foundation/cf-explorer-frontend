/* eslint-disable no-case-declarations */
import React, { FormEvent, useState, useEffect, useCallback } from "react";
import { Backdrop, Box, SelectChangeEvent, CircularProgress } from "@mui/material";
import { stringify } from "qs";
import { BiChevronDown } from "react-icons/bi";
import { GoChevronRight } from "react-icons/go";
import { useSelector } from "react-redux";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { isNil, isObject, omitBy } from "lodash";

import { HeaderSearchIcon } from "src/commons/resources";
import { details, routers } from "src/commons/routers";
import { useScreen } from "src/commons/hooks/useScreen";
import { API } from "src/commons/utils/api";
import defaultAxios from "src/commons/utils/axios";
import { formatLongText, getShortHash, getShortWallet } from "src/commons/utils/helper";

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
      routers.STAKE_ADDRESS_REGISTRATION,
      routers.STAKE_ADDRESS_DEREGISTRATION,
      routers.STAKE_ADDRESS_DELEGATIONS,
      routers.TOP_DELEGATOR,
      routers.STAKE_DETAIL
    ],
    detail: details.address
  },
  {
    value: "delegations/pool-detail-header",
    label: "Pools",
    paths: [
      routers.DELEGATION_POOLS,
      routers.DELEGATION_POOL_DETAIL,
      routers.POOL_CERTIFICATE,
      routers.POOL_DEREGISTRATION
    ],
    detail: details.delegation
  },
  {
    value: "policies",
    label: "Policy Id",
    paths: [routers.POLICY_DETAIL],
    detail: details.policyDetail
  }
];

const URL_FETCH_DETAIL = {
  epochs: (epoch: number) => `${API.EPOCH.DETAIL}/${epoch}`,
  blocks: (block: number) => `${API.BLOCK.DETAIL}/${block}`,
  txs: (trx: string) => `${API.TRANSACTION.DETAIL}/${trx}`,
  addresses: (address: string) => `${API.ADDRESS.DETAIL}/${address}`,
  policies: (policy: string) => `${API.POLICY}/${policy}`
};

interface Props extends RouteComponentProps {
  home: boolean;
  callback?: () => void;
  setShowErrorMobile?: (show: boolean) => void;
}

interface IResponseSearchAll {
  epoch?: number;
  block?: "string";
  tx?: "string";
  token?: [
    {
      name: "string";
      fingerprint: "string";
    }
  ];
  validTokenName?: boolean;
  address?: {
    address: "string";
    stakeAddress: true;
    paymentAddress: true;
  };
  pools?: [
    {
      name: "string";
      poolId: "string";
      icon: "string";
    }
  ];
  validPoolName?: true;
  policy?: "string";
}
const RESULT_SIZE = 5;

const HeaderSearch: React.FC<Props> = ({ home, callback, setShowErrorMobile, history }) => {
  const [{ search, filter }, setValues] = useState<FormValues>({ ...intitalValue });
  const [showOption, setShowOption] = useState(false);
  const [error, setError] = useState("");
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const [dataSearchAll, setDataSearchAll] = useState<IResponseSearchAll | undefined>();
  const [dataSearchTokensAndPools, setDataSearchTokensAndPools] = useState<
    TokensSearch[] | DelegationPool[] | undefined
  >();
  const [loading, setLoading] = useState<boolean>(false);
  const [totalResult, setTotalResult] = useState<number>(0);

  const showResultNotFound = () => {
    setError("No results found");
    setShowErrorMobile?.(true);
    setDataSearchAll(undefined);
    setShowOption(true);
  };

  const handleSearchAll = async (query: string) => {
    try {
      setLoading(true);
      const res = await defaultAxios.get(API.SEARCH_ALL(query));
      setDataSearchAll(res?.data);
      setShowOption(true);
      setLoading(false);
    } catch {
      showResultNotFound();
      setLoading(false);
    }
  };

  const FetchSearchTokensAndPools = async (query: string, filter: FilterParams) => {
    try {
      setLoading(true);
      const search: { query?: string; search?: string } = {};
      if (filter === "tokens") {
        search.query = query.trim();
      } else {
        search.search = query.trim();
      }
      const url = `${
        filter === "tokens" ? API.TOKEN.LIST : API.DELEGATION.POOL_LIST
      }?page=0&size=${RESULT_SIZE}&${stringify(search)}`;

      const res = await defaultAxios.get(url);
      setTotalResult(res?.data && res.data?.totalItems ? res.data?.totalItems : 0);
      setDataSearchTokensAndPools(res?.data && res?.data?.data ? res?.data?.data : undefined);
      setShowOption(true);
      setLoading(false);
    } catch {
      showResultNotFound();
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!search) {
      setShowOption(false);
    }
    setDataSearchAll(undefined);
    setDataSearchTokensAndPools(undefined);
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

    if (!["all", "tokens", "delegations/pool-detail-header"].includes(option?.value || "")) {
      setLoading(true);
      const url = URL_FETCH_DETAIL[option?.value as keyof typeof URL_FETCH_DETAIL]
        ? URL_FETCH_DETAIL[option?.value as keyof typeof URL_FETCH_DETAIL](search as never)
        : "";
      try {
        await defaultAxios.get(url);
      } catch (error) {
        showResultNotFound();
        setShowOption(true);
        return;
      } finally {
        setLoading(false);
      }
    }

    if (option?.value === "lifecycle") {
      if (search.startsWith("stake")) {
        history.push(details.staking(search, "timeline"));
        callback?.();
      } else if (search.startsWith("pool")) {
        history.push(details.spo(search, "timeline"));
        callback?.();
      } else {
        showResultNotFound();
        setShowOption(true);
      }
      return;
    }

    if (search && filter === "all") {
      handleSearchAll(search);
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

    if (option?.value === "tokens" || option?.value === "delegations/pool-detail-header") {
      FetchSearchTokensAndPools(search, filter);
      return;
    }

    if (option?.value === "blocks") {
      history.push(details.block(search.trim()));
      callback?.();
      return;
    }
    if (option?.value === "epochs") {
      history.push(details.epoch(search.trim()));
      callback?.();
      return;
    }

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
    setValues({ filter, search: (e?.target as HTMLInputElement)?.value || "" });
    setError("");
    setShowErrorMobile?.(false);
    onFocus((e?.target as HTMLInputElement)?.value);
    setDataSearchAll(undefined);
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
      {showOption && (
        <OptionsSearch
          showResultNotFound={showResultNotFound}
          error={error}
          home={home}
          totalResult={totalResult}
          filter={filter}
          show={showOption}
          value={search}
          data={dataSearchAll}
          setShowOption={setShowOption}
          dataSearchTokensAndPools={dataSearchTokensAndPools}
        />
      )}
      {loading && search ? (
        <SubmitButton type="submit" home={home ? 1 : 0} disabled={true}>
          <CircularProgress size={20} />
        </SubmitButton>
      ) : (
        <SubmitButton type="submit" home={home ? 1 : 0} disabled={!search.trim()}>
          <Image src={HeaderSearchIcon} alt="search" home={home ? 1 : 0} />
        </SubmitButton>
      )}
    </Form>
  );
};

export default withRouter(HeaderSearch);

interface OptionProps {
  show: boolean;
  home: boolean;
  value: string;
  error: string;
  data?: IResponseSearchAll;
  dataSearchTokensAndPools?: TokensSearch[] | DelegationPool[];
  showResultNotFound: () => void;
  setShowOption: (show: boolean) => void;
  filter: FilterParams;
  totalResult: number;
}

export const OptionsSearch = ({
  show,
  home,
  value,
  error,
  data,
  showResultNotFound,
  setShowOption,
  filter,
  dataSearchTokensAndPools,
  totalResult
}: OptionProps) => {
  const history = useHistory();

  const listOptionsTokensAndPools = dataSearchTokensAndPools?.map((i) => {
    return {
      suggestText: (
        <Box>
          Search for a {filter === "tokens" ? "token" : "pool"}{" "}
          {filter === "tokens" ? (
            <ValueOption>
              {(i as TokensSearch)?.displayName.startsWith("asset") && (i as TokensSearch)?.displayName.length > 43
                ? getShortWallet((i as TokensSearch)?.fingerprint || "")
                : (i as TokensSearch)?.displayName}
            </ValueOption>
          ) : (
            <ValueOption>
              {(i as DelegationPool)?.poolName || getShortWallet((i as DelegationPool)?.poolId || "")}
            </ValueOption>
          )}
        </Box>
      ),
      cb: () =>
        history.push(
          filter === "tokens"
            ? details.token(encodeURIComponent((i as TokensSearch)?.fingerprint))
            : details.delegation(encodeURIComponent((i as DelegationPool)?.poolId))
        )
    };
  });

  const listOptions =
    (isObject(data) &&
      Object.entries(omitBy(data, isNil))
        .map(([key, objValue]) => {
          switch (key) {
            case "epoch":
              return {
                suggestText: "Search for an Epoch",
                cb: () => history.push(details.epoch((value || "").trim().toLocaleLowerCase())),
                formatter: formatLongText
              };
            case "block":
              return {
                suggestText: "Search for a Block by number",
                cb: () => history.push(details.block((value || "").trim().toLocaleLowerCase())),
                formatter: formatLongText
              };
            case "tx":
              return {
                suggestText: "Search for a Transaction by",
                cb: () => history.push(details.transaction((value || "").trim().toLocaleLowerCase())),
                formatter: getShortHash
              };
            case "address":
              const addressLink = objValue?.stakeAddress
                ? details.stake((value || "").trim().toLocaleLowerCase())
                : details.address((value || "").trim().toLocaleLowerCase());
              return {
                suggestText: "Search for an Address by",
                cb: () => history.push(addressLink),
                formatter: getShortWallet
              };
            case "token":
              return {
                suggestText: "Search for a Token by",
                cb: () => history.push(details.token(encodeURIComponent((value || "").trim().toLocaleLowerCase()))),
                formatter: getShortWallet
              };
            case "validTokenName":
              if (data.validTokenName) {
                return {
                  suggestText: "Search for a Token by",
                  cb: () =>
                    history.push(
                      `${routers.TOKEN_LIST}?tokenName=${encodeURIComponent((value || "").trim().toLocaleLowerCase())}`
                    ),
                  formatter: formatLongText
                };
              }
              return;
            case "pool":
              return {
                suggestText: "Search for a Pool by",
                cb: () =>
                  history.push(details.delegation(encodeURIComponent((value || "").trim().toLocaleLowerCase()))),
                formatter: getShortWallet
              };
            case "validPoolName":
              if (data?.validPoolName) {
                return {
                  suggestText: "Search for a Pool by",
                  cb: () =>
                    history.push(routers.DELEGATION_POOLS, {
                      tickerNameSearch: encodeURIComponent((value || "").trim().toLocaleLowerCase())
                    }),
                  formatter: formatLongText
                };
              }
              return;
            case "policy":
              return {
                suggestText: "Search for a Policy by",
                cb: () =>
                  history.push(details.policyDetail(encodeURIComponent((value || "").trim().toLocaleLowerCase()))),
                formatter: formatLongText
              };
          }
        })
        .filter(Boolean)) ||
    [];

  useEffect(() => {
    if (listOptions.length === 0 && isObject(data) && Object.keys(data).length > 0 && filter === "all")
      showResultNotFound();
    if (
      (listOptionsTokensAndPools || []).length === 0 &&
      dataSearchTokensAndPools &&
      (filter === "delegations/pool-detail-header" || filter === "tokens")
    )
      showResultNotFound();
  }, [JSON.stringify(data), JSON.stringify(dataSearchTokensAndPools)]);

  if (filter === "tokens" || filter === "delegations/pool-detail-header") {
    return (
      <OptionsWrapper display={show ? "block" : "none"} home={+home}>
        {!error ? (
          <>
            {(listOptionsTokensAndPools || [])?.map((item, i: number) => {
              return (
                <Option key={i} onClick={() => item?.cb?.()} data-testid="option-search-epoch">
                  <Box>{item?.suggestText} </Box>
                  <GoChevronRight />
                </Option>
              );
            })}
            {listOptionsTokensAndPools && totalResult && totalResult > RESULT_SIZE && (
              <Option
                onClick={() => {
                  setShowOption(false);
                  filter === "tokens"
                    ? history.push(`${routers.TOKEN_LIST}?tokenName=${(value || "").toLocaleLowerCase()}`)
                    : history.push(routers.DELEGATION_POOLS, {
                        tickerNameSearch: (value || "").toLocaleLowerCase()
                      });
                }}
              >
                <Box
                  display="flex"
                  alignItems={"center"}
                  justifyContent="center"
                  width={"100%"}
                  fontSize={"14px"}
                  padding={0}
                  gap="10px"
                  minHeight="34px"
                >
                  See more
                </Box>
              </Option>
            )}
          </>
        ) : (
          <Box component={Option} color={({ palette }) => palette.error[700]} justifyContent={"center"}>
            <Box>{error}</Box>
          </Box>
        )}
      </OptionsWrapper>
    );
  }
  return (
    <OptionsWrapper display={show ? "block" : "none"} home={+home}>
      {!error ? (
        <>
          {listOptions.map((item, i: number) => {
            return (
              <Option key={i} onClick={() => item?.cb?.()} data-testid="option-search-epoch">
                <Box>
                  {item?.suggestText} <ValueOption> {item?.formatter?.(value) || value}</ValueOption>
                </Box>
                <GoChevronRight />
              </Option>
            );
          })}
        </>
      ) : (
        <Box component={Option} color={({ palette }) => palette.error[700]} justifyContent={"center"}>
          <Box>{error}</Box>
        </Box>
      )}
    </OptionsWrapper>
  );
};
