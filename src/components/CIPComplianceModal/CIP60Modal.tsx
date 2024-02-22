import { Alert, Box, Typography, useTheme } from "@mui/material";
import { isEmpty, isNil } from "lodash";
import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { CIP60WarningIcon, CheckedCIPIcon } from "src/commons/resources";
import { CIP60_DOCS_URL } from "src/commons/utils/constants";
import { getShortHash } from "src/commons/utils/helper";
import CustomModal from "src/components/commons/CustomModal";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { Column } from "src/components/commons/Table";
import ViewAllButtonExternal from "src/components/commons/ViewAllButtonExternal";

import CustomIcon from "../commons/CustomIcon";
import {
  CIPLabel,
  CIPModalDesc,
  CIPModalSubtitle,
  ModalContent,
  OtherPropetiesContent,
  OtherPropetiesDesc,
  CIPPropertyTable,
  TokenLabel,
  ButtonContainer
} from "./styles";

export type TCIP60ComplianceModalProps = {
  open: boolean;
  onClose: () => void;
  data?: Transaction["metadata"][0]["metadataCIP25"]["tokenMap"];
  version?: Transaction["metadata"][0]["metadataCIP25"];
};

const DEFAULT_CIP60_REQUIRE = [
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
  const [showWarningVersion, setShowWarningVersion] = useState(false);
  const theme = useTheme();

  const versionTooltip = (row: TTCIPProperties) => {
    if (row.property !== "music_metadata_version") return t("common.needsReview");
    return (Number(row.value) !== 1 || Number(row.value)) !== 2 ? t("cip.versionCheck") : "";
  };
  const tokenMaps = useMemo(() => {
    if (isEmpty(data)) {
      return [{ requireProperties: DEFAULT_CIP60_REQUIRE, tokenName: null, optionalProperties: [] }];
    } else {
      return Object.keys(data).map((key) => {
        const inValidVersion =
          Number(data[key].requireProperties?.[0]["value"]) !== 1 ||
          Number(data[key].requireProperties?.[0]["value"]) !== 2;
        if (data[key].requireProperties?.[0]["property"] === "music_metadata_version" && inValidVersion) {
          return {
            requireProperties: [...DEFAULT_CIP60_REQUIRE, ...data[key].requireProperties],
            tokenName: data[key].tokenName,
            optionalProperties: []
          };
        }
        return data[key];
      });
    }
  }, [data]);

  const getValueFormat = (r: TTCIPProperties) => {
    if (!r.value) return null;
    return r.valueFormat;
  };

  useEffect(() => {
    if (tokenMaps) {
      tokenMaps.map((token) => {
        const property = token.requireProperties.find((property) => property.property === "music_metadata_version");
        if (property.value === 1) {
          setShowWarningVersion(true);
        }
      });
    }
  }, [JSON.stringify(tokenMaps)]);
  const columns: Column<TTCIPProperties>[] = [
    {
      title: "#",
      key: "index",
      minWidth: 30,
      render: (r) => r.index
    },
    {
      title: t("cip25.property"),
      key: "property",
      minWidth: 100,
      render: (r) => r.property
    },
    {
      title: t("cip.expectedFormat"),
      key: "format",
      minWidth: 130,
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
          <CustomTooltip title={typeof r.value === "object" && r.value !== null ? JSON.stringify(r.value) : r.value}>
            <Typography
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              display="inline-block"
              maxWidth={120}
              fontSize={14}
            >
              {typeof r.value === "object" && r.value !== null ? JSON.stringify(r.value) : r.value}
            </Typography>
          </CustomTooltip>
        );
      }
    },
    {
      title: t("cip.valueFormat"),
      key: "expectedFormat",
      minWidth: 130,
      render: (r) => getValueFormat(r)
    },
    {
      title: <Box textAlign={"center"}>{t("cip.result")}</Box>,
      key: "compliance",
      render: (r) =>
        !isNil(r.valid) && (
          <Box textAlign={"center"}>
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
      modalContainerProps={{ style: { maxWidth: "min(1100px, 98vw)" } }}
      open={props.open}
      style={{ maxHeight: "unset" }}
      onClose={props.onClose}
      title={
        <CIPLabel>
          <span>{t("token.cip60Title")}</span>
          <ButtonContainer>
            <ViewAllButtonExternal tooltipTitle={t("cip60.viewDocs")} to={CIP60_DOCS_URL} />
          </ButtonContainer>
        </CIPLabel>
      }
    >
      <ModalContent>
        <CIPModalDesc>{t("cip60.modal.subtitle")}</CIPModalDesc>
        {tokenMaps.map((token, index) => (
          <React.Fragment key={index}>
            {token.tokenName && (
              <TokenLabel>
                {t("glossary.Token")}: {token.tokenName}
              </TokenLabel>
            )}
            {showWarningVersion && (
              <Alert
                sx={{
                  bgcolor: theme.palette.warning[800],
                  color: theme.palette.warning[100],
                  mb: 1,
                  ".MuiAlert-icon": {
                    color: theme.palette.warning[100]
                  }
                }}
                severity="info"
              >
                {t("cip.warningVersion1")}
              </Alert>
            )}
            <CIPModalSubtitle>{t("token.requiredProperties")}</CIPModalSubtitle>
            <CIPPropertyTable
              isModal
              maxHeight="unset"
              height="auto"
              isFullTableHeight={true}
              data={token.requireProperties}
              columns={columns}
              showPagination={false}
            />
            {token.optionalProperties?.length > 0 && (
              <>
                <CIPModalSubtitle>{t("token.optionalProperties")}</CIPModalSubtitle>
                <CIPPropertyTable
                  isModal
                  maxHeight="unset"
                  height="auto"
                  data={mixedoptionalProperties(token.optionalProperties)}
                  columns={columns}
                  showPagination={false}
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
