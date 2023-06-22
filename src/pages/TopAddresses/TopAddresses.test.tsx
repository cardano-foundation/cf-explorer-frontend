import { screen, cleanup, fireEvent } from "@testing-library/react";

import { render } from "src/test-utils";

import TopAddresses from ".";

import Table from "src/components/commons/Table";
import useFetchList from "src/commons/hooks/useFetchList";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

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

describe("Top addresses view", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render Top addresses page", async () => {
    const mockUseFetch = useFetchList as jest.Mock;
    await mockUseFetch.mockReturnValue({ data: [] });
    render(<TopAddresses />);
    expect(useFetchList).toBeCalled();
  });

  it("should show correct data in table", async () => {
    const mockUseFetchList = useFetchList as jest.Mock;
    mockUseFetchList.mockReturnValue(mockData);
    render(<TopAddresses />);
    expect(screen.getByText("Ae2td...zN2zG")).toBeInTheDocument();
    expect(screen.getByText(/Top addresses/i)).toBeInTheDocument();
  });

  it("renders the table with given column and data", () => {
    const columns = [
      {
        title: "Test Column",
        key: "test",
        render: (r: any) => <div>{r.test}</div>
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

  it("renders the table with given column and data", () => {
    const columns = [
      {
        title: "Test Column",
        key: "test",
        render: (r: any) => <div>{r.test}</div>
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
        <TopAddresses />
      </Router>
    );

    const AddressesItem = screen.getByText("Ae2td...zN2zG");
    fireEvent.click(AddressesItem);
    expect(history.location.pathname).toBe("/address/Ae2tdPwUPEYwFx4dmJheyNPPYXtvHbJLeCaA96o6Y2iiUL18cAt7AizN2zG");
  });
});
