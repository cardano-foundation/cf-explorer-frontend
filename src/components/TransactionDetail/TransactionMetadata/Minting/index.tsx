import React, { useState } from "react";
import { Box } from "@mui/material";
import Table, { Column } from "../../../commons/Table";
import ScriptModal from "../../../ScriptModal";
import { Amount, AssetName, LogoEmpty } from "./styles";
import { PolicyScriptIcon } from "../../../../commons/resources";

interface MintingProps {
  data: Transaction["mints"] | null;
}

const Minting: React.FC<MintingProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const columns: Column<Required<Transaction>["mints"][number]>[] = [
    {
      title: "Asset name",
      key: "Assetname",
      minWidth: "40px",
      render: (r, index) => {
        return (
          <AssetName>
            <LogoEmpty />
            {r.assetName}
          </AssetName>
        );
      },
    },
    {
      title: "Amount minted",
      key: "Amount",
      minWidth: "40px",
      render: (r, index) => {
        return <Amount>{r.assetQuantity}</Amount>;
      },
    },
    {
      title: "Policy script",
      key: "Policy",
      minWidth: "40px",
      render: (r, index) => {
        return (
          <div
            onClick={() => {
              setOpen(true);
              setSelectedItem(r.policy || "");
            }}
          >
            <PolicyScriptIcon />
          </div>
        );
      },
    },
  ];

  return (
    <Box bgcolor={"white"}>
      <Table columns={columns} data={data || []} />
      <ScriptModal open={open} policy={selectedItem || ""} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default Minting;
