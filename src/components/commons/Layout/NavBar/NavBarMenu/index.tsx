import React, { useState, useEffect } from "react";
import { menus } from "../../../../../commons/menus";
import { Menu, MenuIcon, MenuText, SubMenu } from "./styles";
import { Collapse, ListItem, SxProps } from "@mui/material";
import { isExtenalLink } from "../../../../../commons/utils/helper";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {
  open: boolean;
}

const itemStyle: SxProps = {
  minHeight: 48,
  padding: "8px 20px 8px 30px",
  cursor: "pointer",
};

const NavBarMenu: React.FC<Props> = ({ open, history }) => {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (!open) setActive(null);
  }, [open]);

  const pathname = history.location.pathname;
  return (
    <Menu>
      {menus.map((item, index) => {
        const { href, title, children, icon } = item;
        return (
          <>
            {href ? (
              isExtenalLink(href) ? (
                <ListItem
                  button
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={title}
                  sx={{ ...itemStyle, justifyContent: open ? "initial" : "center" }}
                >
                  {icon ? <MenuIcon src={icon} alt={title} iconOnly={!open} /> : null}
                  <MenuText primary={title} open={open} />
                </ListItem>
              ) : (
                <ListItem
                  button
                  component={Link}
                  to={href}
                  selected={pathname === href}
                  sx={{
                    ...itemStyle,
                    ...(pathname === href ? { backgroundColor: theme => `${theme.colorGreen} !important` } : {}),
                    justifyContent: open ? "initial" : "center",
                  }}
                >
                  {icon ? <MenuIcon src={icon} alt={title} iconOnly={!open} active={pathname === href} /> : null}
                  <MenuText primary={title} open={open} active={pathname === href} />
                </ListItem>
              )
            ) : (
              <ListItem
                button
                onClick={() => setActive(index !== active ? index : null)}
                sx={{
                  ...itemStyle,
                  ...(index === active
                    ? { backgroundColor: theme => theme.colorGreenPale, color: theme => theme.colorGreenLight }
                    : {}),
                  justifyContent: open ? "initial" : "center",
                }}
              >
                {icon ? (
                  <MenuIcon
                    src={icon}
                    alt={title}
                    iconOnly={!open}
                    textOnly={!!children?.length}
                    active={index === active}
                  />
                ) : null}
                <MenuText primary={title} open={open} active={index === active} textOnly />
                {children?.length ? index === active ? <BiChevronUp size={24} /> : <BiChevronDown size={24} /> : null}
              </ListItem>
            )}
            {children?.length ? (
              <Collapse in={index === active} timeout="auto" unmountOnExit>
                <SubMenu disablePadding>
                  {children.map(subItem => {
                    const { href, title, icon } = subItem;
                    return href ? (
                      isExtenalLink(href) ? (
                        <ListItem
                          button
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          title={title}
                          sx={{ ...itemStyle, justifyContent: open ? "initial" : "center" }}
                        >
                          {icon ? <MenuIcon src={icon} alt={title} iconOnly={!open} /> : null}
                          <MenuText primary={title} open={open} />
                        </ListItem>
                      ) : (
                        <ListItem
                          button
                          component={Link}
                          to={href}
                          selected={pathname === href}
                          sx={{
                            ...itemStyle,
                            ...(pathname === href
                              ? { backgroundColor: theme => `${theme.colorGreen} !important` }
                              : {}),
                            justifyContent: open ? "initial" : "center",
                          }}
                        >
                          {icon ? (
                            <MenuIcon src={icon} alt={title} iconOnly={!open} active={pathname === href} />
                          ) : null}
                          <MenuText primary={title} open={open} active={pathname === href} />
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
  );
};

export default withRouter(NavBarMenu);
