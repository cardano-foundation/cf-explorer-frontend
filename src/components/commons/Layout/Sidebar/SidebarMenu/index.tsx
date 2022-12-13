import React, { useState, useEffect } from "react";
import { menus } from "../../../../../commons/menus";
import { Menu, MenuIcon, MenuText, NavbarMenuBottom, SubMenu, SubMenuText } from "./styles";
import { Collapse, ListItem, SxProps } from "@mui/material";
import { isExtenalLink } from "../../../../../commons/utils/helper";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import SelectNetwork from "../../Header/SelectNetwork";
import ConnectWallet from "../../Header/ConnectWallet";
import { useWindowSize } from "react-use";
import { setSidebar } from "../../../../../stores/user";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../stores/types";
import FooterMenu from "../FooterMenu";

const itemStyle: SxProps = {
  minHeight: 48,
  padding: "8px 20px 8px 30px",
  cursor: "pointer",
  marginBottom: "5px",
};

const SidebarMenu: React.FC<RouteComponentProps> = ({ history }) => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const { width } = useWindowSize(0);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (!sidebar) setActive(null);
  }, [sidebar]);

  useEffect(() => {
    if (!sidebar && width > 1023) setSidebar(true);
    else if (sidebar && width <= 1023) setSidebar(false);
  }, [width > 1023]);

  const handleOpen = (index: number) => {
    setActive(index !== active ? index : null);
    if (!sidebar) setSidebar(true);
  };

  const pathname = history.location.pathname;

  return (
    <Collapse in={width > 1023 ? true : sidebar} timeout="auto" unmountOnExit>
      <Menu open={sidebar}>
        {menus.map((item, index) => {
          const { href, title, children, icon } = item;
          return (
            <>
              {href ? (
                isExtenalLink(href) ? (
                  <ListItem
                    key={index}
                    button
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    title={title}
                    sx={theme => ({
                      ...itemStyle,
                      justifyContent: sidebar ? "initial" : "center",
                      [theme.breakpoints.down(1023)]: {
                        padding: "5px 20px",
                        marginBottom: 0,
                      },
                    })}
                  >
                    {icon ? <MenuIcon src={icon} alt={title} iconOnly={!sidebar} /> : null}
                    <MenuText primary={title} open={sidebar} />
                  </ListItem>
                ) : (
                  <ListItem
                    key={index}
                    button
                    component={Link}
                    to={href}
                    selected={pathname === href}
                    sx={theme => ({
                      ...itemStyle,
                      justifyContent: sidebar ? "initial" : "center",
                      ...(pathname === href ? { backgroundColor: theme => `${theme.colorGreen} !important` } : {}),
                      [theme.breakpoints.down(1023)]: {
                        padding: "5px 20px",
                        marginBottom: 0,
                      },
                    })}
                  >
                    {icon ? <MenuIcon src={icon} alt={title} iconOnly={!sidebar} active={pathname === href} /> : null}
                    <MenuText primary={title} open={sidebar} active={pathname === href} />
                  </ListItem>
                )
              ) : (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleOpen(index)}
                  sx={theme => ({
                    ...itemStyle,
                    justifyContent: sidebar ? "initial" : "center",
                    ...(index === active
                      ? {
                          backgroundColor: theme => `${theme.colorGreenPale} !important`,
                          color: theme => theme.colorGreen,
                        }
                      : { color: theme => theme.textColorPale }),
                    [theme.breakpoints.down(1023)]: {
                      padding: "5px 20px",
                      marginBottom: 0,
                    },
                  })}
                >
                  {icon ? (
                    <MenuIcon
                      src={icon}
                      alt={title}
                      iconOnly={!sidebar}
                      textOnly={!!children?.length}
                      active={index === active}
                    />
                  ) : null}
                  <MenuText primary={title} open={sidebar} active={index === active} textOnly />
                  {children?.length ? index === active ? <BiChevronUp size={24} /> : <BiChevronDown size={24} /> : null}
                </ListItem>
              )}
              {children?.length ? (
                <Collapse in={index === active} timeout="auto" unmountOnExit>
                  <SubMenu disablePadding>
                    {children.map((subItem, subIndex) => {
                      const { href, title, icon } = subItem;
                      return href ? (
                        isExtenalLink(href) ? (
                          <ListItem
                            key={subIndex}
                            button
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            title={title}
                            sx={theme => ({
                              ...itemStyle,
                              justifyContent: sidebar ? "initial" : "center",
                              paddingLeft: "70px",
                              [theme.breakpoints.down(1023)]: {
                                padding: "5px 20px",
                                paddingLeft: "60px",
                                marginBottom: 0,
                              },
                            })}
                          >
                            {icon ? <MenuIcon src={icon} alt={title} iconOnly={!sidebar} /> : null}
                            <SubMenuText primary={title} open={sidebar} />
                          </ListItem>
                        ) : (
                          <ListItem
                            key={subIndex}
                            button
                            component={Link}
                            to={href}
                            selected={pathname === href}
                            sx={theme => ({
                              ...itemStyle,
                              justifyContent: sidebar ? "initial" : "center",
                              ...(pathname === href
                                ? { backgroundColor: theme => `${theme.colorGreen} !important` }
                                : {}),
                              paddingLeft: "70px",
                              [theme.breakpoints.down(1023)]: {
                                padding: "5px 20px",
                                paddingLeft: "60px",
                                marginBottom: 0,
                              },
                            })}
                          >
                            {icon ? (
                              <MenuIcon src={icon} alt={title} iconOnly={!sidebar} active={pathname === href} />
                            ) : null}
                            <SubMenuText primary={title} open={sidebar} active={pathname === href} />
                          </ListItem>
                        )
                      ) : null;
                    })}
                  </SubMenu>
                </Collapse>
              ) : null}
            </>
          );
        })}
      </Menu>
      <NavbarMenuBottom>
        <SelectNetwork />
        <ConnectWallet />
      </NavbarMenuBottom>
      <FooterMenu/>
    </Collapse>
  );
};

export default withRouter(SidebarMenu);
