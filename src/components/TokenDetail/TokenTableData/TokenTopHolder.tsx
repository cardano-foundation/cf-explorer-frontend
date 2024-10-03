import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { formatNumberDivByDecimals, getPageInfo, getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { API } from "src/commons/utils/api";
import FormNowMessage from "src/components/commons/FormNowMessage";

import { PriceValue, SmallText, StyledLink, TimeDuration } from "./styles";

interface ITokenTopHolder {
  tabActive: string;
  tokenId: string;
  totalSupply?: number;
  decimal?: number;
}

const TokenTopHolder: React.FC<ITokenTopHolder> = ({ tabActive, tokenId, totalSupply, decimal }) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);

  const fetchData = useFetchList<ITokenTopHolderTable>(
    tabActive === "topHolders" ? `${API.TOKEN.LIST}/${tokenId}/top_holders` : "",
    { ...pageInfo, tokenId, tabActive },
    false,
    blockKey
  );
  const { error } = fetchData;

  const columns: Column<ITokenTopHolderTable>[] = [
    {
      title: t("common.address"),
      key: "address",
      minWidth: "200px",
      render: (r, idx) => (
        <CustomTooltip title={r.address}>
          <StyledLink
            to={r.addressType === "PAYMENT_ADDRESS" ? details.address(r.address) : details.stake(r.address)}
            data-testid={`transaction.topholder.address#${idx}`}
          >
            {getShortHash(r.address)}
          </StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("common.balance"),
      key: "balance",
      minWidth: "200px",
      render: (r) => (
        <PriceValue>
          <SmallText>{formatNumberDivByDecimals(r?.quantity, decimal || 0)}</SmallText>
        </PriceValue>
      )
    },
    {
      title: t("glossary.share"),
      key: "share",
      minWidth: "200px",
      render: (r) => (
        <SmallText>{r.quantity && totalSupply ? ((r.quantity / totalSupply) * 100).toFixed(2) : 0}%</SmallText>
      )
    }
  ];

  return (
    <>
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
        onClickRow={(_, r: ITokenTopHolderTable) =>
          history.push(r.addressType === "PAYMENT_ADDRESS" ? details.address(r.address) : details.stake(r.address))
        }
      />
    </>
  );
};

export default TokenTopHolder;
