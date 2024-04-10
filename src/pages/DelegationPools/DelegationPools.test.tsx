import { screen, cleanup, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

import { render } from "src/test-utils";
import Table, { Column } from "src/components/commons/Table";
import useFetchList from "src/commons/hooks/useFetchList";
import DelegationLists from "src/components/DelegationPool/DelegationList";
import { details } from "src/commons/routers";

const mockData = {
  data: [
    {
      poolName: "StakeNuts",
      poolId: "pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy",
      poolSize: 4176968837615
    }
  ]
};

jest.mock("src/commons/hooks/useFetchList");

describe("Delegation pools view", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render Delegation pools page", async () => {
    const mockUseFetch = useFetchList as jest.Mock;
    await mockUseFetch.mockReturnValue({ data: [] });
    render(<DelegationLists />);
    expect(useFetchList).toBeCalled();
  });

  it("renders the table with given column and data", () => {
    const columns: Column<{ test: string }>[] = [
      {
        title: "Test Column",
        key: "test",
        render: (r) => <div>{r.test}</div>
      }
    ];

    const data = [
      {
        test: "Test Data"
      }
    ];
    render(<Table columns={columns} data={data} />);

    expect(screen.getByText("Test Column")).toBeInTheDocument();
    expect(screen.getByText("Test Data")).toBeInTheDocument();
  });

  it("should navigate to the correct route when button is clicked", async () => {
    const mockUseFetchList = useFetchList as jest.Mock;
    mockUseFetchList.mockReturnValue(mockData);
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <DelegationLists />
      </Router>
    );

    const DelegationItem = screen.getByText("StakeNuts");
    fireEvent.click(DelegationItem);
    expect(history.location.pathname).toBe(
      details.delegation("pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy")
    );
  });
});
