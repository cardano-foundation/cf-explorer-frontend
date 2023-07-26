import { useEffect, useState } from "react";
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";

import { API } from "src/commons/utils/api";
import StyledModal from "src/components/commons/StyledModal";
import useFetch from "src/commons/hooks/useFetch";
import { TProtocolItem } from "src/types/protocol";
import { formatDateTime, getShortHash } from "src/commons/utils/helper";
import { details } from "src/commons/routers";

import { LinkComponent, ModalTitle, StyledTableCell, StyledTableHeadCell } from "./styles";
interface IProps {
  open: boolean;
  handleCloseModal: () => void;
  protocolType: string;
}

export default function ProtocolHistoryModal({ open, protocolType, handleCloseModal }: IProps) {
  const fetchedData = useFetch<TProtocolItem[]>(API.PROTOCOL_PARAMETER.HISTORY.replace(":type", protocolType));
  const [data, setData] = useState<TProtocolItem[]>([]);

  useEffect(() => {
    setData(fetchedData?.data || []);
  }, [fetchedData?.data]);
  return (
    <StyledModal
      open={open}
      handleCloseModal={() => {
        handleCloseModal();
      }}
    >
      <>
        <ModalTitle>Protocol Parameter Change</ModalTitle>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableHeadCell>Transaction Hash</StyledTableHeadCell>
                <StyledTableHeadCell>Created At</StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item, idx) => (
                <TableRow key={idx}>
                  <StyledTableCell>
                    <LinkComponent to={details.transaction(item.transactionHash)}>
                      {getShortHash(item.transactionHash)}
                    </LinkComponent>
                  </StyledTableCell>
                  <StyledTableCell>{formatDateTime(item.time)}</StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </StyledModal>
  );
}
