import { Box } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, getShortHash } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import FormNowMessage from "src/components/commons/FormNowMessage";
import Table from "src/components/commons/Table";
import { Column } from "src/types/table";

import { Actions, PageSize, PerPage, SelectMui, StyledLink, StyledMenuItem, TimeDuration } from "./styles";

const perPages = [10, 20, 50, 100];

const TopAddressesByAmountStaked = () => {
  const { t } = useTranslation();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const history = useHistory();
  const [pageSize, setPageSize] = useState("50");
  const { error, data, initialized, loading, lastUpdated } = useFetchList<Contracts>(
    API.STAKE.TOP_DELEGATOR,
    { page: 0, size: +pageSize },
    false,
    blockKey
  );

  const columns: Column<TopDelegator>[] = [
    {
      title: t("common.stakeAddress"),
      minWidth: 200,
      key: "addresses",
      render: (r) => (
        <CustomTooltip title={r.stakeKey}>
          <StyledLink to={details.stake(r.stakeKey)}>{getShortHash(r.stakeKey)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("glossary.pool"),
      key: "pool",
      maxWidth: 300,
      render: (r) => (
        <CustomTooltip title={r.poolName || r.poolId}>
          <StyledLink to={details.delegation(r.poolId)}>{r.poolName || getShortHash(r.poolId)}</StyledLink>
        </CustomTooltip>
      )
    },
    {
      title: t("stakeAmount"),
      key: "Stakeamount",
      render: (r) => (
        <Box component={"span"}>
          {formatADAFull(r.balance)} <ADAicon />
        </Box>
      )
    }
  ];

  return (
    <Box mt={"18px"}>
      <Actions>
        <TimeDuration>
          <FormNowMessage time={lastUpdated} />
        </TimeDuration>
        <PageSize>
          <SelectMui
            value={pageSize}
            onChange={(event) => setPageSize(event.target.value as string)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={{
              MenuListProps: {
                sx: {
                  bgcolor: ({ palette }) => `${palette.secondary[0]} !important`
                }
              },
              PaperProps: {
                sx: {
                  bgcolor: ({ palette }) => `${palette.secondary[0]} !important`
                }
              }
            }}
          >
            {perPages.map((item) => (
              <StyledMenuItem key={item} value={item}>
                <Box color={({ palette }) => `${palette.secondary.main} !important`}>{item}</Box>
              </StyledMenuItem>
            ))}
          </SelectMui>
          <PerPage>{t("delegators")}</PerPage>
        </PageSize>
      </Actions>
      <Table
        onClickRow={(_, r) => history.push(details.stake(r.stakeKey))}
        data={data}
        error={error}
        loading={loading}
        initialized={initialized}
        columns={columns}
        tableWrapperProps={{ sx: (theme) => ({ [theme.breakpoints.between("sm", "md")]: { minHeight: "55vh" } }) }}
      />
    </Box>
  );
};
export default TopAddressesByAmountStaked;
