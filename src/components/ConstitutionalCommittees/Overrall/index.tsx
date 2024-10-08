import { Box, useTheme, Skeleton } from "@mui/material";
import { t } from "i18next";

import {
  CCCurentState,
  CCProposalPolicy,
  CCActiveMembers,
  CCThreshold,
  CCGovernanceVotes,
  CCUpcomingChange,
  CCLastChange
} from "src/commons/resources";
import CustomIcon from "src/components/commons/CustomIcon";
import { DetailsInfo, ValueCard } from "src/components/commons/DetailHeader/styles";
import { TitleCard } from "src/pages/DrepDetail/styles";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { formatDateTimeLocal, formatPercent } from "src/commons/utils/helper";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import { CardItem } from "./styles";

const ConstitutionalCommitteeOVerrall = () => {
  const { data, loading } = useFetch<CCOVerview>(API.COMMITTEE.OVERVIEW);

  const listOverview = [
    {
      icon: CCCurentState,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.currentState")} </TitleCard>
        </Box>
      ),
      value: <Box textTransform={"capitalize"}>{(data?.currentState || "").toLocaleLowerCase()}</Box>
    },
    {
      icon: CCProposalPolicy,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.proposalPolicy")} </TitleCard>
        </Box>
      ),
      value: <Box>{data?.proposalPolicy === null ? t("common.N/A") : data?.proposalPolicy || ""}</Box>
    },
    {
      icon: CCActiveMembers,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.activeMembers")} </TitleCard>
        </Box>
      ),
      value: <Box>{data?.activeMembers || ""}</Box>
    },
    {
      icon: CCThreshold,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.threshold")} </TitleCard>
        </Box>
      ),
      value: <Box>{formatPercent(data?.threshold || 0)}</Box>
    },
    {
      icon: CCGovernanceVotes,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.governanceVotes")} </TitleCard>
        </Box>
      ),
      value: <Box>{data?.governanceVotes || ""}</Box>
    },
    {
      icon: CCUpcomingChange,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.upcomingChange")} </TitleCard>
        </Box>
      ),
      value: <Box>{t("common.N/A")}</Box>
    },
    {
      icon: CCLastChange,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.lastChangeTimestamp")} </TitleCard>
        </Box>
      ),
      value: (
        <Box>
          <DatetimeTypeTooltip>{formatDateTimeLocal(data?.lastUpdate || "")}</DatetimeTypeTooltip>{" "}
        </Box>
      )
    },
    {}
  ];

  if (loading) {
    return (
      <Box mb={2}>
        <Skeleton variant="rectangular" height={"307px"} style={{ borderRadius: 10, marginTop: 8 }} />
      </Box>
    );
  }

  return (
    <Box mb={2}>
      <OverralCard listItem={listOverview} />
    </Box>
  );
};

export default ConstitutionalCommitteeOVerrall;

interface OverralCardIF {
  listItem: {
    icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>> | string;
    sizeIcon?: number;
    title?: React.ReactNode;
    value?: React.ReactNode;
    strokeColor?: string;
    key?: string;
  }[];
}

export const OverralCard: React.FC<OverralCardIF> = ({ listItem }) => {
  const theme = useTheme();

  return (
    <DetailsInfo isclickable={0} container length={listItem.length}>
      {(listItem || [])?.map((item, index) => {
        return (
          <CardItem
            item
            xs={6}
            sm={6}
            md={listItem.length === 4 ? 3 : 4}
            lg={listItem.length > 6 ? 3 : 4}
            length={listItem.length}
            key={index}
            wide={0}
            itemonrow={4}
            textAlign={"left"}
          >
            <Box position="relative">
              {item.icon ? (
                typeof item.icon === "string" ? (
                  <img src={item.icon} alt="" height={20} />
                ) : (
                  <CustomIcon
                    fill={!item.strokeColor ? theme.palette.secondary.main : ""}
                    stroke={item.strokeColor ? theme.palette.secondary.main : ""}
                    icon={item.icon}
                    height={item?.sizeIcon || 24}
                  />
                )
              ) : null}
            </Box>
            <Box
              data-testid="detailHeader.title"
              sx={{
                my: 1,
                [theme.breakpoints.down("md")]: {
                  mb: 0
                }
              }}
            >
              {item.title}
            </Box>
            <ValueCard data-testid="detailHeader.value">{item.value}</ValueCard>
          </CardItem>
        );
      })}
    </DetailsInfo>
  );
};
