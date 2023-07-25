import { useEffect, useState } from "react";
import { Container, styled } from "@mui/material";
import { parse } from "qs";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory, useLocation } from "react-router-dom";

import { details, routers } from "src/commons/routers";
import defaultAxios from "src/commons/utils/axios";
import NoRecord from "src/components/commons/NoRecord";

const SearchResultContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 0px;
`;

const getUrl = (filter?: FilterParams | "all", value?: string): FilterParams | null => {
  const isPoolTicketName = filter === "delegations/pool-detail-header" && !value?.toLowerCase().startsWith("pool");

  if (isPoolTicketName) {
    return "delegations/pool-list?search=";
  }

  if (filter && filter !== "all") return filter;

  if (value) {
    if (value.search("stake-key") === 0) return "stake-keys";
    if (value.search("pool") === 0) return "delegations/pool-detail-header";
    if (value.search("asset") === 0) return "tokens";
  }
  return null;
};

const createNavigator = (filter?: FilterParams) => {
  switch (filter) {
    case "epochs":
      return details.epoch;
    case "blocks":
      return details.block;
    case "txs":
      return details.transaction;
    case "tokens":
      return details.token;
    case "stake-keys":
      return details.stake;
    case "addresses":
      return details.address;
    case "delegations/pool-detail-header":
      return details.delegation;
    case "contract":
      return details.contract;
    case "policies":
      return details.policyDetail;
    default:
      return null;
  }
};

const filterURLS = (value: string): FilterParams[] => {
  if (!Number.isNaN(Number(value))) return ["epochs", "blocks"];
  else
    return [
      "blocks",
      "txs",
      "tokens",
      "stake-keys",
      "addresses",
      "delegations/pool-detail-header",
      "policies",
      "delegations/pool-list?search="
    ];
};

const SearchResult = () => {
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const history = useHistory();
  const { filter, search: value }: SearchParams = parse(search.split("?")[1]);

  useEffect(() => {
    document.title = loading ? `Search For ${value}...` : `No Record Found: ${value} | Iris - Cardano Blockchain Explorer`;
  }, [loading, value]);

  const handleFilterByPool = (data: any) => {
    if (data?.totalItems === 1) {
      history.replace(details.delegation(data?.data?.[0]?.poolId));
    } else if (data?.totalItems > 1) {
      history.replace(routers.DELEGATION_POOLS, { tickerNameSearch: value });
    }
  };

  useEffect(() => {
    const checkFilter = async () => {
      if (!value) return;

      const urlDetect = getUrl(filter, value);
      if (urlDetect) {
        try {
          const pathName = urlDetect?.includes("?search=") ? `${urlDetect}${value}` : `${urlDetect}/${value}`;
          const res = (await defaultAxios.get(pathName)) || {};
          if (urlDetect === "delegations/pool-list?search=") {
            return handleFilterByPool(res.data);
          }
          const navigate = createNavigator(urlDetect);
          if (navigate) history.replace(navigate(value), { data: res.data });
        } catch {
          return setLoading(false);
        }
      }

      try {
        const urls = filterURLS(value);
        const result = await Promise.any(
          /* eslint-disable  @typescript-eslint/no-explicit-any */
          urls.map(async (url): Promise<{ url: FilterParams; data: any }> => {
            try {
              const pathName = url?.includes("?search=") ? `${url}${value}` : `${url}/${value}`;
              const res = await defaultAxios.get(pathName);
              if (url === "delegations/pool-list?search=") {
                handleFilterByPool(res.data);
              } else if (res.data) {
                return Promise.resolve({ url, data: res.data });
              }
            } catch {
              return Promise.reject();
            }
            return Promise.reject();
          })
        );
        const { url, data } = result;
        const navigate = createNavigator(url);

        if (navigate) return history.replace(navigate(value), { data });
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    checkFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, filter, value]);

  if (loading)
    return (
      <SearchResultContainer data-testid="search-page">
        <CircularProgress size={50} />
      </SearchResultContainer>
    );

  return <NoRecord />;
};
export default SearchResult;
