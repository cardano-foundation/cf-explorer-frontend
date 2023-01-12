import { Container, styled } from "@mui/material";
import { parse } from "qs";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { details } from "../../commons/routers";
import CircularProgress from "@mui/material/CircularProgress";
import defaultAxios from "../../commons/utils/axios";
import NoRecord from "../../components/commons/NoRecord";

const SearchResultContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 0px;
`;

const Title = styled("h3")`
  color: ${props => props.theme.textColorPale};
  margin-bottom: 2rem;
  font-weight: var(--font-weight-normal);
`;

const getUrl = (filter?: FilterParams | "all", value?: string): FilterParams | null => {
  if (filter && filter !== "all") return filter;
  if (value) {
    if (value.search("addr_") === 0) return "address";
    if (value.search("stake_") === 0) return "stake";
    if (value.search("pool") === 0) return "delegation/pool-detail-header";
    if (value.search("asset") === 0) return "tokens";
  }
  return null;
};

const createNavigator = (filter?: FilterParams | string) => {
  switch (filter) {
    case "epoch":
      return details.epoch;
    case "block":
      return details.block;
    case "tx":
      return details.transaction;
    case "tokens":
      return details.token;
    case "stake":
      return details.stake;
    case "address":
      return details.address;
    case "delegation/pool-detail-header":
      return details.delegation;
    default:
      return null;
  }
};

const filterURLS = (value: string): FilterParams[] => {
  if (!Number.isNaN(Number(value))) return ["epoch", "block"];
  else return ["block", "tx", "tokens", "stake", "address", "delegation/pool-detail-header"];
};

const SearchResult = () => {
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const history = useHistory();
  const { filter, search: value }: SearchParams = parse(search.split("?")[1]);

  useEffect(() => {
    document.title = loading ? `Search For ${value}...` : `No Record Found: ${value} | Cardano Explorer`;
  }, [loading]);

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
          urls.map(async url => {
            try {
              const res = await defaultAxios.get(`${url}/${value}`);
              if (res.data) return Promise.resolve({ url, data: res.data });
            } catch {}
            return Promise.reject();
          })
        );
        if (!result?.url) setLoading(false);
        const { url, data } = result;
        const navigate = createNavigator(url);

        if (navigate) return history.replace(navigate(value), { data });
      } catch {}

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
