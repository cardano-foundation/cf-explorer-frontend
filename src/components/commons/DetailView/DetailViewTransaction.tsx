import React, { useEffect } from "react";
import { CgArrowsExchange, CgClose } from "react-icons/cg";
import { CONFIRMATION_STATUS, MAX_SLOT_EPOCH, REFRESH_TIMES } from "../../../commons/utils/constants";
import {
  CubeIcon,
  DelegationHistoryMainIcon,
  FileEditIcon,
  MintingIconUrl,
  NoteEditIcon,
  RocketIcon,
  USDIcon,
  WithdrawlIcon
} from "../../../commons/resources";
import ProgressCircle from "../ProgressCircle";
import {
  CloseButton,
  EpochNumber,
  EpochText,
  HeaderContainer,
  ViewDetailContainer,
  DetailsInfoItem,
  DetailLabel,
  DetailValue,
  Icon,
  BlockDefault,
  DetailLabelSkeleton,
  DetailValueSkeleton,
  IconSkeleton,
  ProgressSkeleton,
  ViewDetailDrawer,
  Item,
  ItemName,
  ItemValue,
  ListItem,
  Group,
  DetailLink,
  DetailLinkIcon,
  DetailLinkRight,
  StyledLink,
  TxStatus,
  ConfirmStatus,
  DetailLinkName,
  DetailLinkImage,
  ViewDetailScroll,
  ViewDetailHeader,
  TimeDuration
} from "./styles";
import useFetch from "../../../commons/hooks/useFetch";
import { BiChevronRight } from "react-icons/bi";
import { details } from "../../../commons/routers";
import { formatADAFull, formatDateTimeLocal, getShortHash, getShortWallet } from "../../../commons/utils/helper";
import ViewMoreButton from "../ViewMoreButton";
import CustomTooltip from "../CustomTooltip";
import CopyButton from "../CopyButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types";
import { API } from "../../../commons/utils/api";
import ViewAllButton from "../ViewAllButton";
import ADAicon from "../ADAIcon";
import FormNowMessage from "../FormNowMessage";

type DetailViewTransactionProps = {
  hash: string;
  handleClose: () => void;
};
const tabs: { key: keyof Transaction; label: string; icon?: React.ReactNode }[] = [
  { key: "summary", label: "Summary", icon: <DelegationHistoryMainIcon /> },
  { key: "utxOs", label: "UTXOs", icon: <CgArrowsExchange /> },
  { key: "contracts", label: "Contracts", icon: <DetailLinkImage src={FileEditIcon} alt="contact" /> },
  { key: "collaterals", label: "Collateral", icon: <DetailLinkImage src={USDIcon} alt="contact" /> },
  { key: "notes", label: "Notes", icon: <DetailLinkImage src={NoteEditIcon} alt="contact" /> },
  { key: "withdrawals", label: "Withdrawal", icon: <DetailLinkImage src={WithdrawlIcon} alt="contact" /> },
  { key: "mints", label: "Minting", icon: <DetailLinkImage src={MintingIconUrl} alt="contact" /> }
];

