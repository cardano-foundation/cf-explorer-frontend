import moment from "moment";
import { Tooltip } from "@mui/material";

import Card from "../../commons/Card";
import DetailCard from "../../commons/DetailCard";
import { formatADA, getShortWallet } from "../../../commons/utils/helper";
import { AIcon } from "../../../commons/resources";
import CopyButton from "../../commons/CopyButton";

import { Flex, StyledImage, StyledLink, StyledSpan } from "./styles";

interface BlockOverviewProps {
  data: BlockDetail | null;
  loading: boolean;
}

const BlockOverview: React.FC<BlockOverviewProps> = ({ data, loading }) => {
  const listDetails = [
    {
      title: "Block ID",
      value: data?.blockNo && (
        <Flex>
          <Tooltip title={`${data?.blockNo || ""}`} placement="top">
            <StyledLink>{data?.blockNo || ""}</StyledLink>
          </Tooltip>
          <CopyButton text={"" + data?.blockNo} />
        </Flex>
      ),
    },

    {
      title: "Created at",
      value: data?.time ? moment(data?.time).format("MM/DD/YYYY HH:mm:ss") : "",
    },
    {
      title: "Transaction",
      value: data?.txCount,
    },
    {
      title: "Transaction Fees",
      value: (
        <StyledSpan>
          {data?.totalFees && <>{formatADA(data?.totalFees)} ADA</>}
          <StyledImage src={AIcon} alt="ADA Icon" />
        </StyledSpan>
      ),
    },
    {
      title: "Total Output",
      value: (
        <StyledSpan>
          {data?.totalOutput && <>{formatADA(data?.totalOutput)} ADA</>}
          <StyledImage src={AIcon} alt="ADA Icon" />
        </StyledSpan>
      ),
    },
    {
      title: "Slot leader",
      value: data?.slotLeader && (
        <Flex>
          <Tooltip title={`${data?.slotLeader || ""}`} placement="top">
            <StyledLink>{getShortWallet(data?.slotLeader || "")}</StyledLink>
          </Tooltip>
          <CopyButton text={data?.slotLeader}/>
        </Flex>
      ),
    },
  ];

  return (
    <Card title={`Block Detail: ${data?.blockNo || 0} `}>
      <DetailCard
        loading={loading}
        listDetails={listDetails}
        progress={{
          block: data?.blockNo || 0,
          currentSlot: data?.epochSlotNo || 0,
          epoch: data?.epochNo || 0,
        }}
      />
    </Card>
  );
};

export default BlockOverview;
