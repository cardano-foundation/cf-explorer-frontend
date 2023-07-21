import { Box, Dialog, DialogActions, DialogContentText } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { useScreen } from "src/commons/hooks/useScreen";
import useToast from "src/commons/hooks/useToast";
import { CloseIcon } from "src/commons/resources";
import { ReactComponent as Expand } from "src/commons/resources/icons/expand.svg";
import { ReactComponent as Plus } from "src/commons/resources/icons/plus.svg";
import { ReactComponent as QuestionConfirm } from "src/commons/resources/icons/questionConfirm.svg";
import { ReactComponent as Warning } from "src/commons/resources/icons/warning.svg";
import { details, routers } from "src/commons/routers";
import { NETWORK, NETWORK_TYPES } from "src/commons/utils/constants";
import { formatDateTime, getPageInfo, getShortHash } from "src/commons/utils/helper";
import { removePrivateNote } from "src/commons/utils/userRequest";
import AddPrivateNoteModal from "src/components/Account/AddPrivateNoteModal";
import { ButtonClose } from "src/components/ScriptModal/styles";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { Column } from "src/types/table";
import useAuth from "src/commons/hooks/useAuth";

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

type TAction = {
  onClick: () => void;
};

const ViewButton: React.FC<TAction> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isTablet } = useScreen();

  return (
    <CustomTooltip
      onClose={() => setIsOpen(false)}
      onOpen={() => {
        if (!isTablet) return;
        setIsOpen(true);
      }}
      placement="top"
      title="View private note"
    >
      <ActionButton
        data-testid="btn-view-note"
        onClick={() => {
          if (isOpen && isTablet) return;
          onClick();
        }}
        typeButton="View"
      >
        <Expand />
      </ActionButton>
    </CustomTooltip>
  );
};

const RemoveButton: React.FC<TAction> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isTablet } = useScreen();

  return (
    <CustomTooltip
      onClose={() => setIsOpen(false)}
      onOpen={() => {
        if (!isTablet) return;
        setIsOpen(true);
      }}
      placement="top"
      title="Remove note"
    >
      <ActionButton
        onClick={() => {
          if (isOpen && isTablet) return;
          onClick();
        }}
        data-testid="btn-remove-note"
        typeButton="Remove"
      >
        <Warning />
      </ActionButton>
    </CustomTooltip>
  );
};

const PrivateNotes = () => {
  const history = useHistory();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `My Notes | Iris - Cardano Blockchain Explorer`;
    if (!isLoggedIn) {
      history.replace(routers.HOME);
    }
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
        <Box display="flex" justifyContent={"flex-end"}>
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
      <Box overflow={"auto"} height="100%">
        <StyledTable
          style={{ overflow: "auto" }}
          emptyClassName="empty-content-table"
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
          <img src={CloseIcon} alt="icon close" />
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
              variant="contained"
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
