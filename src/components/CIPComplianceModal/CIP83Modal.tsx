import { Box, Typography } from "@mui/material";
import { isNil } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";

import { CIP60WarningIcon, CheckedCIPIcon } from "src/commons/resources";
import { CIP83_DOCS_URL } from "src/commons/utils/constants";
import { getShortHash } from "src/commons/utils/helper";
import CustomModal from "src/components/commons/CustomModal";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { Column } from "src/components/commons/Table";
import ViewAllButtonExternal from "src/components/commons/ViewAllButtonExternal";

import CustomIcon from "../commons/CustomIcon";
import {
  BoxTooltip,
  CIPLabel,
  CIPModalDesc,
  CIPModalSubtitle,
  ModalContent,
  OtherPropetiesContent,
  OtherPropetiesDesc,
  CIPPropertyTable,
  ButtonContainer
} from "./styles";

export type TCIP20ComplianceModalProps = {
  open: boolean;
  onClose: () => void;
  data?: Transaction["metadata"][0]["metadataCIP20"]["requiredProperties"];
};

const CIP83Modal: React.FC<TCIP20ComplianceModalProps> = (props) => {
  const { data } = props;
  const { t } = useTranslation();
  const getValueFormat = (r: TTCIPProperties) => {
    if (!r.value) return null;
    return r.valueFormat;
  };

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
          <CustomTooltip
            enterTouchDelay={0}
            leaveTouchDelay={50000}
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
      modalContainerProps={{ style: { maxWidth: "min(1000px, 98vw)" } }}
      open={props.open}
      style={{ maxHeight: "unset" }}
      onClose={props.onClose}
      title={
        <CIPLabel>
          <span>{t("token.cip83Title")}</span>
          <ButtonContainer>
            <ViewAllButtonExternal tooltipTitle={t("cip83.viewDocs")} to={CIP83_DOCS_URL} />
          </ButtonContainer>
        </CIPLabel>
      }
    >
      <ModalContent>
        <CIPModalDesc>{t("cip83.modal.desc")}</CIPModalDesc>
        <CIPModalSubtitle>{t("token.requiredProperties")}</CIPModalSubtitle>
        <CIPPropertyTable isModal height="auto" isFullTableHeight={true} data={data} columns={columns} />

        <CIPModalSubtitle>{t("token.otherProperties")}</CIPModalSubtitle>
        <OtherPropetiesContent>
          <OtherPropetiesDesc>{t("token.cip83otherProperties.desc")}</OtherPropetiesDesc>
        </OtherPropetiesContent>
      </ModalContent>
    </CustomModal>
  );
};

export default CIP83Modal;
