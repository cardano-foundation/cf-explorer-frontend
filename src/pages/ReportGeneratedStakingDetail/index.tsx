import { Container } from '@mui/material';
import ReportGeneratedDetailTabs from '../../components/ReportGeneratedStakingDetail';
import { BackButton, BackText } from '../../components/commons/DetailHeader/styles';
import { HiArrowLongLeft } from 'react-icons/hi2';
import { TopHeader } from '../ReportGeneratedPoolDetail/styles';
import { useHistory } from 'react-router-dom';

const ReportGeneratedStakingDetail = () => {
  const history = useHistory();
  return (
    <Container>
      <TopHeader>
        <BackButton onClick={history.goBack}>
          <HiArrowLongLeft />
          <BackText>Back</BackText>
        </BackButton>
      </TopHeader>
      <ReportGeneratedDetailTabs />
    </Container>
  );
};

export default ReportGeneratedStakingDetail;
