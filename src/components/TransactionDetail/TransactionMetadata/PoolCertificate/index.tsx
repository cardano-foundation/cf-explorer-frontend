import React from "react";
import { Box } from "@mui/material";
import { Column } from "../../../commons/Table";
import { TableMinting } from "./styles";
import StakeKeyBox from "./StakeKeyBox";

interface MintingProps {
  data: Transaction["mints"] | null;
}

const PoolCertificate: React.FC<MintingProps> = ({ data }) => {
  const columns: Column<Required<Transaction>["mints"][number]>[] = [
    {
      title: "Stake Key Registration",
      isHiddenBorder: true,
      key: "asd",
      render: (r, index) => {
        return <StakeKeyBox />;
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
