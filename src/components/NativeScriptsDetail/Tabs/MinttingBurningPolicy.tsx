import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { TruncateSubTitleContainer } from "src/components/share/styled";
import { formatDateTimeLocal } from "src/commons/utils/helper";

import { AssociatedValue, Container, DataRow, Key, Value } from "./styles";

import { useNativeScriptDetail } from ".";

const MinttingBurningPolicy = () => {
  const { t } = useTranslation();
  const { before, after, keyHashes, isOneTimeMint } = useNativeScriptDetail();

  const getType = () => {
    const types: string[] = [];
    if (before || after) types.push(t("token.timelock"));
    if (isOneTimeMint) types.push(t("token.oneTimeMint"));
    return types.join(" + ");
  };

  const getTime = () => {
    return (
      <>
        {before && (
          <>
            {t("common.before")}{" "}
            <Typography display={"inline"} fontWeight={700}>
              "{formatDateTimeLocal(before)}"
            </Typography>
          </>
        )}
        {after && (
          <>
            {t("common.after")}{" "}
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
        <Key>{t("common.type")}:</Key>
        <Value>{getType()}</Value>
      </DataRow>
      <DataRow>
        <Key>{t("common.cond")}:</Key>
        <Value>
          {t("common.allowedBy")}
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
