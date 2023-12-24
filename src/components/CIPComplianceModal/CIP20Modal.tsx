import { Box, Typography } from "@mui/material";
import { isNil } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";

import { CIP60WarningIcon, CheckedCIPIcon } from "src/commons/resources";
import { CIP20_DOCS_URL } from "src/commons/utils/constants";
import { getShortHash } from "src/commons/utils/helper";
import CustomModal from "src/components/commons/CustomModal";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import ViewAllButtonExternal from "src/components/commons/ViewAllButtonExternal";

import CustomIcon from "../commons/CustomIcon";
import {
  BoxTooltip,
  CIPLabel,
  CIPModalSubtitle,
  ModalContent,
  OtherPropetiesContent,
  OtherPropetiesDesc
} from "./styles";

export type TCIP20ComplianceModalProps = {
  open: boolean;
  onClose: () => void;
  data?: Transaction["metadata"][0]["metadataCIP20"]["requiredProperties"];
};

const CIP20Modal: React.FC<TCIP20ComplianceModalProps> = (props) => {
  const { data } = props;
  const { t } = useTranslation();

  const columns: Column<TTCIPProperties>[] = [
    {
      title: "#",
      key: "index",
      minWidth: 60,
      render: (r) => r.index
    },
    {
      title: t("cip25.property"),
      key: "property",
      minWidth: 100,
      render: (r) => r.property
    },
    {
      title: t("cip25.format"),
      key: "format",
      minWidth: 160,
      render: (r) => r.format
    },
    {
      title: t("glossary.value"),
      key: "value",
      render: (r) => {
        return r.format === "raw bytes" ? (
          <CustomTooltip title={""}>
            <Typography display="inline-block" fontSize={14}>
              {getShortHash(r.value)}
            </Typography>
          </CustomTooltip>
        ) : (
          <CustomTooltip
            title={<BoxTooltip>{typeof r.value === "object" ? JSON.stringify(r.value) : r.value}</BoxTooltip>}
          >
            <Typography
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              display="inline-block"
              maxWidth={120}
              fontSize={14}
            >
              {typeof r.value === "object" ? JSON.stringify(r.value) : r.value}
            </Typography>
          </CustomTooltip>
        );
      }
    },
    {
      title: t("cip.compliance"),
      key: "compliance",
      render: (r) =>
        !isNil(r.valid) && (
          <Box pl={3}>
            <CustomTooltip title={r.valid ? t("common.passed") : t("common.needsReview")}>
              <Box display="inline-block">
                {r.valid ? <CheckedCIPIcon /> : <CustomIcon icon={CIP60WarningIcon} height={20} width={20} />}
              </Box>
            </CustomTooltip>
          </Box>
        )
    }
  ];

  return (
    <CustomModal
      modalContainerProps={{ style: { maxWidth: 920 } }}
      open={props.open}
      style={{ maxHeight: "unset" }}
      onClose={props.onClose}
      title={
        <CIPLabel>
          {t("token.cip20Title")} <ViewAllButtonExternal tooltipTitle={t("cip20.viewDocs")} to={CIP20_DOCS_URL} />
        </CIPLabel>
      }
    >
      <ModalContent>
        <CIPModalSubtitle>{t("token.requiredProperties")}</CIPModalSubtitle>
        <Table isModal height="auto" isFullTableHeight={true} data={data} columns={columns} />

        <CIPModalSubtitle>{t("token.otherProperties")}</CIPModalSubtitle>
        <OtherPropetiesContent>
          <OtherPropetiesDesc>{t("token.cip20otherProperties.desc")}</OtherPropetiesDesc>
        </OtherPropetiesContent>
      </ModalContent>
    </CustomModal>
  );
};

export default CIP20Modal;
