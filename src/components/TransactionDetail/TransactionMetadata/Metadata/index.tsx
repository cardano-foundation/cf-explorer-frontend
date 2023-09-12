import React, { useState } from "react";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import { getShortHash, isJson } from "src/commons/utils/helper";
import { useScreen } from "src/commons/hooks/useScreen";
import CopyButton from "src/components/commons/CopyButton";
import ParseScriptModal from "src/components/ParseScriptModal";
import { SeeMoreIcon } from "src/commons/resources";

import {
  Wrapper,
  Header,
  RowMetadata,
  Title,
  Value,
  ViewAllImage,
  StyledButton,
  TitleValue,
  MetaDataValue
} from "./styles";

interface MetadataProps {
  data?: Transaction["metadata"];
  hash?: Transaction["metadataHash"] | null;
}

const Metadata: React.FC<MetadataProps> = ({ hash, data }) => {
  const { t } = useTranslation();
  const [selectedText, setSelectedText] = useState<{ label: number; value: string } | null>(null);
  const { isTablet } = useScreen();

  return (
    <Box>
      <Wrapper>
        <Header>
          <Box>{t("common.metadataHash")}</Box>
        </Header>
        <Box
          textAlign={"left"}
          fontWeight={"bold"}
          display={"block"}
          pt={2}
          color={({ palette }) => `${palette.secondary.main}  !important`}
        >
          {isTablet ? getShortHash(hash || "") : hash}
          <CopyButton text={hash || ""} />
        </Box>
      </Wrapper>
      {(data || [])?.map((metadata, idx) => (
        <Wrapper mt={2} key={idx}>
          <RowMetadata>
            <Title>{t("common.metadatumLabel")}</Title>
            <TitleValue>{metadata.label || ""}</TitleValue>
          </RowMetadata>
          <RowMetadata>
            <Title>{t("common.value")}</Title>
            <Value>
              <MetaDataValue>{metadata.value || ""}</MetaDataValue>
              <StyledButton onClick={() => setSelectedText(metadata)}>
                <ViewAllImage src={SeeMoreIcon} alt="view all" />
              </StyledButton>
            </Value>
          </RowMetadata>
        </Wrapper>
      ))}
      <ParseScriptModal
        open={!!selectedText}
        onClose={() => setSelectedText(null)}
        script={
          selectedText?.value && isJson(selectedText?.value) ? JSON.parse(selectedText?.value) : selectedText?.value
        }
        title={`${t("common.key")}: ${selectedText?.label || 0}`}
        subTitle={t("common.value")}
      />
    </Box>
  );
};

export default Metadata;
