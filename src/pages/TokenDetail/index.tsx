import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../commons/hooks/useFetch";
import TokenOverview from "../../components/TokenDetail/TokenOverview";
import TokenTableData from "../../components/TokenDetail/TokenTableData";

import { StyledContainer } from "./styles";

interface ITokenDetail {}

const TokenDetail: React.FC<ITokenDetail> = () => {
  const params = useParams<{ tokenId: string }>();
  const { data: tokenOverview, loading } = useFetch<ITokenOverview>(`tokens/${params.tokenId}`);

  const [tokenMetadataLoading, setTokenMetadataLoading] = useState<boolean>(false);
  const [tokenMetadata, setTokenMetadata] = useState<ITokenMetadata>({});

  useEffect(() => {
    async function loadMetadata() {
      if (tokenOverview) {
        setTokenMetadataLoading(true);

        try {
          const {
            data: { subjects },
          } = await axios.post("/metadata/query", {
            subjects: [`${tokenOverview.policy}${tokenOverview.name}`],
            properties: ["policy", "logo", "decimals"],
          });

          if (subjects.length !== 0) {
            setTokenMetadata({
              policy: subjects[0]?.policy,
              logo: subjects[0]?.logo.value,
              decimals: subjects[0]?.decimals.value,
            });
          }
        } catch (err) {}

        setTokenMetadataLoading(false);
      }
      return true;
    }
    loadMetadata();
  }, [tokenOverview]);

  const mergedToken: IToken = useMemo(
    () => ({ ...tokenOverview, logo: tokenMetadata.logo, decimals: tokenMetadata.decimals }),
    [tokenOverview, tokenMetadata]
  );

  return (
    <StyledContainer>
      <TokenOverview data={mergedToken} loading={loading} tokenMetadataLoading={tokenMetadataLoading} />
      <TokenTableData totalSupply={mergedToken.supply}/>
    </StyledContainer>
  );
};

export default TokenDetail;
