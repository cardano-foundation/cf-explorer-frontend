import { Box, Typography } from "@mui/material";
import { isEmpty, isNil } from "lodash";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { CIP60WarningIcon, CheckedCIPIcon } from "src/commons/resources";
import { CIP60_DOCS_URL } from "src/commons/utils/constants";
import { getShortHash } from "src/commons/utils/helper";
import CustomModal from "src/components/commons/CustomModal";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table, { Column } from "src/components/commons/Table";
import ViewAllButtonExternal from "src/components/commons/ViewAllButtonExternal";

import CustomIcon from "../commons/CustomIcon";
import {
  CIPLabel,
  CIPModalSubtitle,
  ModalContent,
  OtherPropetiesContent,
  OtherPropetiesDesc,
  TokenLabel
} from "./styles";

export type TCIP60ComplianceModalProps = {
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
    format: "string / [* string]",
    index: "4",
    property: "image",
    valid: null,
    value: ""
  },
  {
    format: "number",
    index: "5",
    property: "music_metadata_version",
    valid: null,
    value: ""
  },
  {
    format: "Single / Multiple",
    index: "4",
    property: "release_type",
    valid: null,
    value: ""
  },
  {
    format: "[* files_details]",
    index: "4",
    property: "files",
    valid: null,
    value: ""
  }
];

const CIP60Modal: React.FC<TCIP60ComplianceModalProps> = (props) => {
  const { data, version } = props;
  const { t } = useTranslation();
  const tokenMaps = useMemo(() => {
    if (isEmpty(data)) {
      return [{ requireProperties: DEFAULT_CIP25_REQUIRE, tokenName: null, optionalProperties: [] }];
    } else {
      return Object.keys(data).map((key) => {
        const isValidVersion =
          Number(data[key].requireProperties?.[0]["value"]) !== 1 ||
          Number(data[key].requireProperties?.[0]["value"]) !== 2;
        if (data[key].requireProperties?.[0]["property"] === "music_metadata_version" && !isValidVersion) {
          return {
            requireProperties: [...DEFAULT_CIP25_REQUIRE, ...data[key].requireProperties],
            tokenName: data[key].tokenName,
            optionalProperties: []
          };
        }
        return data[key];
      });
    }
  }, [data]);

  const versionTooltip = (row: TTCIPProperties) => {
    if (row.property !== "music_metadata_version") return t("common.needsReview");
    return (Number(row.value) !== 1 || Number(row.value)) !== 2 ? t("cip.versionCheck") : "";
  };

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
          <CustomTooltip title={""}>
            <Typography display="inline-block" fontSize={14}>
              {getShortHash(r.value)}
            </Typography>
          </CustomTooltip>
        ) : (
          <CustomTooltip title={JSON.stringify(r.value)}>
            <Typography style={{ lineBreak: "anywhere" }} display="inline-block" maxWidth={120} fontSize={14}>
              {r.value && JSON.stringify(r.value)}
            </Typography>
          </CustomTooltip>
        )
    },
    {
      title: t("cip.compliance"),
      key: "compliance",
      render: (r) =>
        !isNil(r.valid) && (
          <Box pl={3}>
            <CustomTooltip title={r.valid ? t("common.passed") : versionTooltip(r)}>
              <Box display="inline-block">
                {r.valid ? <CheckedCIPIcon /> : <CustomIcon icon={CIP60WarningIcon} height={20} width={20} />}
              </Box>
            </CustomTooltip>
          </Box>
        )
    }
  ];
  const mixedoptionalProperties = (optionalProperties: TTCIPProperties[]) => {
    if (version) return [...optionalProperties, version];
    return optionalProperties;
  };

  return (
    <CustomModal
      modalContainerProps={{ style: { maxWidth: 920 } }}
      open={props.open}
      style={{ maxHeight: "unset" }}
      onClose={props.onClose}
      title={
        <CIPLabel>
          {t("token.cip60Title")} <ViewAllButtonExternal tooltipTitle={t("cip60.viewDocs")} to={CIP60_DOCS_URL} />
        </CIPLabel>
      }
    >
      <ModalContent>
        {tokenMaps.map((token, index) => (
          <React.Fragment key={index}>
            {token.tokenName && (
              <TokenLabel>
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
            {token.optionalProperties?.length > 0 && (
              <>
                <CIPModalSubtitle>{t("token.optionalProperties")}</CIPModalSubtitle>
                <Table
                  isModal
                  maxHeight="unset"
                  height="auto"
                  data={mixedoptionalProperties(token.optionalProperties)}
                  columns={columns}
                />
              </>
            )}
            <CIPModalSubtitle>{t("token.otherProperties")}</CIPModalSubtitle>
            <OtherPropetiesContent>
              <OtherPropetiesDesc>{t("token.cip60otherProperties.desc")}</OtherPropetiesDesc>
            </OtherPropetiesContent>
          </React.Fragment>
        ))}
      </ModalContent>
    </CustomModal>
  );
};

export default CIP60Modal;
