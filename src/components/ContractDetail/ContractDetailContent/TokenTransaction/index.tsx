import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { stringify } from "qs";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  formatADAFull,
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  getShortWallet
} from "src/commons/utils/helper";
import Table, { Column } from "src/components/commons/Table";
import CustomTooltip from "src/components/commons/CustomTooltip";
import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import ADAicon from "src/components/commons/ADAIcon";
import { setOnDetailView } from "src/stores/user";
import DetailViewContractHash from "src/components/commons/DetailView/DetailViewContractHash";

import { Flex, Label, SmallText, StyledLink, PriceValue } from "./styles";

const TokenTransaction: React.FC = () => {
  const { t } = useTranslation();
  const params = useParams<{ address: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Transactions>(`${API.ADDRESS.DETAIL}/${params.address}/txs`, pageInfo);
  const [txHashSelected, setTxHashSelected] = useState<string>("");
  const [selected, setSelected] = useState<number | null>(null);
  const isOpenDrawer = !!(txHashSelected && onDetailView);
  const openDetail = (_: any, r: Transactions, index: number) => {
    setTxHashSelected(r.hash);
    setSelected(index);
    setOnDetailView(true);
  };

  const handleClose = () => {
    setOnDetailView(false);
    setSelected(null);
    setTxHashSelected("");
  };

  useEffect(() => {
    if (!onDetailView) handleClose();
  }, [onDetailView]);

  const columns: Column<Transactions>[] = [
    {
      title: t("glossary.txhash"),
      key: "trxhash",
      minWidth: "200px",

      render: (r) => (
        <>
          <CustomTooltip title={r.hash}>
            <StyledLink to={details.transaction(r.hash)}>{getShortHash(r.hash)}</StyledLink>
          </CustomTooltip>
        </>
      )
    },
    {
      title: t("createdAt"),
      key: "time",
      minWidth: "180px",

      render: (r) => <SmallText>{formatDateTimeLocal(r.time || "")}</SmallText>
    },
    {
      title: t("glossary.block"),
      key: "block",
      minWidth: "120px",
      render: (r) => (
        <>
          <StyledLink to={details.block(r.blockNo)}>{r.blockNo}</StyledLink>
          <br />
          <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/
          <Box component={"span"} color={({ palette }) => palette.secondary.light}>
            {r.epochSlotNo}{" "}
          </Box>
        </>
      )
    },
    {
      title: t("glossary.address"),
      key: "addresses",
      minWidth: "200px",
      render(r) {
        return (
          <>
            <Flex>
              <Label>{t("drawer.input")}: </Label>
              <div>
                <CustomTooltip title={r.addressesInput[0]}>
                  <StyledLink to={details.address(r.addressesInput[0])}>
                    {getShortWallet(r.addressesInput[0])}
                  </StyledLink>
                </CustomTooltip>
                <br />
                {r.addressesInput.length > 1 && <StyledLink to={details.transaction(r.hash)}>...</StyledLink>}
              </div>
            </Flex>
            <Flex>
              <Label>{t("drawer.ouput")}: </Label>
              <div>
                <CustomTooltip title={r.addressesOutput[0]}>
                  <StyledLink to={details.address(r.addressesOutput[0])}>
                    {getShortWallet(r.addressesOutput[0])}
                  </StyledLink>
                </CustomTooltip>
                <br />
                {r.addressesOutput.length > 1 && <StyledLink to={details.transaction(r.hash)}>...</StyledLink>}
              </div>
            </Flex>
          </>
        );
      }
    },
    {
      title: t("fees"),
      key: "fee",
      minWidth: "120px",
      render: (r) => (
        <PriceValue>
          <SmallText>
            {formatADAFull(r.fee)}&nbsp; <ADAicon />
          </SmallText>
        </PriceValue>
      )
    },
    {
      title: t("drawer.ouput"),
      minWidth: "120px",
      key: "ouput",
      render: (r) => (
        <PriceValue>
          <SmallText>
            {formatADAFull(r.totalOutput)}&nbsp; <ADAicon />
          </SmallText>
        </PriceValue>
      )
    }
  ];
  return (
    <>
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: t("common.totalTxs") }}
        onClickRow={openDetail}
        selected={selected}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.replace({ search: stringify({ page, size }) })
        }}
      />
      <DetailViewContractHash
        txHash={txHashSelected}
        address={params.address}
        open={isOpenDrawer}
        handleClose={handleClose}
      />
    </>
  );
};

export default TokenTransaction;
