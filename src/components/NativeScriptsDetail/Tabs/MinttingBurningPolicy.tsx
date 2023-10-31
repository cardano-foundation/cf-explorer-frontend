import React from "react";
import { Typography } from "@mui/material";

import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { TruncateSubTitleContainer } from "src/components/share/styled";
import { formatDateTimeLocal } from "src/commons/utils/helper";

import { AssociatedValue, Container, DataRow, Key, Value } from "./styles";

import { useNativeScriptDetail } from ".";

const MinttingBurningPolicy = () => {
  const { before, after, keyHashes } = useNativeScriptDetail();

  const getType = () => {
    const types: string[] = [];
    if (keyHashes?.length === 1) types.push("Single issuer");
    if (Number(keyHashes?.length) > 1) types.push("Multi Signaturer");
    if (before || after) types.push("Time locked");
    return types.join(" + ");
  };

  const getTime = () => {
    return (
      <>
        {before && (
          <>
            before{" "}
            <Typography display={"inline"} fontWeight={700}>
              "{formatDateTimeLocal(before)}"
            </Typography>
          </>
        )}
        {after && (
          <>
            before{" "}
            <Typography display={"inline"} fontWeight={700}>
              "{formatDateTimeLocal(after)}"
            </Typography>
          </>
        )}
      </>
    );
  };

  return (
    <Container>
      <DataRow>
        <Key>Type:</Key>
        <Value>{getType()}</Value>
      </DataRow>
      <DataRow>
        <Key>Conditions:</Key>
        <Value>
          Allowed by
          {keyHashes?.map((key) => (
            <AssociatedValue key={key}>
              <TruncateSubTitleContainer>
                <DynamicEllipsisText value={key} isTooltip />
              </TruncateSubTitleContainer>
            </AssociatedValue>
          ))}
          {getTime()}
        </Value>
      </DataRow>
    </Container>
  );
};

export default MinttingBurningPolicy;
