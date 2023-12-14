import { ListItemText, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import CustomModal from "src/components/commons/CustomModal";
import { CustomBadge } from "src/components/commons/ViewBlocks/styles";
import { details } from "src/commons/routers";
import { useScreen } from "src/commons/hooks/useScreen";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { getShortHash } from "src/commons/utils/helper";

import { DataTitle } from "../common/styles";
import {
  FoldCard,
  FoldCardName,
  FoldCardValue,
  ModalContent,
  StyledItem,
  StyledLink,
  StyledList,
  StyledListItemText
} from "./styles";

type Data = { title: string; value: string | number; link?: string; showTooltip?: boolean };
export interface AssetsModalProps {
  open?: boolean;
  onClose?: () => void;
  data?: Data[];
  isBurned?: boolean;
  isBurnType?: boolean;
}
const AssetsModal: React.FC<AssetsModalProps> = ({ open = false, onClose, data, isBurned, isBurnType }) => {
  const { t } = useTranslation();
  const { isMobile, isGalaxyFoldSmall } = useScreen();
  const theme = useTheme();
  const handleCloseModal = () => onClose?.();

  const renderContent = () => {
    if (isMobile && data) {
      return (
        data.length > 0 &&
        data.map((item) => (
          <FoldCard key={item.title}>
            <FoldCardName>
              Asset Name: <StyledLink to={details.token(item.link)}>{item.title}</StyledLink>
            </FoldCardName>
            <FoldCardValue>
              Quantity: <Typography component="span">{item.value}</Typography>{" "}
            </FoldCardValue>
          </FoldCard>
        ))
      );
    }
    return (
      <StyledList dense={true}>
        <StyledItem
          style={{ borderBottom: "sold 1px blue" }}
          secondaryAction={<DataTitle>{t("common.quantity")}</DataTitle>}
        >
          <ListItemText>
            <DataTitle>{t("contract.assetName")}</DataTitle>
          </ListItemText>
        </StyledItem>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <StyledItem
              key={item.title}
              secondaryAction={
                <Typography style={{ color: isBurned ? theme.palette.error[700] : theme.palette.secondary.light }}>
                  {item.value}
                </Typography>
              }
            >
              <StyledListItemText color={theme.palette.primary.main}>
                <StyledLink to={details.token(item.link)}>
                  {item.showTooltip ? (
                    <CustomTooltip title={item.title}>
                      <Typography display="inline-block">{getShortHash(item.title)}</Typography>
                    </CustomTooltip>
                  ) : (
                    item.title
                  )}
                </StyledLink>
              </StyledListItemText>
            </StyledItem>
          ))}
      </StyledList>
    );
  };

  return (
    <CustomModal
      modalProps={{ style: { zIndex: 1302 } }}
      open={open}
      onClose={handleCloseModal}
      title={
        <Typography
          display="flex"
          alignItems="center"
          gap="4px"
          fontSize={24}
          fontWeight={500}
          color={theme.palette.secondary.main}
        >
          {isBurned ? t("contract.burn") : t("contract.assets")}{" "}
          <CustomBadge
            bgColor={
              isBurned
                ? theme.palette.error[700]
                : theme.isDark && isBurnType
                ? theme.palette.primary.main
                : theme.palette.secondary.light
            }
            color={theme.isDark ? theme.palette.secondary[100] : ""}
          >
            {data?.length}
          </CustomBadge>
        </Typography>
      }
      width="100%"
      style={{ maxWidth: "unset" }}
      modalContainerProps={{
        px: "20px",
        width: "100% !important",
        maxWidth: "550px !important",
        style: isGalaxyFoldSmall ? { width: "unset", padding: "20px 8px" } : {}
      }}
    >
      <ModalContent>{renderContent()}</ModalContent>
    </CustomModal>
  );
};

export default AssetsModal;
