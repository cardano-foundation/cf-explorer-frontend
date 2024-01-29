import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { UPLCData, UPLCProgram } from "src/types/uplc";
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

/*
  UPLC data generator with long list data
*/
// const generateUPLCData = (): UPLCProgram => {
//   const tmp: UPLCData = {
//     text: "lam i_0",
//     data: []
//   };
//   let i;
//   for (i = 1; i < 1000; i++) {
//     const _data: UPLCData = { text: `lam i_${i}`, data: [] };
//     let j = i;
//     for (j = 1; j < 5; j++) {
//       _data.data?.push({ text: `lam i_${i}.${j}` });
//     }
//     tmp.data?.push(_data);
//   }
//   return {
//     version: {
//       major: 2,
//       minor: 0,
//       patch: 0
//     },
//     data: [[tmp], { text: "i_5 i_5" }]
//   };
// };

/*
  UPLC data generator with long hierarchy
*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateUPLCData2 = (): UPLCProgram => {
  const tmp: UPLCData = {
    text: "lam i_0",
    data: []
  };
  let i;
  const data = { text: `lam i_1`, data: [] };
  let ptr: UPLCData[] = data.data;
  for (i = 2; i < 13; i++) {
    const _data: UPLCData = { text: `lam i_${i}`, data: [] };
    ptr.push(_data);
    ptr = ptr[0].data as UPLCData[];
  }
  const data2 = { text: `lam i_201`, data: [] };
  ptr = data2.data;
  for (i = 13; i < 20; i++) {
    const _data: UPLCData = { text: `lam i_${i}`, data: [] };
    ptr.push(_data);
    ptr = ptr[0].data as UPLCData[];
  }
  return {
    version: {
      major: 2,
      minor: 0,
      patch: 0
    },
    data: [[{ ...tmp, data: [data, data2] }], { text: "i_5 i_5" }]
  };
};

const CompiledCodeDataCard: React.FC<CompiledCodeDataCardProps> = ({ value, title }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = decodeFlatUplcToObject(value ? `${value}` : "");

  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);

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
        <UPLCTree data-testid="uplc-compiled-code" uplc={generateUPLCData2()} />
      )}
    </DataCardBox>
  );
};

export default CompiledCodeDataCard;
