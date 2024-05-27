import { Box } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";

import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, numberWithCommas } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import FormNowMessage from "src/components/commons/FormNowMessage";
import Table, { Column } from "src/components/commons/Table";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

import { Actions, PageSize, PerPage, SelectMui, StyledLink, StyledMenuItem, TimeDuration } from "./styles";

const perPages = [10, 20, 50, 100];

const TopAddressesByADABalance = () => {
  const { t } = useTranslation();
  const blockKey = useSelector(({ system }: RootState) => system.blockKey);
  const history = useHistory();
  const [pageSize, setPageSize] = useState("50");
  const { error, statusError, data, initialized, loading, lastUpdated } = useFetchList<Contracts>(
    API.ADDRESS.TOP_ADDRESS,
    { page: 0, size: +pageSize },
    false,
    blockKey
  );

  const columns: Column<Address>[] = [
    {
      title: <div data-testid="topAddresses.byADABalance.addressTitle">{t("glossary.address")}</div>,
      key: "address",
      minWidth: 170,
      maxWidth: "35vw",
      render: (r) => (
        <StyledLink data-testid="topAddresses.byADABalance.addressValue" to={details.address(r.address)}>
          <DynamicEllipsisText value={r.address} isTooltip />
        </StyledLink>
      )
    },
    {
      title: <div data-testid="topAddresses.byADABalance.balanceTitle">{t("common.balance")}</div>,
      key: "balance",
      minWidth: 60,
      render: (r) => (
        <Box display="inline-flex" alignItems="center">
          <Box data-testid="topAddresses.byADABalance.balanceValue" mr={1}>
            {formatADAFull(r.balance)}
          </Box>
          <ADAicon />
        </Box>
      )
    },
    {
      title: <div data-testid="topAddresses.byADABalance.transactionCountTitle">{t("glossary.transactionCount")}</div>,
      minWidth: 120,
      key: "transaction_count",
      render: (r) => (
        <Box data-testid="topAddresses.byADABalance.transactionCountValue" display="flex" alignItems="center">
          {numberWithCommas(r.txCount) || 0}
        </Box>
      )
    }
  ];

  return (
    <Box mt={"18px"}>
      <Actions>
        {!error && (
          <TimeDuration>
            <FormNowMessage time={lastUpdated} />
          </TimeDuration>
        )}
        <PageSize>
          <SelectMui
            value={pageSize}
            onChange={(event: SelectChangeEvent<unknown>) => setPageSize(event.target.value as string)}
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
        data-testid="topAddresses.byADABalance.transactionCountTitle"
        data={data}
        error={error}
        statusError={statusError}
        loading={loading}
        initialized={initialized}
        columns={columns}
        tableWrapperProps={{ sx: (theme) => ({ [theme.breakpoints.between("sm", "md")]: { minHeight: "55vh" } }) }}
        onClickRow={(_, r) => history.push(details.address(r.address))}
      />
    </Box>
  );
};

export default TopAddressesByADABalance;
