import { useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { HiArrowLongLeft } from "react-icons/hi2";
import { details, routers } from "../../../commons/routers";
import delegatedIcon from "../../../commons/resources/icons/delegated.svg";
import totalStakeIcon from "../../../commons/resources/icons/totalStake.svg";
import rewardIcon from "../../../commons/resources/icons/reward.svg";
import rewardWithdrawIcon from "../../../commons/resources/icons/rewardWithdraw.svg";
import infoIcon from "../../../commons/resources/icons/info.svg";
import { formatADAFull } from "../../../commons/utils/helper";
import CopyButton from "../../commons/CopyButton";
import {
  BackButton,
  BackText,
  ButtonModal,
  CardInfoOverview,
  CardItem,
  HeaderContainer,
  HeaderTitle,
  LabelStatus,
  SlotLeader,
  SlotLeaderContainer,
  SlotLeaderSkeleton,
  StyledFlexValue,
  StyledLink,
  TitleCard,
  ValueCard,
} from "./styles";
import { ADAToken } from "../../commons/Token";
import { useParams } from "react-router-dom";
import ModalAllAddress from "../ModalAllAddress";
import CustomTooltip from "../../commons/CustomTooltip";
import BookmarkButton from "../../commons/BookmarkIcon";

interface Props {
  data: IStakeKeyDetail | null;
  loading: boolean;
}
const StakeOverview: React.FC<Props> = ({ data, loading }) => {
  const [open, setOpen] = useState(false);
  const { stakeId } = useParams<{ stakeId: string }>();
  const listOverview = [
    {
      icon: delegatedIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Delegated to </TitleCard>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      value: (
        <CustomTooltip title={`${data?.pool?.tickerName || ""} - ${data?.pool?.poolName || ""}`}>
          <StyledLink to={details.delegation(data?.pool?.poolId)}>
            {data?.pool?.tickerName || ""} - {data?.pool?.poolName || ""}
          </StyledLink>
        </CustomTooltip>
      ),
    },
    {
      icon: totalStakeIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Total Stake</TitleCard>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      value: (
        <Box display="flex" alignItems="center" justifyContent="space-between" pr={2}>
          <StyledFlexValue>
            <CustomTooltip title={formatADAFull(data?.totalStake || 0)}>
              <Box component={"span"}>{formatADAFull(data?.totalStake || 0)}</Box>
            </CustomTooltip>
            <ADAToken />
          </StyledFlexValue>
          <ButtonModal onClick={() => setOpen(true)}>View all addresses</ButtonModal>
        </Box>
      ),
    },
    {
      icon: rewardIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}>Reward available </TitleCard>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      value: (
        <StyledFlexValue>
          <CustomTooltip title={formatADAFull(data?.rewardAvailable || 0)}>
            <Box component={"span"}>{formatADAFull(data?.rewardAvailable || 0)}</Box>
          </CustomTooltip>
          <ADAToken />
        </StyledFlexValue>
      ),
    },
    {
      icon: rewardWithdrawIcon,
      title: (
        <Box display={"flex"} alignItems="center">
          <TitleCard mr={1}> Reward withdrawn </TitleCard>
          <img src={infoIcon} alt="info icon" />
        </Box>
      ),
      value: (
        <CustomTooltip title={formatADAFull(data?.rewardWithdrawn || 0)}>
          <StyledFlexValue>
            {formatADAFull(data?.rewardWithdrawn || 0)}
            <ADAToken />
          </StyledFlexValue>
        </CustomTooltip>
      ),
    },
  ];

  return (
    <Box>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
        <Box>
          <BackButton to={routers.STAKE_LIST.replace(":poolType?", "registration")}>
            <HiArrowLongLeft />
            <BackText>Back</BackText>
          </BackButton>
          <HeaderContainer>
            <HeaderTitle>Stake Key Details</HeaderTitle>

            <BookmarkButton keyword={data?.stakeAddress || ""} type="STAKE_KEY" />

            {!loading && <Skeleton variant="rectangular" width={"100"} />}
            {!loading && (
              <LabelStatus
                color={props => (data?.status === "ACTIVE" ? props.colorGreenLight : props.textColorPale)}
                style={{
                  background: data?.status === "ACTIVE" ? "rgba(67, 143, 104, 0.2)" : "rgba(102, 112, 133, 0.2)",
                }}
              >
                {data?.status}
              </LabelStatus>
            )}
          </HeaderContainer>
          <SlotLeaderContainer>
            {loading ? (
              <SlotLeaderSkeleton variant="rectangular" />
            ) : (
              <Box>
                <SlotLeader>
                  <Box mr={2}>{data?.stakeAddress}</Box> <CopyButton text={data?.stakeAddress} />
                </SlotLeader>
              </Box>
            )}
          </SlotLeaderContainer>
        </Box>
      </Box>

      <CardInfoOverview>
        {listOverview.map((item, idx) => {
          return (
            <CardItem>
              <Box>
                <img src={item.icon} alt="" />
              </Box>
              <Box mt={2} mb={1}>
                {item.title}
              </Box>
              <ValueCard mt={2} mb={1}>
                {item.value}
              </ValueCard>
            </CardItem>
          );
        })}
      </CardInfoOverview>
      <ModalAllAddress open={open} onClose={() => setOpen(false)} stake={stakeId} />
    </Box>
  );
};

export default StakeOverview;
