import { Button, Modal } from "antd";
import React, { useState } from "react";
import { IoMdCopy } from "react-icons/io";
import { Link } from "react-router-dom";
import { formatADA, getShortWallet } from "../../../../commons/utils/helper";

import Table, { Column } from "../../../commons/Table";

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
            {getShortWallet(r.assetName)}
          </Link>
        );
      },
    },
    {
      title: "Amount minted",
      key: "Amount",
      minWidth: "40px",
      render: (r, index) => {
        return <div className={styles.link}>{formatADA(r.amount)}</div>;
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
            <IoMdCopy className={styles.icon} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table columns={columns} data={data || []} />
      <ModalMinting open={open} selectedItem={selectedItem} setOpen={() => setOpen(false)} />
    </>
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
    <Modal
      width="60vw"
      title={
        <div>
          Poilcy Id: <span className={styles.bold}>{selectedItem?.policy.policyId || ""}</span>{" "}
        </div>
      }
      open={open}
      onCancel={setOpen}
      className={styles.modal}
      footer={[
        <Button key="back" onClick={setOpen} type="primary">
          OK
        </Button>,
      ]}
    >
      <div className={styles.totalToken}>
        Total Token: <span className={styles.value}>1</span>
      </div>{" "}
      <div className={styles.Policy}>Policy Script </div> <div className={styles.script}></div>
    </Modal>
  );
};
