import { useState } from "react";
import { Autocomplete, Box, Button, Modal } from "@mui/material";
import { BiChevronDown } from "react-icons/bi";
import { debounce } from "lodash";

import { CloseIcon, EmptyIcon, HeaderSearchIcon } from "../../commons/resources";
import { getShortWallet, numberWithCommas } from "../../commons/utils/helper";
import CustomTooltip from "../commons/CustomTooltip";
import {
  ButtonClose,
  Image,
  Logo,
  LogoEmpty,
  ModalContainer,
  Option,
  SearchContainer,
  StyledInput,
  StyledTextField,
  SubmitButton
} from "./styles";
import useFetchList from "../../commons/hooks/useFetchList";
import { API } from "../../commons/utils/api";
import Table, { Column } from "../commons/Table";
import { AssetName } from "../../pages/Token/styles";
import { details } from "../../commons/routers";
import { WrappModalScrollBar } from "../commons/Table/styles";

const TokenAutocomplete = ({ address }: { address: string }) => {
  const [openModalToken, setOpenModalToken] = useState(false);
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");
  const urlFetch = `${API.ADDRESS.TOKENS}?displayName=${search}`.replace(":address", address);
  const { data, loading, total } = useFetchList<WalletAddress["tokens"][number]>(address && urlFetch, {
    page: 0,
    size: 10
  });

  return (
    <Box>
      <Autocomplete
        options={total > 10 ? [...data, "more"] : data}
        componentsProps={{ paper: { elevation: 2 } }}
        loading={loading}
        getOptionLabel={(option) =>
          typeof option === "string" ? "more" : option.displayName || option.name || option.fingerprint
        }
        onInputChange={debounce((e, value) => setSearch(value), 500)}
        onChange={(e, value) => typeof value !== "string" && setSelected(value?.fingerprint || "")}
        noOptionsText={
          <Box>
            <Box maxHeight="200px" component={"img"} src={EmptyIcon}></Box>
          </Box>
        }
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
                  background: theme.palette.grey[300]
                },
                "&::-webkit-scrollbar-track": {
                  background: theme.palette.grey[100]
                }
              }
            };
          }
        }}
        renderOption={(propss, option: WalletAddress["tokens"][number] | string) => {
          if (typeof option === "string") {
            return (
              <Option key={"more"} {...propss} onClick={() => null} active={0}>
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
            <Option key={option.fingerprint} {...propss} active={selected === option.fingerprint ? 1 : 0}>
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
                    {option?.metadata?.logo ? (
                      <Logo src={`data:/image/png;base64,${option.metadata?.logo}`} alt="icon" />
                    ) : (
                      <LogoEmpty />
                    )}
                  </Box>
                  <CustomTooltip title={`${option.displayName || ""} #${option.name || option.fingerprint}`}>
                    <Box textAlign={"left"} overflow={"hidden"} textOverflow={"ellipsis"} maxWidth="150px">
                      {option.displayName || ""} #{option.name || option.fingerprint}
                    </Box>
                  </CustomTooltip>
                </Box>
                <Box fontWeight={"bold"} flex={1} textAlign="right">
                  {numberWithCommas(option.quantity)}
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
      render: (r) =>
        r?.metadata?.logo ? <Logo src={`data:/image/png;base64,${r.metadata?.logo}`} alt="icon" /> : <LogoEmpty />
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
      render: (r) => numberWithCommas(r.quantity || 0)
    }
  ];
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        setValue("");
        setSearch("");
      }}
    >
      <ModalContainer>
        <ButtonClose
          onClick={() => {
            onClose();
            setValue("");
            setSearch("");
          }}
        >
          <img src={CloseIcon} alt="icon close" />
        </ButtonClose>
        <Box textAlign={"left"} fontSize="1.5rem" fontWeight="bold" fontFamily={'"Roboto", sans-serif '}>
          Token List
        </Box>
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
            maxHeight={"55vh"}
            pagination={{
              page,
              size,
              total: fetchData.total,
              onChange: (page, size) => setPagination({ page: page - 1, size })
            }}
          />
        </WrappModalScrollBar>
      </ModalContainer>
    </Modal>
  );
};
