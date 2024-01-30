import React from "react";
import { styled } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  padding: 10px 20px;
  margin: 20px 30px;
  background: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.secondary[0]}!important;
  border-radius: 6px;
  font-weight: var(--font-weight-bold);
  ${({ theme }) => theme.breakpoints.down("sm")} {
    margin: 20px 16px;
  }
`;

const ViewMoreButton: React.FC<LinkProps> = ({ children, ...props }) => {
  const { t } = useTranslation();
  return <StyledLink {...props}>{children || t("common.viewDetails")}</StyledLink>;
};

export default ViewMoreButton;
