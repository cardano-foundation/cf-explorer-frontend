import { Box, Typography } from "@mui/material";
import { isEmpty, isNil } from "lodash";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { CheckNotRequiredCIPIcon, CheckedCIPIcon, WarningCIPIcon } from "src/commons/resources";
import { CIP25_DOCS_URL } from "src/commons/utils/constants";
import { getShortHash } from "src/commons/utils/helper";
import CustomModal from "src/components/commons/CustomModal";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import ViewAllButtonExternal from "src/components/commons/ViewAllButtonExternal";

import {
  CIPLabel,
  CIPModalSubtitle,
  ModalContent,
  OtherPropetiesContent,
  OtherPropetiesDesc,
  TokenLabel
} from "./styles";

export type TCIP25ModalProps = {
  open: boolean;
  onClose: () => void;
  data?: Transaction["metadata"][0]["metadataCIP25"]["tokenMap"];
  version?: Transaction["metadata"][0]["metadataCIP25"];
};

const DEFAULT_CIP25_REQUIRE = [
  {
    format: "text",
    index: "1",
    property: "policy_ID",
    valid: null,
    value: ""
  },
  {
    format: "utf-8",
    index: "2",
    property: "asset_name",
    valid: null,
    value: ""
  },
  {
    format: "string",
    index: "3",
    property: "name",
    valid: null,
    value: ""
  },
  {
    format: "uri | array",
    index: "4",
    property: "image",
    valid: null,
    value: ""
  }
];

const CIP25Modal: React.FC<TCIP25ModalProps> = (props) => {
  const { data, version } = props;
  const { t } = useTranslation();
  const tokenMaps = useMemo(() => {
    if (isEmpty(data)) return [{ requireProperties: DEFAULT_CIP25_REQUIRE, tokenName: null, optionalProperties: [] }];
    const tokens = Object.entries(data).map(([, value]) => value);
    return tokens;
  }, [data]);

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
      render: (r) =>
        !isNil(r.valid) && (
          <Box pl={3}>
            <CustomTooltip
              title={
                r.valid
                  ? t("common.passed")
                  : r?.checkNotRequired
                  ? t("common.checkNotRequired")
                  : t("common.needsReview")
              }
            >
              <Box display="inline-block">
                {r.valid ? <CheckedCIPIcon /> : r?.checkNotRequired ? <CheckNotRequiredCIPIcon /> : <WarningCIPIcon />}
              </Box>
            </CustomTooltip>
          </Box>
        )
    }
  ];
  const mixedOptionalProperties = (optionalProperties: TTCIPProperties[]) => {
    if (version) return [...optionalProperties, version];
    return optionalProperties;
  };

  const updateCheckNotRequiredOptionalProperties = (optionalProperties: TTCIPProperties[]) => {
    const filePropertyIndex = optionalProperties.find((it) => it.property === "files")?.index;
    if (!filePropertyIndex) return optionalProperties;
    return optionalProperties.map((it) => {
      if (it.property === "name" && it.index.startsWith(filePropertyIndex)) {
        return { ...it, checkNotRequired: true };
      }
      return it;
    });
  };

  const getOptionalProperties = (optionalProperties: TTCIPProperties[]) => {
    return mixedOptionalProperties(updateCheckNotRequiredOptionalProperties(optionalProperties));
  };

  return (
    <CustomModal
      modalContainerProps={{ style: { maxWidth: 920 } }}
      open={props.open}
      style={{ maxHeight: "unset" }}
      onClose={props.onClose}
      title={
        <CIPLabel data-testid="token-CIP25Compliance">
          {t("token.CIP25Compliance")} <ViewAllButtonExternal tooltipTitle={t("cip25.viewDocs")} to={CIP25_DOCS_URL} />
        </CIPLabel>
      }
    >
      <ModalContent>
        {tokenMaps.map((token, index) => (
          <React.Fragment key={index}>
            {token.tokenName && (
              <TokenLabel data-testid="token-CIP25-name">
                {t("glossary.Token")}: {token.tokenName}
              </TokenLabel>
            )}
            <CIPModalSubtitle>{t("token.requiredProperties")}</CIPModalSubtitle>
            <Table
              isModal
              maxHeight="unset"
              height="auto"
              isFullTableHeight={true}
              data={token.requireProperties}
              columns={columns}
            />
            {token.optionalProperties.length > 0 && (
              <>
                <CIPModalSubtitle data-testid="token-CIP25-optional-properties">
                  {t("token.optionalProperties")}
                </CIPModalSubtitle>
                <Table
                  isModal
                  maxHeight="unset"
                  height="auto"
                  data={getOptionalProperties(token.optionalProperties)}
                  columns={columns}
                />
              </>
            )}
            <CIPModalSubtitle data-testid="token-CIP25-other-properties">{t("token.otherProperties")}</CIPModalSubtitle>
            <OtherPropetiesContent>
              <OtherPropetiesDesc>{t("token.cip25otherProperties.desc")}</OtherPropetiesDesc>
            </OtherPropetiesContent>
          </React.Fragment>
        ))}
      </ModalContent>
    </CustomModal>
  );
};

export default CIP25Modal;
