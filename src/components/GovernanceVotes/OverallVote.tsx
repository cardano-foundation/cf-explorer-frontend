import { useMemo, useState } from "react";
import { Box, Button, Chip, TooltipProps, Typography, useTheme, Tooltip, tooltipClasses, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useScreen } from "src/commons/hooks/useScreen";
import {
  ActionTypeIcon,
  AnchorTextIcon,
  BlackCircleIcon,
  BlackWarningIcon,
  CurrentStatusIcon,
  GovernanceIdIcon,
  SubmissionDateIcon,
  VoteIcon,
  VotesAbstainIcon,
  VotesNoIcon,
  VotesYesIcon,
  VotingPowerIcon
} from "src/commons/resources";
import { formatDateTimeLocal, formatPercent, getShortHash } from "src/commons/utils/helper";

import {
  DataContainer,
  InfoTitle,
  InfoValue,
  Item,
  StyledGrid,
  StyledTitle
} from "../DelegationDetail/DelegationDetailInfo/styles";
import CustomIcon from "../commons/CustomIcon";
import CustomTooltip from "../commons/CustomTooltip";
import CopyButton from "../commons/CopyButton";
import { GovernanceStatus, actionTypeListDrep } from "../commons/CardGovernanceVotes";
import DatetimeTypeTooltip from "../commons/DatetimeTypeTooltip";

import { ActionMetadataModal, ActionMetadataModalConfirm, GovernanceVoteDetail, VoteHistoryModal } from ".";

