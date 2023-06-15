import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, styled, Button } from "@mui/material";

import { HeaderSearchIcon } from "src/commons/resources";
import { ReactComponent as Search } from "src/commons/resources/icons/Staking/Search.svg";
import { details } from "src/commons/routers";

const StakingLifeCycleSearch = () => {
  const history = useHistory();

  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const hanldeSearch = () => {
    if (!value) {
      setError("No results found");
    }
    if (value.startsWith("stake")) {
      history.push(details.staking(value, "timeline"));
    } else if (value.startsWith("pool")) {
      history.push(details.spo(value, "timeline"));
    } else setError("No results found");
  };

  useEffect(() => {
    document.title = "Welcome to Staking Lifecycle | Cardano Explorer";
  }, []);

  return (
    <StyledContainer>
      <h2>Welcome to Staking Lifecycle </h2>
      <Box>
        <Search />
      </Box>
      <Box>
        <SearchContainer mx={"auto"}>
          <StyledInput
            placeholder="Search Stake key, Pools"
            onChange={(e) => {
              setValue(e.target.value);
              setError("");
            }}
            value={value}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                hanldeSearch();
              }
            }}
          />
          <SubmitButton onClick={hanldeSearch}>
            <Image src={HeaderSearchIcon} alt="Search" />
          </SubmitButton>
        </SearchContainer>
        <Box color={({ palette }) => palette.red[700]}>{error}</Box>
      </Box>
    </StyledContainer>
  );
};

export default StakingLifeCycleSearch;

export const WrapButton = styled(Button)`
  background: ${({ theme }) => theme.palette.grey[700]};
  padding: 12px 97px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #fff;
  margin-top: 16px;
`;

export const StyledContainer = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 200px)",
  [theme.breakpoints.down("md")]: {
    paddingBottom: "50px"
  },
  [theme.breakpoints.down("sm")]: {
    padding: "37px 58px",
    marginBottom: "111px"
  }
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  width: "100%",
  maxWidth: "min(600px,80vw)",
  background: theme.palette.background.paper,
  padding: "0 12px",
  borderRadius: 8,
  marginBottom: 15,
  height: 50,
  [theme.breakpoints.down("sm")]: {
    width: "unset",
    maxWidth: "unset"
  }
}));

const StyledInput = styled("input")`
  border: none;
  width: 100%;
  font-size: var(--font-size-text-small);
  border-radius: 8px;
`;

const SubmitButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: 12.5%;
  min-width: 35px;
  width: 35px;
  height: 35px;
`;
const Image = styled("img")`
  width: 20px;
  height: 20px;
`;
