import { Link, useHistory } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";
import moment from "moment";
import { stringify } from "qs";

import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { getShortWallet, formatADA } from "../../commons/utils/helper";

import styles from "./index.module.scss";
import { routers } from "../../commons/routers";
import { Tooltip } from "antd";
import { AIcon } from "../../commons/resources";

interface BlockListProps {
  blockLists: Block[];
  loading: boolean;
  total: number;
  totalPage: number;
  currentPage: number;
  initialized: boolean;
}

const BlockList: React.FC<BlockListProps> = ({ blockLists, loading, initialized, total, currentPage }) => {
  const history = useHistory();
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const columns: Column<Block>[] = [
    {
      title: "Block No.",
      key: "blockNo",
      minWidth: "100px",
      render: r => {
        return <span className={styles.fwBlod}>{r.blockNo}</span>;
      },
    },
    {
      title: "Block Id",
      key: "blockId",
      minWidth: "150px",
      render: r => (
        <Tooltip placement="top" title={r.hash}>
          <Link
            to={routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`)}
            className={`${styles.fwBlod} ${styles.link}`}
          >
            <div>{getShortWallet(`${r.hash}`)}</div>
            <BiLinkExternal fontSize={18} style={{ marginLeft: 8 }} />
          </Link>
        </Tooltip>
      ),
    },
    {
      title: "Created at",
      key: "createdAt",
      minWidth: "150px",
      render: r => <>{r.time ? moment(r.time).format("MM/DD/YYYY HH:mm:ss") : ""}</>,
    },
    {
      title: "Transactions",
      key: "transactions",
      minWidth: "150px",
      render: r => <div className={styles.fwBlod}>{r.txCount}</div>,
    },
    {
      title: "Fees",
      key: "fees",
      render: r => (
        <div className={styles.fwBlod}>
          <img src={AIcon} alt="a icon" /> {formatADA(r.totalFees) || 0}
        </div>
      ),
    },
    {
      title: "Output",
      key: "output",
      render: r => (
        <div className={styles.fwBlod}>
          <img src={AIcon} alt="a icon" /> {formatADA(r.totalOutput) || 0}
        </div>
      ),
      minWidth: "100px",
    },
  ];

  return (
    <Card title={"Blocks"}>
      <Table
        loading={loading}
        initialized={initialized}
        className={styles.table}
        columns={columns}
        data={blockLists}
        total={{ count: total, title: "Total Transactions" }}
        onClickRow={(_, r: Block) => history.push(routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`))}
        pagination={{
          onChange: (page, size) => {
            setQuery({ page, size });
          },
          page: currentPage || 0,
          total: total,
        }}
      />
    </Card>
  );
};

export default BlockList;
