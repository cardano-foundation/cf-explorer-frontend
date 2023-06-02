import moment from "moment";

import StyledModal from "src/components/commons/StyledModal";
import { details } from "src/commons/routers";
import { getShortHash } from "src/commons/utils/helper";
import { Column } from "src/components/commons/Table";
import { SmallText, StyledLink } from "src/components/share/styled";

import { Container, Title } from "./styles";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
}

type TActivityLog = {
  actionTime: string;
  description: string;
  ipAddress: string;
  strAction: string;
  userAction: string;
};
const ActivityLogModal: React.FC<IProps> = ({ open, handleCloseModal }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const columns: Column<TActivityLog>[] = [
    {
      title: "Time",
      key: "time",
      render: (r) => moment(r.actionTime).format("MM/DD/YYYY HH:mm:ss")
    },
    {
      title: "Action",
      key: "action",
      render: (r) => {
        return (
          <>
            <SmallText>Transaction hash</SmallText>
            <br />
            <StyledLink to={details.transaction(r.description)}>{getShortHash(r.description || "")}</StyledLink>
          </>
        );
      }
    }
  ];
  return (
    <StyledModal open={open} handleCloseModal={handleCloseModal}>
      <Container>
        <Title>Activity Log</Title>
        {/* <StyledTable columns={columns} data={activitiesLog || []}></StyledTable> */}
      </Container>
    </StyledModal>
  );
};

export default ActivityLogModal;