const OverallVote: React.FC<{ data: GovernanceVoteDetail | null; dataChart: GovernanceVoteChart | null }> = ({
  data,
  dataChart
}) => {
  const [selectVote, setSelectVote] = useState<string>("");
  const [openHistoryVoteModal, setOpenHistoryVoteModal] = useState<boolean>(false);
  const [openActionMetadataModal, setOpenActionMetadataModal] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();
  const { t } = useTranslation();
  const { isGalaxyFoldSmall, isMobile } = useScreen();
  const listVotes = ["SPOs", "DReps", "CC"];

  const filterDataChart = (selectVote: string) => {
    switch (selectVote) {
      case "SPOs":
        return dataChart?.votingChartsList.filter((i) => i.voterType === "STAKING_POOL_KEY_HASH")[0];
      case "DReps":
        return dataChart?.votingChartsList.filter((i) => i.voterType === "DREP_KEY_HASH")[0];
      case "CC":
        return dataChart?.votingChartsList.filter((i) => i.voterType === "CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH")[0];

      default:
        return dataChart;
    }
  };

  if (!data) {
    return <></>;
  }

  return (
    <DataContainer sx={{ boxShadow: "unset" }}>
      <Box
        display={"flex"}
        sx={{
          [theme.breakpoints.down("xl")]: {
            flexDirection: "column"
          }
        }}
      >
        <Box flex="1">
          <StyledGrid container>
            <Item item xs={6} md={6} top={1} pr={"5px !important"}>
              <Box display="flex" justifyContent="space-between" pr={"5px"}>
                <CustomIcon fill={theme.palette.secondary.light} icon={GovernanceIdIcon} height={22} marginTop="15px" />
                <BlackWarningIcon />
              </Box>
              <InfoTitle paddingTop="2px" paddingBottom="3px">
                <StyledTitle data-testid="governance.actionIdTitle">{t("pool.actionId")}</StyledTitle>
              </InfoTitle>
              <InfoValue data-testid="governance.actionIdValue">
                <Box
                  display="flex"
                  alignItems="center"
                  gap="8px"
                  borderRadius="20px"
                  sx={{
                    background: theme.isDark ? theme.palette.primary[500] : theme.palette.primary[100],
                    border: `1px solid ${theme.palette.secondary[600]}`,
                    width: "fit-content",
                    p: "3px 2px 3px 12px"
                  }}
                >
                  <CustomTooltip title={data?.txHash}>
                    <Typography
                      fontSize="12px"
                      fontWeight="500"
                      lineHeight="14.52px"
                      color={theme.isDark ? theme.palette.secondary.light : theme.palette.secondary[600]}
                    >
                      {isGalaxyFoldSmall
                        ? getShortHash(data?.txHash, 1, 1)
                        : isMobile
                        ? getShortHash(data?.txHash, 5, 4)
                        : getShortHash(data?.txHash)}
                      #{data?.index}
                    </Typography>
                  </CustomTooltip>
                  <CopyButton
                    text={data?.txHash}
                    customIcon={BlackCircleIcon}
                    data-testid="copy-button"
                    height={23}
                    fill="theme.palette.secondary.light"
                  />
                </Box>
              </InfoValue>
            </Item>
            <Item item xs={6} md={6} top={1} pr={"5px !important"}>
              <Box display="flex" justifyContent="space-between" pr="5px">
                <CustomIcon
                  fill={theme.palette.secondary.light}
                  icon={ActionTypeIcon}
                  height={22.27}
                  marginTop="15px"
                />
                <BlackWarningIcon />
              </Box>
              <InfoTitle paddingTop="2px" paddingBottom="3px">
                <StyledTitle data-testid="governance.actionTypeTitle">{t("pool.actionType")}</StyledTitle>
              </InfoTitle>
              <InfoValue data-testid="governance.actionTypeValue">
                {actionTypeListDrep.find((action) => action.value === data?.govActionType)?.text}
              </InfoValue>
            </Item>

            <Item
              item
              xs={6}
              md={6}
              top={1}
              borderLeft={"none !important"}
              pt={"20px  !important"}
              px={"0px  !important"}
              sx={{ position: "relative", pr: "5px !important" }}
              width={"100%"}
            >
              <Box display="flex" justifyContent="space-between" pr="5px">
                <CustomIcon
                  fill={theme.palette.secondary.light}
                  icon={CurrentStatusIcon}
                  height={28}
                  marginTop="15px"
                />
                <BlackWarningIcon />
              </Box>
              <InfoTitle>
                <Box width={"100%"}>
                  <StyledTitle data-testid="governance.currentStatusTitle">{t("pool.currentStatus")}</StyledTitle>

                  <InfoValue data-testid="governance.currentStatusTitle" width="fit-content" mt={"8px"}>
                    <GovernanceStatus status={data?.status || ""} />
                  </InfoValue>
                </Box>
              </InfoTitle>
            </Item>
            <Item item xs={6} md={6} top={1} pr={"5px !important"} pt={"20px  !important"}>
              <Box display="flex" justifyContent="space-between" pr="5px">
                <CustomIcon fill={theme.palette.secondary.light} height={25} icon={AnchorTextIcon} />
                <BlackWarningIcon />
              </Box>
              <InfoTitle paddingBottom="3px">
                <StyledTitle data-testid="governance.actionMetadataTitle">{t("pool.actionMetadata")}</StyledTitle>
              </InfoTitle>
              <InfoValue>
                <Button
                  data-testid="governance.actionMetadataDetail"
                  onClick={() => {
                    setOpenActionMetadataModal(true);
                  }}
                  fullWidth
                  sx={{
                    height: "51px",
                    borderRadius: "8px",
                    border: `2px solid ${theme.palette.primary[200]}`,
                    textTransform: "capitalize",
                    color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light,
                    fontWeight: 500,
                    fontSize: `${isMobile ? "12px" : "16px"}`
                  }}
                  variant="outlined"
                >
                  {t("common.viewDetails")}
                </Button>
              </InfoValue>
            </Item>

            <Item item xs={6} md={6} pr={"5px !important"} py={"20px !important"}>
              <Box display="flex" justifyContent="space-between" pr="5px">
                <CustomIcon fill={theme.palette.secondary.light} height={27} icon={SubmissionDateIcon} />
                <BlackWarningIcon />
              </Box>
              <InfoTitle paddingBottom="3px">
                <StyledTitle data-testid="governance.submissionTitle">{t("pool.submission")}</StyledTitle>
              </InfoTitle>
              <InfoValue data-testid="governance.submissionValue">
                <DatetimeTypeTooltip>{formatDateTimeLocal(data?.submissionDate || "")}</DatetimeTypeTooltip>
              </InfoValue>
            </Item>
            <Item item xs={6} md={6} pr={"5px !important"}>
              <Box display="flex" justifyContent="space-between" pr="5px">
                <CustomIcon fill={theme.palette.secondary.light} height={27} icon={SubmissionDateIcon} />
                <BlackWarningIcon />
              </Box>
              <InfoTitle paddingBottom="3px">
                <StyledTitle data-testid="governance.expiryDateTitle">{t("pool.expiryDate")}</StyledTitle>
              </InfoTitle>
              <InfoValue data-testid="governance.expiryDateValue">
                <DatetimeTypeTooltip>{formatDateTimeLocal(data?.expiryDate || "")}</DatetimeTypeTooltip>
              </InfoValue>
            </Item>
          </StyledGrid>
        </Box>
        <Box flex="1">
          <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{
              [theme.breakpoints.down("xl")]: {
                flexDirection: "column-reverse"
              }
            }}
          >
            <Item
              item
              xs={6}
              md={6}
              pb={"38px !important"}
              pl={"25px !important"}
              top={1}
              sx={{
                position: "relative",
                pr: "5px !important",
                [theme.breakpoints.down("xl")]: {
                  px: "0 !important",
                  pt: "20px !important",
                  borderTop: `1px solid ${
                    theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]
                  }  !important`,
                  borderLeft: "none  !important",
                  borderBottom: "none  !important"
                }
              }}
              borderLeft={`1px solid ${
                theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]
              }  !important`}
            >
              <Box display="flex" justifyContent="space-between" pr="5px">
                <CustomIcon fill={theme.palette.secondary.light} icon={VoteIcon} height={27} marginTop="15px" />
                <BlackWarningIcon />
              </Box>
              <InfoTitle
                paddingTop="2px"
                paddingBottom="3px"
                paddingRight="5px"
                display="flex"
                justifyContent="space-between"
                alignItems="center !important"
              >
                <StyledTitle data-testid="governance.votesTitle">{t("pool.votes")}</StyledTitle>

                <Box display="flex" gap="8px" flexWrap="inherit">
                  {(selectVote ? listVotes.slice(0, 1) : listVotes).map((i) => (
                    <Chip
                      key={i}
                      sx={{
                        fontWeight: 500,
                        fontSize: "12px",
                        background: selectVote
                          ? theme.palette.primary[200]
                          : theme.isDark
                          ? theme.palette.primary[500]
                          : theme.palette.primary[100],
                        border: `1px solid ${selectVote ? theme.palette.primary.main : theme.palette.secondary[600]}`,
                        color: selectVote
                          ? theme.palette.secondary.main
                          : theme.isDark
                          ? theme.palette.secondary.main
                          : theme.palette.secondary[600],
                        "&:hover": {
                          background: theme.palette.primary[200]
                        }
                      }}
                      label={selectVote || i}
                      onClick={() => setSelectVote(selectVote ? "" : i)}
                    />
                  ))}
                  {selectVote && (
                    <Chip
                      sx={{
                        background: theme.isDark ? theme.palette.primary[500] : theme.palette.primary[100],
                        border: `1px solid ${theme.palette.secondary[600]}`,
                        color: theme.isDark ? theme.palette.secondary.main : theme.palette.secondary[600]
                      }}
                      onClick={() => setSelectVote("")}
                      label="x"
                    />
                  )}
                </Box>
              </InfoTitle>
              <InfoValue data-testid="governance.votesValue" width={"100%"}>
                <Box pr="5px">
                  <VoteRate data={filterDataChart(selectVote)} />
                </Box>
              </InfoValue>
            </Item>
            <Item
              item
              xs={6}
              md={6}
              pr={"5px !important"}
              py={"20px !important"}
              sx={{
                [theme.breakpoints.down("xl")]: {
                  p: "0px !important",
                  borderTop: `1px solid ${
                    theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]
                  }  !important`,

                  borderLeft: "none  !important"
                },
                [theme.breakpoints.down("md")]: {
                  p: "0px !important",
                  borderTop: "none  !important",
                  borderBottom: "none  !important",
                  borderLeft: "none  !important"
                }
              }}
            >
              <Box
                sx={{
                  [theme.breakpoints.down("xl")]: {
                    py: "20px",
                    width: "50.1%",
                    borderRight: `1px solid ${
                      theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]
                    }  !important`
                  },
                  [theme.breakpoints.down("md")]: {
                    py: "20px",
                    width: "50.1%",
                    borderRight: `1px solid ${
                      theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]
                    }  !important`
                  }
                }}
              >
                <Box display="flex" justifyContent="space-between" pr="5px">
                  <CustomIcon
                    fill={theme.palette.secondary.light}
                    height={27}
                    icon={VotingPowerIcon}
                    style={{ marginTop: "5px" }}
                  />
                  <BlackWarningIcon />
                </Box>
                <InfoTitle paddingBottom="3px">
                  <StyledTitle data-testid="governance.votingPowerTitle">{t("pool.votingPowerADA")}</StyledTitle>
                </InfoTitle>

                <InfoValue data-testid="governance.votingPowerValue" sx={{ wordBreak: "break-word" }}>
                  {data?.votingPower ? `${data?.votingPower} ADA` : "N/A"}{" "}
                </InfoValue>
              </Box>
            </Item>
          </Box>
        </Box>
      </Box>
      <VoteHistoryModal
        data={data?.historyVotes}
        open={openHistoryVoteModal}
        onClose={() => setOpenHistoryVoteModal(false)}
      />
      <ActionMetadataModal
        data={data?.details}
        anchorHash={data?.anchorHash}
        anchorUrl={data?.anchorUrl}
        open={openActionMetadataModal}
        setOpenModal={setOpenModal}
        onClose={() => setOpenActionMetadataModal(false)}
      />
      <ActionMetadataModalConfirm open={openModal} anchorUrl={data?.anchorUrl} onClose={() => setOpenModal(false)} />
    </DataContainer>
  );
};

