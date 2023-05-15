import React from 'react';
import { styled, Container } from '@mui/material';
import { APP_VERSION } from '../../../../commons/utils/constants';
import FooterMenu from '../Sidebar/FooterMenu';
import { useScreen } from '../../../../commons/hooks/useScreen';

const StyledFooter = styled('footer')`
  height: 60px;
  padding: 0px 10px;
  border-top: 1px solid ${(props) => props.theme.palette.border.main};
  @media screen and (max-width: 1023px) {
    height: unset;
    padding: 10px;
  }
`;

const FooterContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: 60px;
  max-width: unset !important;
  @media screen and (max-width: 1023px) {
    height: unset;
  }
`;

const Copyright = styled('small')`
  color: ${(props) => props.theme.palette.grey[400]};
  font-family: var(--font-family-title);
  ::first-letter {
    font-size: 1em;
    vertical-align: top;
    margin-right: 2px;
  }
  @media screen and (max-width: 1023px) {
    width: 100%;
    text-align: center;
  }
`;

const Footer: React.FC = () => {
  const { isTablet } = useScreen();
  return (
    <StyledFooter>
      <FooterContainer>
        {isTablet && <FooterMenu forceShow={true} />}
        <Copyright>
          {' '}
          &copy; {new Date().getFullYear()} Cardano Blockchain Explorer. All rights reserved. Version: {APP_VERSION}
        </Copyright>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
