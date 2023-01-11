import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import { ButtonClose, ModalContainer } from "./styles";
import closeIcon from "../../../commons/resources/icons/closeIcon.svg";
import useFetchList from "../../../commons/hooks/useFetchList";
import Table, { Column } from "../../commons/Table";
import { formatADA, getShortWallet } from "../../../commons/utils/helper";
import { Link, useHistory } from "react-router-dom";
import { details } from "../../../commons/routers";
import { ADAToken } from "../../commons/Token";

interface ModalAllAddressProps {
  open: boolean;
  onClose: () => void;
  stake: string;
}

const ModalAllAddress: React.FC<ModalAllAddressProps> = ({ stake, ...props }) => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { data, loading, total } = useFetchList<Addresses>(`/stake/${stake}/list-address`, { page: page - 1, size });

  const columns: Column<Addresses>[] = [
    {
      title: "#",
      minWidth: 20,
      render: (r, idx) => idx + 1,
      key: "no",
    },
    {
      title: "Addresses",
      minWidth: 120,
      render: (r, idx) => (
        <Link
          to={details.address(r.address)}
          style={{ fontFamily: "var(--font-family-text)", color: "var(--color-blue)" }}
        >
          {getShortWallet(r.address)}
        </Link>
      ),
      key: "Addresses",
    },
    {
      title: "Balance",
      minWidth: 80,
      render: (r, idx) => (
        <>
          {formatADA(r.balance || 0)} <ADAToken />
        </>
      ),
      key: "Balance",
    },
  ];

  return (
    <Modal {...props}>
      <ModalContainer px={4}>
        <ButtonClose onClick={props.onClose}>
          <img src={closeIcon} alt="icon close" />
        </ButtonClose>
        <Box textAlign={"left"} fontSize="1.5rem" fontWeight="bold" fontFamily={'"Space Mono", monospace, sans-serif '}>
          Addresses list
        </Box>
        <Box>
          <Table
            onClickRow={(_, r) => history.push(details.address(r.address || ""))}
            columns={columns}
            data={data || []}
            loading={loading}
            pagination={{
              onChange(page, size) {
                setPage(page);
                setSize(size);
              },
              page,
              total,
            }}
          />
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default ModalAllAddress;

interface Addresses {
  address: string;
  balance: number;
}
