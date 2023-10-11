import { screen, cleanup, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render } from "src/test-utils";
import Table, { Column } from "src/components/commons/Table";
import useFetchList from "src/commons/hooks/useFetchList";

import TopAddressesByADABalance from "./index";

const mockData = {
  data: [
    {
      address: "Ae2tdPwUPEYwFx4dmJheyNPPYXtvHbJLeCaA96o6Y2iiUL18cAt7AizN2zG",
      balance: "2083824242810424",
      txCount: "1837"
    }
  ]
};

jest.mock("src/commons/hooks/useFetchList");

describe("Top addresses by ADA balance view", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render Top addresses page", async () => {
    const mockUseFetch = useFetchList as jest.Mock;
    await mockUseFetch.mockReturnValue({ data: [] });
    render(<TopAddressesByADABalance />);
    expect(useFetchList).toBeCalled();
  });

  it("should show correct data in table", async () => {
    const mockUseFetchList = useFetchList as jest.Mock;
    mockUseFetchList.mockReturnValue(mockData);
    render(<TopAddressesByADABalance />);
    expect(screen.getByText("Ae2td...zN2zG")).toBeInTheDocument();
  });

  it("renders the table with given column and data", () => {
    const data = [
      {
        test: "Test Data"
      }
    ];
    const columns: Column<{ test: string }>[] = [
      {
        title: "Test Column",
        key: "test",
        render: (r) => <div>{r.test}</div>
      }
    ];
    render(<Table columns={columns} data={data} />);

    expect(screen.getByText("Test Column")).toBeInTheDocument();
    expect(screen.getByText("Test Data")).toBeInTheDocument();
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
        <TopAddressesByADABalance />
      </Router>
    );

    const AddressesItem = screen.getByText("Ae2td...zN2zG");
    fireEvent.click(AddressesItem);
    expect(history.location.pathname).toBe("/address/Ae2tdPwUPEYwFx4dmJheyNPPYXtvHbJLeCaA96o6Y2iiUL18cAt7AizN2zG");
  });
});
