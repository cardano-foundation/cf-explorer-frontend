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

import { Actions, StyledContainer, StyledLink, TimeDuration } from "./styles";

const InstantReards = () => {
  const { t } = useTranslation();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);
  const fetchData = useFetchList<Contracts>(API.STAKE.INSTANT_REWARDS, pageInfo, false, blockKey);

  const mainRef = useRef(document.querySelector("#main"));

  useEffect(() => {
    document.title = `Stake Delegations | Cardano Blockchain Explorer`;
  }, []);

  const columns: Column<InstantRewards>[] = [
    {
      title: t("glossary.txHash"),
      minWidth: 120,
      key: "txHash",
      render: (r) => (
        <CustomTooltip title={r.txHash}>
          <StyledLink to={details.transaction(r.txHash)}>{getShortHash(r.txHash)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("glossary.createdAt"),
      key: "createdat",
      minWidth: "120px",
      render: (r) => formatDateTimeLocal(r.time)
    },
    {
      title: t("glossary.block"),
      key: "blockNo",
      minWidth: "50px",
      render: (r) => <StyledLink to={details.block(r.blockNo)}>{r.blockNo}</StyledLink>
    },
    {
      title: t("glossary.epoch"),
      key: "epochNo",
      minWidth: "50px",
      render: (r) => <StyledLink to={details.epoch(r.epochNo)}>{r.epochNo}</StyledLink>
    },
    {
      title: t("glossary.slot"),
      key: "epochSlotNo",
      minWidth: "50px"
    },
    {
      title: t("glossary.absoluteSlot"),
      key: "slotNo",
      minWidth: "100px"
    },
    {
      title: t("glossary.stakeAddress"),
      key: "numberOfStakes",
      render: (r) => <Box component={"span"}>{r.numberOfStakes}</Box>
    },
    {
      title: t("glosary.rewardsPaid"),
      key: "reward",
      render: (r) => (
        <Box component={"span"}>
          {formatADAFull(r.rewards)} <ADAicon />
        </Box>
      )
    }
  ];

  return (
    <StyledContainer>
      <Card title={t("drawer.instaneousRewards")}>
        <Actions>
          <TimeDuration>
            <FormNowMessage time={fetchData.lastUpdated} />
          </TimeDuration>
        </Actions>
        <Table
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
