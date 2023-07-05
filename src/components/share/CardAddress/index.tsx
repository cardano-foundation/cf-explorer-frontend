import React from "react";
import { Box, Skeleton } from "@mui/material";

import FormNowMessage from "src/components/commons/FormNowMessage";
import { EmptyIcon, InfoIcon } from "src/commons/resources";
import CopyButton from "src/components/commons/CopyButton";
import { details } from "src/commons/routers";
import CustomIcon from "src/components/commons/CustomIcon";

import {
  AddressGroup,
  AddressLink,
  CardItemStyled,
  ItemDetail,
  LabelItem,
  RowItem,
  TimeDuration,
  TitleDetail,
  TokenAddress,
  ValueItem
} from "./styles";

interface DetailCardProps {
  title: string;
  address: string;
  item: { title?: string; value: React.ReactNode }[];
  type: "left" | "right";
  loading: boolean;
  addressDestination?: string;
  lastUpdated?: number;
}
const CardAddress: React.FC<DetailCardProps> = ({ title, address, item, type, loading, addressDestination, lastUpdated }) => {
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
        <Box width={"100%"} display="flex" alignItems="center" justifyContent="center">
          <img alt="icon" src={EmptyIcon} />
        </Box>
      </CardItemStyled>
    );
  }
  return (
    <CardItemStyled>
      <TitleDetail>{title}</TitleDetail>
      {type === "left" ? (
        <TimeDuration>
          <FormNowMessage time={lastUpdated} />
        </TimeDuration>
      ) : null}
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
                  {type == "right" ? <CustomIcon icon={InfoIcon} width={22} /> : null}
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
