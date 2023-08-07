import { Collapse, Divider, ListItem, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { useWindowSize } from "react-use";

import { footerMenus, menus } from "src/commons/menus";
import { isExternalLink } from "src/commons/utils/helper";
import { setSidebar } from "src/stores/user";
import { RootState } from "src/stores/types";
import CustomTooltip from "src/components/commons/CustomTooltip";

import FooterMenu from "../FooterMenu";
import {
  FooterMenuContainer,
  IconMenu,
  Menu,
  MenuIcon,
  MenuText,
  SidebarMenuContainer,
  SubMenu,
  SubMenuText,
  itemStyle
} from "./styles";

const SidebarMenu: React.FC<RouteComponentProps> = ({ history }) => {
  const pathname = history.location.pathname;
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const specialPath = useSelector(({ system }: RootState) => system.specialPath);
  const { width } = useWindowSize(0);
  const theme = useTheme();

  const isActiveMenu = (href: string, isSpecialPath?: boolean): boolean => {
    if (href === pathname) return true;
    if (pathname.split("/").length > 2 && href.includes(pathname.split("/")[1])) {
      if (isSpecialPath) return href === specialPath;
      return true;
    }
    return false;
  };

  const getActive = () => {
    const active = menus.findIndex(
      ({ href, children }) =>
        (href && isActiveMenu(href)) ||
        children?.find(({ href, isSpecialPath }) => href && isActiveMenu(href, isSpecialPath))
    );
    if (active + 1) return `menu-${active}`;

    return "";
  };
  const [active, setActive] = useState<string | null>(getActive());

  useEffect(() => {
    if (!sidebar) setActive(null);
  }, [sidebar]);

  useEffect(() => {
    if (pathname === "/" || !sidebar) setActive(null);
    else setActive(getActive());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, sidebar, specialPath]);

  useEffect(() => {
    if (!sidebar && width >= theme.breakpoints.values.md) setSidebar(true);
    else if (sidebar && width < theme.breakpoints.values.md) setSidebar(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width >= theme.breakpoints.values.md]);

  useEffect(() => {
    if (width <= theme.breakpoints.values.md) setSidebar(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = (item: string) => {
    setActive(item !== active ? item : null);
    if (!sidebar) setSidebar(true);
  };

  return (
    <SidebarMenuContainer>
      <Menu>
        {menus.map((item, index) => {
          const { href, title, children, icon, tooltip } = item;
          const tooltipTitle = `${!sidebar ? `${title}${title && tooltip ? `: ` : ``}` : ``}${tooltip || ``}`;
          return (
            <React.Fragment key={index}>
              <CustomTooltip key={index} title={tooltipTitle} placement="right">
                {href ? (
                  <ListItem
                    button
                    data-testid={`menu-button-${title.toLowerCase().replaceAll(" ", "_")}`}
                    {...(isExternalLink(href)
                      ? { component: "a", href, target: "_blank" }
                      : { component: Link, to: href })}
                    selected={isActiveMenu(href)}
                    sx={(theme) => ({
                      ...itemStyle(theme, sidebar),
                      ...(isActiveMenu(href)
                        ? {
                            backgroundColor: (theme) => `${theme.palette.primary.main} !important`,
                            color: (theme) => theme.palette.secondary[0]
                          }
                        : { color: (theme) => theme.palette.secondary.light }),
                      fontWeight: "bold !important",
                      ":hover": isActiveMenu(href)
                        ? {
                            backgroundColor: `${theme.palette.primary.dark}  !important`
                          }
                        : { backgroundColor: `${theme.palette.primary[200]} !important` }
                    })}
                  >
                    {icon ? (
                      <MenuIcon
                        src={icon}
                        alt={title}
                        iconOnly={!sidebar ? 1 : 0}
                        active={isActiveMenu(href) ? 1 : 0}
                      />
                    ) : null}
                    <MenuText primary={title} open={sidebar ? 1 : 0} active={isActiveMenu(href) ? 1 : 0} />
                  </ListItem>
                ) : (
                  <ListItem
                    button
                    data-testid={`menu-button-${title.toLowerCase().replaceAll(" ", "_")}`}
                    onClick={() => children?.length && handleOpen(`menu-${index}`)}
                    sx={(theme) => ({
                      ...itemStyle(theme, sidebar),
                      ...(`menu-${index}` === active
                        ? {
                            backgroundColor: (theme) => `${theme.palette.primary.main} !important`,
                            color: (theme) => theme.palette.secondary[0]
                          }
                        : { color: (theme) => theme.palette.secondary.light }),
                      fontWeight: "bold !important",
                      ":hover":
                        `menu-${index}` === active
                          ? {
                              backgroundColor: `${theme.palette.primary.dark} !important`
                            }
                          : { backgroundColor: `${theme.palette.primary[200]} !important` }
                    })}
                  >
                    {icon ? (
                      <MenuIcon
                        src={icon}
                        alt={title}
                        iconOnly={!sidebar ? 1 : 0}
                        text={children?.length ? 1 : 0}
                        active={`menu-${index}` === active ? 1 : 0}
                      />
                    ) : null}
                    <MenuText
                      primary={title}
                      open={sidebar ? 1 : 0}
                      active={`menu-${index}` === active ? 1 : 0}
                      text={1}
                      disable={tooltipTitle ? 1 : 0}
                    />

                    {sidebar &&
                      (children?.length ? (
                        <IconMenu component={"span"}>
                          {`menu-${index}` === active ? <BiChevronRight size={18} /> : <BiChevronDown size={18} />}
                        </IconMenu>
                      ) : null)}
                  </ListItem>
                )}
              </CustomTooltip>
              {children?.length ? (
                <Collapse in={`menu-${index}` === active} timeout="auto" unmountOnExit>
                  <SubMenu disablePadding>
                    {children.map((subItem, subIndex) => {
                      const { href, title, icon, isSpecialPath } = subItem;
                      return href ? (
                        <ListItem
                          data-testid={`submenu-button-${title.toLowerCase().replaceAll(" ", "_")}`}
                          key={subIndex}
                          button
                          {...(isExternalLink(href)
                            ? { component: "a", href, target: "_blank" }
                            : { component: Link, to: href })}
                          selected={isActiveMenu(href, isSpecialPath)}
                          sx={(theme) => ({
                            ...itemStyle(theme, sidebar),
                            ...(isActiveMenu(href, isSpecialPath)
                              ? {
                                  backgroundColor: (theme) => `${theme.palette.primary[200]} !important`,
                                  color: (theme) => `${theme.palette.secondary.main} !important`
                                }
                              : { color: (theme) => theme.palette.secondary.light }),
                            paddingLeft: "70px",
                            [theme.breakpoints.down("md")]: {
                              paddingLeft: "60px"
                            },
                            ":hover": isActiveMenu(href, isSpecialPath)
                              ? {
                                  color: `#fff !important`
                                }
                              : {
                                  backgroundColor: (theme) => `${theme.palette.primary[200]} !important`
                                }
                          })}
                        >
                          {icon ? (
                            <MenuIcon
                              src={icon}
                              alt={title}
                              iconOnly={!sidebar ? 1 : 0}
                              active={isActiveMenu(href, isSpecialPath) ? 1 : 0}
                            />
                          ) : null}
                          <SubMenuText
                            primary={title}
                            open={sidebar ? 1 : 0}
                            active={+isActiveMenu(href, isSpecialPath)}
                          />
                        </ListItem>
                      ) : null;
                    })}
                  </SubMenu>
                </Collapse>
              ) : null}
            </React.Fragment>
          );
        })}
        <Divider
          sx={{
            margin: "10px 0px 10px 30px",
            width: sidebar ? 200 : 25,
            borderColor: theme.palette.primary[200],
            transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
            [theme.breakpoints.down("md")]: {
              marginLeft: "20px"
            }
          }}
        />
        {footerMenus.map((item, index) => {
          const { href, title, children, icon, tooltip } = item;
          const tooltipTitle = `${!sidebar ? `${title}${title && tooltip ? `: ` : ``}` : ``}${tooltip || ``}`;
          return (
            <React.Fragment key={index}>
              <CustomTooltip key={index} title={tooltipTitle} placement="right">
                {href ? (
                  <ListItem
                    button
                    {...(isExternalLink(href)
                      ? { component: "a", href, target: "_blank" }
                      : { component: Link, to: href })}
                    selected={isActiveMenu(href)}
                    sx={(theme) => ({
                      ...itemStyle(theme, sidebar),
                      ...(isActiveMenu(href)
                        ? {
                            backgroundColor: (theme) => `${theme.palette.primary.main} !important`,
                            color: (theme) => `${theme.palette.secondary[0]} !important`
                          }
                        : { color: (theme) => theme.palette.secondary.light }),
                      ":hover": isActiveMenu(href)
                        ? {
                            backgroundColor: `${theme.palette.primary.dark} !important`
                          }
                        : { backgroundColor: `${theme.palette.primary[200]} !important` }
                    })}
                  >
                    {icon ? (
                      <MenuIcon
                        src={icon}
                        alt={title}
                        iconOnly={!sidebar ? 1 : 0}
                        active={isActiveMenu(href) ? 1 : 0}
                      />
                    ) : null}
                    <MenuText primary={title} open={sidebar ? 1 : 0} active={isActiveMenu(href) ? 1 : 0} />
                  </ListItem>
                ) : (
                  <ListItem
                    button
                    onClick={() => handleOpen(`footer-${index}`)}
                    sx={(theme) => ({
                      ...itemStyle(theme, sidebar),
                      ...(`footer-${index}` === active
                        ? {
                            backgroundColor: (theme) => `${theme.palette.primary.main} !important`,
                            color: (theme) => theme.palette.secondary[0]
                          }
                        : { color: (theme) => theme.palette.secondary.light }),
                      fontWeight: "bold !important",
                      ":hover":
                        `footer-${index}` === active
                          ? {
                              backgroundColor: `${theme.palette.primary.dark} !important`
                            }
                          : { backgroundColor: `${theme.palette.primary[200]} !important` }
                    })}
                  >
                    {icon ? (
                      <MenuIcon
                        src={icon}
                        alt={title}
                        iconOnly={!sidebar ? 1 : 0}
                        text={children?.length ? 1 : 0}
                        active={`footer-${index}` === active ? 1 : 0}
                      />
                    ) : null}
                    <MenuText
                      primary={title}
                      open={sidebar ? 1 : 0}
                      active={`footer-${index}` === active ? 1 : 0}
                      text={1}
                    />
                    {sidebar &&
                      (children?.length ? (
                        <IconMenu component={"span"}>
                          {`footer-${index}` === active ? <BiChevronRight size={18} /> : <BiChevronDown size={18} />}
                        </IconMenu>
                      ) : null)}
                  </ListItem>
                )}
              </CustomTooltip>
              {children?.length ? (
                <Collapse in={`footer-${index}` === active} timeout="auto" unmountOnExit>
                  <SubMenu disablePadding>
                    {children.map((subItem, subIndex) => {
                      const { href, title, icon } = subItem;
                      return href ? (
                        <ListItem
                          key={subIndex}
                          button
                          {...(isExternalLink(href)
                            ? { component: "a", href, target: "_blank" }
                            : { component: Link, to: href })}
                          selected={isActiveMenu(href)}
                          sx={(theme) => ({
                            ...itemStyle(theme, sidebar),
                            ...(isActiveMenu(href)
                              ? { backgroundColor: (theme) => `${theme.palette.primary[200]} !important` }
                              : {}),
                            paddingLeft: "70px",
                            [theme.breakpoints.down("md")]: {
                              paddingLeft: "60px"
                            },
                            ":hover": {
                              backgroundColor: `${theme.palette.primary[200]} !important`
                            }
                          })}
                        >
                          {icon ? (
                            <MenuIcon
                              src={icon}
                              alt={title}
                              iconOnly={!sidebar ? 1 : 0}
                              active={isActiveMenu(href) ? 1 : 0}
                            />
                          ) : null}
                          <SubMenuText primary={title} open={sidebar ? 1 : 0} active={isActiveMenu(href) ? 1 : 0} />
                        </ListItem>
                      ) : null;
                    })}
                  </SubMenu>
                </Collapse>
              ) : null}
            </React.Fragment>
          );
        })}
      </Menu>
      <FooterMenuContainer>
        <FooterMenu />
      </FooterMenuContainer>
    </SidebarMenuContainer>
  );
};

export default withRouter(SidebarMenu);
