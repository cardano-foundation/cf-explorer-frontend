import React from "react";
import { socials } from "../../../../../commons/menus";
import { List, styled, ListItem, SxProps, Theme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../stores/types";
import { RiShareLine } from "react-icons/ri";
import { setSidebar } from "../../../../../stores/user";
import CustomTooltip from "../../../CustomTooltip";

export const Menu = styled(List)<{ open: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 20px);
  height: 60px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 15px;
  flex-direction: row;
  padding: 0px 10px;
  border-top: 1px solid ${props => props.theme.borderColor};
  @media screen and (max-width: 1023px) {
    border-top: 0px;
    position: relative;
    justify-content: flex-start;
    padding: 10px 20px 20px;
    height: auto;
  }
`;

export const MenuIcon = styled("img")`
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
  color: `${theme.textColorLighter} !important`,
  background: theme.green_9_10,
  "&:hover": {
    background: theme.green_9_20,
    color: `${theme.textColorBold} !important`,
    img: {
      filter: "brightness(0.75)",
    },
  },
});

const expandStyle: SxProps<Theme> = theme => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: `${theme.green_2} !important`,
  fontSize: 30,
  width: 40,
  height: 40,
  cursor: "pointer",
  borderRadius: 40,
  padding: 0,
});

const FooterMenu: React.FC = () => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  return (
    <Menu open={sidebar ? 1 : 0}>
      {sidebar ? (
        socials.map((item, index) => {
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
        })
      ) : (
        <CustomTooltip placement="right" title="Expand">
          <ListItem
            button
            component="a"
            target="_blank"
            rel="noreferrer"
            sx={expandStyle}
            onClick={() => setSidebar(true)}
          >
            <RiShareLine />
          </ListItem>
        </CustomTooltip>
      )}
    </Menu>
  );
};

export default FooterMenu;
