import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import ADAicon from "src/components/commons/ADAIcon";
import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatDateTimeLocal, getPageInfo, getShortHash } from "src/commons/utils/helper";
import Card from "src/components/commons/Card";
import CustomTooltip from "src/components/commons/CustomTooltip";
import Table from "src/components/commons/Table";
import { Column } from "src/types/table";
import FormNowMessage from "src/components/commons/FormNowMessage";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { Actions, StyledContainer, StyledLink, TimeDuration } from "./styles";

const InstantReards = () => {
  const { t } = useTranslation();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Contracts>(API.STAKE.INSTANT_REWARDS, pageInfo, false, blockKey);

  const mainRef = useRef(document.querySelector("#main"));
  const { error } = fetchData;

  useEffect(() => {
    document.title = `Stake Delegations | Cardano Blockchain Explorer`;
  }, []);

  const columns: Column<InstantRewards>[] = [
    {
      title: <div data-testid="instaneousRewards.txHashTitle">{t("glossary.txHash")}</div>,
      minWidth: 120,
      key: "txHash",
      render: (r) => (
        <CustomTooltip title={r.txHash}>
          <StyledLink data-testid="instaneousRewards.txHashValue" to={details.transaction(r.txHash)}>
            {getShortHash(r.txHash)}
          </StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: <div data-testid="instaneousRewards.createdAtTitle">{t("glossary.createdAt")}</div>,
      key: "createdat",
      minWidth: "120px",
      render: (r) => (
        <DatetimeTypeTooltip data-testid="instaneousRewards.createdAtValue">
          {formatDateTimeLocal(r.time)}
        </DatetimeTypeTooltip>
      )
    },
    {
      title: <div data-testid="instaneousRewards.blockNoTitle">{t("glossary.block")}</div>,
      key: "blockNo",
      minWidth: "50px",
      render: (r) => (
        <StyledLink data-testid="instaneousRewards.blockNoValue" to={details.block(r.blockNo)}>
          {r.blockNo}
        </StyledLink>
      )
    },
    {
      title: <div data-testid="instaneousRewards.epochNoTitle">{t("glossary.epoch")}</div>,
      key: "epochNo",
      minWidth: "50px",
      render: (r) => (
        <StyledLink data-testid="instaneousRewards.epochNoValue" to={details.epoch(r.epochNo)}>
          {r.epochNo}
        </StyledLink>
      )
    },
    {
      title: <div data-testid="instaneousRewards.epochSlotNoTitle">{t("glossary.slot")}</div>,
      key: "epochSlotNo",
      minWidth: "50px",
      render: (r) => <div data-testid="instaneousRewards.epochSlotNoValue">{r.epochSlotNo}</div>
    },
    {
      title: <div data-testid="instaneousRewards.slotNoTitle">{t("glossary.absoluteSlot")}</div>,
      key: "slotNo",
      minWidth: "100px",
      render: (r) => <div data-testid="instaneousRewards.slotNoValue">{r.slotNo}</div>
    },
    {
      title: <div data-testid="instaneousRewards.numberOfStakesTitle">{t("glossary.stakeAddress")}</div>,
      key: "numberOfStakes",
      render: (r) => (
        <Box data-testid="instaneousRewards.numberOfStakesValue" component={"span"}>
          {r.numberOfStakes}
        </Box>
      )
    },
    {
      title: <div data-testid="instaneousRewards.rewardTitle">{t("glosary.rewardsPaid")}</div>,
      key: "reward",
      render: (r) => (
        <Box data-testid="instaneousRewards.rewardValue" component={"span"}>
          {formatADAFull(r.rewards)} <ADAicon />
        </Box>
      )
    }
  ];

  return (
    <StyledContainer>
      <Card title={t("drawer.instaneousRewards")}>
        {!error && (
          <Actions>
            <TimeDuration>
              <FormNowMessage time={fetchData.lastUpdated} />
            </TimeDuration>
          </Actions>
        )}
        <Table
          data-testid="instaneousRewards.table"
          {...fetchData}
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
export default InstantReards;
