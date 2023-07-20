import { Box } from "@mui/material";
import { useState, useEffect } from "react";

import ContractDiagrams from "src/components/ContractDiagrams";

interface ContractsProps {
  data: Transaction["contracts"] | null;
}

const Contracts: React.FC<ContractsProps> = ({ data }) => {
  const [textCopy, setTextCopy] = useState("");
  useEffect(() => {
    if (textCopy) {
      setTimeout(() => {
        setTextCopy("");
      }, 2000);
    }
  }, [textCopy]);

  return (
    <Box>
      {data?.map((item) => (
        <ContractDiagrams key={item.address || item.scriptHash} item={item} />
      ))}
    </Box>
  );
};

export default Contracts;
