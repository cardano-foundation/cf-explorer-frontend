import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, CircularProgress, useTheme, Backdrop } from "@mui/material";
import { useKey } from "react-use";
import axios from "axios";
import { GoChevronRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

import { HeaderSearchIconComponent, WhiteSearchIconComponent } from "src/commons/resources";
import { details } from "src/commons/routers";
import InfoGraphicModal from "src/components/InfoGraphicModal";
import { useScreen } from "src/commons/hooks/useScreen";
import { getRandomInt, getShortHash } from "src/commons/utils/helper";
import { API } from "src/commons/utils/api";
import useFetchList from "src/commons/hooks/useFetchList";
import { API_ADA_HANDLE_API, NETWORK, NETWORKS } from "src/commons/utils/constants";
import dataMainnet from "src/commons/configs/mainnet.json";
import dataSanchonet from "src/commons/configs/sanchonet.json";
import useFetch from "src/commons/hooks/useFetch";

import {
  StyledContainer,
  Title,
  SearchTitle,
  SearchContainer,
  StyledInput,
  SubmitButton,
  SearchButton,
  TextOR,
  ExampleBox,
  StyledIconQuestion,
  OptionsWrapper,
  Option,
  ValueOption
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
const isSanchonet = NETWORK === NETWORKS.sanchonet;

interface SearchIF {
  address: {
    address: string;
    stakeAddressView: string;
    paymentAddress: boolean;
    stakeAddress: boolean;
  };
  poolList: {
    data: {
      name: string;
      poolId: string;
      icon: string;
    }[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    isDataOverSize: boolean;
  };
  validPoolName: boolean;
}

const StakingLifeCycleSearch = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [page] = useState(0);
  const [ADAHanlde, setADAHanlde] = useState<{
    paymentAddress: string;
    stakeAddress: string;
  } | null>(null);
  const [loadingADAHanlde, setLoadingADAHanlde] = useState(false);
  const [showSuggestOption, setShowSuggestOption] = useState(false);
  const [showNoRecord, setShowNoRecord] = useState(false);

  const history = useHistory();
  const { isMobile } = useScreen();
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [value, setValue] = useState<string>("");
  const [valueSearch, setValueSearch] = useState<string>("");
  const themes = useTheme();

  const { data: delegators, initialized: delegatorsInitialzed } = useFetchList<Delegator>(
    isMainnet ? "" : API.STAKE.TOP_DELEGATOR,
    {
      page: 0,
      size: LIMIT_SIZE
    }
  );

  const { data: pools, initialized: poolsInitialzed } = useFetchList<Delegators>(
    isMainnet ? "" : API.DELEGATION.POOL_LIST,
    {
      page: 0,
      size: LIMIT_SIZE,
      sort: "",
      search: ""
    }
  );

  const {
    data: searchResult,
    loading,
    update: setSearchResult,
    initialized: searchResultInitialized
  } = useFetch<SearchIF>(
    valueSearch ? `${API.STAKE_LIFECYCLE.SEARCH}?page=${page}&size=8&query=${encodeURIComponent(valueSearch)}` : ""
  );

  useEffect(() => {
    document.title = `${t("common.welcomeStakingLifecycle")} | ${t("head.page.dashboard")}`;
  }, [t]);

  useEffect(() => {
    if (!loadingADAHanlde && !loading && searchResultInitialized) {
      if (searchResult?.poolList?.data && (searchResult?.poolList?.data || []).length > 1) {
        setShowSuggestOption(true);
        return;
      }
      if (searchResult?.poolList?.data && (searchResult?.poolList.data || []).length > 0 && ADAHanlde?.stakeAddress) {
        setShowSuggestOption(true);
        return;
      }

      if (
        searchResult?.poolList?.data &&
        (searchResult?.poolList.data || []).length === 1 &&
        !ADAHanlde?.stakeAddress
      ) {
        history.push(details.spo(searchResult?.poolList?.data[0].poolId));
        return;
      }

      if (searchResult?.poolList?.data && (searchResult?.poolList.data || []).length === 0 && ADAHanlde?.stakeAddress) {
        history.push(details.staking(ADAHanlde?.stakeAddress));
        return;
      }

      if (searchResult?.address && searchResult.address?.stakeAddressView) {
        history.push(details.staking(searchResult?.address.stakeAddressView));
        return;
      }
      if (
        ADAHanlde === null &&
        searchResult?.address === null &&
        searchResult.poolList.data.length === 0 &&
        searchResult !== null
      ) {
        setShowNoRecord(true);
        return;
      }
    } else {
      setShowSuggestOption(false);
    }
  }, [searchResult, ADAHanlde, loadingADAHanlde, loading]);

  const adaHandleSearch = async (query: string) => {
    try {
      setLoadingADAHanlde(true);
      return await axios.get(API_ADA_HANDLE_API + API.ADAHandle(query)).then((data) => data.data);
    } catch (error) {
      return {};
    } finally {
      setLoadingADAHanlde(false);
    }
  };

  const BROWSER_OPTIONS = [
    {
      label: t("dropdown.browseDelegator"),
      value: BROWSE_VALUES.DELEGATOR,
      disabled: isMainnet ? false : !delegatorsInitialzed
    },
    {
      label: t("dropdown.stakePool"),
      value: BROWSE_VALUES.STAKE_POOL,
      disabled: isMainnet ? false : !poolsInitialzed
    }
  ];

  const hanldeSearch = async () => {
    if (!value) return;
    setValueSearch(value);
    const data = await adaHandleSearch(value);
    if (data.stakeAddress) {
      setADAHanlde(data);
    }
  };
  useKey("enter", hanldeSearch);

  const handleSelect = (value: string) => {
    if (value === BROWSE_VALUES.DELEGATOR) {
      const listStakeAddress = isMainnet
        ? dataMainnet.stakeAddresses
        : isSanchonet
        ? dataSanchonet.stakeAddresses
        : delegators.map(({ stakeKey }) => stakeKey);

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
        <SearchContainer mx={"auto"} position={"relative"}>
          <Backdrop
            sx={{ backgroundColor: "unset" }}
            open={showSuggestOption}
            onClick={() => {
              setShowNoRecord(false);
              setShowSuggestOption(false);
            }}
          />
          <StyledInput
            type="search"
            placeholder={t("slc.typeStakeOrPool")}
            onChange={(e) => {
              setValue(e.target.value);
              setShowSuggestOption(false);
              setShowNoRecord(false);
              setSearchResult(null);
            }}
            value={value}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                hanldeSearch();
              }
            }}
          />
          <SubmitButton onClick={hanldeSearch}>
            {loading || loadingADAHanlde ? (
              <CircularProgress size={22} />
            ) : (
              <CustomIcon
                icon={HeaderSearchIconComponent}
                stroke={theme.palette.secondary.light}
                fill={theme.palette.secondary[0]}
                height={22}
              />
            )}
          </SubmitButton>
          {(showSuggestOption || showNoRecord) && (
            <>
              <OptionsSearch
                value={valueSearch}
                ADAHandleOption={ADAHanlde}
                showNoRecord={showNoRecord}
                listOptions={searchResult?.poolList?.data || []}
              />
            </>
          )}
        </SearchContainer>
      </Box>
      <InfoGraphicModal open={openInfoModal} onClose={() => setOpenInfoModal(false)} />
      <ExampleBox bgcolor={"blue"}>
        <SearchButton onClick={hanldeSearch}>
          <CustomIcon
            icon={WhiteSearchIconComponent}
            fill={theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[0]}
            height={20}
            width={20}
          />
          {t("common.search")}
        </SearchButton>
        <TextOR>{t("common.or")}</TextOR>
        <DropdownMenu options={BROWSER_OPTIONS} title="Browse" handleSelect={handleSelect} />
      </ExampleBox>
    </StyledContainer>
  );
};

