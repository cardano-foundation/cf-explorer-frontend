import { useEffect, useState } from "react";
import { Container, styled } from "@mui/material";
import { parse } from "qs";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory, useLocation } from "react-router-dom";

import { details } from "src/commons/routers";
import defaultAxios from "src/commons/utils/axios";
import NoRecord from "src/components/commons/NoRecord";

const SearchResultContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 0px;
`;

const Title = styled("h3")`
  color: ${(props) => props.theme.palette.grey[400]};
  margin-bottom: 2rem;
  font-weight: var(--font-weight-normal);
`;

const getUrl = (filter?: FilterParams | "all", value?: string): FilterParams | null => {
  if (filter && filter !== "all") return filter;
  if (value) {
    if (value.search("stake") === 0) return "stakes";
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
    case "stakes":
      return details.stake;
    case "addresses":
      return details.address;
    case "delegations/pool-detail-header":
      return details.delegation;
    default:
      return null;
  }
};

const filterURLS = (value: string): FilterParams[] => {
  if (!Number.isNaN(Number(value))) return ["epochs", "blocks"];
  else return ["blocks", "txs", "tokens", "stakes", "addresses", "delegations/pool-detail-header"];
};

const SearchResult = () => {
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const history = useHistory();
  const { filter, search: value }: SearchParams = parse(search.split("?")[1]);

  useEffect(() => {
    document.title = loading ? `Search For ${value}...` : `No Record Found: ${value} | Cardano Explorer`;
  }, [loading, value]);

  useEffect(() => {
    const checkFilter = async () => {
      if (!value) return;

      const urlDetect = getUrl(filter, value);

      if (urlDetect) {
        try {
          const res = await defaultAxios.get(`${urlDetect}/${value}`);
          const navigate = createNavigator(urlDetect);
          if (navigate) return history.replace(navigate(value), { data: res.data });
        } catch {
          return setLoading(false);
        }
      }

      try {
        const urls = filterURLS(value);
        const result = await Promise.any(
          urls.map(async (url): Promise<{ url: FilterParams; data: any }> => {
            try {
              const res = await defaultAxios.get(`${url}/${value}`);
              if (res.data) return Promise.resolve({ url, data: res.data });
            } catch {
              //To do
            }
            return Promise.reject();
          })
        );
        const { url, data } = result;
        const navigate = createNavigator(url);

        if (navigate) return history.replace(navigate(value), { data });
      } catch {
        //To do
      }

      setLoading(false);
    };

    checkFilter();
  }, [history, filter, value]);

  if (loading)
    return (
      <SearchResultContainer>
        <CircularProgress size={50} />
        <Title>Searching....</Title>
      </SearchResultContainer>
    );

  return <NoRecord />;
};
export default SearchResult;
