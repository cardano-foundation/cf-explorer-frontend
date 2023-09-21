import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import { useKey } from "react-use";
import { useTranslation } from "react-i18next";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useTheme } from "@emotion/react";

import { HeaderSearchIcon, WhiteSearchIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import InfoGraphicModal from "src/components/InfoGraphicModal";
import { useScreen } from "src/commons/hooks/useScreen";
import { getRandomInt } from "src/commons/utils/helper";
import { API } from "src/commons/utils/api";
import useFetchList from "src/commons/hooks/useFetchList";

import DropdownMenu from "../commons/DropdownMenu";
import {
  StyledContainer,
  Title,
  SearchTitle,
  SearchContainer,
  StyledInput,
  SubmitButton,
  Image,
  SearchButton,
  TextOR,
  ExampleBox,
  StyledIconQuestion
} from "./styles";

enum BROWSE_VALUES {
  DELEGATOR = "DELEGATOR",
  STAKE_POOL = "STAKE_POOL"
}

const StakingLifeCycleSearch = () => {
  const { t } = useTranslation();
  const { data: delegators } = useFetchList<Delegator>(API.STAKE.TOP_DELEGATOR, { page: 0, size: 25 });
  const { data: pools } = useFetchList<Delegators>(API.DELEGATION.POOL_LIST, {
    page: 0,
    size: 25,
    sort: "",
    search: ""
  });

  const history = useHistory();
  const { isMobile } = useScreen();
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const themes = useTheme();

  const BROWSER_OPTIONS = [
    {
      label: t("dropdown.browseDelegator"),
      value: BROWSE_VALUES.DELEGATOR
    },
    {
      label: t("dropdown.stakePool"),
      value: BROWSE_VALUES.STAKE_POOL
    }
  ];

  const hanldeSearch = () => {
    if (!value) {
      setError(t("message.noResultsFound"));
    }
    if (value.startsWith("stake")) {
      history.push(details.staking(value, "timeline"));
    } else if (value.startsWith("pool")) {
      history.push(details.spo(value, "timeline"));
    } else setError(t("message.noResultsFound"));
  };
  useKey("enter", hanldeSearch);

  useEffect(() => {
    document.title = `${t("common.welcomeStakingLifecycle")} | ${t("head.page.dashboard")}`;
  }, [t]);

  const handleSelect = (value: string) => {
    if (value === BROWSE_VALUES.DELEGATOR) {
      const listStakeAddress = delegators.map(({ stakeKey }) => stakeKey);
      const rndIndex = getRandomInt(listStakeAddress.length);
      history.push(details.staking(listStakeAddress[rndIndex]));
    } else {
      const listPools = pools.map(({ poolId }) => poolId);
      const rndIndex = getRandomInt(listPools.length);
      history.push(details.spo(listPools[rndIndex]));
    }
  };

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
            {t("glossary.stakingLifecycle")}
          </Box>
        </Box>
      </Title>
      <SearchTitle>
        {t("common.searchPoolDesc")}
        <StyledIconQuestion>
          <AiOutlineQuestionCircle
            onClick={() => setOpenInfoModal((pre) => !pre)}
            color={themes.palette.primary.main}
            size={20}
          />
        </StyledIconQuestion>
      </SearchTitle>
      <Box>
        <SearchContainer mx={"auto"}>
          <StyledInput
            placeholder={t("slc.typeStakeOrPool")}
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
        <Box color={({ palette }) => palette.error[700]} sx={{ marginBottom: "20px" }}>
          {error}
        </Box>
      </Box>
      <InfoGraphicModal open={openInfoModal} onClose={() => setOpenInfoModal(false)} />
      <ExampleBox bgcolor={"blue"}>
        <SearchButton onClick={hanldeSearch}>
          <Image src={WhiteSearchIcon} alt="Search button" /> {t("common.search")}
        </SearchButton>
        <TextOR>{t("common.or")}</TextOR>
        <DropdownMenu options={BROWSER_OPTIONS} title="Browse" handleSelect={handleSelect} />
      </ExampleBox>
    </StyledContainer>
  );
};

export default StakingLifeCycleSearch;
