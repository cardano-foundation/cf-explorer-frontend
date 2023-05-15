import { Box } from '@mui/material';
import StyledModal from '../../../StyledModal';
import signMessage from '../../../../../commons/resources/images/sign-message.svg';
import { Description, ModalTitle } from './styles';
import { StyledDarkLoadingButton } from '../../../../share/styled';
type TProps = {
  open: boolean;
  loadingSubmit: boolean;
  handleCloseModal: () => void;
  onSignMessage: () => void;
};
const SignMessageModal: React.FC<TProps> = ({ open, loadingSubmit, handleCloseModal, onSignMessage }) => {
  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal}>
      <Box textAlign='center'>
        <img src={signMessage} alt='sign-message' />
        <ModalTitle>Signature Required!</ModalTitle>
        <Description>Please click on sign button to allow access to your public key </Description>
        <StyledDarkLoadingButton onClick={onSignMessage} loading={loadingSubmit} loadingPosition='end'>
          Sign
        </StyledDarkLoadingButton>
      </Box>
    </StyledModal>
  );
};

export default SignMessageModal;
