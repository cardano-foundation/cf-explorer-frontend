import { stringify } from "qs";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import { setOnDetailView } from "src/stores/user";

import { SmallText, StyledLink, ViewAddressButton } from "./styles";

export type TTokenTransaction = Transactions & {
  purposes: string[];
};

const TokenTransaction: React.FC = () => {
  const { t } = useTranslation();
  const params = useParams<{ address: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const { onDetailView } = useSelector(({ user }: RootState) => user);
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Transactions>(`${API.ADDRESS.DETAIL}/${params.address}/txs`, pageInfo);
  const [txHashSelected, setTxHashSelected] = useState<string>("");

  const openDetail = (_: React.MouseEvent<Element, MouseEvent>, r: Transactions) => {
    setTxHashSelected(r.hash);
    setOnDetailView(true);
  };

  const handleClose = () => {
    setOnDetailView(false);
    setTxHashSelected("");
  };

  useEffect(() => {
    if (!onDetailView) handleClose();
  }, [onDetailView]);

  const columns: Column<TTokenTransaction>[] = [
    {
      title: t("glossary.txhash"),
      key: "hash",
      minWidth: "150px",

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
      minWidth: "50px",
      render: (r) => <StyledLink to={details.block(r.blockNo)}>{r.blockNo}</StyledLink>
    },
    {
      title: t("glossary.epoch"),
      key: "epochNo",
      minWidth: "50px",
      render: (r) => <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>
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
      minWidth: "50px",
      render: () => <ViewAddressButton>{t("common.viewAddresses")}</ViewAddressButton>
    },
    {
      title: t("contract.purpose"),
      minWidth: "120px",
      key: "purpose",
      render: (r) => r.purposes.join(",")
    }
  ];
  return (
    <>
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: t("common.totalTxs") }}
        onClickRow={openDetail}
        rowKey="hash"
        selected={txHashSelected}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.replace({ search: stringify({ page, size }) })
        }}
      />
    </>
  );
};

export default TokenTransaction;
