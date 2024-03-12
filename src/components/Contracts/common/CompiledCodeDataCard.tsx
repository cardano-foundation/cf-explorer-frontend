import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { parseNestedParenthesesToObject } from "src/commons/utils/helper";
import { UPLCProgram } from "src/types/uplc";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const str = (window as any).decodeUPLC(`${value}`);

  const version = str
    .substring(0, str.indexOf("["))
    .trim()
    .slice(11, (str || "").length);

  const parseVersion = (versionString: string) => {
    const parts = versionString.split(".");
    return {
      major: parseInt(parts[0], 10),
      minor: parseInt(parts[1], 10),
      patch: parseInt(parts[2], 10)
    };
  };

  const programStr = str.substring(str.indexOf("["), str.lastIndexOf("]") + 1);

  useMemo(() => {
    const uplcData = {
      version: parseVersion(version),
      program: parseNestedParenthesesToObject(programStr)
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    setUplc(uplcData as any);
  }, [programStr]);

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
