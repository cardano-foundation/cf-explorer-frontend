import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { TruncateSubTitleContainer } from "src/components/share/styled";
import { formatDateTimeLocal } from "src/commons/utils/helper";

import { AssociatedValue, Container, DataRow, Key, Value } from "./styles";

import { useNativeScriptDetail } from ".";

const MinttingBurningPolicy = () => {
  const { t } = useTranslation();
  const scrollToTop = useRef(false);
  const { before, after, keyHashes, isOneTimeMint } = useNativeScriptDetail();

  useEffect(() => {
    if (!scrollToTop.current && before) {
      window.scroll(0, 0);
      scrollToTop.current = true;
    }
  }, [before]);

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
            <Typography display={"inline"} fontWeight={700} data-testid="ns.time">
              "{formatDateTimeLocal(before)}"{" "}
            </Typography>
          </>
        )}
        {after && (
          <>
            {t("common.after")}{" "}
            <Typography display={"inline"} fontWeight={700}>
              "{formatDateTimeLocal(after)}"{" "}
            </Typography>
          </>
        )}
      </>
    );
  };

  return (
    <Container>
      <DataRow data-testid="ns.type">
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