const DetailViewTransaction: React.FC<DetailViewTransactionProps> = (props) => {
  const { hash, handleClose } = props;
  const { data, lastUpdated } = useFetch<Transaction>(
    hash ? `${API.TRANSACTION.DETAIL}/${hash}` : ``,
    undefined,
    false,
    REFRESH_TIMES.TRANSACTION_DETAIL
  );
  const { currentEpoch } = useSelector(({ system }: RootState) => system);

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  if (!data)
    return (
      <ViewDetailDrawer anchor="right" open={!!hash} hideBackdrop variant="permanent">
        <ViewDetailHeader>
          <ViewAllButton tooltipTitle="View Detail" to={details.transaction(hash)} />
          <CustomTooltip title="Close">
            <CloseButton onClick={handleClose}>
              <CgClose />
            </CloseButton>
          </CustomTooltip>
        </ViewDetailHeader>
        <ViewDetailContainer>
          <ViewDetailScroll>
            <HeaderContainer>
              <ProgressSkeleton variant="circular" />
            </HeaderContainer>
            <ListItem>
              <Item>
                <IconSkeleton variant="circular" />
                <ItemName>
                  <DetailValueSkeleton variant="rectangular" />
                </ItemName>
                <ItemValue>
                  <DetailLabelSkeleton variant="rectangular" />
                </ItemValue>
              </Item>
              <Item>
                <IconSkeleton variant="circular" />
                <ItemName>
                  <DetailValueSkeleton variant="rectangular" />
                </ItemName>
                <ItemValue>
                  <DetailLabelSkeleton variant="rectangular" />
                </ItemValue>
              </Item>
            </ListItem>
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
                <Group key={index}>
                  <DetailsInfoItem>
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
        <ViewMoreButton to={details.transaction(hash)} />
      </ViewDetailDrawer>
    );

  const input = data.utxOs?.inputs[0]?.address || "";
  const output = data.utxOs?.outputs[0]?.address || "";

  const renderConfirmationTag = () => {
    if (data?.tx?.confirmation) {
      if (data.tx.confirmation <= 2) {
        return CONFIRMATION_STATUS.LOW;
      }
      if (data.tx.confirmation <= 8) {
        return CONFIRMATION_STATUS.MEDIUM;
      }
      return CONFIRMATION_STATUS.HIGH;
    }
    return CONFIRMATION_STATUS.LOW;
  };

  return (
    <ViewDetailDrawer anchor="right" open={!!hash} hideBackdrop variant="permanent">
      <ViewDetailHeader>
        <ViewAllButton tooltipTitle="View Detail" to={details.transaction(hash)} />
        <TimeDuration>
          <FormNowMessage time={lastUpdated} />
        </TimeDuration>
        <CustomTooltip title="Close">
          <CloseButton onClick={handleClose}>
            <CgClose />
          </CloseButton>
        </CustomTooltip>
      </ViewDetailHeader>
      <ViewDetailContainer>
        <ViewDetailScroll>
          <HeaderContainer>
            <ProgressCircle
              size={150}
              pathLineCap="butt"
              pathWidth={4}
              trailWidth={2}
              percent={
                data.tx.epochNo === currentEpoch?.no
                  ? ((data.tx.epochSlot || 0) / (data.tx.maxEpochSlot || MAX_SLOT_EPOCH)) * 100
                  : 100
              }
              trailOpacity={1}
            >
              <EpochNumber>{data.tx.epochNo}</EpochNumber>
              <EpochText>Epoch</EpochText>
            </ProgressCircle>
          </HeaderContainer>
          <ListItem>
            <Item>
              <Icon src={CubeIcon} alt="socket" />
              <ItemName>Block</ItemName>
              <ItemValue>{data.tx.blockNo}</ItemValue>
            </Item>
            <Item>
              <Icon src={RocketIcon} alt="socket" />
              <ItemName>slot</ItemName>
              <ItemValue>
                {data.tx.epochSlot}
                <BlockDefault>/{data.tx.maxEpochSlot || MAX_SLOT_EPOCH}</BlockDefault>
              </ItemValue>
            </Item>
          </ListItem>
          <Group>
            <DetailsInfoItem>
              <DetailLabel>Transaction hash</DetailLabel>
              <DetailValue>
                <CustomTooltip title={hash} placement="top-start">
                  <StyledLink to={details.transaction(hash)}>{getShortHash(hash)}</StyledLink>
                </CustomTooltip>
                <CopyButton text={hash} />
              </DetailValue>
            </DetailsInfoItem>
            {input && (
              <DetailsInfoItem>
                <DetailLabel>Input</DetailLabel>
                <DetailValue>
                  <CustomTooltip title={input} placement="top-start">
                    <StyledLink to={details.address(input)}>{getShortWallet(input)}</StyledLink>
                  </CustomTooltip>
                  <CopyButton text={input} />
                </DetailValue>
              </DetailsInfoItem>
            )}
            {output && (
              <DetailsInfoItem>
                <DetailLabel>Output</DetailLabel>
                <DetailValue>
                  <CustomTooltip title={output} placement="top-start">
                    <StyledLink to={details.address(output)}>{getShortWallet(output)}</StyledLink>
                  </CustomTooltip>
                  <CopyButton text={output} />
                </DetailValue>
              </DetailsInfoItem>
            )}
            <DetailsInfoItem>
              <DetailLabel>Time</DetailLabel>
              <DetailValue>{formatDateTimeLocal(data.tx.time || "")}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Status</DetailLabel>
              <DetailValue>
                <TxStatus status={data.tx.status}>{data.tx.status}</TxStatus>
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Confirmation</DetailLabel>
              <DetailValue>
                {data.tx.confirmation}
                <ConfirmStatus status={renderConfirmationTag()}>{renderConfirmationTag()}</ConfirmStatus>
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Transaction Fees</DetailLabel>
              <DetailValue>
                {formatADAFull(data.tx.fee)}
                <ADAicon />
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Total Output</DetailLabel>
              <DetailValue>
                {formatADAFull(data.tx.totalOutput)}
                <ADAicon />
              </DetailValue>
            </DetailsInfoItem>
          </Group>
          {tabs.map(({ key, label, icon }) => {
            const value = data[key];
            if (!value) return null;
            return (
              <Group key={key}>
                <DetailLink to={details.transaction(hash, key)}>
                  <DetailLabel>
                    <DetailLinkIcon>{icon}</DetailLinkIcon>
                    <DetailLinkName>
                      {label}
                      {Array.isArray(value) ? `(${value.length})` : null}
                    </DetailLinkName>
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
      <ViewMoreButton to={details.transaction(hash)} />
    </ViewDetailDrawer>
  );
};

export default DetailViewTransaction;
