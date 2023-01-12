import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { parse, stringify } from "qs";
import moment from "moment";
import { useWindowSize } from "react-use";
import Card from "../../components/commons/Card";
import Table, { Column } from "../../components/commons/Table";
import { setOnDetailView } from "../../stores/user";
import { details } from "../../commons/routers";
import { getPageInfo, getShortWallet, numberWithCommas } from "../../commons/utils/helper";
import DetailViewToken from "../../components/commons/DetailView/DetailViewToken";
import useFetchList from "../../commons/hooks/useFetchList";
import { AssetName, Logo, StyledContainer, LogoEmpty } from "./styles";
import CustomTooltip from "../../components/commons/CustomTooltip";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Box } from "@mui/material";

interface ITokenList {}

const Tokens: React.FC<ITokenList> = () => {
  const [token, setToken] = useState<IToken | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const { width } = useWindowSize();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const query = parse(search);

  const { data, ...fetchData } = useFetchList<ITokenOverview>(`/tokens`, {
    ...pageInfo,
    sort: query.sort ? `${query.sort}` : "supply,DESC",
  });

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Tokens List | Cardano Explorer`;
  }, []);

  const columns: Column<IToken>[] = [
    {
      title: "Icon",
      key: "icon",
      minWidth: "50px",
      render: r =>
        r?.metadata?.logo ? <Logo src={`data:/image/png;base64,${r.metadata?.logo}`} alt="icon" /> : <LogoEmpty />,
    },
    {
      title: "Asset Name",
      key: "assetName",
      minWidth: "100px",
      render: r =>
        r.displayName && r.displayName.length > 20 ? (
          <CustomTooltip placement={"top"} title={r.displayName}>
            <AssetName to={details.token(r?.fingerprint ?? "")}>{getShortWallet(r.displayName || "")}</AssetName>
          </CustomTooltip>
        ) : (
          <AssetName to={details.token(r?.fingerprint ?? "")}>{r.displayName}</AssetName>
        ),
    },
    {
      title: "Total Transactions",
      key: "totalTransactions",
      minWidth: "150px",
      render: r => numberWithCommas(r?.txCount ?? ""),
    },
    {
      title: "Total Supply",
      key: "totalSupply",
      minWidth: "150px",
      render: r => numberWithCommas(r?.supply ?? ""),
    },
    {
      title: "Created",
      key: "created",
      minWidth: "150px",
      render: r => (
        <>
          {moment(r.createdOn).format("MM/DD/YYYY HH:mm:ss")}{" "}
          {JSON.stringify(token) === JSON.stringify(r) && (
            <Box position={"absolute"} right="10px" top={"50%"} style={{ transform: "translateY(-50%)" }}>
              <MdOutlineKeyboardArrowRight fontSize={30} />
            </Box>
          )}
        </>
      ),
    },
  ];

  const openDetail = (_: any, r: IToken, index: number) => {
    if (width > 1023) {
      setOnDetailView(true);
      setToken(r || null);
      setSelected(index);
    } else history.push(details.token(r?.fingerprint ?? ""));
  };

  const handleClose = () => {
    setOnDetailView(false);
    setToken(null);
    setSelected(null);
  };

  return (
    <StyledContainer>
      <Card title="Token List">
        <Table
          {...fetchData}
          data={data}
          columns={columns}
          total={{ title: "Total", count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
          }}
          onClickRow={openDetail}
          selected={selected}
        />
        {token && <DetailViewToken tokenId={token.fingerprint || ""} token={token} handleClose={handleClose} />}
      </Card>
    </StyledContainer>
  );
};

export default Tokens;
