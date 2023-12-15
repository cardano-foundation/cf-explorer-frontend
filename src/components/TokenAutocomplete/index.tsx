import { Autocomplete, Box, Button, StandardTextFieldProps, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { useScreen } from "src/commons/hooks/useScreen";
import { HeaderSearchIconComponent } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatNumberDivByDecimals, getShortHash } from "src/commons/utils/helper";

import CustomModal from "../commons/CustomModal";
import CustomTooltip from "../commons/CustomTooltip";
import Table, { Column } from "../commons/Table";
import { WrappModalScrollBar } from "../commons/Table/styles";
import {
  AssetName,
  Logo,
  LogoEmpty,
  Option,
  SearchContainer,
  StyledInput,
  StyledTextField,
  SubmitButton
} from "./styles";
import CustomIcon from "../commons/CustomIcon";

const TokenAutocomplete = ({ address }: { address: string }) => {
  const { t } = useTranslation();
  const [openModalToken, setOpenModalToken] = useState(false);
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const history = useHistory();
  const urlFetch = `${API.ADDRESS.TOKENS}?displayName=${search}`.replace(":address", address);
  const [initialized, setInitialized] = useState(false);
  const { data, total, loading } = useFetchList<WalletAddress["tokens"][number]>(address && urlFetch, {
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
        loading={loading}
        noOptionsText={t("common.noRecords")}
        onInputChange={(e, value) => {
          setSearch(value);
        }}
        ListboxProps={{
          sx(theme) {
            return {
              background: theme.palette.secondary[0],
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
                      {option.displayName || getShortHash(option.fingerprint || "")}
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
        renderInput={(params) => {
          const textFieldProps = params as unknown;
          return (
            <StyledTextField
              {...(textFieldProps as Omit<StandardTextFieldProps, "variant">)}
              placeholder={t("glossary.searchToken")}
            />
          );
        }}
        popupIcon={<BiChevronDown color={theme.palette.secondary.main} />}
      />
      <ModalToken address={address} open={openModalToken} onClose={() => setOpenModalToken(false)} />
    </Box>
  );
};

export default TokenAutocomplete;

const ModalToken = ({ open, onClose, address }: { open: boolean; onClose: () => void; address: string }) => {
  const { t } = useTranslation();
  const theme = useTheme();
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
            <AssetName to={details.token(r?.fingerprint ?? "")}>{getShortHash(r.displayName || "")}</AssetName>
          </CustomTooltip>
        ) : (
          <AssetName to={details.token(r?.fingerprint ?? "")}>
            {r.displayName || getShortHash(r.fingerprint || "")}
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
            <CustomIcon
              icon={HeaderSearchIconComponent}
              height={22}
              fill={theme.palette.secondary[0]}
              stroke={theme.palette.secondary.light}
            />
          </SubmitButton>
        </SearchContainer>
        <WrappModalScrollBar>
          <Table
            {...fetchData}
            key={search}
            data={data || []}
            columns={columns}
            isModal={true}
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
