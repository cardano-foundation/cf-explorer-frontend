import { Skeleton, Tooltip } from "@mui/material";
import moment from "moment";
import React from "react";

import { getShortHash, numberWithCommas } from "../../../commons/utils/helper";

import Card from "../../commons/Card";
import CopyButton from "../../commons/CopyButton";
import DetailCard from "../../commons/DetailCard";

import { AssetName, Logo, TokenId, TokenIdValue } from "./styles";

interface ITokenOverview {
  data: IToken | null;
  loading: boolean;
  tokenMetadataLoading: boolean;
}

const TokenOverview: React.FC<ITokenOverview> = ({ data, loading, tokenMetadataLoading }) => {
  const listDetails = [
    {
      title: "Token ID",
      value: (
        <TokenId>
          <Tooltip title={data?.fingerprint} placement="top">
            <TokenIdValue>{data?.fingerprint && getShortHash(data.fingerprint)}</TokenIdValue>
          </Tooltip>
          <CopyButton text={data?.fingerprint} />
        </TokenId>
      ),
    },
    {
      title: "Asset Name",
      value: (
        <AssetName>
          {tokenMetadataLoading ? (
            <Skeleton style={{ width: 30, height: 30, marginRight: 5 }} />
          ) : data?.logo ? (
            <Logo src={`data:/image/png;base64,${data.logo}`} alt="Logo" />
          ) : null}
          {data?.displayName}
        </AssetName>
      ),
    },

    { title: "Transactions", value: data?.txCount && numberWithCommas(data.txCount) },
    { title: "Created", value: data?.createdOn && moment(data.createdOn).format("MM/DD/YYYY HH:mm:ss") },
  ];

  return (
    <Card title={"Token Detail"}>
      <DetailCard
        listDetails={listDetails}
        loading={loading}
        tokenDetail={{ decimal: data?.decimals, totalSupply: data?.supply }}
      />
    </Card>
  );
};

export default TokenOverview;
