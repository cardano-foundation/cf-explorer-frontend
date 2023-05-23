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
      render: (r, index) => {
        return <pre>{r?.oldValue}</pre>;
      }
    },
    {
      title: "Updated Value",
      key: "updatedValue",
      minWidth: "40px",
      isHiddenBorder: true,
      render: (r, index) => {
        return <pre>{r?.value}</pre>;
      }
    }
  ];

  return <TableProtocol columns={columns} data={data.filter((item) => item.value !== null)} />;
};

export default ProtocolUpdate;
