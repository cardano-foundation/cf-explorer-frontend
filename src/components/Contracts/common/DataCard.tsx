import React, { useState } from "react";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import { UPLCProgram } from "src/types/uplc";

import UPLCTree from "./UPLCTree";
import { DataCardBox, DataTitle, DataValue, SwitchLabel, ViewSwitcher } from "./styles";

export interface DataCardProps {
  value?: string | number;
  title: string;
}

const mockData: UPLCProgram = {
  version: {
    major: 2,
    minor: 0,
    patch: 0
  },
  data: [
    [
      {
        text: "lam i_0",
        data: [
          {
            text: "lam i_1",
            data: [
              {
                text: "lam i_2",
                data: [
                  {
                    text: "lam i_3 i_0"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        text: "delay",
        data: [
          {
            text: "lam i_4 i_4"
          }
        ]
      }
    ],
    { text: "i_5 i_5" }
  ]
};

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

// const generateUPLCData2 = (): UPLCProgram => {
//   const tmp: UPLCData = {
//     text: "lam i_0",
//     data: []
//   };
//   let i;
//   const data = { text: `lam i_1`, data: [] };
//   let ptr: UPLCData[] = data.data;
//   for (i = 2; i < 200; i++) {
//     const _data: UPLCData = { text: `lam i_${i}`, data: [] };
//     ptr.push(_data);
//     ptr = ptr[0].data as UPLCData[];
//   }
//   const data2 = { text: `lam i_201`, data: [] };
//   ptr = data2.data;
//   for (i = 202; i < 500; i++) {
//     const _data: UPLCData = { text: `lam i_${i}`, data: [] };
//     ptr.push(_data);
//     ptr = ptr[0].data as UPLCData[];
//   }
//   return {
//     version: {
//       major: 2,
//       minor: 0,
//       patch: 0
//     },
//     data: [[{ ...tmp, data: [data, data2] }], { text: "i_5 i_5" }]
//   };
// };

const DataCard: React.FC<DataCardProps> = ({ value, title }) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(true);

  return (
    <DataCardBox>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={1}>
        <DataTitle>{title}:</DataTitle>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <SwitchLabel>{t("contract.compiledCode.viewInBinary")}</SwitchLabel>
          <ViewSwitcher data-testid="compiled-code-switcher" checked={checked} onChange={() => setChecked(!checked)} />
        </Box>
      </Box>
      {checked ? (
        <DataValue data-testid="binary-compiled-code">{value}</DataValue>
      ) : (
        <UPLCTree data-testid="uplc-compiled-code" uplc={mockData} />
      )}
    </DataCardBox>
  );
};

export default DataCard;
