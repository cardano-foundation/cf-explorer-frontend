import React from "react";
import { Column } from "~/components/commons/Table";
import { TableProtocol } from "./styles";

interface IProps {
  data: TProtocolMerge[];
}

const ProtocolUpdate: React.FC<IProps> = ({ data }) => {
  const columns: Column<TProtocolMerge>[] = [
    {
      title: "Parameter Name",
      isHiddenBorder: true,
      key: "paramName",
      minWidth: "40px",
      render: (r) => {
        return <div>{r.protocol}</div>;
      }
    },
    {
      title: "Previous Value",
      isHiddenBorder: true,
      key: "previousValue",
      minWidth: "40px",
      render: (r) => {
        return <div>{r?.oldValue}</div>;
      }
    },
    {
      title: "Updated Value",
      key: "updatedValue",
      minWidth: "40px",
      isHiddenBorder: true,
      render: (r) => {
        return <div>{r?.value}</div>;
      }
    }
  ];

  return <TableProtocol columns={columns} data={data.filter((item) => item.value !== null)} />;
};

export default ProtocolUpdate;
