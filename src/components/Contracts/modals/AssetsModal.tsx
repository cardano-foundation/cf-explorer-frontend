import { ListItemText, Typography, useTheme } from "@mui/material";
import React from "react";

import CustomModal from "src/components/commons/CustomModal";
import { CustomBadge } from "src/components/commons/ViewBlocks/styles";
import { details } from "src/commons/routers";
import { numberWithCommas } from "src/commons/utils/helper";

import { DataTitle } from "../common/styles";
import { ModalContent, StyledItem, StyledLink, StyledList, StyledListItemText } from "./styles";

type Data = { title: string; value: string | number; link?: string };
export interface AssetsModalProps {
  open?: boolean;
  onClose?: () => void;
  data?: Data[];
  isBurned?: boolean;
  isBurnType?: boolean;
}
const AssetsModal: React.FC<AssetsModalProps> = ({ open = false, onClose, data, isBurned, isBurnType }) => {
  const theme = useTheme();
  const handleCloseModal = () => onClose?.();
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
          {isBurned ? "Burn" : "Assets"}{" "}
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
      width={550}
      modalContainerProps={{ px: "20px" }}
    >
      <ModalContent>
        <StyledList dense={true}>
          <StyledItem style={{ borderBottom: "sold 1px blue" }} secondaryAction={<DataTitle>Quantity</DataTitle>}>
            <ListItemText>
              <DataTitle>Asset Name</DataTitle>
            </ListItemText>
          </StyledItem>
          {data &&
            data.length > 0 &&
            data.map((item) => (
              <StyledItem
                key={item.title}
                secondaryAction={
                  <Typography style={{ color: isBurned ? theme.palette.error[700] : theme.palette.secondary.light }}>
                    {numberWithCommas(item.value, 3)}
                  </Typography>
                }
              >
                <StyledListItemText color={theme.palette.primary.main}>
                  <StyledLink to={details.token(item.link)}>{item.title}</StyledLink>
                </StyledListItemText>
              </StyledItem>
            ))}
        </StyledList>
      </ModalContent>
    </CustomModal>
  );
};

export default AssetsModal;
