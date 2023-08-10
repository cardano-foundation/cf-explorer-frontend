import React, { useState, useEffect, useMemo } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Collapse, ListItem } from "@mui/material";

import { footerMenus, menus } from "src/commons/menus";
import { isExternalLink } from "src/commons/utils/helper";
import { setSidebar } from "src/stores/user";
import { RootState } from "src/stores/types";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { useScreen } from "src/commons/hooks/useScreen";

import FooterMenu from "../FooterMenu";
import {
  Menu,
  MenuIcon,
  MenuText,
  SubMenu,
  SubMenuText,
  itemStyle,
  IconMenu,
  SidebarMenuContainer,
  FooterMenuContainer,
  StyledDivider
} from "./styles";

const SidebarMenu: React.FC<RouteComponentProps> = ({ history }) => {
  const pathname = history.location.pathname;
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const specialPath = useSelector(({ system }: RootState) => system.specialPath);
  const { isTablet } = useScreen();

  const isActiveMenu = (href: string, isSpecialPath?: boolean): boolean => {
    if (href === pathname) return true;
    if (pathname.split("/").length > 2 && href.includes(pathname.split("/")[1])) {
      if (isSpecialPath) return href === specialPath;
      return true;
    }
    return false;
  };

  const currentActive = useMemo(() => {
    const active = menus.findIndex(
      ({ href, children }) =>
        (href && isActiveMenu(href)) ||
        children?.find(({ href, isSpecialPath }) => href && isActiveMenu(href, isSpecialPath))
    );
    if (active + 1) return `menu-${active}`;

    const footerActive = footerMenus.findIndex(
      ({ href, children }) =>
        (href && isActiveMenu(href)) ||
        children?.find(({ href, isSpecialPath }) => href && isActiveMenu(href, isSpecialPath))
    );
    if (footerActive + 1) return `footer-${footerActive}`;

    return "";

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, specialPath]);

  const [active, setActive] = useState<string | null>(currentActive);

  useEffect(() => {
    setActive(sidebar ? active || currentActive : null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebar, specialPath]);

  useEffect(() => {
    if (pathname === "/") setActive(null);
  }, [pathname, setActive]);

  useEffect(() => {
    if (!sidebar && !isTablet) setSidebar(true);
    else if (sidebar && isTablet) setSidebar(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTablet]);

  useEffect(() => {
    if (isTablet) setSidebar(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = (item: string) => {
    setActive(!sidebar || item !== active ? item : currentActive);
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
                      <MenuIcon src={icon} alt={title} iconOnly={+!sidebar} active={+isActiveMenu(href)} />
                    ) : null}
                    <MenuText primary={title} open={+sidebar} active={+isActiveMenu(href)} />
                  </ListItem>
                ) : (
                  <ListItem
                    button
                    data-testid={`menu-button-${title.toLowerCase().replaceAll(" ", "_")}`}
                    onClick={() => children?.length && handleOpen(`menu-${index}`)}
                    sx={(theme) => ({
                      ...itemStyle(theme, sidebar),
                      ...(`menu-${index}` === active || `menu-${index}` === currentActive
                        ? {
                            backgroundColor: (theme) => `${theme.palette.primary.main} !important`,
                            color: (theme) => theme.palette.secondary[0]
                          }
                        : { color: (theme) => theme.palette.secondary.light }),
                      fontWeight: "bold !important",
                      ":hover":
                        `menu-${index}` === active || `menu-${index}` === currentActive
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
                        iconOnly={+!sidebar}
                        active={+(`menu-${index}` === active || `menu-${index}` === currentActive)}
                      />
                    ) : null}
                    <MenuText
                      primary={title}
                      open={+sidebar}
                      active={+(`menu-${index}` === active || `menu-${index}` === currentActive)}
                      disable={+!!tooltipTitle}
                    />

                    {sidebar && children?.length ? (
                      <IconMenu component={"span"}>
                        {`menu-${index}` === active ? <BiChevronUp size={18} /> : <BiChevronDown size={18} />}
                      </IconMenu>
                    ) : null}
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
                              iconOnly={+!sidebar}
                              active={+isActiveMenu(href, isSpecialPath)}
                            />
                          ) : null}
                          <SubMenuText primary={title} open={+sidebar} active={+isActiveMenu(href, isSpecialPath)} />
                        </ListItem>
                      ) : null;
                    })}
                  </SubMenu>
                </Collapse>
              ) : null}
            </React.Fragment>
          );
        })}
        <StyledDivider sidebar={+sidebar} />
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
                      <MenuIcon src={icon} alt={title} iconOnly={+!sidebar} active={+isActiveMenu(href)} />
                    ) : null}
                    <MenuText primary={title} open={+sidebar} active={+isActiveMenu(href)} />
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
                      <MenuIcon src={icon} alt={title} iconOnly={+!sidebar} active={+(`footer-${index}` === active)} />
                    ) : null}
                    <MenuText primary={title} open={+sidebar} active={+(`footer-${index}` === active)} />
                    {sidebar &&
                      (children?.length ? (
                        <IconMenu component={"span"}>
                          {`footer-${index}` === active ? <BiChevronUp size={18} /> : <BiChevronDown size={18} />}
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
                            <MenuIcon src={icon} alt={title} iconOnly={+!sidebar} active={+isActiveMenu(href)} />
                          ) : null}
                          <SubMenuText primary={title} open={+sidebar} active={+isActiveMenu(href)} />
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
