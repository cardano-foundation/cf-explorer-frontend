import { alpha, styled } from "@mui/material";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";

export const Menu = styled("ul")`
  @include flex-center-start;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 32px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
    gap: 0;
    width: 100%;
  }
`;
export const SubMenu = styled(Menu)<{ isActive: boolean }>`
  position: absolute;
  z-index: 1;
  top: 100%;
  background: ${(props) => alpha(props.theme.palette.common.white, 0.9)};
  box-shadow: ${(props) => props.theme.shadow.dialog};
  backdrop-filter: blur(2px);
  border-radius: 10px;
  color: ${(props) => props.theme.palette.common.black};
  visibility: hidden;
  padding: 20px 0px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    position: relative;
    visibility: visible;
    display: none;
    width: 100%;
    box-shadow: none;
    padding: 10px 0px;
    display: none;
    ${(props) => (props.isActive ? `display: block;` : ``)}
  }
`;

export const MenuItem = styled("li")<{ hasChild: boolean }>`
  text-align: left;
  cursor: pointer;
  ${(props) => (props.hasChild ? `padding-right: 22px;` : ``)}
`;

export const ArrowIcon = styled(BiChevronDown)<{ isActive: boolean }>`  
  position: absolute;
  top: 50%;
  right: 5px;
  width: 
  transform: rotate(0deg) translateY(-50%); 
  transition: all 0.3s; 
}
`;

export const SubMenuItem = styled(MenuItem)`
  &:last-child {
    margin-bottom: 0px;
  }
`;
export const InternalLink = styled(Link)<{ isSubMenu: boolean }>`
  display: block;
  color: inherit;
  font-family: var(--font-family-title);
  white-space: nowrap;
  line-height: ${(props) => (props.isSubMenu ? 1 : 1.5)};
  ${(props) => (props.isSubMenu ? `padding: 0.25rem 48px 0.25rem 20px;` : ``)}
  font-weight: ${(props) => (props.isSubMenu ? `var(--font-weight-bold)` : `var(--font-weight-normal)`)};
  &:visited {
    color: inherit;
  }
  &:hover {
    color: ${(props) => props.theme.palette.primary.contrastText};
    text-shadow: 1px 1px 5px ${(props) => props.theme.palette.primary.contrastText};
    ${({ theme }) => theme.breakpoints.down("md")} {
      color: inherit;
    }
  }
`;

export const ExternalLink = styled("a")<{ isSubMenu: boolean }>`
  display: block;
  color: inherit;
  font-family: var(--font-family-title);
  white-space: nowrap;
  line-height: ${(props) => (props.isSubMenu ? 1 : 1.5)};
  ${(props) => (props.isSubMenu ? `padding: 0.25rem 48px 0.25rem 20px;` : ``)}
  font-weight: ${(props) => (props.isSubMenu ? `var(--font-weight-bold)` : `var(--font-weight-normal)`)};
  &:visited {
    color: inherit;
  }
  &:hover {
    color: ${(props) => props.theme.palette.primary.contrastText};
    text-shadow: 1px 1px 5px ${(props) => props.theme.palette.primary.contrastText};
    ${({ theme }) => theme.breakpoints.down("md")} {
      color: inherit;
    }
  }
`;