export default StakingLifeCycleSearch;

interface OptionProps {
  value: string;
  ADAHandleOption?: {
    stakeAddress: string;
    paymentAddress: string;
  } | null;
  listOptions: SearchIF["poolList"]["data"];
  showNoRecord: boolean;
}
export const OptionsSearch = ({ value, ADAHandleOption, listOptions, showNoRecord }: OptionProps) => {
  const history = useHistory();

  return (
    <OptionsWrapper display={"block"}>
      <>
        {(listOptions || []).map((item, i: number) => {
          return (
            <Option
              key={i}
              onClick={() => {
                history.push(`${details.spo(item.poolId)}`);
              }}
              data-testid="option-search-epoch"
            >
              <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                Search {""}
                <ValueOption sx={{ display: "inline-flex", alignItems: "center", mx: 0.5, gap: 0.5 }}>
                  {item.icon && <Box component={"img"} height={"25px"} width={"25px"} src={item.icon} alt="poolicon" />}
                  {getShortHash(item.name || "")}
                </ValueOption>{" "}
                in Pools
              </Box>
              <GoChevronRight />
            </Option>
          );
        })}

        {ADAHandleOption && (
          <Option
            key="ADAHandleOption"
            data-testid="option-search-epoch"
            onClick={() => {
              if (ADAHandleOption?.stakeAddress) {
                history.push(`${details.staking(ADAHandleOption?.stakeAddress)}`);
              }
            }}
          >
            <Box textAlign={"left"} data-testid="option-ada-hanlde">
              Search {""} <ValueOption>{value.length > 15 ? getShortHash(value) : value || ""}</ValueOption> in ADA
              handle
            </Box>
            <GoChevronRight />
          </Option>
        )}
      </>
      {showNoRecord && (
        <Box component={Option} color={({ palette }) => palette.error[700]} justifyContent={"center"}>
          <Box>{t("glossary.noRecordsFound")}</Box>
        </Box>
      )}
    </OptionsWrapper>
  );
};
