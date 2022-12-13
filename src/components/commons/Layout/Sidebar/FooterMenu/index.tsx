import React from "react";
import { socials } from "../../../../../commons/menus";
import { List, styled, ListItem, SxProps, Theme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../stores/types";

export const Menu = styled(List)<{ open: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 20px);
  height: ${props => (props.open ? `60px` : `230px`)};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 15px;
  flex-direction: ${props => (props.open ? `row` : `column`)};
  @media screen and (max-width: 1023px) {
    position: relative;
    flex-direction: row;
    justify-content: flex-start;
    height: 60px;
  }
  padding: 10px;
  border-top: 1px solid ${props => (props.open ? props.theme.borderColor : "transparent")};
`;

export const MenuIcon = styled("img")<{ iconOnly?: boolean; active?: boolean; textOnly?: boolean }>`
  width: 16px;
  height: auto;
`;

const itemStyle: SxProps<Theme> = theme => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 30,
  height: 30,
  cursor: "pointer",
  borderRadius: 30,
  padding: 0,
  color: `${theme.footerColor} !important`,
  background: `${theme.colorGreenDark}16`,
  "&:hover": {
    background: `${theme.colorGreenDark}32`,
    color: `${theme.textColorPale} !important`,
    img: {
      filter: "brightness(0.75)",
    },
  },
});

const FooterMenu: React.FC = () => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  return (
    <Menu open={sidebar}>
      {socials.map((item, index) => {
        const { href, title, icon: Icon } = item;
        return (
          <ListItem
            key={index}
            button
            component="a"
            href={href}
            target="_blank"
            rel="noreferrer"
            title={title}
            sx={itemStyle}
          >
            {typeof Icon === "string" ? <MenuIcon src={Icon} alt={title} /> : <Icon size={16} />}
          </ListItem>
        );
      })}
    </Menu>
  );
};

export default FooterMenu;
