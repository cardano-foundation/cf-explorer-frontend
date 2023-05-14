import { NetworkType, useCardano } from '@cardano-foundation/cardano-connect-with-wallet';
import { MenuItem, Select, SelectChangeEvent, styled } from '@mui/material';
import React, { useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { listRouters } from '../../../../../commons/routers';
import { NETWORK, NETWORKS, NETWORK_NAMES, STORAGE_KEYS } from '../../../../../commons/utils/constants';
import { removeAuthInfo } from '../../../../../commons/utils/helper';
import StorageUtils from '../../../../../commons/utils/storage';
import { signOut } from '../../../../../commons/utils/userRequest';
import { useSelector } from 'react-redux';

const StyledSelect = styled(Select)`
  font-family: var(--font-family-title);
  border: 2px solid ${({ theme }) => theme.palette.border.hint};
  background: transparent;
  color: ${({ theme }) => theme.palette.text.secondary};
  border-radius: 8px;
  & > div {
    padding: 6.5px 12px;
    font-weight: var(--font-weight-bold);
    cursor: pointer;
  }
  & > fieldset {
    top: 0;
    border: none !important;
  }
  & > svg {
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: 20px;
  }
`;

const SelectNetwork: React.FC = () => {
  const { location } = useHistory();
  const { userData } = useSelector(({ user }: RootState) => user);
  const { disconnect } = useCardano({
    limitNetwork: NETWORK === NETWORKS.mainnet ? NetworkType.MAINNET : NetworkType.TESTNET
  });
  const [, , clearBookmark] = useLocalStorage<Bookmark[]>('bookmark', []);

  const refreshPage = () => {
    const currentPath = '/' + location.pathname?.split('/')[1];
    if (listRouters.includes(currentPath)) window.location.href = location.pathname;
    else window.location.href = '/';
  };

  const handleChange = async (e?: SelectChangeEvent<unknown>) => {
    try {
      if (userData) {
        await signOut({
          refreshJwt: localStorage.getItem('refreshToken') || '',
          username: localStorage.getItem('username') || ''
        });
        clearBookmark();
        disconnect();
        removeAuthInfo();
      }
    } catch (error) {
      //TO DO
      console.log(error);
    }
    if (e) StorageUtils.setNetwork(e.target.value as NETWORKS);
    refreshPage();
  };

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.NETWORK && e.oldValue !== e.newValue) handleChange();
    };
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  }, []);

  return (
    <StyledSelect
      data-testid='network-selection-dropdown'
      onChange={handleChange}
      value={NETWORK}
      IconComponent={BiChevronDown}
    >
      {Object.entries(NETWORK_NAMES).map(([value, name]) => (
        <MenuItem data-testid='network-options' key={value} value={value}>
          {name}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default SelectNetwork;
