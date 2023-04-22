import { Container } from '@mui/material'
import ReportGeneratedTabs, { TabsItem } from '../../components/ReportGeneratedTabs'
import ReportGeneratedTable from '../../components/ReportGeneratedTable'


const tabItems: TabsItem[] = [
  {
    value: '1',
    label: 'Address summary',
    component: <ReportGeneratedTable />
  },
  {
    value: '2',
    label: 'Staking lifecycle',
    component: <ReportGeneratedTable /> 
  },
  {
    value: '3',
    label: 'ADA transfers',
    component: <ReportGeneratedTable /> 
  }
]
const ReportGenerated = () => {
  return (
    <Container>
      <ReportGeneratedTabs tabsItem={tabItems} />
    </Container>
  )
}

export default ReportGenerated