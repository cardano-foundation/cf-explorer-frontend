import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../commons/hooks/useFetch";
import TokenOverview from "../../components/TokenDetail/TokenOverview";

import { StyledContainer } from "./styles";

interface ITokenDetail {}

const TokenDetail: React.FC<ITokenDetail> = () => {
  const params = useParams<{ tokenId: string }>();
  const { data: tokenOverview, loading } = useFetch<ITokenOverview>(`tokens/${params.tokenId}`);

  const [tokenMetadata, setTokenMetadata] = useState<ITokenMetadata>({});

  useEffect(() => {
    async function loadMetadata() {
      if (tokenOverview) {
        const {
          data: { subjects },
        } = await axios.post("/metadata/query", {
          subjects: [`${tokenOverview.policy}${tokenOverview.name}`],
          properties: ["policy", "logo", "decimals"],
        });

        setTokenMetadata({
          policy: subjects[0].policy,
          logo: subjects[0].logo.value,
          decimals: subjects[0].decimals.value,
        });
      }
    }
    loadMetadata();
  }, [tokenOverview]);

  const mergedToken: IToken = useMemo(
    () => ({ ...tokenOverview, logo: tokenMetadata.logo, decimals: tokenMetadata.decimals }),
    [tokenOverview, tokenMetadata]
  );

  return (
    <StyledContainer>
      <TokenOverview data={mergedToken} loading={loading} />
      {/* <TokenTableData /> */}
    </StyledContainer>
  );
};

export default TokenDetail;
