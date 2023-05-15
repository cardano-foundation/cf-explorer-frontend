import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReportGeneratedTabs, { TabsItem } from '.';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

const tabsItem: TabsItem[] = [
  {
    value: 'stake',
    label: 'This is tab 1',
    component: <div>This is component 1</div>
  },
  { value: 'pool', label: 'This is tab 2', component: <div>This is component 2</div> }
];

describe('ReportGeneratedTabs', () => {
  it('should render tabs', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ReportGeneratedTabs tabsItem={tabsItem} />
      </Router>
    );
    const element = screen.getByTestId('report-generated-tabs');
    expect(element).toBeInTheDocument();
    expect(screen.getByText('This is tab 1')).toBeInTheDocument();
    expect(screen.getByText('This is tab 2')).toBeInTheDocument();
  });

  it('should clickable when change tab', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ReportGeneratedTabs tabsItem={tabsItem} />
      </Router>
    );
    const tab2 = screen.getByText('This is tab 2');
    await userEvent.click(tab2);
    expect(history.length).toBe(2);
    expect(screen.getByText('This is component 2')).toBeInTheDocument();

    const tab1 = screen.getByText('This is tab 1');
    await userEvent.click(tab1);
    expect(history.length).toBe(3);
    expect(screen.getByText('This is component 1')).toBeInTheDocument();
  });
});
