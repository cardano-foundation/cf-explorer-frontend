import { useEffect, useState } from "react";
import Card from "../../components/commons/Card";
import { Box, Button, Container, Skeleton, alpha } from "@mui/material";
import { Column } from "../../types/table";
import { PROTOCOL_TYPE } from "../../commons/utils/constants";
import Table from "../../components/commons/Table";
import { useTheme } from "@mui/material";
import useFetch from "../../commons/hooks/useFetch";
import { API } from "../../commons/utils/api";
import { ProtocolHistory, ProtocolTypeKey, TProtocolParam } from "../../types/protocol";
import { useList, useUpdateEffect } from "react-use";
import ParseScriptModal from "../../components/ParseScriptModal";
import { HiArrowLongLeft } from "react-icons/hi2";
import { BackButton, BackText } from "./styles";
import styled from "@emotion/styled";

const ProtocolParameter: React.FC = () => {
  const [fixedColumnList, { push: pushFixedColumn }] = useList<string>([]);
  const [variableColumnList, { push: pushVariableColumn }] = useList<string>([]);
  const [costModelScript, setCostModelScript] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const { data: dataFixed, loading: loadingFixed } = useFetch<TProtocolParam>(API.PROTOCOL_PARAMETER.FIXED);
  const { data: dataLastest, loading: loadingLastest } = useFetch<TProtocolParam>(API.PROTOCOL_PARAMETER.LASTEST);

  useUpdateEffect(() => {
    dataFixed &&
      [...Object.keys(PROTOCOL_TYPE), "startEpoch", "endEpoch"].map(k =>
        dataFixed[k as ProtocolTypeKey] !== null ? pushFixedColumn(k) : ""
      );

    dataLastest &&
      [...Object.keys(PROTOCOL_TYPE), "startEpoch", "endEpoch"].map(k =>
        dataLastest[k as ProtocolTypeKey] !== null && dataLastest[k as ProtocolTypeKey]?.transactionHash !== null
          ? pushVariableColumn(k)
          : ""
      );
  }, [dataFixed, dataLastest]);

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Protocol Parameters | Cardano Explorer`;
  }, []);

  const theme = useTheme();

  const columnsMap = Object.keys(PROTOCOL_TYPE).map((k, idx) => ({
    title: k,
    key: k,
    render: (r: TProtocolParam) => {
      return (
        <Box
          component={k === "costModel" ? Button : Box}
          onClick={() => k === "costModel" && setCostModelScript(r["costModel"] !== null ? r["costModel"].value : "")}
          justifyItems={"flex-start"}
          textTransform={"capitalize"}
        >
          <Box
            maxWidth={300}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
            color={({ palette }) => (k === "costModel" ? palette.blue[800] : "unset")}
          >
            {r[k as ProtocolTypeKey] !== null ? r[k as ProtocolTypeKey].value : ""}
          </Box>
        </Box>
      );
    },
  }));

  const columnsFull: Column<TProtocolParam>[] = [
    {
      title: "Epoch",
      key: "startEpoch",
      render: (r: TProtocolParam) => {
        return r?.epochChange?.startEpoch || 0;
      },
    },
    ...columnsMap,
  ];

  const fixedColumn = columnsFull.filter(c => fixedColumnList.includes(c.key));
  const variableColumn = columnsFull.filter(c => variableColumnList.includes(c.key));

  return (
    <Container>
      {showHistory && (
        <Box textAlign={"left"}>
          <BackButton onClick={() => setShowHistory(false)}>
            <HiArrowLongLeft />
            <BackText>Back</BackText>
          </BackButton>
        </Box>
      )}
      <Card
        marginTitle="0px"
        title={showHistory ? "Protocol parameters update history" : "Protocol parameters"}
        textAlign={"left"}
        extra={showHistory && <Box>Filter</Box>}
      >
        <Box pt={2}>
          {showHistory && <ProtocolParameterHistory />}
          {!showHistory && (
            <>
              <Box pb={"30px"} borderBottom={`1px solid ${alpha(theme.palette.common.black, 0.1)}`}>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                  <Box fontWeight={"bold"} fontSize={"1.25rem"}>
                    Variable Parameters
                  </Box>
                  <Box
                    component={Button}
                    variant="contained"
                    textTransform={"capitalize"}
                    fontWeight={"bold"}
                    fontSize={"0.875rem"}
                    onClick={() => setShowHistory(true)}
                  >
                    View update history
                  </Box>
                </Box>
                {loadingLastest && (
                  <Box
                    component={Skeleton}
                    mt={2}
                    borderRadius={({ spacing }) => spacing(2)}
                    variant="rectangular"
                    height={280}
                  />
                )}
                {!loadingLastest && <Table columns={variableColumn} data={dataLastest !== null ? [dataLastest] : []} />}
              </Box>
              <Box pt={"30px"}>
                <Box>
                  <Box fontWeight={"bold"} fontSize={"1.25rem"}>
                    Fixed Parameters
                  </Box>
                  {loadingFixed && (
                    <Box
                      component={Skeleton}
                      mt={2}
                      borderRadius={({ spacing }) => spacing(2)}
                      variant="rectangular"
                      height={280}
                    />
                  )}
                  {!loadingFixed && <Table columns={fixedColumn} data={dataFixed !== null ? [dataFixed] : []} />}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Card>
      <ParseScriptModal
        open={!!costModelScript}
        onClose={() => setCostModelScript("")}
        script={costModelScript}
        title="CostModel"
      />
    </Container>
  );
};

export default ProtocolParameter;

const ProtocolParameterHistory = () => {
  const { data: dataHistory, loading } = useFetch<ProtocolHistory>(API.PROTOCOL_PARAMETER.HISTORY);
  const [dataHistoryMapping, { push: pushHistory, updateAt: updateAtHistory, filter: filterHistory, clear }] = useList<{
    [key: string]: any;
  }>([]);
  const [columnTitle, { push: pushColumnTitle }] = useList<string>([]);
  const [dataTable, setDataTable] = useState<{ [key: string]: any }[]>([]);

  const getTitleColumn = (data: ProtocolHistory | null) => {
    data &&
      data.epochChanges.map(({ endEpoch, startEpoch }) => {
        return endEpoch === startEpoch
          ? pushColumnTitle(`Epoch ${startEpoch}`)
          : pushColumnTitle(`Epoch ${endEpoch} - ${startEpoch}`);
      });
  };
  const getDataColumn = (data: ProtocolHistory | null) => {
    clear();
    for (const prop in data) {
      if (Object.hasOwn(data, prop)) {
        const newdata: { [key: string]: any } = {
          params: prop,
        };
        columnTitle.map((t, idx) => {
          newdata[t] = data[prop as keyof ProtocolHistory][idx];
        });
        if (newdata) {
          pushHistory(newdata);
        }
      }
    }
  };
  useUpdateEffect(() => {
    if (dataHistory) {
      getTitleColumn(dataHistory);
    }
  }, [JSON.stringify(dataHistory)]);

  useUpdateEffect(() => {
    if (columnTitle) {
      getDataColumn(dataHistory);
    }
  }, [JSON.stringify(columnTitle)]);

  useEffect(() => {
    setDataTable([...dataHistoryMapping].slice(1));
  }, [JSON.stringify(dataHistoryMapping)]);

  if (loading || dataTable.length === 0) {
    return (
      <Box component={Skeleton} mt={2} borderRadius={({ spacing }) => spacing(2)} variant="rectangular" height={400} />
    );
  }

  const columnsMap = columnTitle.map(t => ({
    title: t,
    key: t,
    render: (r: any) => (
      <Box p={"24px 20px"} maxWidth={200} overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"}>
        {r[t] ? r[t]?.value : ""}
      </Box>
    ),
  }));

  const columnsFull: Column<TProtocolParam & { params: string }>[] = [
    {
      title: "Parameter Name",
      key: "ParameterName",
      render: (r: TProtocolParam & { params: string }) => {
        return <Box p={"24px 20px"}>{r?.params}</Box>;
      },
    },
    ...columnsMap,
  ];

  return (
    <Box>
      <TableStyled columns={columnsFull} data={dataTable} loading={loading} />
    </Box>
  );
};

const TableStyled = styled(Table)(() => ({
  td: {
    padding: 0,
  },
}));
