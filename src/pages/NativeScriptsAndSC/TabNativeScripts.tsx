import {
  Box,
  Button,
  ClickAwayListener,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Skeleton,
  useTheme
} from "@mui/material";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { omitBy } from "lodash";
import { BsFillCheckCircleFill } from "react-icons/bs";

import useFetchList from "src/commons/hooks/useFetchList";
import { getPageInfo } from "src/commons/utils/helper";
import { API } from "src/commons/utils/api";
import { FooterTable } from "src/components/commons/Table";
import CustomIcon from "src/components/commons/CustomIcon";
import { FilterIcon, MultiSig, ResetIcon, SortNative, TimeLock } from "src/commons/resources";
import NoRecord from "src/components/commons/NoRecord";

import { NativeScriptCard } from "./Card";
import {
  AccordionContainer,
  AccordionDetailsFilter,
  AccordionSummary,
  ApplyFilterButton,
  ButtonSort,
  FilterContainer
} from "./styles";

const TabNativeScripts = () => {
  const { search, pathname } = useLocation();
  const { tabActive } = useParams<{ tabActive: string }>();
  const history = useHistory();
  const theme = useTheme();
  const pageInfo = getPageInfo<{ isMultiSig?: string; openTimeLocked?: string }>(search);
  const optionList = [3, 6, 9, 12, 15];
  const [hasBeforeAndAfter, setHasBeforeAndAfter] = useState(false);
  const [showFilter, setShowFiter] = useState(false);
  const [searchQuery, setSearchQuery] = useState<{ openTimeLocked?: string; isMultiSig?: string; sort?: string }>();
  const [size, setSize] = useState(optionList.indexOf(pageInfo.size) + 1 ? pageInfo.size : 6);
  const [openTimeLocked, setOpenTimeLocked] = useState<string>(pageInfo?.openTimeLocked || "");
  const [isMultiSig, setIsMultiSig] = useState<string>(pageInfo?.isMultiSig || "");
  const [sort, setSort] = useState<string>(pageInfo.sort !== "" ? pageInfo.sort : "numberOfAssetHolders,DESC");

  const { data, ...fetchData } = useFetchList<NativeScriptsList>(
    tabActive === "native-scripts" ? API.SCRIPTS.NATIVE_SCRIPTS : "",
    {
      ...pageInfo,
      size,
      ...omitBy(searchQuery, (query) => !query),
      formatArrayComma: true
    }
  );

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Native Scripts & Smart Contracts | Cardano Blockchain Explorer`;
  }, []);

  useEffect(() => {
    if (data) {
      setHasBeforeAndAfter(data?.some((item) => item.before && item.after));
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (optionList.indexOf(pageInfo.size) + 1 && tabActive === "native-scripts") {
      setSize(pageInfo.size);
      setSort(pageInfo.sort !== "" ? pageInfo.sort : "numberOfAssetHolders,DESC");
      setIsMultiSig(pageInfo?.isMultiSig || "");
      setOpenTimeLocked(pageInfo?.openTimeLocked || "");
    } else {
      setSize(6);
    }
  }, [JSON.stringify(pageInfo), pathname]);

  const handleApplyFilter = () => {
    setShowFiter(false);
    setSearchQuery({
      openTimeLocked,
      isMultiSig,
      sort
    });
    history.replace({
      search: stringify({
        ...pageInfo,
        page: 1,
        sort,
        openTimeLocked,
        isMultiSig
      })
    });
  };

  const handleResetFilter = () => {
    setShowFiter(false);
    setSearchQuery({});
    setIsMultiSig("");
    setOpenTimeLocked("");
    setSort("numberOfAssetHolders,DESC");
    history.replace({ search: stringify({ size: 6, page: 1 }) });
  };

  const renderCard = () => {
    if (fetchData.loading) {
      return (
        <Box component={Grid} container spacing={2}>
          {[...new Array(size).fill(0)].map((_, idx) => (
            <Grid item width={"100%"} lg={4} md={6} sm={6} xs={12} key={idx}>
              <Box component={Skeleton} variant="rectangular" height={"280px"} borderRadius={2} />
            </Grid>
          ))}
        </Box>
      );
    }
    return (
      <Box component={Grid} container spacing={2}>
        {data && data.length === 0 && fetchData.initialized && <NoRecord padding={`0 !important`} />}
        {data?.map((item, idx) => (
          <Grid item width={"100%"} lg={4} md={6} sm={6} xs={12} key={idx}>
            <Box height={"100%"}>
              <NativeScriptCard key={idx} data={item} hasBeforeAndAfter={hasBeforeAndAfter} />
            </Box>
          </Grid>
        ))}
      </Box>
    );
  };

  return (
    <Box data-testid="TabNativeScripts">
      <ClickAwayListener
        onClickAway={() => {
          setShowFiter(false);
        }}
      >
        <Box position={"relative"} mb={2} textAlign={"right"}>
          <Box
            component={Button}
            variant="text"
            px={2}
            textTransform={"capitalize"}
            bgcolor={({ palette, mode }) => (mode === "dark" ? palette.secondary[100] : palette.primary[200])}
            border={({ palette, mode }) => `1px solid ${mode === "dark" ? "none" : palette.primary[200]}`}
            onClick={() => setShowFiter(!showFilter)}
            sx={{
              ":hover": {
                bgcolor: theme.mode === "dark" ? theme.palette.secondary[100] : theme.palette.primary[200]
              }
            }}
          >
            <CustomIcon
              icon={FilterIcon}
              fill={theme.mode === "dark" ? theme.palette.primary.main : theme.palette.secondary.light}
              height={18}
            />
            <Box
              ml={1}
              whiteSpace={"nowrap"}
              fontWeight={"bold"}
              color={({ palette, mode }) => (mode === "dark" ? palette.primary.main : palette.secondary.light)}
            >
              {t("common.filter")}
            </Box>
          </Box>
          {showFilter && (
            <FilterComponent
              handleApplyFilter={handleApplyFilter}
              handleResetFilter={handleResetFilter}
              openTimeLocked={openTimeLocked}
              setOpenTimeLocked={setOpenTimeLocked}
              isMultiSig={isMultiSig}
              setIsMultiSig={setIsMultiSig}
              setSort={setSort}
              sort={sort}
            />
          )}
        </Box>
      </ClickAwayListener>
      {renderCard()}
      <FooterTable
        pagination={{
          ...pageInfo,
          size,
          total: fetchData.total || 0,
          onChange: (page, size) => {
            history.replace({ search: stringify({ ...pageInfo, page, size }) });
          }
        }}
        total={{ count: fetchData.total || 0, title: "" }}
        loading={fetchData.loading}
        optionList={optionList}
      />
    </Box>
  );
};

export default TabNativeScripts;

interface FilterComponentProps {
  handleResetFilter: () => void;
  handleApplyFilter: () => void;
  openTimeLocked: string;
  setOpenTimeLocked: (value: string) => void;
  isMultiSig: string;
  setIsMultiSig: (value: string) => void;
  setSort: (value: string) => void;
  sort: string;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  handleResetFilter,
  handleApplyFilter,
  isMultiSig,
  openTimeLocked,
  setIsMultiSig,
  setOpenTimeLocked,
  setSort,
  sort
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | false>("");

  const handleChooseTimeLoked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenTimeLocked((event.target as HTMLInputElement).value || "");
  };
  const handleChooseMultiSig = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsMultiSig((event.target as HTMLInputElement).value || "");
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <FilterContainer padding={2}>
      <Box display={"flex"} flexDirection={"column"}>
        <AccordionContainer expanded={expanded === "time-locked"} onChange={handleChange("time-locked")}>
          <AccordionSummary>
            <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Box display={"flex"} alignItems={"center"}>
                <TimeLock fill={theme.palette.secondary.main} />
                <Box ml={1} color={({ palette }) => palette.secondary.main}>
                  {t("nativeScript.timeLocked")}
                </Box>
              </Box>
              <Box>
                {expanded === "time-locked" ? (
                  <IoIosArrowUp color={theme.palette.secondary.main} />
                ) : (
                  <IoIosArrowDown color={theme.palette.secondary.main} />
                )}
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetailsFilter>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={openTimeLocked}
              onChange={handleChooseTimeLoked}
            >
              <FormControlLabel
                value=""
                control={
                  <Radio
                    sx={{
                      color: theme.palette.secondary.light
                    }}
                  />
                }
                label={<Box lineHeight={1}>{t("smartContract.any")}</Box>}
              />
              <FormControlLabel
                value={true}
                control={
                  <Radio
                    sx={{
                      color: theme.palette.secondary.light
                    }}
                  />
                }
                label={<Box lineHeight={1}>{t("nativeScript.filter.timelocked.open")}</Box>}
              />
              <FormControlLabel
                value={false}
                control={
                  <Radio
                    sx={{
                      color: theme.palette.secondary.light
                    }}
                  />
                }
                label={<Box lineHeight={1}>{t("nativeScript.filter.timelocked.locked")}</Box>}
              />
            </RadioGroup>
          </AccordionDetailsFilter>
        </AccordionContainer>
        <AccordionContainer
          sx={{
            "::before": {
              backgroundColor: "transparent"
            }
          }}
          expanded={expanded === "multi-sig"}
          onChange={handleChange("multi-sig")}
        >
          <AccordionSummary>
            <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Box display={"flex"} alignItems={"center"}>
                <MultiSig fill={theme.palette.secondary.main} />
                <Box ml={1} color={({ palette }) => palette.secondary.main}>
                  Multi-Sig
                </Box>
              </Box>
              <Box>
                {expanded === "multi-sig" ? (
                  <IoIosArrowUp color={theme.palette.secondary.main} />
                ) : (
                  <IoIosArrowDown color={theme.palette.secondary.main} />
                )}
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetailsFilter>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={isMultiSig}
              onChange={handleChooseMultiSig}
            >
              <FormControlLabel
                value=""
                control={
                  <Radio
                    sx={{
                      color: theme.palette.secondary.light
                    }}
                  />
                }
                label={<Box lineHeight={1}>{t("smartContract.any")}</Box>}
              />
              <FormControlLabel
                value={true}
                control={
                  <Radio
                    sx={{
                      color: theme.palette.secondary.light
                    }}
                  />
                }
                label={<Box lineHeight={1}>{t("nativeScript.filter.multiSig.yes")}</Box>}
              />
              <FormControlLabel
                value={false}
                control={
                  <Radio
                    sx={{
                      color: theme.palette.secondary.light
                    }}
                  />
                }
                label={<Box lineHeight={1}>{t("nativeScript.filter.multiSig.no")}</Box>}
              />
            </RadioGroup>
          </AccordionDetailsFilter>
        </AccordionContainer>
        <Box component={ButtonSort} onClick={() => setSort("numberOfTokens,DESC")}>
          <Box display={"flex"} alignItems={"center"}>
            <SortNative fill={theme.palette.secondary.main} />
            <Box ml={1}>{t("NumberOfTokens")}</Box>
          </Box>
          {sort.includes("numberOfTokens") && <BsFillCheckCircleFill size={14} color={theme.palette.primary.main} />}
        </Box>
        <Box component={ButtonSort} onClick={() => setSort("numberOfAssetHolders,DESC")}>
          <Box display={"flex"} alignItems={"center"}>
            <SortNative fill={theme.palette.secondary.main} />
            <Box ml={1}>{t("NumberOfAssetHolders")}</Box>
          </Box>
          {sort.includes("numberOfAssetHolders") && (
            <BsFillCheckCircleFill size={14} color={theme.palette.primary.main} />
          )}
        </Box>

        <Box mt={1}>
          <ApplyFilterButton
            data-testid="apply-filters"
            onClick={handleApplyFilter}
            disabled={!isMultiSig && !sort && !openTimeLocked}
          >
            {t("common.applyFilters")}
          </ApplyFilterButton>
        </Box>
        <Box
          component={Button}
          width={"100%"}
          textTransform={"capitalize"}
          onClick={handleResetFilter}
          display={"flex"}
          alignItems={"center"}
          mt={1}
          fontSize={16}
          color={({ palette }) => `${palette.primary.main} !important`}
        >
          <Box mr={1}>{t("common.reset")}</Box>
          <CustomIcon icon={ResetIcon} height={16} fill={theme.palette.primary.main} />
        </Box>
      </Box>
    </FilterContainer>
  );
};
