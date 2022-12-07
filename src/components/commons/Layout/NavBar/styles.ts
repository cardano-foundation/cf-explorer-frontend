import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { CollapseIcon } from "../../../../commons/resources";
import { NETWORKS } from "../../../../commons/utils/constants";

export const NavbarContainer = styled.nav`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding: 25px 0px 0px;
  text-align: left;
`;

export const BackDrop = styled.div<{ isShow: boolean }>`
  position: fixed;
  z-index: 997;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #0006;
  display: none;
  @media screen and (max-width: 1023px) {
    display: ${props => (props.isShow ? "block" : "none")};
  }
`;

export const HeaderTop = styled.div`
  position: relative;
  padding: 20px 0px;
  @media screen and (max-width: 1023px) {
    padding: 16px 0px;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 998;
    box-shadow: ${props => props.theme.shadowRaised};
  }
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const LogoLink = styled(Link)<{ open?: boolean }>`
  position: relative;
  display: block;
  margin-left: ${props => (props.open ? 30 : 15)}px;
  margin-bottom: 30px;
  width: max-content;
`;

export const NavBarLogo = styled.img`
  height: 50px;
  width: auto;
`;

export const NetworkName = styled.small<{ network: keyof typeof NETWORKS }>`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateY(50%);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-title);
  color: ${props => {
    switch (props.network) {
      case "mainnet": {
        return props.theme.colorGreenLight;
      }
      case "preprod": {
        return props.theme.colorBlue;
      }
      case "preview": {
        return props.theme.colorBlue;
      }
      default: {
        return props.theme.colorYellow;
      }
    }
  }};
  text-transform: uppercase;
`;

export const Collapse = styled.i`
  width: 30px;
  height: 30px;
  background-image: url(${CollapseIcon});
  display: none;
  @media screen and (max-width: 1023px) {
    display: block;
  }
`;

export const HeaderBar = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--menu-item-gap);
  @media screen and (max-width: 1023px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    position: absolute;
    z-index: 999;
    top: 100%;
    right: ${props => (props.active ? "0%" : "100%")};
    width: 100%;
    background-color: #ffffff;
    color: ${props => props.theme.textColor};
    gap: 15px;
    box-shadow: ${props => props.theme.shadowRaised};  
`;

export const HeaderMain = styled.div<{ isHome: boolean }>`
  position: relative;
  text-align: center;
  padding: ${props => (props.isHome ? "80px 0px 170px" : "20px 0px")};
  & > div {
    padding-top: ${props => (props.isHome ? "0px" : "30px")};
    margin-bottom: ${props => (props.isHome ? "0px" : "calc(-25px - 1.5715rem)")};
  }
  @media screen and (max-width: 767px) {
    padding: 62px 0px 48px;
    padding: ${props => (props.isHome ? "62px 0px 48px" : "20px 0px")};
  }
`;

export const Title = styled.h1<{ isHome: boolean }>`
  color: ${props => props.theme.textColorReverse};
  display: ${props => (props.isHome ? "block" : "none")};
  @media screen and (max-width: 767px) {
    font-size: 30px;
  }
`;
