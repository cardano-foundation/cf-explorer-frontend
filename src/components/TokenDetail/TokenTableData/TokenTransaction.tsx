import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { useTranslation } from "react-i18next";

import { OverviewMetadataTokenContext } from "src/pages/TokenDetail";

import useFetchList from "../../../commons/hooks/useFetchList";
import { details } from "../../../commons/routers";
import {
  formatADAFull,
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  getShortWallet
} from "../../../commons/utils/helper";
import Table, { Column } from "../../commons/Table";
import { Flex, Label, SmallText, StyledLink, PriceValue } from "./styles";
import CustomTooltip from "../../commons/CustomTooltip";
import { API } from "../../../commons/utils/api";
import ADAicon from "../../commons/ADAIcon";

interface ITokenTransaction {
  tokenId: string;
}

const TokenTransaction: React.FC<ITokenTransaction> = ({ tokenId }) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<Transactions>(API.TOKEN.TOKEN_TRX.replace(":tokenId", tokenId), { ...pageInfo });

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
          <br />
          <SmallText>{formatDateTimeLocal(r.time || "")}</SmallText>
        </>
      )
    },
    {
      title: t("gloassary,blockEpochSlot"),
      key: "block",
      minWidth: "200px",
      render: (r) => (
        <>
          <StyledLink to={details.block(r.blockNo)}>{r.blockNo}</StyledLink>
          <br />
          <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>/<SmallText>{r.epochSlotNo} </SmallText>
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
              <Label>${t("drawer.input")}: </Label>
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
            {formatADAFull(r.fee)}&nbsp;
            <ADAicon />
          </SmallText>
        </PriceValue>
      )
    },
    {
      title: t("drawer.ouput"),
      minWidth: "120px",
      key: "outSum",
      render: (r) => (
        <PriceValue>
          <SmallText>
            {formatADAFull(r.totalOutput)}&nbsp;
            <ADAicon />
          </SmallText>
        </PriceValue>
      )
    }
  ];

  const { setTxCountRealtime } = useContext(OverviewMetadataTokenContext);

  useEffect(() => {
    setTxCountRealtime(fetchData.total);
  }, [fetchData.total, setTxCountRealtime]);

  return (
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: "Total", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.replace({ search: stringify({ page, size }) })
      }}
      onClickRow={(_, r: Transactions) => history.push(details.transaction(r.hash))}
    />
  );
};

export default TokenTransaction;
