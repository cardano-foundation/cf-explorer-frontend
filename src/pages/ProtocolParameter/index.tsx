import { useEffect, useState } from "react";
import { PROTOCOL_TYPE } from "../../commons/utils/constants";
import Card from "../../components/commons/Card";
import Table, { Column } from "../../components/commons/Table";
import { StyledContainer, ViewAction } from "./styles";
import { API } from "../../commons/utils/api";
import useFetch from "../../commons/hooks/useFetch";
import { formatDateTime } from "../../commons/utils/helper";
import ProtocolHistoryModal from "../../components/ProtocolHistoryModal";
import { TProtocolCurrent, TProtocolItem } from "../../types/protocol";

const ProtocolParameter: React.FC = () => {
  const [openDetailProtocol, setOpenDetailProtocol] = useState<boolean>(false);
  const [protocolType, setProtocolType] = useState<string>("");

  const currentProtocol = useFetch<TProtocolCurrent>(API.PROTOCOL_PARAMETER.CURRENT);
  const convertCurrentProtocol = Object.entries(currentProtocol?.data || {});

  const columns: Column<[string, TProtocolItem]>[] = [
    {
      title: "Parameter",
      key: "parameter",
      render: r => <div>{r[0]}</div>,
    },
    {
      title: "Last change",
      key: "lastChange",
      render: r => <div>{r[1]?.time ? formatDateTime(r[1].time) : ""}</div>,
    },
    {
      title: "History",
      key: "history",
      render: r => (
        <ViewAction
          onClick={() => {
            setOpenDetailProtocol(true);
            if (PROTOCOL_TYPE.hasOwnProperty(r[0])) {
              const type = r[0];
              setProtocolType(PROTOCOL_TYPE[type]);
            }
          }}
        >
          View Change
        </ViewAction>
      ),
    },
  ];

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `Protocol Parameter | Cardano Explorer`;
  }, []);

  return (
    <StyledContainer>
      <Card title={"Protocol parameter"}>
        <Table
          data={convertCurrentProtocol}
          columns={columns}
          total={{ title: "Total", count: convertCurrentProtocol.length }}
          showPagination={false}
        />
      </Card>
      <ProtocolHistoryModal
        protocolType={protocolType}
        open={openDetailProtocol}
        handleCloseModal={() => setOpenDetailProtocol(false)}
      />
    </StyledContainer>
  );
};

export default ProtocolParameter;
