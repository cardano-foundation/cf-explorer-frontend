import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, getShortWallet, numberWithCommas } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import CustomTooltip from "src/components/commons/CustomTooltip";
import FormNowMessage from "src/components/commons/FormNowMessage";
import Table, { Column } from "src/components/commons/Table";

import { Actions, PageSize, PerPage, SelectMui, StyledLink, StyledMenuItem, TimeDuration } from "./styles";

const perPages = [10, 20, 50, 100];

const TopAddressesByADABalance = () => {
  const { t } = useTranslation();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const [pageSize, setPageSize] = useState("50");
  const { error, data, initialized, loading, lastUpdated } = useFetchList<Contracts>(
    API.ADDRESS.TOP_ADDRESS,
    { page: 0, size: +pageSize },
    false,
    blockKey
  );

  const columns: Column<Address>[] = [
    {
      title: t("glossary.address"),
      key: "address",
      minWidth: 120,

      render: (r) => (
        <div>
          <CustomTooltip title={r.address}>
            <StyledLink to={details.address(r.address)}>{getShortWallet(r.address)}</StyledLink>
          </CustomTooltip>
        </div>
      )
    },
    {
      title: t("common.balance"),
      key: "balance",
      minWidth: 60,
      render: (r) => (
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>{formatADAFull(r.balance)}</Box>
          <ADAicon />
        </Box>
      )
    },
    {
      title: t("glossary.transactionCount"),
      minWidth: 120,
      key: "transaction_count",
      render: (r) => (
        <Box display="flex" alignItems="center">
          {numberWithCommas(r.txCount) || 0}
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
            onChange={(event: any) => setPageSize(event.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{ color: ({ palette }) => palette.secondary.main }}
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
          <PerPage>{t("glossary.address")}</PerPage>
        </PageSize>
      </Actions>
      <Table
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

export default TopAddressesByADABalance;
