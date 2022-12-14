import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { parse } from "qs";

import useFetchList from "../../commons/hooks/useFetchList";
import TokenList from "../../components/TokenList";

import { StyledContainer } from "./styles";
import axios from "axios";

interface ITokenList {}

const Tokens: React.FC<ITokenList> = () => {
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);

  const [tokenMetadataLoading, setTokenMetadataLoading] = useState<boolean>(false);
  const [tokenMetadata, setTokenMetadata] = useState<ITokenMetadata[]>([]);

  const {
    data: tokensOverview,
    loading: tokensLoading,
    initialized,
    total,
    totalPage,
    currentPage,
  } = useFetchList<ITokenOverview>("/tokens", {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });

  useEffect(() => {
    async function loadMetadata() {
      if (tokensOverview) {
        setTokenMetadataLoading(true);
        const query: string[] = tokensOverview.map(token => `${token?.policy}${token?.name}`);

        try {
          const {
            data: { subjects },
          } = await axios.post("/metadata/query", {
            subjects: query,
            properties: ["policy", "logo"],
          });

          setTokenMetadata(
            subjects.map((item: any) => ({
              policy: item.policy,
              logo: item.logo.value,
            }))
          );
        } catch (err) {}

        setTokenMetadataLoading(false);
      }
      return true;
    }

    loadMetadata();
  }, [tokensOverview]);

  const mergedToken: IToken[] = useMemo(() => {
    return tokensOverview.map(token => {
      const findedToken = tokenMetadata.find(_ => token.policy === _.policy);
      return { ...token, logo: findedToken?.logo, decimals: findedToken?.decimals };
    });
  }, [tokensOverview, tokenMetadata]);

  return (
    <StyledContainer>
      <TokenList
        tokens={mergedToken}
        tokensLoading={tokensLoading}
        tokensMetadataLoading={tokenMetadataLoading}
        initialized={initialized}
        currentPage={currentPage}
        total={total}
        totalPage={totalPage}
      />
    </StyledContainer>
  );
};

export default Tokens;
