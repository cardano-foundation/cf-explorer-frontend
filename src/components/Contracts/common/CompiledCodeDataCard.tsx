import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { UPLCProgram } from "src/types/uplc";
import { decodeFlatUplcToObject } from "src/commons/utils/decodeFlat";

import UPLCTree from "../UPLCTree";
import {
  DataCardBox,
  DataCardHeader,
  DataTitle,
  DataValue,
  SwitchContainer,
  SwitchLabel,
  ViewSwitcher
} from "./styles";

export interface CompiledCodeDataCardProps {
  value?: string | number;
  title: string;
}

const CompiledCodeDataCard: React.FC<CompiledCodeDataCardProps> = ({ value, title }) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const [uplc, setUplc] = useState<UPLCProgram>();

  useEffect(() => {
    const data = decodeFlatUplcToObject(value ? `${value}` : "");
    const uplcData = {
      ...data,
      program: data.data
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    setUplc(uplcData as any);
  }, [value]);

  return (
    <DataCardBox>
      <DataCardHeader
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginBottom={1}
        flexWrap={"wrap"}
      >
        <DataTitle>{title}:</DataTitle>
        <SwitchContainer>
          <SwitchLabel>{t("contract.compiledCode.viewInBinary")}</SwitchLabel>
          <ViewSwitcher data-testid="compiled-code-switcher" checked={checked} onChange={() => setChecked(!checked)} />
        </SwitchContainer>
      </DataCardHeader>
      {checked ? (
        <DataValue data-testid="binary-compiled-code">{value}</DataValue>
      ) : (
        uplc && <UPLCTree data-testid="uplc-compiled-code" uplc={uplc} />
      )}
    </DataCardBox>
  );
};

export default CompiledCodeDataCard;
