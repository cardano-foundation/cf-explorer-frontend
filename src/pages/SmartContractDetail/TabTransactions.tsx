import { Box } from "@mui/material";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stringify } from "qs";
import { useState } from "react";

import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";
import { Column } from "src/types/table";
import Table from "src/components/commons/Table";
import CustomModal from "src/components/commons/CustomModal";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

import { StyledLink } from "../BlockList/styles";
import { ButtonViewModal, ContentModal, StyledAddressModal, SubTitleModal, TitleModal } from "./styles";

const TabTransactions = () => {
  const { search } = useLocation();
  const pageInfo = getPageInfo(search);
  const { t } = useTranslation();
  const history = useHistory();
  const { address } = useParams<{ address: string }>();

  const fetchData = useFetchList<ScriptContractTransactions>(API.SCRIPTS.SCRIPT_TXS_DETAIL(address), pageInfo);
  const [open, setOpen] = useState(false);
  const [associatedAdd, setAssociatedAdd] = useState<string[]>([]);

  const handleCloseModal = () => {
    setOpen(false);
    setAssociatedAdd([]);
  };

  const handleOpenModal = (data: string[]) => {
    setOpen(true);
    setAssociatedAdd(data);
  };

  const columns: Column<ScriptContractTransactions>[] = [
    {
      title: t("glossary.txhash"),
      key: "hash",
      minWidth: "150px",
      render: (r) => (
        <CustomTooltip title={r.hash}>
          <StyledLink to={details.transaction(r.hash)}>{getShortHash(r.hash)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("createdAt"),
      key: "time",
      minWidth: "180px",
      render: (r) => formatDateTimeLocal(r.time || "")
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
      key: "slot",
      minWidth: "100px",
      render: (r) =>
        r?.addresses?.length > 0 && (
          <ButtonViewModal onClick={() => handleOpenModal(r.addresses)}>{t("ViewAddresses")}</ButtonViewModal>
        )
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
      <CustomModal open={open} onClose={handleCloseModal} width={600}>
        <TitleModal>{t("glossary.address")}</TitleModal>
        <ContentModal>
          <SubTitleModal>{t("glossary.address")}:</SubTitleModal>
          <StyledAddressModal>
            {associatedAdd.map((add: string) => (
              <StyledLink to={details.address(add)} key={add}>
                <DynamicEllipsisText value={add} isTooltip sxFirstPart={{ maxWidth: "calc(100% - 80px)" }} />
              </StyledLink>
            ))}
          </StyledAddressModal>
        </ContentModal>
      </CustomModal>
    </Box>
  );
};

export default TabTransactions;
