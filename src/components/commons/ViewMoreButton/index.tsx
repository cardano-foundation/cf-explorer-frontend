import React from "react";
import { styled } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  padding: 10px 20px;
  margin: 20px 30px;
  background: ${props => props.theme.textColor};
  color: ${props => props.theme.textColorReverse}!important;
  border-radius: 6px;
  font-weight: var(--font-weight-bold);
`;

const ViewMoreButton: React.FC<LinkProps> = ({ children, ...props }) => {
  return <StyledLink {...props}>{children || "View More"}</StyledLink>;
};

export default ViewMoreButton;
