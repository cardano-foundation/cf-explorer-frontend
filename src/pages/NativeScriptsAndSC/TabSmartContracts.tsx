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
import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { t } from "i18next";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { omitBy } from "lodash";

import useFetchList from "src/commons/hooks/useFetchList";
import { getPageInfo } from "src/commons/utils/helper";
import { API } from "src/commons/utils/api";
import { FooterTable } from "src/components/commons/Table";
import CustomIcon from "src/components/commons/CustomIcon";
import { CubeIcon, FilterIcon, FilterVersionIcon, ResetIcon } from "src/commons/resources";

import { SmartContractCard } from "./Card";
import {
  AccordionContainer,
  AccordionDetailsFilter,
  AccordionSummary,
  ApplyFilterButton,
  FilterContainer
} from "./styles";

const TabSmartContracts = () => {
  const { search } = useLocation();
  const history = useHistory();
  const theme = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [resetFilter, setResetFilter] = useState(false);
  const [showFilter, setShowFiter] = useState(false);
  const [searchQuery, setSearchQuery] = useState<{ scriptVersion?: string; txPurpose?: string }>();
  const [scriptVersion, setScriptVersion] = useState("");
  const [txPurpose, setTxPurpose] = useState("");

  const pageInfo = getPageInfo(search);
  const optionList = [3, 6, 9, 12, 15];
  const size = optionList.indexOf(pageInfo.size) + 1 ? pageInfo.size : 6;

  const handleApplyFilter = () => {
    setShowFiter(false);
    setSearchQuery({ scriptVersion, txPurpose });
    history.replace({ search: stringify({ ...pageInfo, page: 1 }) });
  };
  const handleResetFilter = () => {
    setShowFiter(false);
    setSearchQuery({});
    setScriptVersion("");
    setTxPurpose("");
    history.replace({ search: stringify({ ...pageInfo, page: 1 }) });
  };

  const fetchData = useFetchList<ScriptSmartContracts>(API.SCRIPTS.SMART_CONTRACTS, {
    ...pageInfo,
    size,
    ...omitBy(searchQuery, (query) => !query)
  });

  const renderCard = () => {
    if (fetchData.loading) {
      return (
        <Box component={Grid} container spacing={2}>
          {[...new Array(size)]?.map((idx) => (
            <Grid item width={"100%"} lg={4} md={6} sm={6} xs={12} xl={3} key={idx}>
              <Box component={Skeleton} variant="rectangular" height={"145px"} borderRadius={2} />
            </Grid>
          ))}
        </Box>
      );
    }
    return (
      <Box component={Grid} container spacing={2}>
        {fetchData.data?.map((item, idx) => (
          <Grid item width={"100%"} lg={4} md={6} sm={6} xs={12} xl={3} key={idx}>
            <Box height={"100%"}>
              <SmartContractCard data={item} />
            </Box>
          </Grid>
        ))}
      </Box>
    );
  };
  return (
    <Box data-testid="TabNativeScripts">
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
            setTrxPurpose={setTxPurpose}
            handleApplyFilter={handleApplyFilter}
            setVersion={setScriptVersion}
            version={scriptVersion}
            trxPurpose={txPurpose}
            handleResetFilter={handleResetFilter}
            setShowFiter={setShowFiter}
          />
        )}
      </Box>

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
  setShowFiter: (show: boolean) => void;
  setVersion: (version: string) => void;
  setTrxPurpose: (trxPurpose: string) => void;
  handleApplyFilter: () => void;
  trxPurpose: string;
  version: string;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  handleResetFilter,
  setShowFiter,
  setTrxPurpose,
  setVersion,
  trxPurpose,
  version,
  handleApplyFilter
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | false>("");

  const handleChooseVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVersion((event.target as HTMLInputElement).value);
  };
  const handleChooseTrxPurpose = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrxPurpose((event.target as HTMLInputElement).value);
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setShowFiter(false);
      }}
    >
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
                    <IoIosArrowDown color={theme.palette.secondary.main} />
                  ) : (
                    <IoIosArrowUp color={theme.palette.secondary.main} />
                  )}
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetailsFilter>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={version}
                defaultValue={"Any"}
                onChange={handleChooseVersion}
              >
                <FormControlLabel value="" control={<Radio />} label={t("smartContract.any")} />
                <FormControlLabel value="PLUTUSV1" control={<Radio />} label={t("smartContract.plutusv1")} />
                <FormControlLabel value="PLUTUSV2" control={<Radio />} label={t("smartContract.plutusv2")} />
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
                    <IoIosArrowDown color={theme.palette.secondary.main} />
                  ) : (
                    <IoIosArrowUp color={theme.palette.secondary.main} />
                  )}
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetailsFilter>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={trxPurpose}
                defaultValue={"Any"}
                onChange={handleChooseTrxPurpose}
              >
                <FormControlLabel value="" control={<Radio />} label={t("smartContract.any")} />
                <FormControlLabel value="SPEND" control={<Radio />} label={t("smartContract.spend")} />
                <FormControlLabel value="MINT" control={<Radio />} label={t("smartContract.mint")} />
                <FormControlLabel value="CERT" control={<Radio />} label={t("smartContract.reward")} />
                <FormControlLabel value="REWARD" control={<Radio />} label={t("smartContract.cert")} />
              </RadioGroup>
            </AccordionDetailsFilter>
          </AccordionContainer>

          <Box mt={1}>
            <ApplyFilterButton data-testid="apply-filters" onClick={handleApplyFilter}>
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
    </ClickAwayListener>
  );
};
