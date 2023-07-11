import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

import { Column } from "src/components/commons/Table";
import ScriptModal from "src/components/ScriptModal";
import { PolicyScriptIcon } from "src/commons/resources";
import { Logo } from "src/pages/Token/styles";
import { details } from "src/commons/routers";
import { formatAmount } from "src/commons/utils/helper";

import { Amount, AssetName, LogoEmpty, TableMinting } from "./styles";

interface MintingProps {
  data: Transaction["mints"] | null;
}

const Minting: React.FC<MintingProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const columns: Column<Required<Transaction>["mints"][number]>[] = [
    {
      title: "Asset name",
      isHiddenBorder: true,
      key: "Assetname",
      minWidth: "40px",
      render: (r) => {
        return (
          <AssetName>
            <>
              {r?.metadata?.logo ? (
                <Logo src={`data:/image/png;base64,${r?.metadata?.logo}`} alt="icon" />
              ) : (
                <LogoEmpty />
              )}
              <Box
                component={Link}
                color={({ palette }) => `${palette.blue[100]} !important`}
                to={details.token(r.assetId)}
              >
                {r.assetName}
              </Box>
            </>
          </AssetName>
        );
      }
    },
    {
      title: "Amount minted",
      isHiddenBorder: true,
      key: "Amount",
      minWidth: "40px",
      render: (r) => {
        return <Amount>{formatAmount(r.assetQuantity)}</Amount>;
      }
    },
    {
      title: "Policy script",
      key: "Policy",
      minWidth: "40px",
      maxWidth: "120px",
      isHiddenBorder: true,
      render: (r) => {
        return (
          <Box
            onClick={() => {
              setOpen(true);
              setSelectedItem(r.policy || "");
            }}
          >
            <PolicyScriptIcon />
          </Box>
        );
      }
    }
  ];

  return (
    <Box>
      <TableMinting columns={columns} data={data || []} />
      <ScriptModal open={open} policy={selectedItem || ""} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default Minting;
