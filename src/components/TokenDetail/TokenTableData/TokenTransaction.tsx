import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { stringify } from "qs";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { OverviewMetadataTokenContext } from "src/pages/TokenDetail";
import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import Table, { Column } from "src/components/commons/Table";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { API } from "src/commons/utils/api";
import ADAicon from "src/components/commons/ADAIcon";
import FormNowMessage from "src/components/commons/FormNowMessage";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { Flex, Label, SmallText, StyledLink, PriceValue, TimeDuration } from "./styles";

interface ITokenTransaction {
  tabActive: string;
  tokenId: string;
}

const TokenTransaction: React.FC<ITokenTransaction> = ({ tabActive, tokenId }) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  const fetchData = useFetchList<Transactions>(
    tabActive === "transactions" ? API.TOKEN.TOKEN_TRX.replace(":tokenId", tokenId) : "",
    { ...pageInfo, tabActive },
    false,
    blockKey
  );
  const { error } = fetchData;
  const columns: Column<Transactions>[] = [
    {
      title: t("glossary.txhash"),
      key: "trxhash",
      minWidth: "150px",
      render: (r, index) => (
        <>
          <CustomTooltip title={r.hash}>
            <StyledLink to={details.transaction(r.hash)} data-testid={`token.transaction.txHash#${index}`}>
              {getShortHash(r.hash)}
            </StyledLink>
          </CustomTooltip>
          <br />
          <DatetimeTypeTooltip>
            <SmallText>{formatDateTimeLocal(r.time || "")}</SmallText>
          </DatetimeTypeTooltip>
        </>
      )
    },
    {
      title: t("glossary.block"),
      key: "block",
      minWidth: "50px",
      render: (r, index) => (
        <StyledLink to={details.block(r.blockNo)} data-testid={`token.transaction.block#${index}`}>
          {r.blockNo}
        </StyledLink>
      )
    },
    {
      title: t("glossary.epoch"),
      key: "epoch",
      minWidth: "50px",
      render: (r, index) => (
        <StyledLink to={details.epoch(r.epochNo)} data-testid={`token.transaction.epoch#${index}`}>
          {r.epochNo}
        </StyledLink>
      )
    },
    {
      title: t("glossary.slot"),
      key: "epochSlotNo",
      minWidth: "50px"
    },
    {
      title: t("glossary.absoluteSlot"),
      key: "slot",
      minWidth: "100px"
    },

    {
      title: t("glossary.address"),
      key: "addresses",
      minWidth: "200px",
      render(r, index) {
        return (
          <>
            <Flex>
              <Label>{t("drawer.input")}: </Label>
              <div>
                <CustomTooltip title={r?.addressesInput?.[0] ? r.addressesInput[0] : ""}>
                  <StyledLink
                    to={r?.addressesInput?.[0] ? details.address(r.addressesInput[0]) : "#"}
                    data-testid={`token.transaction.address#${index}`}
                  >
                    {r?.addressesInput?.[0] ? getShortHash(r.addressesInput[0]) : ""}
                  </StyledLink>
                </CustomTooltip>
                <br />
                {r.addressesInput && r.addressesInput.length > 1 && (
                  <StyledLink to={details.transaction(r.hash)}>...</StyledLink>
                )}
              </div>
            </Flex>
            <Flex>
              <Label>{t("drawer.ouput")}: </Label>
              <div>
                <CustomTooltip title={r?.addressesOutput?.[0] ? r.addressesOutput[0] : ""}>
                  <StyledLink to={r?.addressesOutput?.[0] ? details.address(r.addressesOutput[0]) : "#"}>
                    {r?.addressesOutput?.[0] ? getShortHash(r.addressesOutput[0]) : ""}
                  </StyledLink>
                </CustomTooltip>
                <br />
                {r.addressesOutput && r.addressesOutput.length > 1 && (
                  <StyledLink to={details.transaction(r.hash)}>...</StyledLink>
                )}
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
      {!error && (
        <TimeDuration>
          <FormNowMessage time={fetchData.lastUpdated} />
        </TimeDuration>
      )}
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
