import { stringify } from "qs";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { formatAmount, formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import { API } from "src/commons/utils/api";
import FormNowMessage from "src/components/commons/FormNowMessage";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import CustomTooltip from "../../commons/CustomTooltip";
import Table, { Column } from "../../commons/Table";
import { PriceValue, SmallText, StyledLink, TimeDuration } from "./styles";

interface ITokenMinting {
  tabActive: string;
  tokenId: string;
  metadata?: ITokenMetadata;
}

const TokenMinting: React.FC<ITokenMinting> = ({ tabActive, tokenId, metadata }) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  const fetchData = useFetchList<ITokenTopHolderTable>(
    tabActive === "tokenMint" ? `${API.TOKEN.LIST}/${tokenId}/mints` : "",
    { ...pageInfo, tokenId, tabActive },
    false,
    blockKey
  );

  const columns: Column<ITokenMintingTable>[] = [
    {
      title: t("glossary.txhash"),
      key: "trxHash",
      minWidth: "200px",
      render: (r) => (
        <CustomTooltip title={r.txHash}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("glossary.amountedMinted"),
      key: "amountMinted",
      minWidth: "200px",
      render: (r) => (
        <PriceValue>
          <SmallText>{formatAmount(r.amount, metadata?.decimals)}</SmallText>
        </PriceValue>
      )
    },
    {
      title: t("createdAt"),
      key: "time",
      minWidth: "200px",
      render: (r) => (
        <DatetimeTypeTooltip>
          <SmallText>{formatDateTimeLocal(r.time || "")}</SmallText>
        </DatetimeTypeTooltip>
      )
    }
  ];

  return (
    <>
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
        onClickRow={(_, r: ITokenMintingTable) => history.push(details.transaction(r.txHash))}
      />
    </>
  );
};

export default TokenMinting;
