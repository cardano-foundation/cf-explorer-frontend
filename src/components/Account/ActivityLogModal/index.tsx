import StyledModal from "../../commons/StyledModal";
import { Column } from "../../commons/Table";
import { Container, SmallText, StyledLink, StyledTable, Title } from "./styles";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
}

type activityItem = {
  time: string;
  transaction: string;
};

const data = [
  {
    time: "10/24/2022 14:09:02",
    transaction: "addw28hch.....ks905plm",
  },
];
const ActivityLogModal: React.FC<IProps> = ({ open, handleCloseModal }) => {
  const columns: Column<activityItem>[] = [
    {
      title: "Time",
      key: "time",
      render: r => r.time,
    },
    {
      title: "Action",
      key: "action",
      render: r => {
        return (
          <>
            <SmallText>Transaction hash</SmallText>
            <br />
            <StyledLink>{r.transaction}</StyledLink>
          </>
        );
      },
    },
  ];
  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal}>
      <Container>
        <Title>Activity Log</Title>
        <StyledTable columns={columns} data={data}></StyledTable>
      </Container>
    </StyledModal>
  );
};

export default ActivityLogModal;
