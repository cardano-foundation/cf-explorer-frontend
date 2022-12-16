import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle } from "@mui/material";

import { IoMdCopy } from "react-icons/io";
import { Link } from "react-router-dom";

import Table, { Column } from "../../../commons/Table";
import mintingIcon from "../../../../commons/resources/images/copy.svg";

import styles from "./index.module.scss";

interface MintingProps {
  data: Transaction["mints"] | null;
}

const Minting: React.FC<MintingProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Required<Transaction>["mints"][number]>();

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
        return <div className={styles.link}>{r.assetQuantity}</div>;
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
              setSelectedItem(r);
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
      <ModalMinting open={open} selectedItem={selectedItem} setOpen={() => setOpen(false)} />
    </Box>
  );
};

export default Minting;

interface ModalMintingProps {
  open: boolean;
  setOpen: () => void;
  selectedItem?: Required<Transaction>["mints"][number];
}
const ModalMinting: React.FC<ModalMintingProps> = ({ open, setOpen, selectedItem }) => {
  return (
    <Dialog maxWidth={"xl"} onClose={setOpen} open={open} className={styles.modal}>
      <DialogTitle className={styles.title}>
        Poilcy Id: <span className={styles.bold}>{selectedItem?.policy.policyId || ""}</span>
      </DialogTitle>
      <div className={styles.body}>
        <div className={styles.totalToken}>
          Total Token: <span className={styles.value}>1</span>
        </div>
        <div className={styles.Policy}>Policy Script </div> <div className={styles.script}></div>
      </div>
      <div className={styles.footer}>
        <Button variant="contained" onClick={setOpen}>
          OK
        </Button>
      </div>
    </Dialog>
  );
};
