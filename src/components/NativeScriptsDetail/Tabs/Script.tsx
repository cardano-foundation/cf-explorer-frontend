import React from "react";
import { JsonViewer } from "@textea/json-viewer";
import { useTheme } from "@mui/material";

import { Center, Container, Key, Value, VerifyScriptButton } from "./styles";

import { useNativeScriptDetail } from ".";

const Script: React.FC = () => {
  const { script } = useNativeScriptDetail();
  const theme = useTheme();
  const getScriptData = () => {
    if (script) return JSON.parse(script);
    return {};
  };
  return (
    <Container>
      {!script && (
        <Center>
          <Value>This script has not been verified. To verify, please click the button below.</Value>
          <VerifyScriptButton>Verify SCRIPT</VerifyScriptButton>
        </Center>
      )}
      {script && (
        <>
          <Key>Script:</Key>
          <JsonViewer
            value={getScriptData()}
            displayObjectSize={false}
            displayDataTypes={false}
            enableClipboard={false}
            collapseStringsAfterLength={false}
            rootName={false}
            theme={theme.isDark ? "dark" : "light"}
          />
        </>
      )}
    </Container>
  );
};

export default Script;
