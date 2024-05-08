import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  TooltipProps,
  Typography,
  useTheme,
  Tooltip,
  tooltipClasses,
  styled,
  Skeleton
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { stringify } from "qs";

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
import { formatADA, formatDateTimeLocal, formatPercent, getShortHash } from "src/commons/utils/helper";
import { ChipContainer } from "src/pages/NativeScriptsAndSC/Card";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";

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
import CustomModal from "../commons/CustomModal";
import { CIPPropertyTable } from "../CIPComplianceModal/styles";
import { Column } from "../commons/Table";

import { ActionMetadataModal, ActionMetadataModalConfirm, GovernanceVoteDetail, VoteHistoryModal } from ".";

type VoteType = "SPOs" | "DReps" | "CC";

const OverallVote: React.FC<{ data: GovernanceVoteDetail | null; voteId: string; index?: number }> = ({
  data,
  voteId,
  index
}) => {
  const [selectVote, setSelectVote] = useState<VoteType>("SPOs");
  const [openHistoryVoteModal, setOpenHistoryVoteModal] = useState<boolean>(false);
  const [openActionMetadataModal, setOpenActionMetadataModal] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);

  const { data: dataChart, loading: loadingChart } = useFetch<GovernanceVoteChart>(
    `${API.POOL_CERTIFICATE.POOL_CHART}?${stringify({
      txHash: voteId,
      index: index || 0,
      voterType: voterType[selectVote]
    })}`
  );

  const theme = useTheme();
  const { t } = useTranslation();
  const { isGalaxyFoldSmall, isMobile } = useScreen();
  const listVotes = ["SPOs", "DReps", "CC"];

  const filterDataChart = (selectVote: string) => {
    switch (selectVote) {
      case "SPOs":
        return {
          voterType: "STAKING_POOL_KEY_HASH",
          numberOfYesVote: dataChart?.totalYesVoteStake,
          numberOfNoVotes: dataChart?.totalNoVoteStake,
          numberOfAbstainVotes: dataChart?.abstainVoteStake,
          totalVote: dataChart?.activeVoteStake,
          threshold: dataChart?.threshold
        };

      case "DReps":
        return {
          voterType: "DREP_KEY_HASH",
          numberOfYesVote: dataChart?.totalYesVoteStake,
          numberOfNoVotes: dataChart?.totalNoVoteStake,
          numberOfAbstainVotes: dataChart?.abstainVoteStake,
          totalVote: dataChart?.activeVoteStake,
          threshold: dataChart?.threshold
        };
      case "CC":
        return {
          voterType: "CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH",
          numberOfYesVote: dataChart?.yesCcMembers,
          numberOfNoVotes: dataChart?.noCcMembers,
          numberOfAbstainVotes: dataChart?.abstainCcMembers,
          totalVote: dataChart?.ccMembers,
          threshold: dataChart?.threshold
        };
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
                <CustomIcon fill={theme.palette.secondary.light} icon={CurrentStatusIcon} height={28} />
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
              <InfoValue sx={{ pr: "20px  !important", [theme.breakpoints.down("sm")]: { pr: "0  !important" } }}>
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
              pb={"45px !important"}
              pl={"25px !important"}
              top={1}
              sx={{
                position: "relative",
                pr: "5px !important",
                [theme.breakpoints.down("xl")]: {
                  px: "0 !important",
                  pt: "20px !important",
                  pb: "0px !important",
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
              <Box
                display="flex"
                justifyContent="space-between"
                pr="5px"
                sx={{ [theme.breakpoints.down("md")]: { pt: "20px" } }}
              >
                <CustomIcon fill={theme.palette.secondary.light} icon={VoteIcon} height={27} marginTop="15px" />
                <BlackWarningIcon />
              </Box>
              <InfoTitle
                paddingBottom="3px"
                paddingRight="5px"
                display="flex"
                justifyContent="space-between"
                alignItems="center !important"
                mt="7px !important"
              >
                <StyledTitle data-testid="governance.votesTitle">{t("pool.votes")}</StyledTitle>

                <Box display="flex" gap="8px" flexWrap="inherit">
                  {listVotes.map((i) => (
                    <Chip
                      key={i}
                      sx={{
                        fontWeight: 500,
                        fontSize: "12px",
                        background:
                          selectVote === i
                            ? theme.palette.primary[200]
                            : theme.isDark
                            ? theme.palette.primary[500]
                            : theme.palette.primary[100],
                        border: `1px solid ${
                          selectVote === i ? theme.palette.primary.main : theme.palette.secondary[600]
                        }`,
                        color:
                          selectVote === i
                            ? theme.palette.secondary.main
                            : theme.isDark
                            ? theme.palette.secondary.main
                            : theme.palette.secondary[600],
                        "&:hover": {
                          background: theme.palette.primary[200]
                        }
                      }}
                      label={i}
                      onClick={() => setSelectVote(i as VoteType)}
                    />
                  ))}
                </Box>
              </InfoTitle>
              <InfoValue data-testid="governance.votesValue" width={"100%"}>
                <Box pr="5px">
                  {loadingChart ? (
                    <Box
                      component={Skeleton}
                      variant="rectangular"
                      sx={{
                        height: 150,
                        [theme.breakpoints.down("sm")]: {
                          height: 300
                        },
                        bgcolor: theme.isDark ? theme.palette.secondary[600] : ""
                      }}
                      borderRadius={2}
                    />
                  ) : (
                    <VoteRate data={filterDataChart(selectVote) as VotingChart} selectedVote={selectVote} />
                  )}
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
                  <CustomIcon fill={theme.palette.secondary.light} height={27} icon={VotingPowerIcon} />
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
  label,
  value,
  tooltipTitle
}: {
  percentage: string | number;
  color: string;
  icon: JSX.Element;
  label: string;
  value?: number | string | null;
  tooltipTitle: React.ReactNode;
}) => {
  const theme = useTheme();
  const { isGalaxyFoldSmall } = useScreen();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography data-testid="governance.voteBar.percent" fontSize="10px" fontWeight={400}>
        {!value ? "0" : value}
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
              {tooltipTitle}
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

const VoteRate = ({ data, selectedVote }: { data: VotingChart | null; selectedVote: string }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);

  const totalVote = useMemo(() => {
    if (data) {
      return (data?.numberOfAbstainVotes || 0) + (data?.numberOfNoVotes || 0) + (data?.numberOfYesVote || 0);
    }
    return 0;
  }, [JSON.stringify(data)]);

  return (
    <Box
      display="flex"
      alignItems="end"
      justifyContent="space-between"
      flexWrap={"wrap"}
      width="100%"
      minHeight={150}
      sx={{
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "start",
          mt: 2
        }
      }}
    >
      <Box flex={3} color={theme.palette.secondary.light} fontSize={14}>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Box>
            {selectedVote == "CC" ? t("drep.ccMembers") : t("drep.activeVoteStake")}
            {": "}
            <Box display={"inline"} fontWeight={"light"}>
              {data?.totalVote !== null
                ? `${selectedVote == "CC" ? data?.totalVote : formatADA(data?.totalVote)} ${
                    selectedVote == "CC" ? "" : "ADA"
                  }`
                : t("common.N/A")}
            </Box>
          </Box>
          <CustomTooltip title={t("drep.activeVoteStakeTooltip")}>
            <BlackWarningIcon />
          </CustomTooltip>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Box py={2}>
            {t("drep.threshold")}
            {": "}
            <Box display={"inline"} fontWeight={"light"}>
              {data?.totalVote !== null && data?.threshold !== null
                ? `${
                    selectedVote == "CC"
                      ? Math.ceil((data?.totalVote || 0) * (data?.threshold || 0))
                      : formatADA(Math.ceil((data?.totalVote || 0) * (data?.threshold || 0)))
                  } ${selectedVote == "CC" ? "" : "ADA"}`
                : t("common.N/A")}{" "}
              ({formatPercent(data?.threshold)})
            </Box>
          </Box>{" "}
          <CustomTooltip title={t("drep.thresholdTooltip")}>
            <BlackWarningIcon />
          </CustomTooltip>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Box>
            {t("drep.remaining")}
            {": "}
            <Box display={"inline"} fontWeight={"light"}>
              {data?.totalVote !== null
                ? `${
                    selectedVote == "CC"
                      ? (data?.totalVote || 0) - totalVote
                      : formatADA((data?.totalVote || 0) - totalVote)
                  } ${selectedVote == "CC" ? "" : "ADA"}`
                : t("common.N/A")}
            </Box>
          </Box>{" "}
          <CustomTooltip title={t("drep.remainingTooltip")}>
            <BlackWarningIcon />
          </CustomTooltip>
        </Box>
        <Box pt={2}>
          <Box display={"inline"} sx={{ cursor: "pointer" }} onClick={() => setOpenModal(true)}>
            <ChipContainer maxWidth="170px" Icon={VotesAbstainIcon} variant="warning" message={t("drep.abstainInfo")} />
          </Box>
        </Box>
      </Box>
      <Box flex={1} width={"100%"}>
        <Box
          display="flex"
          justifyContent="center"
          flexWrap={"wrap"}
          width="100%"
          minHeight={150}
          alignItems={"end"}
          gap={4}
        >
          <VoteBar
            percentage={
              data?.totalVote && data?.totalVote > 0 ? formatPercent((data?.numberOfYesVote || 0) / data?.totalVote) : 0
            }
            color={theme.palette.success[700]}
            icon={<VotesYesIcon />}
            label={t("common.yes")}
            value={data?.numberOfYesVote}
            tooltipTitle={
              <Box textAlign={"left"} pl={"4px"}>
                <Box>
                  Current:{" "}
                  {data?.numberOfYesVote !== null
                    ? `${selectedVote == "CC" ? data?.numberOfYesVote : formatADA(data?.numberOfYesVote)} ${
                        selectedVote == "CC" ? "" : "ADA"
                      }`
                    : t("common.N/A")}{" "}
                  (
                  {data?.totalVote && data?.totalVote > 0
                    ? formatPercent((data?.numberOfYesVote || 0) / data?.totalVote)
                    : "0%"}
                  )
                </Box>
                <Box>
                  Threshold:{" "}
                  {data?.totalVote !== null && data?.threshold !== null
                    ? `${
                        selectedVote == "CC"
                          ? Math.ceil((data?.totalVote || 0) * (data?.threshold || 0))
                          : formatADA(Math.ceil((data?.totalVote || 0) * (data?.threshold || 0)))
                      } ${selectedVote == "CC" ? "" : "ADA"}`
                    : t("common.N/A")}{" "}
                  ({formatPercent(data?.threshold)})
                </Box>
              </Box>
            }
          />
          <VoteBar
            percentage={
              data?.totalVote && data?.totalVote > 0 ? formatPercent((data?.numberOfNoVotes || 0) / data?.totalVote) : 0
            }
            color={theme.palette.error[700]}
            icon={<VotesNoIcon />}
            label={t("common.no")}
            value={data?.numberOfNoVotes}
            tooltipTitle={
              <Box textAlign={"left"} pl={"4px"}>
                Current:{" "}
                {data?.numberOfNoVotes !== null
                  ? `${selectedVote == "CC" ? data?.numberOfNoVotes : formatADA(data?.numberOfNoVotes)} ${
                      selectedVote == "CC" ? "" : "ADA"
                    }`
                  : t("common.N/A")}{" "}
                (
                {data?.totalVote && data?.totalVote > 0
                  ? formatPercent((data?.numberOfNoVotes || 0) / data?.totalVote)
                  : "0%"}
                )
              </Box>
            }
          />
        </Box>
      </Box>
      <AbstainInfo open={openModal} data={data} onClose={() => setOpenModal(false)} />
    </Box>
  );
};

const voterType = {
  SPOs: "STAKING_POOL_KEY_HASH",
  DReps: "DREP_KEY_HASH",
  CC: "CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH"
};

export const AbstainInfo: React.FC<{ onClose?: () => void; open: boolean; data: VotingChart | null }> = ({
  onClose,
  open,
  data
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const dataTable =
    data?.totalVote !== null
      ? [
          {
            current: data?.totalVote,
            starting: (data?.totalVote || 0) + (data?.numberOfAbstainVotes || 0),
            abstained: data?.numberOfAbstainVotes
          }
        ]
      : null;

  const columns: Column<{ current: number; starting: number; abstained: number }>[] = [
    {
      title:
        data?.voterType === "CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH"
          ? t("drep.abstainCCTotal")
          : t("drep.abstainActiveVoteStake"),
      key: "expectedFormat",
      minWidth: 130,
      render: (r) => (data?.voterType === "CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH" ? r.starting : formatADA(r.starting))
    },
    {
      title: t("drep.abstainAmount"),
      key: "expectedFormat",
      minWidth: 130,
      render: (r) =>
        data?.voterType === "CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH" ? r.abstained : formatADA(r.abstained)
    },
    {
      title:
        data?.voterType === "CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH"
          ? t("drep.abstainCCCurent")
          : t("drep.abstainCurrentVoteStake"),
      key: "expectedFormat",
      minWidth: 130,
      render: (r) => (data?.voterType === "CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH" ? r.current : formatADA(r.current))
    }
  ];
  return (
    <CustomModal
      open={open}
      onClose={() => onClose?.()}
      title={t("drep.abstainInfoTitle")}
      width={650}
      sx={{ maxHeight: "70vh" }}
    >
      <Box display="block">
        <Typography data-testid="governance.metadataModal.anchor" color={theme.palette.secondary.main}>
          {data?.voterType === "CONSTITUTIONAL_COMMITTEE_HOT_KEY_HASH"
            ? t("drep.abstainInfoDescriptionCC")
            : data?.voterType === "STAKING_POOL_KEY_HASH"
            ? t("drep.abstainInfoDescriptionSPOs")
            : t("drep.abstainInfoDescriptionDrep")}
        </Typography>
        <CIPPropertyTable
          isModal
          height="auto"
          isFullTableHeight={true}
          data={dataTable}
          columns={columns}
          showPagination={false}
        />
      </Box>
    </CustomModal>
  );
};
