import { Box, useTheme, Modal } from '@mui/material';
import { JsonViewer } from '@textea/json-viewer';
import { ButtonClose, ModalContainer, ViewJson } from './styles';
import closeIcon from '../../commons/resources/icons/closeIcon.svg';

interface ParseScriptModalProps {
  open: boolean;
  onClose: () => void;
  script: string;
  title?: string;
}
const ParseScriptModal: React.FC<ParseScriptModalProps> = ({ title, script, ...props }) => {
  const theme = useTheme();
  return (
    <Modal {...props}>
      <ModalContainer>
        <ButtonClose onClick={props.onClose}>
          <img src={closeIcon} alt='icon close' />
        </ButtonClose>
        <Box
          textAlign={'left'}
          color={({ palette }) => palette.grey[700]}
          fontSize='1.5rem'
          fontWeight='bold'
          fontFamily={'"Roboto", sans-serif '}
        >
          {title}
        </Box>

        <Box mt={2} mb={1} color={({ palette }) => palette.grey[500]}>
          Policy script:
        </Box>
        <ViewJson>
          <JsonViewer
            value={script || ''}
            // value={JSON.parse(script || "")}
            displayObjectSize={false}
            displayDataTypes={false}
            enableClipboard={false}
            collapseStringsAfterLength={false}
            style={{ padding: 0, background: 'none', color: theme.palette.text.secondary }}
            rootName={false}
          />
        </ViewJson>
      </ModalContainer>
    </Modal>
  );
};

export default ParseScriptModal;
