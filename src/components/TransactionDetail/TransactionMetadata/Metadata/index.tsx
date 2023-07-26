import React, { useState } from "react";
import { Box } from "@mui/material";

import { getShortHash } from "src/commons/utils/helper";
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
  ValueText
} from "./styles";

interface MetadataProps {
  data?: Transaction["metadata"];
  hash?: Transaction["metadataHash"] | null;
}

const Metadata: React.FC<MetadataProps> = ({ hash, data }) => {
  const [selectedText, setSelectedText] = useState<{ label: number; value: string } | null>(null);
  const { isTablet } = useScreen();

  return (
    <Box>
      <Wrapper>
        <Header>
          <Box>Metadata Hash</Box>
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
            <Title>Metadatum Label</Title>
            <TitleValue>{metadata.label || ""}</TitleValue>
          </RowMetadata>
          <RowMetadata>
            <Title>Value</Title>
            <Value>
              <ValueText>{metadata.value || ""}</ValueText>
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
        script={selectedText?.value ? JSON.parse(selectedText?.value) : ""}
        title={`Key: ${selectedText?.label || 0}`}
        subTitle={"Value"}
      />
    </Box>
  );
};

export default Metadata;
