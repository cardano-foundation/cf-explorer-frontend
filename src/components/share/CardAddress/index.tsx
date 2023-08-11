import { Box, Skeleton } from "@mui/material";
import React from "react";

import NoRecord from "src/components/commons/NoRecord";
import { details } from "src/commons/routers";
import CopyButton from "src/components/commons/CopyButton";

import {
  AddressGroup,
  AddressLink,
  CardItemStyled,
  ItemDetail,
  LabelItem,
  RowItem,
  TitleDetail,
  TokenAddress,
  ValueItem
} from "./styles";

export interface DetailCardProps {
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
      <CardItemStyled padding={0}>
        <Skeleton variant="rectangular" height={"80%"} width="100%" />
      </CardItemStyled>
    );
  }
  if (type === "right" && !address) {
    return (
      <CardItemStyled>
        <TitleDetail paddingBottom={(props) => props.spacing(2)}>{title}</TitleDetail>
        <NoRecord sx={{ padding: 0 }} />
      </CardItemStyled>
    );
  }
  return (
    <CardItemStyled>
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
                  <LabelItem>{i.title}</LabelItem>
                </RowItem>
              )}
              <ValueItem style={{ width: `${i.title ? "auto" : "100%"}` }}>{i.value}</ValueItem>
            </ItemDetail>
          );
        })}
      </Box>
    </CardItemStyled>
  );
};

export default CardAddress;
