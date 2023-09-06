import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, styled, Button, Typography } from "@mui/material";
import { useKey } from "react-use";

import { HeaderSearchIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import InfoGraphicModal from "src/components/InfoGraphicModal";
import { useScreen } from "src/commons/hooks/useScreen";

const StakingLifeCycleSearch = () => {
  const history = useHistory();
  const { isMobile } = useScreen();
  const [openInfoModal, setOpenInfoModal] = useState(false);
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
  useKey("enter", hanldeSearch);

  useEffect(() => {
    document.title = "Welcome to Staking Lifecycle | Cardano Blockchain Explorer";
  }, []);

  return (
    <StyledContainer>
      <Title data-testid="staking-lifecycle-title">
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={isMobile ? "column" : "row"}
        >
          <Box fontSize={isMobile ? "32px" : "48px"} whiteSpace={"nowrap"}>
            Staking Lifecycle
          </Box>
        </Box>
      </Title>
      <SearchTitle>
        Search to explore the staking lifecycle events of a delegator or pool.
        <InfoLink onClick={() => setOpenInfoModal((pre) => !pre)}>What is staking on Cardano?</InfoLink>
      </SearchTitle>
      <Box>
        <SearchContainer mx={"auto"}>
          <StyledInput
            placeholder="Type a stake address or pool id"
            onChange={(e) => {
              setValue(e.target.value.trim());
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
        <Box color={({ palette }) => palette.error[700]}>{error}</Box>
      </Box>
      <InfoGraphicModal open={openInfoModal} onClose={() => setOpenInfoModal(false)} />
    </StyledContainer>
  );
};

export default StakingLifeCycleSearch;

export const WrapButton = styled(Button)`
  background: ${({ theme }) => theme.palette.secondary.main};
  padding: 12px 97px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: ${({ theme }) => theme.palette.common.white};
  margin-top: 16px;
`;

export const StyledContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingBottom: "50px"
  },
  [theme.breakpoints.down("sm")]: {
    padding: "37px 5px"
  }
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  maxWidth: "min(800px,80vw)",
  background: theme.palette.secondary[0],
  paddingLeft: 30,
  borderRadius: 100,
  marginBottom: 15,
  height: 58,
  border: `1.5px solid ${theme.palette.primary[200]}`,
  "&:focus-within": {
    borderColor: theme.palette.primary.main
  },
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
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubmitButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  border-radius: 50%;
  min-width: 60px;
  width: 60px;
  height: 60px;
`;
const Image = styled("img")`
  width: 20px;
  height: 20px;
`;

const Title = styled("h1")`
  text-align: center;
  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: 30px;
  }
`;

const SearchTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 700,
  margin: "30px 0px 20px 0px",
  color: theme.palette.secondary.main,
  [theme.breakpoints.down("md")]: {
    margin: "60px 0px 20px 0px",
    padding: "0px 60px"
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0px 0px 20px 0px",
    padding: "0px 5px"
  }
}));

const InfoLink = styled("span")`
  color: ${(props) => props.theme.palette.primary.main};
  text-decoration: underline;
  margin-left: 6px;
  cursor: pointer;
`;
