import { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useScreen } from "src/commons/hooks/useScreen";
import {
  ActionTypeIcon,
  AnchorTextIcon,
  BlackCircleIcon,
  CurrentStatusIcon,
  GovernanceIdIcon,
  SubmissionDateIcon,
  VoteIcon,
  VotingPowerIcon,
  historyIcon
} from "src/commons/resources";
import { formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import { ChipContainer } from "src/pages/NativeScriptsAndSC/Card";

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
import { GovernanceStatus, VoteStatus, actionTypeListDrep } from "../commons/CardGovernanceVotes";
import DatetimeTypeTooltip from "../commons/DatetimeTypeTooltip";

import { ActionMetadataModal, ActionMetadataModalConfirm, GovernanceVoteDetail, VoteHistoryModal } from ".";

const OverviewVote: React.FC<{ data: GovernanceVoteDetail | null }> = ({ data }) => {
  const [openHistoryVoteModal, setOpenHistoryVoteModal] = useState<boolean>(false);
  const [openActionMetadataModal, setOpenActionMetadataModal] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();
  const { t } = useTranslation();
  const { isGalaxyFoldSmall, isMobile } = useScreen();
  if (!data) {
    return <></>;
  }

  return (
    <DataContainer sx={{ boxShadow: "unset" }}>
      <StyledGrid container>
        <Item item xs={6} md={6} lg={3} top={1} pr={"5px !important"}>
          <Box display="flex" justifyContent="space-between" pr={"5px"}>
            <CustomIcon fill={theme.palette.secondary.light} icon={GovernanceIdIcon} height={22} marginTop="15px" />
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
        <Item item xs={6} md={6} lg={3} top={1} pr={"5px !important"}>
          <Box display="flex" justifyContent="space-between" pr="5px">
            <CustomIcon fill={theme.palette.secondary.light} icon={ActionTypeIcon} height={22.27} marginTop="15px" />
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
          lg={3}
          top={1}
          sx={{
            position: "relative",
            pr: "5px !important",
            [theme.breakpoints.down("lg")]: { borderLeft: "none  !important", pl: "0px ", pt: "20px" }
          }}
        >
          <Box display="flex" justifyContent="space-between" pr="5px">
            <CustomIcon fill={theme.palette.secondary.light} icon={VoteIcon} height={27} marginTop="15px" />
          </Box>
          <InfoTitle
            paddingTop="2px"
            paddingBottom="3px"
            paddingRight="5px"
            display="flex"
            justifyContent="space-between"
            alignItems="center !important"
          >
            <StyledTitle data-testid="governance.votesTitle">{t("pool.vote")}</StyledTitle>
          </InfoTitle>
          <InfoValue data-testid="governance.votesValue" width={"fit-content"}>
            {
              <Box display={"flex"} alignItems={"center"} gap={1} flexWrap={"wrap"}>
                <Box>
                  <VoteStatus status={data?.voteType || ""} />
                </Box>
                {data?.historyVotes && data?.historyVotes.length > 1 && (
                  <Box
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setOpenHistoryVoteModal(true);
                    }}
                  >
                    <ChipContainer
                      Icon={historyIcon}
                      message={
                        <Box component={Typography} textTransform="uppercase" fontSize="12px" fontWeight={500}>
                          History
                        </Box>
                      }
                      variant={"gray"}
                    />
                  </Box>
                )}
              </Box>
            }
          </InfoValue>
        </Item>
        <Item
          item
          xs={6}
          md={6}
          lg={3}
          top={1}
          sx={{
            position: "relative",
            pr: "5px !important",
            [theme.breakpoints.down("lg")]: { pt: "20px" }
          }}
          width={"100%"}
        >
          <Box display="flex" justifyContent="space-between" pr="5px">
            <CustomIcon fill={theme.palette.secondary.light} icon={CurrentStatusIcon} height={28} marginTop="15px" />
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
        <Item
          item
          xs={6}
          md={6}
          lg={3}
          pr={"5px !important"}
          sx={{
            [theme.breakpoints.down("lg")]: {
              borderBottom: `1px solid ${theme.palette.primary[200]}  !important`,
              paddingBottom: "25px"
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
          </Box>
          <InfoTitle paddingBottom="3px">
            <StyledTitle data-testid="governance.votingPowerTitle">{t("pool.votingPowerADA")}</StyledTitle>
          </InfoTitle>

          <InfoValue data-testid="governance.votingPowerValue" sx={{ wordBreak: "break-word" }}>
            {data?.votingPower ? `${data?.votingPower} ADA` : "N/A"}{" "}
          </InfoValue>
        </Item>
        <Item
          item
          xs={6}
          md={6}
          lg={3}
          pr={"5px !important"}
          sx={{
            [theme.breakpoints.down("lg")]: {
              borderBottom: `1px solid ${theme.palette.primary[200]}  !important`,
              paddingBottom: "25px"
            }
          }}
        >
          <Box display="flex" justifyContent="space-between" pr="5px">
            <CustomIcon fill={theme.palette.secondary.light} height={27} icon={SubmissionDateIcon} />
          </Box>
          <InfoTitle paddingBottom="3px">
            <StyledTitle data-testid="governance.submissionTitle">{t("pool.submission")}</StyledTitle>
          </InfoTitle>
          <InfoValue data-testid="governance.submissionValue">
            <DatetimeTypeTooltip>{formatDateTimeLocal(data?.submissionDate || "")}</DatetimeTypeTooltip>
          </InfoValue>
        </Item>
        <Item
          item
          xs={6}
          md={6}
          lg={3}
          pr={"5px !important"}
          sx={{ [theme.breakpoints.down("lg")]: { borderLeft: "none  !important", pl: "0px" } }}
        >
          <Box display="flex" justifyContent="space-between" pr="5px">
            <CustomIcon fill={theme.palette.secondary.light} height={27} icon={SubmissionDateIcon} />
          </Box>
          <InfoTitle paddingBottom="3px">
            <StyledTitle data-testid="governance.expiryDateTitle">{t("pool.expiryDate")}</StyledTitle>
          </InfoTitle>
          <InfoValue data-testid="governance.expiryDateValue">
            <DatetimeTypeTooltip>{formatDateTimeLocal(data?.expiryDate || "")}</DatetimeTypeTooltip>
          </InfoValue>
        </Item>
        <Item item xs={6} md={6} lg={3} pr={"5px !important"} sx={{ [theme.breakpoints.down("lg")]: { pl: "25px" } }}>
          <Box display="flex" justifyContent="space-between" pr="5px">
            <CustomIcon fill={theme.palette.secondary.light} height={25} icon={AnchorTextIcon} />
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
      </StyledGrid>
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

export default OverviewVote;