export default OverallVote;

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary[200],
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11
  }
}));

const VoteBar = ({
  percentage,
  color,
  icon,
  label
}: {
  percentage: string | number;
  color: string;
  icon: JSX.Element;
  label: string;
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { isGalaxyFoldSmall } = useScreen();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography data-testid="governance.voteBar.percent" fontSize="10px" fontWeight={400}>
        {!percentage ? "0%" : percentage}
      </Typography>
      <LightTooltip
        title={
          <Box height="39px" display="flex" alignItems="center" gap="8px">
            {icon}
            <Typography
              fontSize="12px"
              fontWeight={600}
              color={theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light}
            >
              {t("common.N/A")} ({percentage})
            </Typography>
          </Box>
        }
        placement="top"
      >
        <Box
          sx={{ background: color, borderRadius: "4px" }}
          height={`${
            +(percentage.toString()?.split("%")[0] || 0) === 0 ? 0.5 : +percentage.toString().split("%")[0] + 1
          }px`}
          width={isGalaxyFoldSmall ? "24px" : "36px"}
        />
      </LightTooltip>
      <Typography
        data-testid="governance.voteBar.title"
        fontSize={`${isGalaxyFoldSmall ? "12px" : "14px"}`}
        fontWeight={400}
        pt="4px"
        textTransform="uppercase"
      >
        {label}
      </Typography>
    </Box>
  );
};

