import { Box, useTheme, styled } from "@mui/material";
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
import Card from "src/components/commons/Card";
import CustomIcon from "src/components/commons/CustomIcon";
import { DetailsInfo, ValueCard } from "src/components/commons/DetailHeader/styles";
import { TitleCard } from "src/pages/DrepDetail/styles";

import { CardItem } from "./styles";

const ConstitutionalCommitteeOVerrall = () => {
  const theme = useTheme();

  const listOverview = [
    {
      icon: CCCurentState,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.currentState")} </TitleCard>
        </Box>
      ),
      value: <Box>-</Box>
    },
    {
      icon: CCProposalPolicy,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.proposalPolicy")} </TitleCard>
        </Box>
      ),
      value: <Box>-</Box>
    },
    {
      icon: CCActiveMembers,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.activeMembers")} </TitleCard>
        </Box>
      ),
      value: <Box>-</Box>
    },
    {
      icon: CCThreshold,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.threshold")} </TitleCard>
        </Box>
      ),
      value: <Box>-</Box>
    },
    {
      icon: CCGovernanceVotes,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.governanceVotes")} </TitleCard>
        </Box>
      ),
      value: <Box>-</Box>
    },
    {
      icon: CCUpcomingChange,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.upcomingChange")} </TitleCard>
        </Box>
      ),
      value: <Box>-</Box>
    },
    {
      icon: CCLastChange,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>{t("cc.lastChangeTimestamp")} </TitleCard>
        </Box>
      ),
      value: <Box>-</Box>
    },
    {}
  ];

  return (
    <Box mb={2}>
      <Card data-testid="committee-header" title={t("glossary.constitutionalCommittee")}>
        <Description data-testid="constitutionalCommittee.drepDes">
          {t("constitutionalCommittee.page.description")}
        </Description>
        <Description data-testid="constitutionalCommittee.drepDes">
          To learn more about the different parameters, click{" "}
          <Box component={"a"} href="#" color={`${theme.palette.primary.main} !important`}>
            here
          </Box>
        </Description>
      </Card>
      <OverralCard listItem={listOverview} />
    </Box>
  );
};

export default ConstitutionalCommitteeOVerrall;

const Description = styled(Box)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.light,
  fontWeight: 400,
  marginTop: theme.spacing(1),
  textAlign: "left",
  width: "80vw",
  [theme.breakpoints.down("md")]: {
    width: "100%"
  }
}));

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
    <DetailsInfo isClickAble={0} container length={listItem.length}>
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
            itemOnRow={4}
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
