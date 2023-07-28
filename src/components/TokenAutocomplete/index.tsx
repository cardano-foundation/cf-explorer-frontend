import { Autocomplete, Box, Button } from "@mui/material";
import { debounce } from "lodash";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

import useFetchList from "src/commons/hooks/useFetchList";
import { HeaderSearchIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatNumberDivByDecimals, getShortWallet, numberWithCommas } from "src/commons/utils/helper";
import { useScreen } from "src/commons/hooks/useScreen";

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
import CustomModal from "../commons/CustomModal";

const TokenAutocomplete = ({ address }: { address: string }) => {
  const [openModalToken, setOpenModalToken] = useState(false);
  const [search, setSearch] = useState("");
  const urlFetch = `${API.ADDRESS.TOKENS}?displayName=${search}`.replace(":address", address);
  const { data, loading, total } = useFetchList<WalletAddress["tokens"][number]>(address && urlFetch, {
    page: 0,
    size: 10
  });

  return (
    <Box>
      <Autocomplete
        freeSolo={!data?.length}
        options={total > 10 ? [...data, "more"] : data}
        componentsProps={{ paper: { elevation: 2 } }}
        loading={loading}
        getOptionLabel={(option) =>
          typeof option === "string" ? "more" : option.displayName || option.name || option.fingerprint
        }
        onInputChange={debounce((e, value) => setSearch(value), 500)}
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
                    See more
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
                <Box display="flex" alignItems={"center"} overflow="hidden" gap="10px">
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
                      {option.displayName || ""}
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
        renderInput={(params) => <StyledTextField {...params} placeholder="Search Token" />}
        popupIcon={<BiChevronDown />}
      />
      <ModalToken address={address} open={openModalToken} onClose={() => setOpenModalToken(false)} />
    </Box>
  );
};

export default TokenAutocomplete;

const ModalToken = ({ open, onClose, address }: { open: boolean; onClose: () => void; address: string }) => {
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
      title: "#",
      key: "#",
      minWidth: "50px",
      render: (r, index) => numberWithCommas(page * size + index + 1)
    },
    {
      title: "Icon",
      key: "icon",
      minWidth: "50px",
      render: (r) => (r?.metadata?.logo ? <Logo src={`${r.metadata?.logo}`} alt="icon" /> : <LogoEmpty />)
    },
    {
      title: "Name",
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
      title: "Balance",
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

  return (
    <CustomModal title="Token List" open={open} onClose={handleClose} width={"min(80vw, 600px)"}>
      <>
        <SearchContainer mt={2} mb={1}>
          <StyledInput
            placeholder="Search tokens"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setSearch(value);
                setPagination({ page: 0, size: 50 });
              }
            }}
          />
          <SubmitButton onClick={() => setSearch(value)}>
            <Image src={HeaderSearchIcon} alt="Search" />
          </SubmitButton>
        </SearchContainer>
        <WrappModalScrollBar>
          <Table
            {...fetchData}
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