const VoteRate = ({ data }: { data?: GovernanceVoteChart | VotingChart | null }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const totalVote = useMemo(() => {
    if (data) {
      return (data?.numberOfAbstainVotes || 0) + (data?.numberOfNoVotes || 0) + (data?.numberOfYesVote || 0);
    }
    return 0;
  }, [JSON.stringify(data)]);

  return (
    <Box display="flex" alignItems="end" justifyContent="space-between" flexWrap={"wrap"} width="100%" minHeight={150}>
      <VoteBar
        percentage={totalVote > 0 ? formatPercent((data?.numberOfYesVote || 0) / totalVote) : 0}
        color={theme.palette.success[700]}
        icon={<VotesYesIcon />}
        label={t("common.yes")}
      />
      <VoteBar
        percentage={totalVote > 0 ? formatPercent((data?.numberOfAbstainVotes || 0) / totalVote) : 0}
        color={theme.palette.warning[700]}
        icon={<VotesAbstainIcon />}
        label={t("common.abstain")}
      />
      <VoteBar
        percentage={
          totalVote > 0
            ? formatPercent(
                (100 -
                  (+formatPercent((data?.numberOfYesVote || 0) / totalVote).split("%")[0] +
                    +formatPercent((data?.numberOfAbstainVotes || 0) / totalVote).split("%")[0])) /
                  100
              )
            : 0
        }
        color={theme.palette.error[700]}
        icon={<VotesNoIcon />}
        label={t("common.no")}
      />
    </Box>
  );
};
