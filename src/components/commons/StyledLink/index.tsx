import { styled } from "@mui/material";
import { Link as LinkDom, LinkProps } from "react-router-dom";

const StyledLink: React.FC<LinkProps & { children: React.ReactNode }> = ({ children, ...props }) => {
  return <Link {...props}>{children}</Link>;
};

export default StyledLink;

const Link = styled(LinkDom)`
  color: ${props => props.theme.palette.secondary.main} !important;
  font-family: var(--font-family-text) !important;
`;
