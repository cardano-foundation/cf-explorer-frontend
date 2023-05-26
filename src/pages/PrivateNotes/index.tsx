import { useEffect, useState } from "react";
import {
  ActionButton,
  AddButton,
  CancelButton,
  Container,
  DeleteButton,
  Header,
  SmallText,
  StyledLink,
  StyledTable,
  Title
} from "./styles";
import { ReactComponent as QuestionConfirm } from "../../commons/resources/icons/questionConfirm.svg";
import { ReactComponent as Plus } from "../../commons/resources/icons/plus.svg";
import { formatDateTime, getPageInfo, getShortHash } from "../../commons/utils/helper";
import useFetchList from "../../commons/hooks/useFetchList";
import AddPrivateNoteModal from "../../components/Account/AddPrivateNoteModal";
import { Column } from "../../types/table";
import { useLocation } from "react-router-dom";
import CustomTooltip from "../../components/commons/CustomTooltip";
import { ReactComponent as Expand } from "../../commons/resources/icons/expand.svg";
import { ReactComponent as Warning } from "../../commons/resources/icons/warning.svg";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material";
import { removePrivateNote } from "../../commons/utils/userRequest";
import { NETWORK, NETWORK_TYPES } from "../../commons/utils/constants";
import { details } from "../../commons/routers";

import { ButtonClose } from "../../components/ScriptModal/styles";
import { CloseIcon } from "../../commons/resources";
import useToast from "../../commons/hooks/useToast";

type TAction = {
  onClick: () => void;
};

const ViewButton: React.FC<TAction> = ({ onClick }) => {
  return (
    <CustomTooltip placement='top' title='View private note'>
      <ActionButton onClick={onClick} typeButton='View'>
        <Expand />
      </ActionButton>
    </CustomTooltip>
  );
};

const RemoveButton: React.FC<TAction> = ({ onClick }) => {
  return (
    <CustomTooltip placement='top' title='Remove note'>
      <ActionButton onClick={onClick} typeButton='Remove'>
        <Warning />
      </ActionButton>
    </CustomTooltip>
  );
};

const PrivateNotes = () => {
  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `My Notes | Cardano Explorer`;
  }, []);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [selected, setSelected] = useState<TPrivateNote | null>(null);
  const [currentNote, setCurrentNote] = useState<TCurrentNote | undefined>();
  const toast = useToast();

  const { data, total, refresh } = useFetchList("note/find-all", { network: NETWORK_TYPES[NETWORK], page, size }, true);
  const { search } = useLocation();
  const pageInfo = getPageInfo(search);

  const handleClickViewDetail = (note: TPrivateNote) => {
    setCurrentNote({
      hash: note.txHash,
      note: note.note,
      id: note.id
    });
    setOpenModal(true);
  };

  const handleClickRemoveNote = async (note: TPrivateNote) => {
    setLoadingDelete(true);
    try {
      await removePrivateNote(note.id);
      toast.success(
        <Box>
          Delete transaction private note <Box>{getShortHash(note.txHash || "")} successfully</Box>
        </Box>
      );
      setSelected(null);
      refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoadingDelete(false);
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setCurrentNote(undefined);
  };

  const columns: Column<TPrivateNote>[] = [
    {
      title: "Transaction Private Note",
      key: "privateNote",
      minWidth: "40px",
      maxWidth: "300px",
      render: (item) => (
        <>
          <CustomTooltip title={item.txHash}>
            <StyledLink to={details.transaction(item.txHash)}>
              <>{getShortHash(item.txHash)}</>
            </StyledLink>
          </CustomTooltip>
          <SmallText>{item.note}</SmallText>
        </>
      )
    },
    {
      title: "Added On",
      key: "addedOn",
      minWidth: "40px",
      maxWidth: "250px",
      render: (item) => formatDateTime(item.createdDate)
    },
    {
      title: <Box textAlign={"right"}>Action</Box>,
      key: "action",
      minWidth: "40px",
      render: (item) => (
        <Box display='flex' justifyContent={"flex-end"}>
          <ViewButton onClick={() => handleClickViewDetail(item)} />
          <RemoveButton onClick={() => setSelected(item)} />
        </Box>
      )
    }
  ];

  return (
    <Container overflow={"auto"}>
      <Header>
        <Title>My Transaction Private Notes</Title>
        <AddButton onClick={() => setOpenModal(true)}>
          <Box lineHeight={1} mr={"4px"}>
            Add
          </Box>
          <Box lineHeight={1}>
            <Plus width={"14px"} />
          </Box>
        </AddButton>
      </Header>
      <Box overflow={"auto"} height='100%'>
        <StyledTable
          style={{ overflow: "auto" }}
          emptyClassName='empty-content-table'
          columns={columns}
          data={data ?? []}
          pagination={{
            ...pageInfo,
            total: total,
            onChange: (page, size) => {
              setPage(page - 1);
              setSize(size);
            }
          }}
        />
      </Box>
      <AddPrivateNoteModal
        currentNote={currentNote}
        open={openModal}
        handleCloseModal={onCloseModal}
        refresh={refresh}
      />
      <Dialog
        open={!!selected}
        PaperProps={{
          style: { borderRadius: 20, width: 550, padding: "0 2px" }
        }}
      >
        <Box textAlign={"center"} pt={5} pb={2}>
          <QuestionConfirm />
        </Box>
        <Box component={"h2"} textAlign={"center"} fontWeight={"bold"} fontSize={"1.125rem"} paddingBottom={"0px"}>
          Confirmation Required
        </Box>
        <ButtonClose disabled={loadingDelete} onClick={() => setSelected(null)}>
          <img src={CloseIcon} alt='icon close' />
        </ButtonClose>
        <Box>
          <DialogContentText color={(theme) => theme.palette.text.secondary} fontSize={"1.125rem"}>
            Are you sure to remove transaction private note {getShortHash(selected?.txHash || "")} ?
          </DialogContentText>
        </Box>
        <DialogActions>
          <Box flex={1} pt={2} pb={3}>
            <CancelButton disabled={loadingDelete} onClick={() => setSelected(null)}>
              Close
            </CancelButton>
            <DeleteButton
              loading={loadingDelete}
              onClick={() => selected && handleClickRemoveNote(selected)}
              variant='contained'
            >
              Continue
            </DeleteButton>
          </Box>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PrivateNotes;
