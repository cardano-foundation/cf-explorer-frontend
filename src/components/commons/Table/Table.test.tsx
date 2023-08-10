import { screen } from "@testing-library/react";
import Router from "react-router";

import { render } from "src/test-utils";

import Table from ".";

const columnsMock = [
  {
    title: "Created At",
    key: "Timestamp"
  },
  {
    title: "name",
    key: "name"
  }
];

describe("Table", () => {
  it("should render table", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ poolType: "registration" });

    render(<Table isShowingResult={false} columns={columnsMock} total={{ title: "Mock title table", count: 50 }} />);
    const table = screen.getByTestId("table-common");
    const showingResult = screen.getByText("50");
    expect(table).toBeInTheDocument();
    expect(showingResult).toBeInTheDocument();
  });

  it("should render no data table when has empty data", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ poolType: "registration" });
    render(<Table loading={false} initialized={true} data={[]} columns={columnsMock} />);

    const tableSkeleton = screen.getByAltText("empty icon");
    expect(tableSkeleton).toBeInTheDocument();
  });

  it("should render table when has some data", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ poolType: "registration" });
    render(
      <Table
        loading={false}
        initialized={true}
        data={[{ timestamp: "10-05-2023", name: "this is name test" }]}
        columns={columnsMock}
      />
    );
    expect(screen.getByText("this is name test")).toBeInTheDocument();
  });
});
