import React, { useEffect } from "react";
import { JsonViewer } from "@textea/json-viewer";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import useDisableJsonKey from "src/commons/hooks/useDisableJsonKey";

import { Center, Container, Key, Value, VerifyScriptButton } from "./styles";

import { useNativeScriptDetail } from ".";

export type TScriptProps = {
  onVerifyScriptOpen?: () => void;
};

const Script: React.FC<TScriptProps> = ({ onVerifyScriptOpen }) => {
  const { t } = useTranslation();
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
          <Value>{t("common.verifyScriptDesc")}</Value>
          <VerifyScriptButton onClick={() => onVerifyScriptOpen?.()}>{t("common.verifyScript")}</VerifyScriptButton>
        </Center>
      )}
      {script && (
        <>
          <Key data-testid="sc.scriptTab">{t("common.script")}:</Key>
          <JsonViewer
            value={data}
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
