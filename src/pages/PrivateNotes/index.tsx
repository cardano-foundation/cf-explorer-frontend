import { useEffect, useState } from "react";
import { ActionButton, AddButton, Container, Header, StyledTable, Title } from "./styles";
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
import { Box } from "@mui/material";
import { removePrivateNote } from "../../commons/utils/userRequest";
import { NETWORK, NETWORK_TYPES } from "../../commons/utils/constants";
import { details } from "../../commons/routers";

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

  const [openModal, setOpenModal] = useState(false);
  const [currentNote, setCurrentNote] = useState<TCurrentNote | undefined>();
  const { data, total, refesh } = useFetchList("note/find-all", { network: NETWORK_TYPES[NETWORK] }, true);
  const { search } = useLocation();
  const pageInfo = getPageInfo(search);

  const handleClickViewDetail = (note: TPrivateNote) => {
    setCurrentNote({
      hash: note.txHash,
      note: note.note,
      id: note.id,
    });
    setOpenModal(true);
  };

  const handleClickRemoveNote = async (note: TPrivateNote) => {
    try {
      await removePrivateNote(note.id);
      refesh();
    } catch (error) {}
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
      render: item => formatDateTime(item.createdDate),
    },
    {
      title: "Action",
      key: "action",
      minWidth: "40px",
      render: item => (
        <Box display="flex">
          <ViewButton onClick={() => handleClickViewDetail(item)} />
          <RemoveButton onClick={() => handleClickRemoveNote(item)} />
        </Box>
      ),
    },
  ];

  return (
    <Container>
      <Header>
        <Title>My Transaction Private Notes</Title>
        <AddButton onClick={() => setOpenModal(true)} endIcon={<Plus />}>
          Add
        </AddButton>
      </Header>
      <Box overflow={"auto"}>
        <StyledTable
          style={{ overflow: "auto" }}
          emptyClassName="empty-content-table"
          columns={columns}
          data={data}
          total={{ count: total, title: "Total Private Notes" }}
          pagination={{
            ...pageInfo,
            total: total,
            onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
          }}
        />
      </Box>
      <AddPrivateNoteModal currentNote={currentNote} open={openModal} handleCloseModal={onCloseModal} refesh={refesh} />
    </Container>
  );
};

export default PrivateNotes;
