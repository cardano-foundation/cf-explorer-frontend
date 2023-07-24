import { styled } from "@mui/material";
import { Link as LinkDom, LinkProps } from "react-router-dom";

const Link: React.FC<LinkProps & { children: React.ReactNode }> = ({ children, ...props }) => {
  return <LinkStyled {...props}>{children}</LinkStyled>;
};

export default Link;

const LinkStyled = styled(LinkDom)`
  color: ${(props) => props.theme.palette.primary.main} !important;
  font-family: var(--font-family-text) !important;
`;
