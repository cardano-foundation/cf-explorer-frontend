import { Box, useTheme, Modal } from "@mui/material";
import { JsonViewer } from "@textea/json-viewer";

import { CloseIcon } from "src/commons/resources";

import { ButtonClose, ModalContainer, ViewJson } from "./styles";

interface ParseScriptModalProps {
  open: boolean;
  onClose: () => void;
  script: string;
  title?: string;
  subTitle?: string;
}
const ParseScriptModal: React.FC<ParseScriptModalProps> = ({ title, script, subTitle, ...props }) => {
  const theme = useTheme();
  return (
    <Modal {...props}>
      <ModalContainer>
        <ButtonClose onClick={props.onClose}>
          <img src={CloseIcon} alt="icon close" />
        </ButtonClose>
        <Box
          mb={3}
          textAlign={"left"}
          color={({ palette }) => palette.secondary.main}
          fontSize="1.5rem"
          fontWeight="bold"
          fontFamily={'"Roboto", sans-serif '}
        >
          {title}
        </Box>

        {subTitle && (
          <Box color={({ palette }) => palette.secondary.main} mb={1}>
            {subTitle}
          </Box>
        )}
        <ViewJson>
          <JsonViewer
            value={script ? script : ""}
            displayObjectSize={false}
            displayDataTypes={false}
            enableClipboard={false}
            collapseStringsAfterLength={false}
            style={{ padding: 0, background: "none", color: theme.palette.text.secondary }}
            rootName={false}
          />
        </ViewJson>
      </ModalContainer>
    </Modal>
  );
};

export default ParseScriptModal;
