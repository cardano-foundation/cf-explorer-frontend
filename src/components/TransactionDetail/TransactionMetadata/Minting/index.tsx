import React, { useState } from "react";
import { Box } from "@mui/material";

import { Link } from "react-router-dom";

import Table, { Column } from "../../../commons/Table";
import mintingIcon from "../../../../commons/resources/images/copy.svg";

import styles from "./index.module.scss";
import ScriptModal from "../../../ScriptModal";
import { BigNumber } from "bignumber.js";

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
          <Link to="#" className={styles.link}>
            <img src={mintingIcon} alt="icon" />
            <Box component={"span"} ml={1}>
              {r.assetName}
            </Box>
          </Link>
        );
      },
    },
    {
      title: "Amount minted",
      key: "Amount",
      minWidth: "40px",
      render: (r, index) => {
        return <div className={styles.link}>{BigNumber(r.assetQuantity).toString()}</div>;
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
            <img src={mintingIcon} alt="icon" className={styles.icon} />
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
