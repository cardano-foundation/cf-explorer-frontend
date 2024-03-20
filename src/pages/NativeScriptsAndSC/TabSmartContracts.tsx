import {
  Box,
  Button,
  Checkbox,
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
import { useList } from "react-use";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { omitBy } from "lodash";

import useFetchList from "src/commons/hooks/useFetchList";
import { getPageInfo } from "src/commons/utils/helper";
import { API } from "src/commons/utils/api";
import { FooterTable } from "src/components/commons/Table";
import CustomIcon from "src/components/commons/CustomIcon";
import { CubeIcon, FilterIcon, FilterVersionIcon, ResetIcon } from "src/commons/resources";
import NoRecord from "src/components/commons/NoRecord";

import { SmartContractCard } from "./Card";
import {
  AccordionContainer,
  AccordionDetailsFilter,
  AccordionSummary,
  ApplyFilterButton,
  FilterContainer
} from "./styles";
import { StyledDropdownItem } from "../ProtocolParameter/styles";

const TRX_PURPOSE = ["SPEND", "MINT", "CERT", "REWARD", "NO_TX_PURPOSE", "PROPOSE", "VOTE"];

const TabSmartContracts = () => {
  const { search, pathname } = useLocation();
  const history = useHistory();
  const theme = useTheme();
  const pageInfo = getPageInfo<{ scriptVersion?: string; txPurpose?: string }>(search);
  const { tabActive } = useParams<{ tabActive: string }>();
  const optionList = [3, 6, 9, 12, 15];
  const [filterOption, { push: pushFilterOption, removeAt: removeAtFilterOption, clear }] = useList<string>(
    (pageInfo.txPurpose || "").split(",").length === 0 ||
      ((pageInfo.txPurpose || "").split(",").length === 1 && (pageInfo.txPurpose || "").split(",")[0] === "")
      ? TRX_PURPOSE
      : (pageInfo.txPurpose || "").split(",")
  );

  const [showFilter, setShowFiter] = useState(false);
  const [searchQuery, setSearchQuery] = useState<{ scriptVersion?: string; txPurpose?: string[] }>();
  const [scriptVersion, setScriptVersion] = useState("");
  const [size, setSize] = useState(optionList.indexOf(pageInfo.size) + 1 ? pageInfo.size : 6);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Native Scripts & Smart Contracts | Cardano Blockchain Explorer`;
  }, []);

  useEffect(() => {
    if (optionList.indexOf(pageInfo.size) + 1 && tabActive === "smart-contracts") {
      setSize(pageInfo.size);
    } else {
      setSize(6);
    }
    setScriptVersion(pageInfo.scriptVersion || "");
    clear();
    pushFilterOption(
      ...((pageInfo.txPurpose || "").split(",").length === 0 ||
      ((pageInfo.txPurpose || "").split(",").length === 1 && (pageInfo.txPurpose || "").split(",")[0] === "")
        ? TRX_PURPOSE
        : (pageInfo.txPurpose || "").split(","))
    );
  }, [JSON.stringify(pageInfo), pathname]);

  const handleApplyFilter = () => {
    setShowFiter(false);
    setSearchQuery({ scriptVersion, txPurpose: filterOption });
    history.replace({ search: stringify({ ...pageInfo, page: 1, scriptVersion, txPurpose: filterOption.join(",") }) });
  };
  const handleResetFilter = () => {
    setShowFiter(false);
    setSearchQuery({});
    setScriptVersion("");
    clear();
    history.replace({ search: stringify({ size: 6, page: 1 }) });
  };

  const fetchData = useFetchList<ScriptSmartContracts>(
    tabActive === "smart-contracts" ? API.SCRIPTS.SMART_CONTRACTS : "",
    {
      ...pageInfo,
      size,
      ...omitBy(searchQuery, (query) => !query),
      formatArrayComma: true
    }
  );

  const renderCard = () => {
    if (fetchData.loading) {
      return (
        <Box component={Grid} container spacing={2}>
          {[...new Array(size)].map((_, idx) => (
            <Grid item width={"100%"} lg={4} md={6} sm={6} xs={12} key={idx}>
              <Box component={Skeleton} variant="rectangular" height={"145px"} borderRadius={2} />
            </Grid>
          ))}
        </Box>
      );
    }
    return (
      <Box component={Grid} container spacing={2}>
        {fetchData.data && fetchData.data.length === 0 && fetchData.initialized && (
          <NoRecord padding={`0 !important`} />
        )}
        {fetchData.data?.map((item, idx) => (
          <Grid item width={"100%"} lg={4} md={6} sm={6} xs={12} key={idx}>
            <Box height={"100%"}>
              <SmartContractCard data={item} />
            </Box>
          </Grid>
        ))}
      </Box>
    );
  };

  return (
    <Box data-testid="TabSmartContracts">
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
              setVersion={setScriptVersion}
              clear={clear}
              version={scriptVersion}
              handleResetFilter={handleResetFilter}
              filterOption={filterOption}
              pushFilterOption={pushFilterOption}
              removeAtFilterOption={removeAtFilterOption}
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

export default TabSmartContracts;

interface FilterComponentProps {
  handleResetFilter: () => void;
  setVersion: (version: string) => void;
  handleApplyFilter: () => void;
  version: string;
  filterOption: string[];
  pushFilterOption: (filterOption: string) => void;
  removeAtFilterOption: (index: number) => void;
  clear: () => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  handleResetFilter,
  setVersion,
  version,
  handleApplyFilter,
  filterOption,
  removeAtFilterOption,
  clear,
  pushFilterOption
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | false>("");
  const transactionPurpose = TRX_PURPOSE;
  const transactionPurposeI18n: Record<string, string> = {
    ANY: t("smartContract.selectAll"),
    SPEND: t("smartContract.spend"),
    MINT: t("smartContract.mint"),
    REWARD: t("smartContract.reward"),
    CERT: t("smartContract.cert"),
    NO_TX_PURPOSE: t("smartContract.noTransactionPurpose"),
    VOTE: t("smartContract.voting"),
    PROPOSE: t("smartContract.proposing")
  };
  const handleChooseVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVersion((event.target as HTMLInputElement).value);
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <FilterContainer padding={2}>
      <Box display={"flex"} flexDirection={"column"}>
        <AccordionContainer expanded={expanded === "version"} onChange={handleChange("version")}>
          <AccordionSummary>
            <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Box display={"flex"} alignItems={"center"}>
                <FilterVersionIcon fill={theme.palette.secondary.main} />
                <Box ml={1} color={({ palette }) => palette.secondary.main}>
                  {t("common.version")}
                </Box>
              </Box>
              <Box>
                {expanded === "version" ? (
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
              value={version}
              onChange={handleChooseVersion}
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
                value="PLUTUSV1"
                control={
                  <Radio
                    sx={{
                      color: theme.palette.secondary.light
                    }}
                  />
                }
                label={<Box lineHeight={1}>{t("smartContract.plutusv1")}</Box>}
              />
              <FormControlLabel
                value="PLUTUSV2"
                control={
                  <Radio
                    sx={{
                      color: theme.palette.secondary.light
                    }}
                  />
                }
                label={<Box lineHeight={1}>{t("smartContract.plutusv2")}</Box>}
              />
              <FormControlLabel
                value="PLUTUSV3"
                control={
                  <Radio
                    sx={{
                      color: theme.palette.secondary.light
                    }}
                  />
                }
                label={<Box lineHeight={1}>{t("smartContract.plutusv3")}</Box>}
              />
            </RadioGroup>
          </AccordionDetailsFilter>
        </AccordionContainer>

        <AccordionContainer
          expanded={expanded === "trxPurpose"}
          onChange={handleChange("trxPurpose")}
          sx={{
            "::before": {
              backgroundColor: "transparent"
            }
          }}
        >
          <AccordionSummary>
            <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
              <Box display={"flex"} alignItems={"center"}>
                <CubeIcon width={20} fill={theme.palette.secondary.main} />
                <Box ml={1} color={({ palette }) => palette.secondary.main}>
                  {t("smartContract.trxPurpose")}
                </Box>
              </Box>
              <Box>
                {expanded === "trxPurpose" ? (
                  <IoIosArrowUp color={theme.palette.secondary.main} />
                ) : (
                  <IoIosArrowDown color={theme.palette.secondary.main} />
                )}
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetailsFilter>
            <Box display={"flex"} alignItems={"center"}>
              <Checkbox
                id={"ANY"}
                checked={filterOption.length === transactionPurpose.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    transactionPurpose.forEach((purpose) => {
                      if (!filterOption.includes(purpose)) {
                        pushFilterOption(purpose);
                      }
                    });
                  } else {
                    clear();
                  }
                }}
                sx={{
                  color: theme.palette.secondary.light,
                  "&.Mui-checked": {
                    color: `${theme.palette.primary.main} !important`
                  }
                }}
              />
              <StyledDropdownItem htmlFor={"ANY"} style={{ cursor: "pointer" }}>
                {transactionPurposeI18n["ANY"]}
              </StyledDropdownItem>
            </Box>
            {transactionPurpose.map((purpose: string, idx) => (
              <Box key={idx} display={"flex"} alignItems={"center"}>
                <Checkbox
                  id={purpose}
                  checked={filterOption.includes(purpose)}
                  onChange={(e) => {
                    if (e.target.checked && !filterOption.includes(purpose)) {
                      pushFilterOption(purpose);
                    } else if (!e.target.checked && filterOption.includes(purpose)) {
                      removeAtFilterOption(filterOption.findIndex((f) => f === purpose));
                    }
                  }}
                  sx={{
                    color: theme.palette.secondary.light,
                    "&.Mui-checked": {
                      color: `${theme.palette.primary.main} !important`
                    }
                  }}
                />{" "}
                <StyledDropdownItem htmlFor={purpose ? purpose : "any"} style={{ cursor: "pointer" }}>
                  {transactionPurposeI18n[purpose]}
                </StyledDropdownItem>
              </Box>
            ))}
          </AccordionDetailsFilter>
        </AccordionContainer>

        <Box mt={1}>
          <ApplyFilterButton
            data-testid="apply-filters"
            onClick={handleApplyFilter}
            disabled={!version && filterOption.length === 0}
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
