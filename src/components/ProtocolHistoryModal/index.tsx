import { API } from "../../commons/utils/api";
import StyledModal from "../commons/StyledModal";
import useFetch from "../../commons/hooks/useFetch";
import { TProtocolItem } from "../../types/protocol";
import { formatDateTime, getShortHash } from "../../commons/utils/helper";
import { details } from "../../commons/routers";
import { LinkComponent, ModalTitle, StyledTableCell, StyledTableHeadCell } from "./styles";
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
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
                <StyledTableHeadCell>Timestamp</StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map(item => (
                <TableRow>
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
