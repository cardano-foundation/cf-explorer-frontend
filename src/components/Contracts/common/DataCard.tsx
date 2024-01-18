import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { decodeFlatUplc } from "@cardano-foundation/cf-flat-decoder-ts";

import { UPLCProgram } from "src/types/uplc";

import { UPLCTree } from "./UPLCTree";
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

const DataCard: React.FC<DataCardProps> = ({ value, title }) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(true);
  const [, setUplc] = useState("");

  useEffect(() => {
    if (!value) return;
    setUplc(decodeFlatUplc(value.toString()));
  }, [value]);

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
