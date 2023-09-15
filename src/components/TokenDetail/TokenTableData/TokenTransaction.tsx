import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { stringify } from "qs";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { OverviewMetadataTokenContext } from "src/pages/TokenDetail";
import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import {
  formatADAFull,
  formatDateTimeLocal,
  getPageInfo,
  getShortHash,
  getShortWallet
} from "src/commons/utils/helper";
import Table, { Column } from "src/components/commons/Table";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { API } from "src/commons/utils/api";
import ADAicon from "src/components/commons/ADAIcon";
import FormNowMessage from "src/components/commons/FormNowMessage";

import { Flex, Label, SmallText, StyledLink, PriceValue, DescriptionText, TimeDuration } from "./styles";

interface ITokenTransaction {
  tokenId: string;
}

const TokenTransaction: React.FC<ITokenTransaction> = ({ tokenId }) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  const fetchData = useFetchList<Transactions>(
    API.TOKEN.TOKEN_TRX.replace(":tokenId", tokenId),
    { ...pageInfo },
    false,
    blockKey
  );

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
      title: t("glossary.blockEpochSlot"),
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
    <Box>
      <DescriptionText>
        Included transactions in which the UTXO containing the tokens is used resulting in token movement, while the
        tokens are unspent and returned to the address
      </DescriptionText>
      <TimeDuration>
        <FormNowMessage time={fetchData.lastUpdated} />
      </TimeDuration>
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
    </Box>
  );
};

export default TokenTransaction;
