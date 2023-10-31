import React, { useEffect } from "react";
import { JsonViewer } from "@textea/json-viewer";
import { useTheme } from "@mui/material";

import useDisableJsonKey from "src/commons/hooks/useDisableJsonKey";

import { Center, Container, Key, Value, VerifyScriptButton } from "./styles";

import { useNativeScriptDetail } from ".";

const Script: React.FC = () => {
  const { script } = useNativeScriptDetail();
  const theme = useTheme();
  const getScriptData = () => {
    if (script) return JSON.parse(script);
    return {};
  };
  const data = getScriptData();
  const { keyRenderer, trigger } = useDisableJsonKey(data);
  useEffect(() => {
    trigger();
  }, [data]);

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
            keyRenderer={keyRenderer}
          />
        </>
      )}
    </Container>
  );
};

export default Script;
