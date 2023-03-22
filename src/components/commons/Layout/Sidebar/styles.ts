import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { MenuIcon } from "../../../../commons/resources";
import { NETWORKS } from "../../../../commons/utils/constants";

export const NavbarContainer = styled.nav`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding: 25px 0px 60px;
  text-align: left;
  @media screen and (max-width: 1023px) {
    height: auto;
    background-color: ${props => props.theme.palette.background.paper};
    padding: 0px;
  }
`;

export const HeaderTop = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 998;
  @media screen and (max-width: 1023px) {
    padding: 15px;
  }
`;

export const LogoLink = styled(Link)<{ open?: number }>`
  position: relative;
  display: block;
  margin-left: ${props => (props.open ? 30 : 15)}px;
  margin-bottom: 30px;
  width: max-content;
  min-width: 176px;
  height: 50px;
  @media screen and (max-width: 1023px) {
    margin: 0;
  }
`;

export const NavBarLogo = styled.img`
  height: 50px;
  width: auto;
`;

export const NetworkName = styled.small<{ network: keyof typeof NETWORKS }>`
  position: absolute;
  bottom: 2px;
  right: 0;
  transform: translateY(50%);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-title);
  color: ${props => {
    switch (props.network) {
      case NETWORKS.mainnet: {
        return props.theme.palette.primary.main;
      }
      case NETWORKS.preprod: {
        return props.theme.palette.secondary.main;
      }
      case NETWORKS.preview: {
        return props.theme.palette.secondary.main;
      }
      default: {
        return props.theme.palette.warning.main;
      }
    }
  }};
  text-transform: uppercase;
`;

export const Toggle = styled.i`
  width: 30px;
  height: 30px;
  background-image: url(${MenuIcon});
  display: none;
  @media screen and (max-width: 1023px) {
    display: block;
  }
`;
