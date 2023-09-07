import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { useTranslation } from "react-i18next";

import useFetchList from "../../../commons/hooks/useFetchList";
import { details } from "../../../commons/routers";
import { formatNumberDivByDecimals, getPageInfo, getShortWallet } from "../../../commons/utils/helper";
import CustomTooltip from "../../commons/CustomTooltip";
import Table, { Column } from "../../commons/Table";
import { PriceValue, SmallText, StyledLink } from "./styles";
import { API } from "../../../commons/utils/api";

interface ITokenTopHolder {
  tokenId: string;
  totalSupply?: number;
  decimal?: number;
  setCurrentHolder?: (holders: number) => void;
}

const TokenTopHolder: React.FC<ITokenTopHolder> = ({ tokenId, totalSupply, decimal, setCurrentHolder }) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<ITokenTopHolderTable>(`${API.TOKEN.LIST}/${tokenId}/top_holders`, {
    ...pageInfo,
    tokenId
  });

  useEffect(() => {
    if (fetchData.total && setCurrentHolder) {
      setCurrentHolder(fetchData.total || 0);
    }
  }, [fetchData.total]);

  const columns: Column<ITokenTopHolderTable>[] = [
    {
      title: t("common.address"),
      key: "address",
      minWidth: "200px",
      render: (r) => (
        <CustomTooltip title={r.address}>
          <StyledLink to={r.addressType === "PAYMENT_ADDRESS" ? details.address(r.address) : details.stake(r.address)}>
            {getShortWallet(r.address)}
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
    <Table
      {...fetchData}
      columns={columns}
      total={{ title: "Total", count: fetchData.total }}
      pagination={{
        ...pageInfo,
        total: fetchData.total,
        onChange: (page, size) => history.replace({ search: stringify({ page, size }) })
      }}
      onClickRow={(_, r: ITokenTopHolderTable) => history.push(details.address(r.address))}
    />
  );
};

export default TokenTopHolder;
