import React from "react";

import { DataCardBox, DataTitle, DataValue } from "./styles";

export interface DataCardProps {
  value?: string | number;
  title: string;
}

const DataCard: React.FC<DataCardProps> = ({ value, title }) => {
  return (
    <DataCardBox>
      <DataTitle>{title}:</DataTitle>
      <DataValue datap-testid={`trx.contract.redeemer.${title}`}>{value}</DataValue>
    </DataCardBox>
  );
};

export default DataCard;
