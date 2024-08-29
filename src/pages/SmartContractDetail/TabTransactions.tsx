import { Box } from "@mui/material";
import { stringify } from "qs";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Column } from "src/types/table";
import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table from "src/components/commons/Table";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { StyledLink } from "../BlockList/styles";
import { ButtonViewModal } from "./styles";
import ViewAddressesModal from "./ViewAddressesModal";

const TabTransactions = () => {
  const { search } = useLocation();
  const pageInfo = getPageInfo(search);
  const [currentHash, setCurrentHash] = useState<string | null>(null);
  const { t } = useTranslation();
  const history = useHistory();
  const { address, tabActive } = useParams<{ address: string; tabActive?: string }>();

  const fetchData = useFetchList<ScriptContractTransactions>(
    tabActive === "transactions" ? API.SCRIPTS.SCRIPT_TXS_DETAIL(address) : "",
    pageInfo
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, [fetchData]);

  const columns: Column<ScriptContractTransactions>[] = [
    {
      title: t("glossary.txhash"),
      key: "hash",
      minWidth: "150px",
      render: (r, idx) => (
        <CustomTooltip title={r.hash}>
          <StyledLink data-testid={`sm.detail.trx.hash#${idx}`} to={details.transaction(r.hash)}>
            {getShortHash(r.hash)}
          </StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("createdAt"),
      key: "time",
      minWidth: "180px",
      render: (r) => <DatetimeTypeTooltip>{formatDateTimeLocal(r.time || "")}</DatetimeTypeTooltip>
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
      key: "absoluteSlot",
      minWidth: "100px"
    },
    {
      title: t("glossary.address"),
      key: "address",
      minWidth: "100px",
      render: (r) => <ButtonViewModal onClick={() => setCurrentHash(r.hash)}>{t("ViewAddresses")}</ButtonViewModal>
    },
    {
      title: t("contract.purpose"),
      key: "slot",
      minWidth: "100px",
      render: (r) => r.scriptPurposeTypes.join(", ")
    }
  ];

  return (
    <Box data-testid="TabTransactions">
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: t("common.totalTxs") }}
        rowKey="hash"
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.replace({ search: stringify({ page, size }) })
        }}
      />
      <ViewAddressesModal
        open={!!currentHash}
        onClose={() => setCurrentHash(null)}
        scriptHash={address}
        txHash={currentHash || ""}
      />
    </Box>
  );
};

export default TabTransactions;
