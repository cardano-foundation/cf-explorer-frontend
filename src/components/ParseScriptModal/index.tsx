import { useTheme } from "@mui/material";
import { JsonViewer } from "@textea/json-viewer";
import { useEffect } from "react";

import useDisableJsonKey from "src/commons/hooks/useDisableJsonKey";

import { StyledCustomModal, SubTitle, ViewJson } from "./styles";
interface ParseScriptModalProps {
  open: boolean;
  onClose: () => void;
  script: string;
  title?: string;
  subTitle?: string;
}
const ParseScriptModal: React.FC<ParseScriptModalProps> = ({ script, subTitle, ...props }) => {
  const theme = useTheme();

  const getObject = () => {
    try {
      const objectData = JSON.parse(script);
      return objectData;
    } catch (error) {
      return script || "";
    }
  };

  useEffect(() => {
    trigger();
  }, [props.open]);

  const data = getObject();
  const { keyRenderer, trigger } = useDisableJsonKey(data);

  return (
    <StyledCustomModal {...props} data-testid="parse-script-modal">
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
      <ViewJson maxHeight={subTitle ? "60vh" : "70vh"}>
        <JsonViewer
          value={data}
          displayObjectSize={false}
          displayDataTypes={false}
          enableClipboard={false}
          collapseStringsAfterLength={false}
          rootName={false}
          theme={theme.isDark ? "dark" : "light"}
          keyRenderer={keyRenderer}
          style={{ wordBreak: "break-word", width: "98%", pointerEvents: "none" }}
        />
      </ViewJson>
    </StyledCustomModal>
  );
};

export default ParseScriptModal;
