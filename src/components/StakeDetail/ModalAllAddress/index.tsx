import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import { ButtonClose, ModalContainer, WrapContent } from "./styles";
import useFetchList from "../../../commons/hooks/useFetchList";
import Table, { Column } from "../../commons/Table";
import { formatADAFull, getShortWallet, numberWithCommas } from "../../../commons/utils/helper";
import { Link, useHistory } from "react-router-dom";
import { details } from "../../../commons/routers";
import { API } from "../../../commons/utils/api";
import CustomTooltip from "../../commons/CustomTooltip";
import { StyledLink } from "src/components/share/styled";
import StyledModal from "src/components/commons/StyledModal";
import { useScreen } from "src/commons/hooks/useScreen";

interface ModalAllAddressProps {
  open: boolean;
  onClose: () => void;
  stake: string;
}

const ModalAllAddress: React.FC<ModalAllAddressProps> = ({ stake, ...props }) => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(50);
  const { isMobile, isTablet, isGalaxyFoldSmall } = useScreen();
  const fetchData = useFetchList<Addresses>(`${API.STAKE.DETAIL}/${stake}/list-address`, { page: page - 1, size });

  const columns: Column<Addresses>[] = [
    {
      title: "#",
      minWidth: 20,
      render: (r, index) => numberWithCommas((page - 1) * size + index + 1 || 0),
      key: "no"
    },
    {
      title: "Addresses",
      minWidth: 120,
      render: (r, idx) => (
        <StyledLink to={details.address(r.address)}>
          <CustomTooltip title={r.address || ""} placement="top-start">
            <Box component={"span"}>{getShortWallet(r.address)}</Box>
          </CustomTooltip>
        </StyledLink>
      ),
      key: "Addresses"
    },
    {
      title: "Balance",
      minWidth: 80,
      render: (r, idx) => <Box component={"span"}>{formatADAFull(r.balance)}</Box>,
      key: "Balance"
    }
  ];
  const maxHeightCalc = `calc(80vh - ${
    isTablet ? "290px" : isMobile ? (isGalaxyFoldSmall ? "270px" : "230px") : "208px"
  })`;

  return (
    <StyledModal
      open={props.open}
      handleCloseModal={props.onClose}
      title="Addresses list"
      width={"600px"}
      contentStyle={{ overflowY: "unset" }}
    >
      <WrapContent>
        <Table
          {...fetchData}
          columns={columns}
          maxHeight={maxHeightCalc}
          total={{ title: "Total Epochs", count: fetchData.total }}
          pagination={{
            onChange(page, size) {
              setPage(page);
              setSize(size);
            },
            total: fetchData.total
          }}
          onClickRow={(_, r) => history.push(details.address(r.address || ""))}
        />
      </WrapContent>
    </StyledModal>
  );
};

export default ModalAllAddress;

interface Addresses {
  address: string;
  balance: number;
}
