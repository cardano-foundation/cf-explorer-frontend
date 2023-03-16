import { useEffect, useState } from "react";
import { ActionButton, AddButton, ButtonCancel, Container, Header, StyledTable, Title } from "./styles";
import { ReactComponent as Plus } from "../../commons/resources/icons/plus.svg";
import { formatDateTime, getPageInfo, getShortHash } from "../../commons/utils/helper";
import { SmallText, StyledLink } from "../../components/share/styled";
import useFetchList from "../../commons/hooks/useFetchList";
import AddPrivateNoteModal from "../../components/Account/AddPrivateNoteModal";
import { Column } from "../../types/table";
import { stringify } from "qs";
import { useHistory, useLocation } from "react-router-dom";
import CustomTooltip from "../../components/commons/CustomTooltip";
import { ReactComponent as Expand } from "../../commons/resources/icons/expand.svg";
import { ReactComponent as Warning } from "../../commons/resources/icons/warning.svg";
import { AlertProps, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { removePrivateNote } from "../../commons/utils/userRequest";
import { NETWORK, NETWORK_TYPES } from "../../commons/utils/constants";
import { details } from "../../commons/routers";
import Toast from "../../components/commons/Toast";
import { DialogContentText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ButtonClose } from "../../components/ScriptModal/styles";
import { CloseIcon } from "../../commons/resources";

type TAction = {
  onClick: () => void;
};

const ViewButton: React.FC<TAction> = ({ onClick }) => {
  return (
    <CustomTooltip placement="top" title="View private note">
      <ActionButton onClick={onClick} typeButton="View">
        <Expand />
      </ActionButton>
    </CustomTooltip>
  );
};

const RemoveButton: React.FC<TAction> = ({ onClick }) => {
  return (
    <CustomTooltip placement="top" title="Remove note">
      <ActionButton onClick={onClick} typeButton="Remove">
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

  const history = useHistory();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [selected, setSelected] = useState<TPrivateNote | null>(null);
  const [currentNote, setCurrentNote] = useState<TCurrentNote | undefined>();
  const [message, setMessage] = useState<{ message: string; severity: AlertProps["severity"] }>({
    message: "",
    severity: "error",
  });

  const { data, total, refesh } = useFetchList("note/find-all", { network: NETWORK_TYPES[NETWORK], page, size }, true);
  const { search } = useLocation();
  const pageInfo = getPageInfo(search);

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage({ message: "", severity: "error" });
  };

  const handleClickViewDetail = (note: TPrivateNote) => {
    setCurrentNote({
      hash: note.txHash,
      note: note.note,
      id: note.id,
    });
    setOpenModal(true);
  };

  const handleClickRemoveNote = async (note: TPrivateNote) => {
    setLoadingDelete(true);
    try {
      await removePrivateNote(note.id);
      setMessage({
        message: `Delete transaction private note ${getShortHash(note.txHash || "")} successfully`,
        severity: "success",
      });
      setSelected(null);
      refesh();
    } catch (error) {
      setMessage({
        message: "Something went wrong!",
        severity: "error",
      });
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
      render: item => (
        <>
          <CustomTooltip title={item.txHash}>
            <StyledLink to={details.transaction(item.txHash)}>
              <>{getShortHash(item.txHash)}</>
            </StyledLink>
          </CustomTooltip>
          <br />
          <SmallText>{item.note}</SmallText>
        </>
      ),
    },
    {
      title: "Added On",
      key: "addedOn",
      minWidth: "40px",
      maxWidth: "250px",
      render: item => formatDateTime(item.createdDate),
    },
    {
      title: <Box textAlign={"right"}>Action</Box>,
      key: "action",
      minWidth: "40px",
      render: item => (
        <Box display="flex" justifyContent={"flex-end"}>
          <ViewButton onClick={() => handleClickViewDetail(item)} />
          <RemoveButton onClick={() => setSelected(item)} />
        </Box>
      ),
    },
  ];

  return (
    <Container overflow={"auto"}>
      <Header>
        <Title>My Transaction Private Notes</Title>
        <AddButton onClick={() => setOpenModal(true)} endIcon={<Plus />}>
          Add
        </AddButton>
      </Header>
      <Box overflow={"auto"} height="100%">
        <StyledTable
          style={{ overflow: "auto" }}
          emptyClassName="empty-content-table"
          columns={columns}
          total={{ count: total, title: "Total Private Notes" }}
          data={data}
          pagination={{
            ...pageInfo,
            total: total,
            onChange: (page, size) => {
              setPage(page - 1);
              setSize(size);
            },
          }}
        />
      </Box>
      <AddPrivateNoteModal
        setMessage={setMessage}
        currentNote={currentNote}
        open={openModal}
        handleCloseModal={onCloseModal}
        refesh={refesh}
      />
      <Toast
        open={!!message.message}
        onClose={handleCloseToast}
        messsage={message.message}
        severity={message.severity}
      />
      <Dialog open={!!selected}>
        <DialogTitle textAlign={"left"} fontWeight="bold" color={"#13152F"}>
          Confirmation Required
        </DialogTitle>

        <ButtonClose onClick={() => setSelected(null)}>
          <img src={CloseIcon} alt="icon close" />
        </ButtonClose>
        <DialogContent>
          <DialogContentText color={"#344054"}>
            Are you sure to remove transaction private note {getShortHash(selected?.txHash || "")} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonCancel autoFocus onClick={() => setSelected(null)}>
            Cancel
          </ButtonCancel>
          <LoadingButton
            loading={loadingDelete}
            onClick={() => selected && handleClickRemoveNote(selected)}
            variant="contained"
            color="error"
            style={{ textTransform: "capitalize", height: "32px" }}
          >
            Remove
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PrivateNotes;
