import { Container, styled } from "@mui/material";
import { parse } from "qs";
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { NotFoundIcon } from "../../commons/resources";
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
  width: 100%;
  max-width: 250px;
  margin-bottom: 2rem;
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

interface SearchParams {
  filter?: "all" | "block" | "transaction" | "token" | "stake" | "address";
  search?: string;
}
const urls = ["block", "transaction", "token", "stake", "address"];

const SearchResult = () => {
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();
  const history = useHistory();
  const { filter, search: value }: SearchParams = parse(search.split("?")[1]);

  useEffect(() => {
    const checkFilter = async () => {
      if (!value) return;

      switch (filter) {
        case "block": {
          return history.push(details.block(Number(value)));
        }
        case "transaction": {
          return history.push(details.transaction(value));
        }
        case "token": {
          return history.push(details.token(value));
        }
        case "stake": {
          return history.push(details.stake(value));
        }
        case "address": {
          return history.push(details.address(value));
        }
        default: {
          setLoading(true);
          const results = await Promise.all(
            urls.map(async url => {
              try {
                const res = await defaultAxios.get(`${url}/${value}`);
                return res.data;
              } catch {
                return null;
              }
            })
          );
          const index = results.findIndex(item => !!item);
          if (index + 1) setLoading(false);
          switch (urls[index]) {
            case "block": {
              return history.push(details.block(Number(value)));
            }
            case "transaction": {
              return history.push(details.transaction(value));
            }
            case "token": {
              return history.push(details.token(value));
            }
            case "stake": {
              return history.push(details.stake(value));
            }
            case "address": {
              return history.push(details.address(value));
            }
            default:
              return;
          }
        }
      }
    };
    checkFilter();
  }, [filter, value]);

  if (loading)
    return (
      <SearchResultContainer>
        <CircularProgress size={50} />
        <Title>Searching....</Title>
      </SearchResultContainer>
    );

  return (
    <SearchResultContainer>
      <Image src={NotFoundIcon} alt="404" />
      <Title>No matching results found.</Title>
      <BackToHome to={routers.HOME}>Back to home</BackToHome>
    </SearchResultContainer>
  );
};
export default SearchResult;
