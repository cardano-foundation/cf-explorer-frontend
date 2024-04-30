import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stringify } from "qs";
import { useSelector } from "react-redux";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import Card from "src/components/commons/Card";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table from "src/components/commons/Table";
import { Column } from "src/types/table";
import FormNowMessage from "src/components/commons/FormNowMessage";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { Actions, StyledContainer, StyledLink, TimeDuration } from "./styles";

const StakeDelegations = () => {
  const { t } = useTranslation();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const { search } = useLocation();
  const history = useHistory();
  const fromPath = history.location.pathname as SpecialPath;
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Contracts>(API.STAKE.STAKE_DELEGATIONS, { ...pageInfo }, false, blockKey);

  const mainRef = useRef(document.querySelector("#main"));

  useEffect(() => {
    document.title = `Stake Delegations | Cardano Blockchain Explorer`;
  }, []);

  const columns: Column<StakeDelegationItem>[] = [
    {
      title: <div data-testid="stakeDelegations.txHashTitle">{t("glossary.txHash")}</div>,
      minWidth: "150px",
      key: "txHash",
      render: (r) => (
        <CustomTooltip title={r.txHash}>
          <StyledLink data-testid="stakeDelegations.txHashValue" to={details.transaction(r.txHash)}>
            {getShortHash(r.txHash)}
          </StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: <div data-testid="stakeDelegations.createdAtTitle">{t("glossary.createdAt")}</div>,
      key: "createdat",
      minWidth: "150px",
      render: (r) => (
        <DatetimeTypeTooltip data-testid="stakeDelegations.createdAtValue">
          {formatDateTimeLocal(r.time)}
        </DatetimeTypeTooltip>
      )
    },
    {
      title: <div data-testid="stakeDelegations.blockNoTitle">{t("glossary.block")}</div>,
      key: "blockNo",
      minWidth: "50px",
      render: (r) => (
        <StyledLink data-testid="stakeDelegations.blockNoValue" to={details.block(r.blockNo)}>
          {r.blockNo}
        </StyledLink>
      )
    },
    {
      title: <div data-testid="stakeDelegations.epochNoTitle">{t("glossary.epoch")}</div>,
      key: "epochNo",
      minWidth: "50px",
      render: (r) => (
        <StyledLink data-testid="stakeDelegations.epochNoValue" to={details.epoch(r.epochNo)}>
          {r.epochNo}
        </StyledLink>
      )
    },
    {
      title: <div data-testid="stakeDelegations.epochSlotNoTitle">{t("glossary.slot")}</div>,
      key: "epochSlotNo",
      minWidth: "50px",
      render: (r) => <div data-testid="stakeDelegations.epochSlotNoValue">{r.epochSlotNo}</div>
    },
    {
      title: <div data-testid="stakeDelegations.slotNoTitle">{t("glossary.absoluteSlot")}</div>,
      key: "slotNo",
      minWidth: "100px",
      render: (r) => <div data-testid="stakeDelegations.slotNoValue">{r.slotNo}</div>
    },
    {
      title: <div data-testid="stakeDelegations.stakeAddressTitle">{t("glossary.stakeAddress")}</div>,
      key: "stakeAddress",
      minWidth: "150px",
      render: (r) => (
        <>
          {r.stakeKeys.slice(0, 2).map((stakeKey, idx) => (
            <Box key={idx}>
              <CustomTooltip title={stakeKey}>
                <StyledLink
                  data-testid="stakeDelegations.stakeAddressValue"
                  to={{ pathname: details.stake(stakeKey), state: { fromPath } }}
                >
                  {getShortHash(stakeKey)}
                </StyledLink>
              </CustomTooltip>
            </Box>
          ))}
          {r.pools?.length > 2 ? <StyledLink to={details.transaction(r.txHash)}>...</StyledLink> : ""}
        </>
      )
    },
    {
      title: <div data-testid="stakeDelegations.poolTitle">{t("glossary.pool")}</div>,
      key: "pool",
      minWidth: "200px",
      render: (r) => (
        <>
          {r.pools.slice(0, 2).map((pool, idx) => (
            <Box key={idx}>
              <CustomTooltip title={pool.poolName || pool.poolId}>
                <StyledLink to={details.delegation(pool.poolId)}>
                  <Box
                    data-testid="stakeDelegations.poolValue"
                    component={"span"}
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                  >
                    {pool.poolName || getShortHash(pool.poolId)}
                  </Box>
                </StyledLink>
              </CustomTooltip>
            </Box>
          ))}
          {r.pools?.length > 2 ? <StyledLink to={details.transaction(r.txHash)}>...</StyledLink> : ""}
        </>
      )
    }
  ];

  return (
    <StyledContainer>
      <Card title={t("head.page.stakeDelegation")}>
        <Actions>
          <TimeDuration>
            <FormNowMessage time={fetchData.lastUpdated} />
          </TimeDuration>
        </Actions>
        <Table
          {...fetchData}
          data-testid="stakeDelegations.poolTitle"
          columns={columns}
          total={{ title: "Total Contracts", count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => {
              history.replace({ search: stringify({ page, size }) });
              mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          tableWrapperProps={{ sx: (theme) => ({ [theme.breakpoints.between("sm", "md")]: { minHeight: "60vh" } }) }}
        />
      </Card>
    </StyledContainer>
  );
};
export default StakeDelegations;
