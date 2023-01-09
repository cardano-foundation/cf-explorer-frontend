import { Container, styled } from "@mui/material";
import { parse } from "qs";
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { EmptyIcon, NotFoundIcon } from "../../commons/resources";
import { details, routers } from "../../commons/routers";
import CircularProgress from "@mui/material/CircularProgress";
import defaultAxios from "../../commons/utils/axios";

const SearchResultContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 0px;
`;

const Image = styled("img")`
  width: auto;
  height: 214px;
`;

const Title = styled("h3")`
  color: ${props => props.theme.textColorPale};
  margin-bottom: 2rem;
  font-weight: var(--font-weight-normal);
`;

const BackToHome = styled(Link)`
  display: block;
  width: max-content;
  margin: auto;
  padding: 6.5px 20px;
  border: 2px solid ${props => props.theme.colorGreenLight};
  border-radius: 5px;
  color: ${props => props.theme.colorGreenLight};
  font-weight: var(--font-weight-bold);
  &:link,
  &:visited {
    color: ${props => props.theme.colorGreenLight};
  }
  &:hover {
    border: 2px solid ${props => props.theme.colorGreen};
    color: ${props => props.theme.colorGreen};
  }
`;

const createNavigator = (filter?: FilterParams | string, value?: string) => {
  switch (filter) {
    case "epoch": {
      return details.epoch;
    }
    case "block": {
      return details.block;
    }
    case "tx": {
      return details.transaction;
    }
    case "tokens": {
      return details.token;
    }
    case "stake": {
      return details.stake;
    }
    case "address": {
      return details.address;
    }
    default: {
      if (value) {
        if (value.search("addr_") === 0) return details.address;
        if (value.search("stake_") === 0) return details.stake;
        if (value.search("pool") === 0) return details.delegation;
        if (value.search("asset") === 0) return details.token;
      }
      return null;
    }
  }
};

const filterURLS = (value: string): FilterParams[] => {
  if (!Number.isNaN(Number(value))) return ["epoch", "block"];
  else return ["block", "tx", "tokens", "stake", "address"];
};

const SearchResult = () => {
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();
  const history = useHistory();
  const { filter, search: value }: SearchParams = parse(search.split("?")[1]);

  useEffect(() => {
    const checkFilter = async () => {
      if (!value) return;

      const navigate = createNavigator(filter, value);

      if (navigate) return history.replace(navigate(value), { search: value });

      setLoading(true);
      try {
        const urls = filterURLS(value);
        const url = await Promise.any(
          urls.map(async url => {
            try {
              const res = await defaultAxios.get(`${url}/${value}`);
              if (res.data) return Promise.resolve(url);
            } catch {}
            return Promise.reject();
          })
        );
        if (!url) setLoading(false);

        const navigate = createNavigator(url);

        if (navigate) return history.replace(navigate(value), { search: value });
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

  return (
    <SearchResultContainer>
      <Image src={EmptyIcon} alt="empty icon" />
    </SearchResultContainer>
  );
};
export default SearchResult;
