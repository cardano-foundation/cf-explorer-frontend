import { Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { getShortHash } from "src/commons/utils/helper";
import CIPBadge from "src/components/commons/CIPBadge";
import CustomModal from "src/components/commons/CustomModal";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";

import { CIPModalSubtitle, ModalContent, OtherPropetiesContent, TokenLabel } from "./styles";

export type TCIP25ComplianceModalProps = {
  open: boolean;
  onClose: () => void;
  data?: Transaction["metadata"][0]["metadataCIP25"]["tokenMap"];
  version?: Transaction["metadata"][0]["metadataCIP25"];
};

const CIP25ComplianceModal: React.FC<TCIP25ComplianceModalProps> = (props) => {
  const { data, version } = props;
  const { t } = useTranslation();

  const tokenMaps = useMemo(() => {
    if (!data) return [];
    const tokens = Object.entries(data).map(([, value]) => value);
    return tokens;
  }, [data]);

  const columns: Column<TTCIP25Properties>[] = [
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
      render: (r) =>
        r.format === "raw bytes" ? (
          <CustomTooltip title={r.value}>
            <Typography display="inline-block" fontSize={14}>
              {getShortHash(r.value)}
            </Typography>
          </CustomTooltip>
        ) : (
          <CustomTooltip title={r.value}>
            <CustomTooltip title={r.value}>
              <Typography
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
                display="inline-block"
                maxWidth={120}
                fontSize={14}
              >
                {r.value}
              </Typography>
            </CustomTooltip>
          </CustomTooltip>
        )
    },
    {
      title: t("cip.compliance"),
      key: "compliance",
      render: (r) => <CIPBadge type={r.valid ? "success" : "warning"} />
    }
  ];
  const mixedoptionalProperties = (optionalProperties: TTCIP25Properties[]) => {
    if (version) return [...optionalProperties, version];
    return optionalProperties;
  };

  return (
    <CustomModal
      modalContainerProps={{ style: { maxWidth: 920 } }}
      open={props.open}
      onClose={props.onClose}
      title={t("token.CIP25Compliance")}
    >
      <ModalContent>
        {tokenMaps.map((token) => (
          <React.Fragment key={token.tokenName}>
            <TokenLabel>
              {t("glossary.Token")}: {token.tokenName}
            </TokenLabel>
            <CIPModalSubtitle>{t("token.requiredProperties")}</CIPModalSubtitle>
            <Table data={token.requireProperties} columns={columns} />
            <CIPModalSubtitle>{t("token.optionalProperties")}</CIPModalSubtitle>
            <Table height="unset" data={mixedoptionalProperties(token.optionalProperties)} columns={columns} />
            <CIPModalSubtitle>{t("token.otherProperties")}</CIPModalSubtitle>
            <OtherPropetiesContent>
              <Typography>{t("token.otherProperties.desc")}</Typography>
            </OtherPropetiesContent>
          </React.Fragment>
        ))}
      </ModalContent>
    </CustomModal>
  );
};

export default CIP25ComplianceModal;
