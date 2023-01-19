import React from "react";
import { CgArrowsExchange, CgClose } from "react-icons/cg";
import { CONFIRMATION_STATUS, MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import {
  CubeIcon,
  FileEditIcon,
  MintingIcon,
  NoteEditIcon,
  RocketIcon,
  USDIcon,
  WithdrawlIcon,
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
  InfoIcon,
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
  StyledViewMore,
} from "./styles";
import { ADAToken } from "../Token";
import useFetch from "../../../commons/hooks/useFetch";
import { TbFileCheck } from "react-icons/tb";
import { BiChevronRight } from "react-icons/bi";
import { details } from "../../../commons/routers";
import { formatADA, formatDateTimeLocal, getShortHash, getShortWallet } from "../../../commons/utils/helper";
import ViewMoreButton from "../ViewMoreButton";
import CustomTooltip from "../CustomTooltip";
import CopyButton from "../CopyButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types";
import { API } from "../../../commons/utils/api";

type DetailViewTransactionProps = {
  hash: string;
  handleClose: () => void;
};
const tabs: { key: keyof Transaction; label: string; icon?: React.ReactNode }[] = [
  { key: "summary", label: "Summary", icon: <TbFileCheck /> },
  { key: "utxOs", label: "UTXOs", icon: <CgArrowsExchange /> },
  { key: "contracts", label: "Contracts", icon: <DetailLinkImage src={FileEditIcon} alt="contact" /> },
  { key: "collaterals", label: "Collaterals", icon: <DetailLinkImage src={USDIcon} alt="contact" /> },
  { key: "notes", label: "Notes", icon: <DetailLinkImage src={NoteEditIcon} alt="contact" /> },
  { key: "withdrawals", label: "Withdrawals", icon: <DetailLinkImage src={WithdrawlIcon} alt="contact" /> },
  { key: "mints", label: "Minting", icon: <DetailLinkImage src={MintingIcon} alt="contact" /> },
];

const DetailViewTransaction: React.FC<DetailViewTransactionProps> = props => {
  const { hash, handleClose } = props;
  const { data } = useFetch<Transaction>(hash ? `${API.TRANSACTION.DETAIL}/${hash}` : ``);
  const { currentEpoch } = useSelector(({ system }: RootState) => system);

  if (!data)
    return (
      <ViewDetailDrawer anchor="right" open={!!hash} hideBackdrop variant="permanent">
        <ViewDetailContainer>
          <ViewDetailScroll>
            <StyledViewMore tooltipTitle="View Detail" to={details.transaction(hash)} />
            <CustomTooltip title="Close">
              <CloseButton onClick={handleClose}>
                <CgClose />
              </CloseButton>
            </CustomTooltip>
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
      if (data.tx.confirmation > 9) {
        return CONFIRMATION_STATUS.HIGH;
      }
      if (2 < data.tx.confirmation && data.tx.confirmation <= 8) {
        return CONFIRMATION_STATUS.MEDIUM;
      }
      return CONFIRMATION_STATUS.LOW;
    }
    return CONFIRMATION_STATUS.LOW;
  };

  return (
    <ViewDetailDrawer anchor="right" open={!!hash} hideBackdrop variant="permanent">
      <ViewDetailContainer>
        <ViewDetailScroll>
          <StyledViewMore tooltipTitle="View Detail" to={details.transaction(hash)} />
          <CustomTooltip title="Close">
            <CloseButton onClick={handleClose}>
              <CgClose />
            </CloseButton>
          </CustomTooltip>
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
              <ItemValue>{data.tx.epochNo}</ItemValue>
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
              <DetailLabel>
                <InfoIcon />
                Transaction hash
              </DetailLabel>
              <DetailValue>
                <CustomTooltip title={hash} placement="top-start">
                  <StyledLink to={details.transaction(hash)}>{getShortHash(hash)}</StyledLink>
                </CustomTooltip>
                <CopyButton text={hash} />
              </DetailValue>
            </DetailsInfoItem>
            {input && (
              <DetailsInfoItem>
                <DetailLabel>
                  <InfoIcon />
                  Input
                </DetailLabel>
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
                <DetailLabel>
                  <InfoIcon />
                  Output
                </DetailLabel>
                <DetailValue>
                  <CustomTooltip title={output} placement="top-start">
                    <StyledLink to={details.address(output)}>{getShortWallet(output)}</StyledLink>
                  </CustomTooltip>
                  <CopyButton text={output} />
                </DetailValue>
              </DetailsInfoItem>
            )}
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Time
              </DetailLabel>
              <DetailValue>{formatDateTimeLocal(data.tx.time || "")}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Status
              </DetailLabel>
              <DetailValue>
                <TxStatus status={data.tx.status}>{data.tx.status}</TxStatus>
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Confirmation
              </DetailLabel>
              <DetailValue>
                {data.tx.confirmation}
                <ConfirmStatus status={renderConfirmationTag()}>{renderConfirmationTag() || "LOW"}</ConfirmStatus>
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Transaction Fees
              </DetailLabel>
              <DetailValue>
                {formatADA(data.tx.fee) || 0}
                <ADAToken color="black" />
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Total Output
              </DetailLabel>
              <DetailValue>
                {formatADA(data.tx.totalOutput) || 0}
                <ADAToken color="black" />
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
