import Table, { Column } from "../commons/Table";
import { getDummyData } from "./dummy-data";

interface ReportGeneratedColumn {
  column1: string;
  column2: string;
  column3: string;
  column4: string;
}

const columns: Column<ReportGeneratedColumn>[] = [
  {
    key: "column1",
    title: "Column #1",
    render(data) {
      return data.column1;
    }
  },
  {
    key: "column2",
    title: "Column #2",
    render(data) {
      return data.column1;
    }
  },
  {
    key: "column3",
    title: "Column #3",
    render(data) {
      return data.column1;
    }
  },
  {
    key: "column4",
    title: "Column #4",
    render(data) {
      return data.column1;
    }
  }
];

const ReportGeneratedTable = () => {
  const data = getDummyData();
  return (
    <Table
      columns={columns}
      data={data}
      pagination={{
        size: 50,
        page: 1,
        total: 1000
      }}
      total={{ count: 1000, title: "Reported-Table" }}
    />
  );
};

export default ReportGeneratedTable;
