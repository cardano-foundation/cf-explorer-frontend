import { Box, Button, useTheme, Grid, Skeleton } from "@mui/material";
import { t } from "i18next";
import { parse, stringify } from "qs";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";

import { FilterIcon } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";
import FormNowMessage from "src/components/commons/FormNowMessage";
import { TimeDuration } from "src/pages/BlockList/styles";
import { formatDateTimeLocal } from "src/commons/utils/helper";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";
import useFetchList from "src/commons/hooks/useFetchList";
import { API } from "src/commons/utils/api";
import { FooterTable } from "src/components/commons/Table";
import NoRecord from "src/components/commons/NoRecord";
import FetchDataErr from "src/components/commons/FetchDataErr";
import { actionTypeListDrep } from "src/components/commons/CardGovernanceVotes";
import { details } from "src/commons/routers";

import { Chip, Item, Row, Title } from "./style";

const StatusHistory = () => {
  const { tabActive } = useParams<{ tabActive?: string }>();
  const theme = useTheme();
  const { search } = useLocation();
  const history = useHistory();
  const query = parse(search.split("?")[1]);
  const { data, loading, total, lastUpdated, error, statusError, initialized } = useFetchList<CCHistory>(
    tabActive === "statusHistory" ? API.COMMITTEE.HISTORY : "",
    {
      page: 0,
      size: 10,
      actionType: "ALL"
    }
  );

  if (loading) {
    return (
      <Box component={Grid} container spacing={2}>
        {[...new Array(+(query?.voteSize || "") || 6).fill(0)].map((_, idx) => (
          <Grid item width={"100%"} lg={4} md={6} sm={6} xs={12} key={idx}>
            <Box component={Skeleton} variant="rectangular" height={"190px"} borderRadius={2} />
          </Grid>
        ))}
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent={"space-between"} alignItems={"center"} px={1}>
        <TimeDuration>
          <FormNowMessage time={lastUpdated} />
        </TimeDuration>
        <Box
          data-testid="governance.filter"
          component={Button}
          variant="text"
          px={2}
          textTransform={"capitalize"}
          bgcolor={({ palette, mode }) => (mode === "dark" ? palette.secondary[100] : palette.primary[200])}
          border={({ palette, mode }) => `1px solid ${mode === "dark" ? "none" : palette.primary[200]}`}
          sx={{
            ":hover": {
              bgcolor: theme.mode === "dark" ? theme.palette.secondary[100] : theme.palette.secondary[100]
            }
          }}
        >
          <CustomIcon
            icon={FilterIcon}
            fill={theme.mode === "dark" ? theme.palette.primary.main : theme.palette.secondary.light}
            height={18}
          />
          <Box
            ml={1}
            position={"relative"}
            whiteSpace={"nowrap"}
            fontWeight={"bold"}
            color={({ palette, mode }) => (mode === "dark" ? palette.primary.main : palette.secondary.light)}
          >
            {t("common.filter")}
          </Box>
        </Box>
      </Box>

      {((data && data.length === 0 && initialized && !error) || (error && statusError !== 500)) && (
        <NoRecord m="170px 0px" padding={`0 !important`} />
      )}
      {error && statusError === 500 && <FetchDataErr m="80px 0px" padding={`0 !important`} />}
      <Box component={Grid} container spacing={2} mt={1}>
        {data?.map((item, idx) => (
          <Grid item width={"100%"} lg={4} md={6} sm={6} xs={12} key={idx}>
            <Box height={"100%"}>
              <StatusHistoryCard item={item} />
            </Box>
          </Grid>
        ))}
      </Box>

      <Box py={1}>
        <FooterTable
          pagination={{
            size: Number(query.voteSize || 6),
            page: query.page ? Number(query.page || 1) - 1 : 0,
            total,
            onChange: (page, size) => history.replace({ search: stringify({ ...query, page, voteSize: size }) })
          }}
          total={{ count: total || 0, title: "" }}
          loading={false}
          optionList={[6, 9, 12]}
        />
      </Box>
    </Box>
  );
};

export default StatusHistory;

const StatusHistoryCard = ({ item }: { item: CCHistory }) => {
  const theme = useTheme();
  return (
    <Item>
      <Box p={2} height={"100%"} display={"block"}>
        <Row>
          <Title>ID:</Title>
          <Box
            width={"calc(100% - 100px)"}
            color={`${theme.palette.primary.main} !important`}
            component={Link}
            to={details.transaction(item.txHash)}
          >
            <DynamicEllipsisText
              customTruncateFold={[4, 4]}
              value={item.txHash}
              isTooltip
              sx={{ transform: "translateY(0px) !important" }}
            />
          </Box>
        </Row>
        <Row>
          <Title>{t("cc.status.actionType")}:</Title>
          <Box>{actionTypeListDrep.find((action) => action.value === item.type)?.text}</Box>
        </Row>
        <Row>
          <Title>{t("cc.status.creation")}:</Title>
          <Box>
            <DatetimeTypeTooltip>{formatDateTimeLocal(item.createdAt)}</DatetimeTypeTooltip>
          </Box>
        </Row>
        <Row>
          <Title>{t("cc.status.status")}:</Title>
          <Box>
            <Chip pl={`1 !important`} maxWidth={"130px !important"}>
              <Box display={"flex"} alignItems={"center"} height={"100%"}>
                <Box
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  sx={{
                    textWrap: "nowrap"
                  }}
                >
                  {item.status}
                </Box>
              </Box>
            </Chip>
          </Box>
        </Row>
      </Box>
    </Item>
  );
};
