import React from "react";
import CopyButton from "../../commons/CopyButton";
import infoIcon from "../../../commons/resources/images/infoIcon.svg";
import { Box, Skeleton } from "@mui/material";
import { EmptyIcon } from "../../../commons/resources";
import { details } from "../../../commons/routers";
import {
  AddressGroup,
  AddressLink,
  CardItem,
  ItemDetail,
  LabelItem,
  RowItem,
  TitleDetail,
  TokenAddress,
  ValueItem,
} from "./styles";

interface DetailCardProps {
  title: string;
  address: string;
  item: { title?: string; value: React.ReactNode }[];
  type: "left" | "right";
  loading: boolean;
  addressDestination?: string;
}
const CardAddress: React.FC<DetailCardProps> = ({ title, address, item, type, loading, addressDestination }) => {
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
        {type === "left" ? (
          <TokenAddress>{address}</TokenAddress>
        ) : (
          <AddressLink to={addressDestination || details.address(address)}>{address}</AddressLink>
        )}
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
