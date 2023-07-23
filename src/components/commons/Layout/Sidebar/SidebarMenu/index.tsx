import React, { useState, useEffect } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useWindowSize } from "react-use";
import { useSelector } from "react-redux";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Collapse, Divider, ListItem, useTheme } from "@mui/material";

import { footerMenus, menus } from "src/commons/menus";
import { isExtenalLink } from "src/commons/utils/helper";
import { setSidebar } from "src/stores/user";
import { RootState } from "src/stores/types";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { routers } from "src/commons/routers";

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
  FooterMenuContainer
} from "./styles";

const SidebarMenu: React.FC<RouteComponentProps> = ({ history }) => {
  const pathname = history.location.pathname;
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const { width } = useWindowSize(0);
  const theme = useTheme();

  const getActive = () => {
    const active = menus.findIndex((menu) => {
      return menu?.children?.find((r) => {
        return pathname.split("/").length > 2 ? r.href?.includes(pathname.split("/")[1]) : r.href === pathname;
      });
    });

    if (active !== -1) {
      return `menu-${active}`;
    }

    return "";
  };

  const [active, setActive] = useState<string | null>(getActive());

  useEffect(() => {
    if (!sidebar) setActive(null);
  }, [sidebar]);

  useEffect(() => {
    if (pathname === "/" || !sidebar) {
      setActive(null);
    } else if (
      sidebar &&
      (pathname.startsWith("/stake/") ||
        pathname.startsWith("/transaction/") ||
        pathname.startsWith("/stake-key/") ||
        pathname.startsWith("/block/") ||
        pathname.startsWith("/epoch/") ||
        pathname.startsWith("/token/") ||
        pathname.startsWith("/contracts/") ||
        pathname.startsWith("/delegation-pool/") ||
        pathname.startsWith("/policy/"))
    ) {
      setActive("menu-0");
    }
  }, [pathname, sidebar]);

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

  const isActiveSubMenu = (href: string, categoryName?: string): boolean => {
    if (categoryName === "Operational Certificates") return pathname === href;

    if (pathname.startsWith("/stake/") && href === routers.ADDRESS_LIST) return true;
    if (pathname.startsWith("/stake-key/") && href === routers.ADDRESS_LIST) return true;
    if (pathname.startsWith("/policy/") && href === routers.TOKEN_LIST) return true;

    return (
      pathname === href ||
      (pathname.split("/").length > 2 && href.includes(pathname.split("/")[1])) ||
      (href === "/timeline" && (pathname.includes("delegator-lifecycle") || pathname.includes("spo-lifecycle")))
    );
  };

  const isActiveMenu = (href: string): boolean => {
    if (
      href === routers.STAKING_LIFECYCLE.replace(":tab", "stake-key") &&
      (pathname.startsWith("/delegator-lifecycle/") ||
        pathname.startsWith("/spo-lifecycle/") ||
        pathname.startsWith("/report-generated/") ||
        pathname === routers.STAKING_LIFECYCLE.replace(":tab", "pools"))
    )
      return true;

    return pathname === href;
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
                  isExtenalLink(href) ? (
                    <ListItem
                      data-testid={`menu-button-${title.toLowerCase().replaceAll(" ", "_")}`}
                      button
                      onClick={() => window.open(href, "_blank")}
                      sx={(theme) => itemStyle(theme, sidebar)}
                    >
                      {icon ? <MenuIcon src={icon} alt={title} iconOnly={!sidebar ? 1 : 0} /> : null}
                      <MenuText primary={title} open={sidebar ? 1 : 0} />
                    </ListItem>
                  ) : (
                    <ListItem
                      button
                      data-testid={`menu-button-${title.toLowerCase().replaceAll(" ", "_")}`}
                      component={Link}
                      to={href}
                      selected={isActiveMenu(href)}
                      sx={(theme) => ({
                        ...itemStyle(theme, sidebar),
                        ...(isActiveMenu(href) ? { backgroundColor: `${theme.palette.primary.main} !important` } : {})
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
                  )
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
                        : { color: (theme) => theme.palette.secondary.light })
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
                          {`menu-${index}` === active ? <BiChevronUp size={18} /> : <BiChevronDown size={18} />}
                        </IconMenu>
                      ) : null)}
                  </ListItem>
                )}
              </CustomTooltip>
              {children?.length ? (
                <Collapse in={`menu-${index}` === active} timeout="auto" unmountOnExit>
                  <SubMenu disablePadding>
                    {children.map((subItem, subIndex) => {
                      const { href, title, icon } = subItem;
                      return href ? (
                        isExtenalLink(href) ? (
                          <ListItem
                            data-testid={`submenu-button-${title.toLowerCase().replaceAll(" ", "_")}`}
                            key={subIndex}
                            button
                            onClick={() => window.open(href, "_blank")}
                            sx={(theme) => ({
                              ...itemStyle(theme, sidebar),
                              paddingLeft: "70px",
                              [theme.breakpoints.down("md")]: {
                                paddingLeft: "60px"
                              }
                            })}
                          >
                            {icon ? <MenuIcon src={icon} alt={title} iconOnly={!sidebar ? 1 : 0} /> : null}
                            <SubMenuText primary={title} open={sidebar ? 1 : 0} />
                          </ListItem>
                        ) : (
                          <ListItem
                            data-testid={`submenu-button-${title.toLowerCase().replaceAll(" ", "_")}`}
                            key={subIndex}
                            button
                            component={Link}
                            to={href}
                            selected={pathname === href}
                            sx={(theme) => ({
                              ...itemStyle(theme, sidebar),
                              ...(isActiveSubMenu(href, item.title)
                                ? { backgroundColor: (theme) => `${theme.palette.primary[200]} !important` }
                                : {}),
                              paddingLeft: "70px",
                              [theme.breakpoints.down("md")]: {
                                paddingLeft: "60px"
                              }
                            })}
                          >
                            {icon ? (
                              <MenuIcon
                                src={icon}
                                alt={title}
                                iconOnly={!sidebar ? 1 : 0}
                                active={pathname === href ? 1 : 0}
                              />
                            ) : null}
                            <SubMenuText
                              primary={title}
                              open={sidebar ? 1 : 0}
                              active={+isActiveSubMenu(href, item.title)}
                            />
                          </ListItem>
                        )
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
                  isExtenalLink(href) ? (
                    <ListItem
                      button
                      onClick={() => window.open(href, "_blank")}
                      sx={(theme) => itemStyle(theme, sidebar)}
                    >
                      {icon ? <MenuIcon src={icon} alt={title} iconOnly={!sidebar ? 1 : 0} /> : null}
                      <MenuText primary={title} open={sidebar ? 1 : 0} />
                    </ListItem>
                  ) : (
                    <ListItem
                      button
                      component={Link}
                      to={href}
                      selected={pathname === href}
                      sx={(theme) => ({
                        ...itemStyle(theme, sidebar),
                        ...(pathname === href
                          ? { backgroundColor: (theme) => `${theme.palette.primary.main} !important` }
                          : {})
                      })}
                    >
                      {icon ? (
                        <MenuIcon
                          src={icon}
                          alt={title}
                          iconOnly={!sidebar ? 1 : 0}
                          active={pathname === href ? 1 : 0}
                        />
                      ) : null}
                      <MenuText primary={title} open={sidebar ? 1 : 0} active={pathname === href ? 1 : 0} />
                    </ListItem>
                  )
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
                        : { color: (theme) => theme.palette.secondary.light })
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
                        isExtenalLink(href) ? (
                          <ListItem
                            key={subIndex}
                            button
                            onClick={() => window.open(href, "_blank")}
                            sx={(theme) => ({
                              ...itemStyle(theme, sidebar),
                              paddingLeft: "70px",
                              [theme.breakpoints.down("md")]: {
                                paddingLeft: "60px"
                              }
                            })}
                          >
                            {icon ? <MenuIcon src={icon} alt={title} iconOnly={!sidebar ? 1 : 0} /> : null}
                            <SubMenuText primary={title} open={sidebar ? 1 : 0} />
                          </ListItem>
                        ) : (
                          <ListItem
                            key={subIndex}
                            button
                            component={Link}
                            to={href}
                            selected={pathname === href}
                            sx={(theme) => ({
                              ...itemStyle(theme, sidebar),
                              ...(pathname === href
                                ? { backgroundColor: (theme) => `${theme.palette.success[700]} !important` }
                                : {}),
                              paddingLeft: "70px",
                              [theme.breakpoints.down("md")]: {
                                paddingLeft: "60px"
                              }
                            })}
                          >
                            {icon ? (
                              <MenuIcon
                                src={icon}
                                alt={title}
                                iconOnly={!sidebar ? 1 : 0}
                                active={pathname === href ? 1 : 0}
                              />
                            ) : null}
                            <SubMenuText primary={title} open={sidebar ? 1 : 0} active={pathname === href ? 1 : 0} />
                          </ListItem>
                        )
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
