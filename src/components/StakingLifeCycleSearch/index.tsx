import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { useKey } from "react-use";
import { useTranslation } from "react-i18next";

import { HeaderSearchIconComponent, WhiteSearchIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import InfoGraphicModal from "src/components/InfoGraphicModal";
import { useScreen } from "src/commons/hooks/useScreen";
import { getRandomInt } from "src/commons/utils/helper";
import { API } from "src/commons/utils/api";
import useFetchList from "src/commons/hooks/useFetchList";
import { NETWORK, NETWORKS } from "src/commons/utils/constants";
import dataMainnet from "src/commons/configs/mainnet.json";
import defaultAxios from "src/commons/utils/axios";

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
// eslint-disable-next-line import/order
import DropdownMenu from "../commons/DropdownMenu";

const LIMIT_SIZE = 25;

enum BROWSE_VALUES {
  DELEGATOR = "DELEGATOR",
  STAKE_POOL = "STAKE_POOL"
}

import CustomIcon from "../commons/CustomIcon";

const isMainnet = NETWORK === NETWORKS.mainnet;

const StakingLifeCycleSearch = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { data: delegators, initialized: delegatorsInitialzzed } = useFetchList<Delegator>(
    isMainnet ? "" : API.STAKE.TOP_DELEGATOR,
    {
      page: 0,
      size: LIMIT_SIZE
    }
  );
  const { data: pools, initialized: poolsInitialzzed } = useFetchList<Delegators>(
    isMainnet ? "" : API.DELEGATION.POOL_LIST,
    {
      page: 0,
      size: LIMIT_SIZE,
      sort: "",
      search: ""
    }
  );

  const history = useHistory();
  const { isMobile } = useScreen();
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const themes = useTheme();

  const BROWSER_OPTIONS = [
    {
      label: t("dropdown.browseDelegator"),
      value: BROWSE_VALUES.DELEGATOR,
      disabled: isMainnet ? false : !delegatorsInitialzzed
    },
    {
      label: t("dropdown.stakePool"),
      value: BROWSE_VALUES.STAKE_POOL,
      disabled: isMainnet ? false : !poolsInitialzzed
    }
  ];

  const handleSearchPool = async (query: string) => {
    try {
      const { data } = await defaultAxios.get(`${API.SPO_LIFECYCLE.TABS(query)}`);
      if (data) {
        history.push(details.spo(query, "timeline"));
      } else {
        setError(t("message.noResultsFound"));
      }
    } catch {
      setError(t("message.noResultsFound"));
    }
  };

  const handleSearchStakeAddress = async (query: string) => {
    try {
      const { data } = await defaultAxios.get(`${API.STAKE_LIFECYCLE.TABS(query)}`);
      if (data) {
        history.push(details.staking(query, "timeline"));
      } else {
        setError(t("message.noResultsFound"));
      }
    } catch {
      setError(t("message.noResultsFound"));
    }
  };

  const hanldeSearch = async () => {
    if (!value) {
      setError(t("message.noResultsFound"));
      return;
    }
    if (value?.toLowerCase().startsWith("stake")) {
      handleSearchStakeAddress(value);
    } else {
      handleSearchPool(value);
    }
  };
  useKey("enter", hanldeSearch);

  useEffect(() => {
    document.title = `${t("common.welcomeStakingLifecycle")} | ${t("head.page.dashboard")}`;
  }, [t]);

  const handleSelect = (value: string) => {
    if (value === BROWSE_VALUES.DELEGATOR) {
      const listStakeAddress = isMainnet ? dataMainnet.stakeAddresses : delegators.map(({ stakeKey }) => stakeKey);
      const rndIndex = getRandomInt(listStakeAddress.length);
      history.push(details.staking(listStakeAddress[rndIndex]));
    } else {
      const listPools = isMainnet ? dataMainnet.poolIds : pools.map(({ poolId }) => poolId);
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
        <StyledIconQuestion
          onClick={() => setOpenInfoModal((pre) => !pre)}
          color={themes.palette.primary.main}
          size={20}
        />
      </SearchTitle>
      <Box>
        <SearchContainer mx={"auto"}>
          <StyledInput
            type="search"
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
            <CustomIcon
              icon={HeaderSearchIconComponent}
              stroke={theme.palette.secondary.light}
              fill={theme.palette.secondary[0]}
              height={22}
            />
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
