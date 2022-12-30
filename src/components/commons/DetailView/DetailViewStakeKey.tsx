import React from "react";
import { CgArrowsExchange, CgClose } from "react-icons/cg";
import { FileEditIcon, LightningIcon } from "../../../commons/resources";
import {
  CloseButton,
  ViewDetailContainer,
  DetailsInfoItem,
  DetailLabel,
  DetailValue,
  InfoIcon,
  DetailLabelSkeleton,
  DetailValueSkeleton,
  IconSkeleton,
  ViewDetailDrawer,
  Group,
  DetailLink,
  DetailLinkIcon,
  DetailLinkRight,
  DetailLinkName,
  TokenContainer,
  TokenHeaderContainer,
  TokenMetaData,
  TokenInfo,
  MetaData,
  TokenHeaderInfo,
  TokenTotalSupply,
  TokenDecimal,
  ViewDetailScroll,
  StyledViewMore,
  StakeKeyHeader,
  StakeKeyStatus,
  DetailLinkImage,
  StakeKeyLink,
} from "./styles";
import useFetch from "../../../commons/hooks/useFetch";
import { BiChevronRight } from "react-icons/bi";
import { details } from "../../../commons/routers";
import { formatADA } from "../../../commons/utils/helper";
import ViewMoreButton from "../ViewMoreButton";
import CustomTooltip from "../CustomTooltip";
import { ADAToken } from "../Token";
import { TbFileCheck } from "react-icons/tb";
import CopyButton from "../CopyButton";

type DetailViewStakeKeyProps = {
  stakeId: string;
  handleClose: () => void;
};
const tabs: { key: string; label: string; icon?: React.ReactNode }[] = [
  { key: "delegation", label: "Delegation History", icon: <TbFileCheck /> },
  { key: "stake-key", label: "Stake Key History", icon: <CgArrowsExchange /> },
  { key: "withdrawl", label: "Withdrawal History", icon: <DetailLinkImage src={FileEditIcon} alt="withdrawal" /> },
  { key: "rewards", label: "Instantaneous Rewards", icon: <DetailLinkImage src={LightningIcon} alt="rewards" /> },
];

const DetailViewStakeKey: React.FC<DetailViewStakeKeyProps> = props => {
  const { stakeId, handleClose } = props;
  const { data } = useFetch<IStakeKeyDetail>(stakeId ? `stake/address/${stakeId}` : ``);

  if (!data)
    return (
      <ViewDetailDrawer anchor="right" open={!!stakeId} hideBackdrop variant="permanent">
        <ViewDetailContainer>
          <ViewDetailScroll>
            <StyledViewMore tooltipTitle="View Detail" to={details.stake(stakeId)} />
            <CustomTooltip placement="top" title="Close">
              <CloseButton onClick={handleClose}>
                <CgClose />
              </CloseButton>
            </CustomTooltip>
            <TokenContainer>
              <TokenHeaderContainer>
                <IconSkeleton variant="circular" />
                <DetailValueSkeleton variant="rectangular" />
              </TokenHeaderContainer>
              <TokenMetaData>
                <TokenInfo>
                  <DetailValueSkeleton variant="rectangular" />
                  <IconSkeleton variant="circular" />
                </TokenInfo>
                <MetaData />
              </TokenMetaData>
              <TokenHeaderInfo>
                <TokenTotalSupply>
                  <DetailValueSkeleton variant="rectangular" />
                  <DetailValueSkeleton variant="rectangular" />
                </TokenTotalSupply>
                <TokenDecimal>
                  <DetailValueSkeleton variant="rectangular" />
                  <DetailValueSkeleton variant="rectangular" />
                </TokenDecimal>
              </TokenHeaderInfo>
            </TokenContainer>
            <Group>
              {new Array(4).fill(0).map((_, index) => {
                return (
                  <DetailsInfoItem key={index}>
                    <DetailLabel>
                      <DetailValueSkeleton variant="rectangular" />
                    </DetailLabel>
                    <DetailValue>
                      <DetailLabelSkeleton variant="rectangular" />
                    </DetailValue>
                  </DetailsInfoItem>
                );
              })}
            </Group>
            {new Array(2).fill(0).map((_, index) => {
              return (
                <Group>
                  <DetailsInfoItem key={index}>
                    <DetailLabel>
                      <DetailValueSkeleton variant="rectangular" />
                    </DetailLabel>
                    <DetailValue>
                      <DetailLabelSkeleton variant="rectangular" />
                    </DetailValue>
                  </DetailsInfoItem>
                </Group>
              );
            })}
          </ViewDetailScroll>
        </ViewDetailContainer>
        <ViewMoreButton to={details.stake(stakeId)} />
      </ViewDetailDrawer>
    );

  return (
    <ViewDetailDrawer anchor="right" open={!!stakeId} hideBackdrop variant="permanent">
      <ViewDetailContainer>
        <ViewDetailScroll>
          <StyledViewMore tooltipTitle="View Detail" to={details.stake(stakeId)} />
          <CustomTooltip placement="top" title="Close">
            <CloseButton onClick={handleClose}>
              <CgClose />
            </CloseButton>
          </CustomTooltip>
          <StakeKeyHeader>
            <StakeKeyLink to={details.stake(stakeId)}>{stakeId}</StakeKeyLink>
            <CopyButton text={stakeId} />
          </StakeKeyHeader>
          <Group>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Status
              </DetailLabel>
              <DetailValue>
                <StakeKeyStatus status={data.status}>{data.status}</StakeKeyStatus>
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Reward available
              </DetailLabel>
              <DetailValue>
                {formatADA(data.rewardAvailable) || 0}
                <ADAToken color="black" size={"var(--font-size-text-x-small)"} />
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Reward withdrawn
              </DetailLabel>
              <DetailValue>
                {formatADA(data.rewardWithdrawn) || 0}
                <ADAToken color="black" size={"var(--font-size-text-x-small)"} />
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Delegated to
              </DetailLabel>
              <DetailValue>{data.pool?.poolName}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Total Stake
              </DetailLabel>
              <DetailValue>
                {formatADA(data.totalStake) || 0}
                <ADAToken color="black" size={"var(--font-size-text-x-small)"} />
              </DetailValue>
            </DetailsInfoItem>
          </Group>
          {tabs.map(({ key, label, icon }) => {
            return (
              <Group key={key}>
                <DetailLink to={details.stake(stakeId)}>
                  <DetailLabel>
                    <DetailLinkIcon>{icon}</DetailLinkIcon>
                    <DetailLinkName>{label}</DetailLinkName>
                  </DetailLabel>
                  <DetailValue>
                    <DetailLinkRight>
                      <BiChevronRight size={24} />
                    </DetailLinkRight>
                  </DetailValue>
                </DetailLink>
              </Group>
            );
          })}
        </ViewDetailScroll>
      </ViewDetailContainer>
      <ViewMoreButton to={details.stake(stakeId)} />
    </ViewDetailDrawer>
  );
};

export default DetailViewStakeKey;
