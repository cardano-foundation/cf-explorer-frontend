import React from "react";
import CopyButton from "../../commons/CopyButton";
import infoIcon from "../../../commons/resources/images/infoIcon.svg";
import { styled, Box, Skeleton } from "@mui/material";
import { EmptyIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import { AddressGroup, ItemDetail, LabelItem, RowItem, TitleDetail, TokenAddress, ValueItem } from "./styles";

interface DetailCardProps {
  title: string;
  address: string;
  item: { title?: string; value: React.ReactNode }[];
  type: "left" | "right";
  loading: boolean;
}
const CardAddress: React.FC<DetailCardProps> = ({ title, address, item, type, loading }) => {
  if (loading) {
    return (
      <CardItem padding={0}>
        <Skeleton variant="rectangular" height={"100%"} width="100%" />
      </CardItem>
    );
  }
  if (type === "right" && !address) {
    return (
      <CardItem>
        <Box height={"100%"} display="flex" alignItems="center" justifyContent="center">
          <img alt="icon" src={EmptyIcon} />
        </Box>
      </CardItem>
    );
  }
  return (
    <CardItem padding={props => props.spacing(4)}>
      <TitleDetail>{title}</TitleDetail>
      <AddressGroup>
        <TokenAddress to={routers.ADDRESS_DETAIL.replace(":address", address)}>{address}</TokenAddress>
        <CopyButton text={address} />
      </AddressGroup>
      <Box>
        {item.map((i, ii) => {
          return (
            <ItemDetail key={ii}>
              {i.title && (
                <RowItem>
                  <img src={infoIcon} alt="info icon" />
                  <LabelItem>{i.title}</LabelItem>
                </RowItem>
              )}
              <ValueItem style={{ width: `${i.title ? "auto" : "100%"}` }}>{i.value}</ValueItem>
            </ItemDetail>
          );
        })}
      </Box>
    </CardItem>
  );
};

export default CardAddress;

const CardItem = styled(Box)(({ theme }) => ({
  background: "#fff",
  minHeight: 200,
  height: "100%",
  borderRadius: theme.borderRadius,
  overflow: "hidden",
  textAlign: "left",
  boxShadow: theme.shadowRaised,
}));
