import moment from 'moment';
import { details } from '../../../commons/routers';
import { getShortHash } from '../../../commons/utils/helper';
import StyledModal from '../../commons/StyledModal';
import { Column } from '../../commons/Table';
import { SmallText, StyledLink } from '../../share/styled';
import { Container, Title } from './styles';

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
  // const { data: activitiesLog } = useFetch<TActivityLog[]>(USER_API.ACTIVITY_LOG, undefined, true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const columns: Column<TActivityLog>[] = [
    {
      title: 'Time',
      key: 'time',
      render: (r) => moment(r.actionTime).format('MM/DD/YYYY HH:mm:ss')
    },
    {
      title: 'Action',
      key: 'action',
      render: (r) => {
        return (
          <>
            <SmallText>Transaction hash</SmallText>
            <br />
            <StyledLink to={details.transaction(r.description)}>{getShortHash(r.description || '')}</StyledLink>
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
