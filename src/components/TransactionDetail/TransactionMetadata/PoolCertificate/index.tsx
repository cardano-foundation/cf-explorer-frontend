import React from "react";
import { Box } from "@mui/material";
import { Column } from "../../../commons/Table";
import { TableMinting } from "./styles";
import StakeKeyBox from "./StakeKeyBox";

interface IProps {
  data: Transaction["poolCertificates"] | null;
}

const PoolCertificate: React.FC<IProps> = ({ data }) => {
  const columns: Column<Required<Transaction>["poolCertificates"][number]>[] = [
    {
      title: "Stake Key Registration",
      isHiddenBorder: true,
      key: "stakeKey",
      render: (r, index) => {
        return <StakeKeyBox data={r} />;
      },
    },
  ];

  return (
    <Box bgcolor={"white"} px={2}>
      <TableMinting columns={columns} data={data || []} />
    </Box>
  );
};

export default PoolCertificate;
