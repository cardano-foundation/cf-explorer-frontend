import { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { useUpdateEffect } from "react-use";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import CustomFilter, { FilterParams } from "src/components/commons/CustomFilter";
import OverviewStaking from "src/components/commons/OverviewStaking";
import { EmptyRecord, FooterTable } from "src/components/commons/Table";
import { details } from "src/commons/routers";

import { GridBox, WrapFilterDescription, StyledList, StyledContainer } from "./styles";
import { DescriptionText } from "../../../DelegatorLifecycle/styles";

declare interface Props {
  onSelect: (pool: PoolUpdateItem | null) => void;
  setShowBackButton: (status: boolean) => void;
}

const RecentPoolUpdates = ({ onSelect, setShowBackButton }: Props) => {
  const { t } = useTranslation();
  const { poolId = "", txHash = "" } = useParams<{ poolId: string; txHash?: string }>();
  const history = useHistory();
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 50 });
  const [params, setParams] = useState<FilterParams>({});
  const { data, total, loading, initialized, error, query } = useFetchList<PoolUpdateItem>(
    API.SPO_LIFECYCLE.POOL_UPDATE(poolId),
    { ...pageInfo, ...params, txHash: params.search }
  );

  useEffect(() => {
    if (initialized) setShowBackButton(data.length > 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, setShowBackButton]);

  useEffect(() => {
    const currentItem = data.find((item) => item.txHash === txHash);
    onSelect(currentItem || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txHash, data]);

  const handleSelect = (poolUpdated: PoolUpdateItem) => {
    history.push(details.spo(poolId, "timeline", "pool-updates", poolUpdated.txHash));
  };

  const isOneItemOnly = data.length === 1 && Object.keys(query).length === 2;

  useUpdateEffect(() => {
    if (isOneItemOnly) history.push(details.spo(poolId, "timeline", "pool-updates", data[0].txHash));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (txHash) return null;

  return (
    <StyledContainer>
      <StyledList>
        <DescriptionText>{t("common.recentUpdates")}</DescriptionText>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <WrapFilterDescription>
            {t("common.showing")} {total} {total > 1 ? t("common.result") : t("common.results")}
          </WrapFilterDescription>
          <CustomFilter
            filterValue={params}
            onChange={(params) => {
              setParams(params);
              setPageInfo((pre) => ({ ...pre, page: 0 }));
            }}
            searchLabel={t("common.searchTx")}
          />
        </Box>
      </StyledList>
      <GridBox sidebar={+sidebar}>
        {loading &&
          [...new Array(12)].map((i, ii) => (
            <Skeleton key={ii} style={{ borderRadius: 12 }} variant="rectangular" width={300} height={185} />
          ))}
        {!loading &&
          data.map((item, ii) => {
            return (
              <OverviewStaking
                key={ii}
                item={item}
                onClick={handleSelect}
                hash={item.txHash}
                amount={item.fee}
                time={item.time}
              />
            );
          })}
      </GridBox>
      {!loading && ((initialized && data?.length === 0) || error) && <EmptyRecord />}
      {initialized && data?.length > 0 && !error && (
        <FooterTable
          pagination={{
            total,
            ...pageInfo,
            onChange: (page, size) => setPageInfo((pre) => ({ ...pre, page: page - 1, size }))
          }}
          loading={loading}
        />
      )}
    </StyledContainer>
  );
};
export default RecentPoolUpdates;
