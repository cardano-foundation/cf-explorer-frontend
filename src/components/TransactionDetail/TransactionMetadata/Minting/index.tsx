import React, { useState } from "react";
import { Box } from "@mui/material";
import Table, { Column } from "../../../commons/Table";
import ScriptModal from "../../../ScriptModal";
import { Amount, AssetName, LogoEmpty } from "./styles";
import { PolicyScriptIcon } from "../../../../commons/resources";
import { Logo } from "../../../../pages/Token/styles";

interface MintingProps {
  data: Transaction["mints"] | null;
}

const Minting: React.FC<MintingProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const columns: Column<Required<Transaction>["mints"][number]>[] = [
    {
      title: "Asset name",
      isHiddenBorder : true,
      key: "Assetname",
      minWidth: "40px",
      render: (r, index) => {
        return (
          <AssetName>
            {r?.metadata?.logo ? (
              <Logo src={`data:/image/png;base64,${r?.metadata?.logo}`} alt="icon" />
            ) : (
              <LogoEmpty />
            )}
            {r.assetName}
          </AssetName>
        );
      },
    },
    {
      title: "Amount minted",
      isHiddenBorder : true,
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
      isHiddenBorder : true,
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
    <Box bgcolor={"white"} px={2}>
      <Table columns={columns} data={data || []} />
      <ScriptModal open={open} policy={selectedItem || ""} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default Minting;
