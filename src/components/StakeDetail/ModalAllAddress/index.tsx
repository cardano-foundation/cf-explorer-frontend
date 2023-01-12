import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import { ButtonClose, ModalContainer } from "./styles";
import closeIcon from "../../../commons/resources/icons/closeIcon.svg";
import useFetchList from "../../../commons/hooks/useFetchList";
import Table, { Column } from "../../commons/Table";
import { formatADA, formatADAFull, getShortWallet } from "../../../commons/utils/helper";
import { Link, useHistory } from "react-router-dom";
import { details } from "../../../commons/routers";
import CustomTooltip from "../../commons/CustomTooltip";

interface ModalAllAddressProps {
  open: boolean;
  onClose: () => void;
  stake: string;
}

const ModalAllAddress: React.FC<ModalAllAddressProps> = ({ stake, ...props }) => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const fetchData = useFetchList<Addresses>(`/stake/${stake}/list-address`, { page: page - 1, size });

  const columns: Column<Addresses>[] = [
    {
      title: "#",
      minWidth: 20,
      render: (r, index) => page * size + index + 1,
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
        <CustomTooltip title={formatADAFull(r.balance)}>
          <Box component={"span"}>{formatADA(r.balance || 0)}</Box>
        </CustomTooltip>
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
            {...fetchData}
            columns={columns}
            total={{ title: "Total Epochs", count: fetchData.total }}
            pagination={{
              onChange(page, size) {
                setPage(page);
                setSize(size);
              },
              page,
              total: fetchData.total,
            }}
            onClickRow={(_, r) => history.push(details.address(r.address || ""))}
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
