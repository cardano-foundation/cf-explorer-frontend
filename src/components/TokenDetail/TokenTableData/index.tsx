import { Box, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";

import { details } from "src/commons/routers";
import CustomAccordion, { TTab } from "src/components/commons/CustomAccordion";
import { UnionTokenIcon, PeopleIcon, TransactionIcon, MetadataIcon } from "src/commons/resources";

import TokenMetaData from "./TokenMetadata";
import TokenMinting from "./TokenMinting";
import TokenTopHolder from "./TokenTopHolder";
import TokenTransaction from "./TokenTransaction";

interface ITokenTableData {
  totalSupply?: number;
  metadata?: ITokenMetadata;
  metadataJson?: string;
  setCurrentHolder?: (holders: number) => void;
  loading?: boolean;
  metadataCIP25?: Transaction["metadata"][0]["metadataCIP25"];
}

const TokenTableData: React.FC<ITokenTableData> = ({
  totalSupply,
  metadata,
  metadataJson,
  setCurrentHolder,
  loading,
  metadataCIP25
}) => {
  const { t } = useTranslation();
  const { tokenId } = useParams<{ tokenId: string }>();
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const theme = useTheme();
  const tabs: TTab[] = [
    {
      key: "transactions",
      label: t("glossary.transactions"),
      children: <TokenTransaction tokenId={tokenId} />,
      icon: TransactionIcon
    },
    {
      key: "topHolders",
      label: t("glossary.topHolders"),
      children: (
        <TokenTopHolder
          tokenId={tokenId}
          totalSupply={totalSupply}
          decimal={metadata?.decimals}
          setCurrentHolder={setCurrentHolder}
        />
      ),
      icon: PeopleIcon
    },
    {
      key: "tokenMint",
      label: t("tab.minting"),
      children: <TokenMinting tokenId={tokenId} metadata={metadata} />,
      icon: UnionTokenIcon
    },
    {
      key: "metadata",
      label: t("glossary.metadata"),
      children: <TokenMetaData metadataJson={metadataJson} metadataCIP25={metadataCIP25} />,
      icon: MetadataIcon
    }
  ];

  const handleTabChange = (tab: string) => {
    history.replace(details.token(tokenId, tab));
  };
  return (
    <Box mt={3}>
      <CustomAccordion tabs={tabs} onTabChange={handleTabChange} loading={loading} />
    </Box>
  );
};

export default TokenTableData;
