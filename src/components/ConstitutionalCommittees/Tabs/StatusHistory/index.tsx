import { Box, Button, useTheme, Grid } from "@mui/material";
import { t } from "i18next";
import moment from "moment";

import { FilterIcon } from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";
import FormNowMessage from "src/components/commons/FormNowMessage";
import { TimeDuration } from "src/pages/BlockList/styles";
import { formatDateTimeLocal } from "src/commons/utils/helper";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { Chip, Item, Row, Title } from "./style";

interface StatusHistoryIF {
  id: string;
  type: string;
  created: string;
  status: string;
}

const mockData = [
  {
    id: "d32493bf99d32493bf99d32493bf99d32493bf99d32493bf99",
    type: "No-Confidence",
    created: "02/26/2024 15:59:13",
    status: "ENACTED"
  },
  {
    id: "d32493bf99d32493bf99d32493bf99d32493bf99d32493bf99",
    type: "No-Confidence",
    created: "02/26/2024 15:59:13",
    status: "ENACTED"
  },
  {
    id: "d32493bf99d32493bf99d32493bf99d32493bf99d32493bf99",
    type: "No-Confidence",
    created: "02/26/2024 15:59:13",
    status: "ENACTED"
  },
  {
    id: "d32493bf99d32493bf99d32493bf99d32493bf99d32493bf99",
    type: "No-Confidence",
    created: "02/26/2024 15:59:13",
    status: "ENACTED"
  }
];

const StatusHistory = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box display="flex" justifyContent={"space-between"} alignItems={"center"} px={1}>
        <TimeDuration>
          <FormNowMessage time={moment()} />
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
      <Box component={Grid} container spacing={2} mt={1}>
        {mockData?.map((item, idx) => (
          <Grid item width={"100%"} lg={4} md={6} sm={6} xs={12} key={idx}>
            <Box height={"100%"}>
              <StatusHistoryCard item={item} />
            </Box>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default StatusHistory;

const StatusHistoryCard = ({ item }: { item: StatusHistoryIF }) => {
  const theme = useTheme();
  return (
    <Item>
      <Box p={2} height={"100%"} display={"block"}>
        <Row>
          <Title>ID:</Title>
          <Box width={"calc(100% - 100px)"} color={`${theme.palette.primary.main} !important`}>
            <DynamicEllipsisText
              customTruncateFold={[4, 4]}
              value={item.id}
              isTooltip
              sx={{ transform: "translateY(0px) !important" }}
            />
          </Box>
        </Row>
        <Row>
          <Title>{t("cc.status.actionType")}:</Title>
          <Box>{item.type}</Box>
        </Row>
        <Row>
          <Title>{t("cc.status.creation")}:</Title>
          <Box>
            <DatetimeTypeTooltip>{formatDateTimeLocal(item.created)}</DatetimeTypeTooltip>
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
