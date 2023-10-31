import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stringify } from "qs";
import { Box } from "@mui/material";

import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { getPageInfo } from "src/commons/utils/helper";
import { details } from "src/commons/routers";
import { Column } from "src/types/table";
import Table from "src/components/commons/Table";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import CustomModal from "src/components/commons/CustomModal";
import { SCRIPT_TYPE, ScriptTypeLabel } from "src/commons/utils/constants";

import { ButtonViewModal, ContentModal, StyledAddressModal, StyledLink, SubTitleModal, TitleModal } from "./styles";

const TabSmartContracts = () => {
  const { search } = useLocation();
  const pageInfo = getPageInfo(search);
  const { t } = useTranslation();
  const history = useHistory();

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

  const fetchData = useFetchList<ScriptSmartContracts>(API.SCRIPTS.SMART_CONTRACTS, pageInfo);

  const columns: Column<ScriptSmartContracts>[] = [
    {
      title: t("ScriptHash"),
      key: "scriptHash",
      minWidth: "170px",
      maxWidth: "30vw",
      render: (r) => (
        <StyledLink to={details.smartContract(r.scriptHash)}>
          <DynamicEllipsisText value={r.scriptHash} isTooltip />
        </StyledLink>
      )
    },
    {
      title: t("Version"),
      key: "version",
      render: (r) => <Box>{ScriptTypeLabel[r.version as SCRIPT_TYPE]}</Box>
    },
    {
      title: t("AssociatedAddresses"),
      key: "associatedAddress",
      render: (r) =>
        r?.associatedAddress?.length > 0 && (
          <ButtonViewModal onClick={() => handleOpenModal(r.associatedAddress)}>{t("ViewAddresses")}</ButtonViewModal>
        )
    }
  ];

  return (
    <Box data-testid="TabSmartContracts">
      <Table
        {...fetchData}
        columns={columns}
        total={{ count: fetchData.total, title: t("common.totalTxs") }}
        rowKey="scriptHash"
        height={400}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.replace({ search: stringify({ page, size }) })
        }}
        style={{ transform: "translateY(-20px)" }}
      />
      <CustomModal open={open} onClose={handleCloseModal} width={600}>
        <TitleModal>{t("AssociatedAddresses")}</TitleModal>
        <ContentModal>
          <SubTitleModal>{t("AssociatedAddresses")}:</SubTitleModal>
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

export default TabSmartContracts;
