import React from "react";
import { useSelector } from "react-redux";
import { LogoMobileIcon } from "../../../../commons/resources";
import { RootState } from "../../../../stores/types";
import NavBarMenu from "./NavBarMenu";
import { NavbarContainer, NavBarLogo, LogoLink, NetworkName } from "./styles";

interface Props {
  open: boolean;
}

const Navbar: React.FC<Props> = ({ open }) => {
  const { network } = useSelector(({ user }: RootState) => user);

  return (
    <NavbarContainer>
      <LogoLink to="/" open={open}>
        <NavBarLogo src={LogoMobileIcon} alt="logo desktop" />
        <NetworkName network={network}>{network}</NetworkName>
      </LogoLink>
      <NavBarMenu open={open} />
    </NavbarContainer>
  );
};

export default Navbar;
