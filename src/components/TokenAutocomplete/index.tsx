import { Autocomplete, Box, Button } from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { useScreen } from "src/commons/hooks/useScreen";
import { HeaderSearchIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatNumberDivByDecimals, getShortWallet } from "src/commons/utils/helper";

import CustomModal from "../commons/CustomModal";
import CustomTooltip from "../commons/CustomTooltip";
import Table, { Column } from "../commons/Table";
import { WrappModalScrollBar } from "../commons/Table/styles";
import {
  AssetName,
  Image,
  Logo,
  LogoEmpty,
  Option,
  SearchContainer,
  StyledInput,
  StyledTextField,
  SubmitButton
} from "./styles";

const TokenAutocomplete = ({ address }: { address: string }) => {
  const { t } = useTranslation();
  const [openModalToken, setOpenModalToken] = useState(false);
  const [search, setSearch] = useState("");
  const history = useHistory();
  const urlFetch = `${API.ADDRESS.TOKENS}?displayName=${search}`.replace(":address", address);
  const [initialized, setInitialized] = useState(false);
  const { data, total } = useFetchList<WalletAddress["tokens"][number]>(address && urlFetch, {
    page: 0,
    size: 10
  });

  useEffect(() => {
    if (data.length) {
      setInitialized(true);
    }
  }, [data]);

  const handleClickItem = (link: string) => {
    history.push(link);
  };

  if (!data.length && !search && !initialized) return null;

  return (
    <Box>
      <Autocomplete
        options={total > 10 ? [...data, "more"] : data}
        componentsProps={{ paper: { elevation: 2 } }}
        getOptionLabel={(option) =>
          typeof option === "string" ? "" : option.displayName || option.name || option.fingerprint
        }
        noOptionsText={t("common.noRecords")}
        onInputChange={debounce((e, value) => setSearch(value), 1000)}
        ListboxProps={{
          sx(theme) {
            return {
              "&::-webkit-scrollbar": {
                width: "5px"
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent"
              },
              "&::-webkit-scrollbar-thumb": {
                background: "transparent"
              },
              "&:hover": {
                "&::-webkit-scrollbar-thumb": {
                  background: theme.palette.secondary.light
                },
                "&::-webkit-scrollbar-track": {
                  background: theme.palette.primary[100]
                }
              }
            };
          }
        }}
        renderOption={(propss, option: WalletAddress["tokens"][number] | string) => {
          if (typeof option === "string") {
            return (
              <Option key={"more"} {...propss} onClick={() => null}>
                <Box
                  display="flex"
                  alignItems={"center"}
                  justifyContent="center"
                  width={"100%"}
                  fontSize={"14px"}
                  padding={0}
                  gap="10px"
                  minHeight="34px"
                >
                  <Box
                    component={Button}
                    width="100%"
                    textTransform={"inherit"}
                    onClick={() => {
                      setOpenModalToken(true);
                    }}
                  >
                    {t("glossary.seeMore")}
                  </Box>
                </Box>
              </Option>
            );
          }
          return (
            <Option key={option.fingerprint} {...propss} onClick={() => null}>
              <Box
                display="flex"
                alignItems={"center"}
                justifyContent="space-between"
                width={"100%"}
                fontSize={"14px"}
                padding={0}
                gap="10px"
                minHeight="34px"
              >
                <Box
                  display="flex"
                  alignItems={"center"}
                  overflow="hidden"
                  gap="10px"
                  onClick={() => handleClickItem(details.token(option?.fingerprint))}
                >
                  <Box>
                    {option?.metadata?.logo ? <Logo src={`${option.metadata?.logo}`} alt="icon" /> : <LogoEmpty />}
                  </Box>
                  <CustomTooltip title={`${option.displayName || ""} #${option.name || option.fingerprint}`}>
                    <Box
                      textAlign={"left"}
                      color={({ palette }) => palette.secondary.light}
                      overflow={"hidden"}
                      textOverflow={"ellipsis"}
                      maxWidth="150px"
                    >
                      {option.displayName || getShortWallet(option.fingerprint || "")}
                    </Box>
                  </CustomTooltip>
                </Box>
                <Box fontWeight={"bold"} color={({ palette }) => palette.secondary.main} flex={1} textAlign="right">
                  {formatNumberDivByDecimals(option.quantity || 0, option.metadata?.decimals || 0)}
                </Box>
              </Box>
            </Option>
          );
        }}
        renderInput={(params: any) => <StyledTextField {...params} placeholder={t("glossary.searchToken")} />}
        popupIcon={<BiChevronDown />}
      />
      <ModalToken address={address} open={openModalToken} onClose={() => setOpenModalToken(false)} />
    </Box>
  );
};

export default TokenAutocomplete;

const ModalToken = ({ open, onClose, address }: { open: boolean; onClose: () => void; address: string }) => {
  const { t } = useTranslation();
  const [{ page, size }, setPagination] = useState({ page: 0, size: 50 });
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const urlFetch = `${API.ADDRESS.TOKENS}?displayName=${search}`.replace(":address", address);
  const { data, ...fetchData } = useFetchList<WalletAddress["tokens"][number]>(address && urlFetch, {
    page,
    size
  });
  const { isTablet } = useScreen();

  const columns: Column<WalletAddress["tokens"][number]>[] = [
    {
      title: t("glossary.icon"),
      key: "icon",
      minWidth: "50px",
      render: (r) => (r?.metadata?.logo ? <Logo src={`${r.metadata?.logo}`} alt="icon" /> : <LogoEmpty />)
    },
    {
      title: t("glossary.name"),
      key: "name",
      minWidth: "50px",
      render: (r) =>
        r.displayName && r.displayName.length > 20 ? (
          <CustomTooltip placement={"top"} title={r.displayName}>
            <AssetName to={details.token(r?.fingerprint ?? "")}>{getShortWallet(r.displayName || "")}</AssetName>
          </CustomTooltip>
        ) : (
          <AssetName to={details.token(r?.fingerprint ?? "")}>
            {r.displayName || getShortWallet(r.fingerprint || "")}
          </AssetName>
        )
    },
    {
      title: t("common.balance"),
      key: "balance",
      minWidth: "50px",
      render: (r) => formatNumberDivByDecimals(r.quantity || 0, r.metadata?.decimals || 0)
    }
  ];

  const handleClose = () => {
    onClose();
    setValue("");
    setSearch("");
  };

  const handleSearch = () => {
    setSearch(value);
    setPagination({ page: 0, size: 50 });
  };

  return (
    <CustomModal title={t("glossary.tokenList")} open={open} onClose={handleClose} width={"min(80vw, 600px)"}>
      <>
        <SearchContainer mt={2} mb={1}>
          <StyledInput
            placeholder={t("glossary.searchTokens")}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <SubmitButton onClick={() => handleSearch()}>
            <Image src={HeaderSearchIcon} alt="Search" />
          </SubmitButton>
        </SearchContainer>
        <WrappModalScrollBar>
          <Table
            {...fetchData}
            key={search}
            data={data || []}
            columns={columns}
            total={{ title: "Total", count: fetchData.total }}
            maxHeight={isTablet ? "50vh" : "55vh"}
            pagination={{
              page,
              size,
              total: fetchData.total,
              onChange: (page, size) => setPagination({ page: page - 1, size })
            }}
          />
        </WrappModalScrollBar>
      </>
    </CustomModal>
  );
};
