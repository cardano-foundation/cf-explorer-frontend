import { useTheme } from "@mui/material";
import { JsonViewer } from "@textea/json-viewer";

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

  return (
    <StyledCustomModal {...props} data-testid="parse-script-modal">
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
      <ViewJson maxHeight={subTitle ? "60vh" : "70vh"}>
        <JsonViewer
          value={getObject()}
          displayObjectSize={false}
          displayDataTypes={false}
          enableClipboard={false}
          collapseStringsAfterLength={false}
          style={{ padding: 0, background: "none", color: theme.palette.text.secondary }}
          rootName={false}
          theme={theme.mode}
        />
      </ViewJson>
    </StyledCustomModal>
  );
};

export default ParseScriptModal;
