import { useState } from 'react';
import { useSelector } from 'react-redux';
import { authAxios } from '../../../../../commons/utils/axios';
import { NETWORK, NETWORKS, NETWORK_TYPES } from '../../../../../commons/utils/constants';
import { alphaNumeric, removeAuthInfo } from '../../../../../commons/utils/helper';
import { RootState } from '../../../../../stores/types';
import { setModalRegister } from '../../../../../stores/user';
import StyledModal from '../../../StyledModal';
import { Label, StyledTitle, TextError, TextNote, WrapButton } from './styles';
import { StyledInput, StyledDarkLoadingButton } from '../../../../share/styled';
import { FormHelperText } from '@mui/material';
import { NetworkType, useCardano } from '@cardano-foundation/cardano-connect-with-wallet';
import { existUserName } from '../../../../../commons/utils/userRequest';
import useToast from '../../../../../commons/hooks/useToast';
interface IProps {
  nonce: NonceObject | null;
  signature: string;
  open: boolean;
  setIsSign: (isSign: boolean) => void;
}
const RegisterUsernameModal: React.FC<IProps> = ({ open, signature, nonce, setIsSign }) => {
  const { disconnect } = useCardano({
    limitNetwork: NETWORK === NETWORKS.mainnet ? NetworkType.MAINNET : NetworkType.TESTNET
  });
  const { wallet, address } = useSelector(({ user }: RootState) => user);
  const [errorMessage, setErrorMessage] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async () => {
    try {
      setLoading(true);
      if (errorMessage) return;
      const payload = {
        id: nonce?.userId,
        username: value,
        wallet: {
          id: nonce?.walletId,
          address,
          networkType: NETWORK_TYPES[NETWORK],
          networkId: NETWORK_TYPES[NETWORK],
          walletName: wallet?.toUpperCase(),
          signature
        }
      };
      const { data: isExistUsername } = await existUserName({ username: value });
      if (!isExistUsername) {
        const { data } = await authAxios.post('auth/sign-up', payload);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('walletId', data.walletId);
        localStorage.setItem('email', data.email);
        setIsSign(true);
        setModalRegister(false);
      } else {
        setErrorMessage('This username is already taken, please choose another name');
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data.errorMessage);
      toast.error(error.response?.data.errorMessage || '');
      disconnect();
      removeAuthInfo();
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledModal
      open={open}
      handleCloseModal={() => {
        setModalRegister(false);
        disconnect();
        removeAuthInfo();
      }}
    >
      <>
        <StyledTitle>Enter your Username </StyledTitle>
        <TextNote>Please enter your Username to create a new unique one</TextNote>
        <Label required={true}>Username</Label>
        <br />
        <StyledInput
          placeholder='Username'
          value={value}
          style={{ width: '100%' }}
          onChange={(e) => {
            const val = e.target.value;
            if (alphaNumeric.test(val) || val.length < 5 || val.length > 30) {
              setErrorMessage('Please enter a valid username');
            } else {
              setErrorMessage('');
            }
            setValue(val);
          }}
        />
        <FormHelperText>
          Username has to be from 5 to 30 characters in length, only alphanumeric characters allowed
        </FormHelperText>
        <TextError>{errorMessage}</TextError>
        <WrapButton>
          <StyledDarkLoadingButton loading={loading} disabled={loading || !!errorMessage || !value} onClick={onSubmit}>
            Confirm
          </StyledDarkLoadingButton>
        </WrapButton>
      </>
    </StyledModal>
  );
};

export default RegisterUsernameModal;
