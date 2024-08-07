import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiChevronRight } from "react-icons/bi";
import { CgArrowsExchange, CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";

import useFetch from "src/commons/hooks/useFetch";
import {
  CubeIconComponent,
  DelegationHistoryMainIcon,
  DelegationIconComponent,
  FileEditIcon,
  GitCommitIcon,
  InstantaneousHistoryComponent,
  MetadataIconTx,
  MintingIconComponent,
  NoteEditIcon,
  ProtocolUpdateComponent,
  RewardsDistributionComponent,
  RocketIcon,
  StakeCertificatesComponent,
  USDIconComponent,
  WithdrawlIconComponent
} from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import { RootState } from "src/stores/types";

import { CustomNumberBadge } from "../CustomNumberBadge";
import ADAicon from "../ADAIcon";
import CopyButton from "../CopyButton";
import CustomIcon from "../CustomIcon";
import CustomTooltip from "../CustomTooltip";
import FormNowMessage from "../FormNowMessage";
import ProgressCircle from "../ProgressCircle";
import ViewAllButton from "../ViewAllButton";
import ViewMoreButton from "../ViewMoreButton";
import {
  BlockDefault,
  CloseButton,
  DetailLabel,
  DetailLabelSkeleton,
  DetailLink,
  DetailLinkIcon,
  DetailLinkImage,
  DetailLinkName,
  DetailLinkRight,
  DetailValue,
  DetailValueSkeleton,
  DetailsInfoItem,
  EpochNumber,
  EpochText,
  Group,
  HeaderContainer,
  IconSkeleton,
  Item,
  ItemName,
  ItemValue,
  ListItem,
  ProgressSkeleton,
  StyledLink,
  TimeDuration,
  TxStatus,
  ViewDetailContainer,
  ViewDetailDrawer,
  ViewDetailHeader,
  ViewDetailScroll
} from "./styles";
import DatetimeTypeTooltip from "../DatetimeTypeTooltip";

type DetailViewTransactionProps = {
  hash: string;
  handleClose: () => void;
  open?: boolean;
};

const DetailViewTransaction: React.FC<DetailViewTransactionProps> = (props) => {
  const { t } = useTranslation();
  const { hash, handleClose, open } = props;
  const [urlFetch, setUrlFetch] = useState("");
  const theme = useTheme();
  const epochNo = useSelector(({ system }: RootState) => system.currentEpoch?.no);
  const blockNo = useSelector(({ system }: RootState) => system.blockNo);
  const [lastUpdated, setLastUpdated] = useState<number>();
  const { data, loading } = useFetch<Transaction>(urlFetch);

  useEffect(() => {
    if (data) setLastUpdated(Date.now());
  }, [data, blockNo]);

  useEffect(() => {
    if (!hash) {
      setUrlFetch("");
    } else {
      setUrlFetch(`${API.TRANSACTION.DETAIL}/${hash}`);
    }
  }, [hash]);

  const tabs: { key: keyof Transaction; label: string; icon?: React.ReactNode }[] = [
    { key: "summary", label: t("drawer.summary"), icon: <DelegationHistoryMainIcon /> },
    { key: "utxOs", label: t("tab.utxos"), icon: <CgArrowsExchange /> },
    { key: "contracts", label: t("glossary.contracts"), icon: <FileEditIcon /> },
    { key: "collaterals", label: t("glossary.collateral"), icon: <USDIconComponent /> },
    { key: "notes", label: t("tab.notes"), icon: <DetailLinkImage src={NoteEditIcon} alt="contact" /> },
    { key: "withdrawals", label: t("tab.withdrawal"), icon: <WithdrawlIconComponent /> },
    {
      key: "delegations",
      label: t("tab.delegations"),
      icon: <DelegationIconComponent />
    },
    { key: "mints", label: t("tab.minting"), icon: <MintingIconComponent /> },
    {
      key: "poolCertificates",
      label: t("tab.poolCertificates"),
      icon: <RewardsDistributionComponent />
    },
    {
      key: "stakeCertificates",
      label: t("tab.stakeCertificates"),
      icon: <StakeCertificatesComponent />
    },
    {
      key: "protocols",
      label: t("tab.protocolUpdate"),
      icon: <ProtocolUpdateComponent />
    },
    {
      key: "instantaneousRewards",
      label: t("glossary.instantaneousRewards"),
      icon: <InstantaneousHistoryComponent />
    },
    { key: "signersInformation", label: t("tab.signersInformation"), icon: <GitCommitIcon /> },
    { key: "metadata", label: t("glossary.metadata"), icon: <MetadataIconTx /> }
  ];

  const renderContent = () => {
    if (!data || loading || !epochNo) {
      return (
        <>
          <ViewDetailHeader>
            <ViewAllButton tooltipTitle={t("common.viewDetail")} to={details.transaction(hash)} />
            <CustomTooltip title={t("common.close")}>
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
        </>
      );
    }
    const input = data.utxOs?.inputs[0]?.address || "";
    const output = data.utxOs?.outputs[0]?.address || "";
    const confirmation = Math.max(0, blockNo ? blockNo - (data.tx?.blockNo || 0) : data.tx?.confirmation);
    return (
      <>
        <ViewDetailHeader>
          <ViewAllButton tooltipTitle={t("common.viewDetail")} to={details.transaction(hash)} />
          <TimeDuration>
            <FormNowMessage time={lastUpdated} />
          </TimeDuration>
          <CustomTooltip title={t("common.close")}>
            <CloseButton onClick={handleClose}>
              <CgClose color={theme.palette.secondary.light} />
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
                  data?.tx?.epochNo === epochNo
                    ? ((data?.tx?.epochSlot || 0) / (data?.tx?.maxEpochSlot || MAX_SLOT_EPOCH)) * 100
                    : 100
                }
                trailOpacity={1}
              >
                <EpochNumber data-testid="transaction.widget.epoch">{data?.tx?.epochNo}</EpochNumber>
                <EpochText>Epoch</EpochText>
              </ProgressCircle>
            </HeaderContainer>
            <ListItem>
              <Item>
                <CustomIcon
                  icon={CubeIconComponent}
                  height={30}
                  fill={theme.isDark ? theme.palette.secondary[0] : theme.palette.common.white}
                />
                <ItemName>{t("glossary.block")}</ItemName>
                <ItemValue data-testid="transaction.widget.block">{data?.tx?.blockNo}</ItemValue>
              </Item>
              <Item>
                <CustomIcon
                  icon={RocketIcon}
                  height={30}
                  fill={theme.isDark ? theme.palette.secondary[0] : theme.palette.common.white}
                />
                <ItemName>{t("common.slot")}</ItemName>
                <ItemValue>
                  <span data-testid="transaction.widget.epochSlot">{data?.tx?.epochSlot}</span>
                  <BlockDefault>/{data?.tx?.maxEpochSlot || MAX_SLOT_EPOCH}</BlockDefault>
                </ItemValue>
              </Item>
            </ListItem>
            <Group>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.transactionHash")}</DetailLabel>
                <DetailValue>
                  <CustomTooltip title={hash} placement="top-start">
                    <StyledLink to={details.transaction(hash)} data-testid="transaction.widget.trxHash">
                      {getShortHash(hash)}
                    </StyledLink>
                  </CustomTooltip>
                  <CopyButton text={hash} />
                </DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.absoluteSlot")}</DetailLabel>
                <DetailValue data-testid="transaction.widget.slot">{data?.tx?.slotNo}</DetailValue>
              </DetailsInfoItem>
              {input && (
                <DetailsInfoItem>
                  <DetailLabel>{t("glossary.input")}</DetailLabel>
                  <DetailValue>
                    <CustomTooltip title={input} placement="top-start">
                      <StyledLink to={details.address(input)} data-testid="transaction.widget.inputAddress">
                        {getShortHash(input)}
                      </StyledLink>
                    </CustomTooltip>
                    <CopyButton text={input} />
                  </DetailValue>
                </DetailsInfoItem>
              )}
              {output && (
                <DetailsInfoItem>
                  <DetailLabel>{t("glossary.output")}</DetailLabel>
                  <DetailValue>
                    <CustomTooltip title={output} placement="top-start">
                      <StyledLink to={details.address(output)}>{getShortHash(output)}</StyledLink>
                    </CustomTooltip>
                    <CopyButton text={output} />
                  </DetailValue>
                </DetailsInfoItem>
              )}
              <DetailsInfoItem>
                <DetailLabel>{t("createdAt")}</DetailLabel>
                <DatetimeTypeTooltip>
                  <DetailValue data-testid="transaction.widget.createdAt">
                    {formatDateTimeLocal(data?.tx?.time || "")}
                  </DetailValue>
                </DatetimeTypeTooltip>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("common.status")}</DetailLabel>
                <DetailValue>
                  <TxStatus status={data?.tx?.status}>{data?.tx?.status}</TxStatus>
                </DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{confirmation > 1 ? t("glossary.comfirmations") : t("glossary.comfirmation")}</DetailLabel>
                <DetailValue>{confirmation}</DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.transactionfees")}</DetailLabel>
                <DetailValue>
                  {formatADAFull(data?.tx?.fee)}
                  <ADAicon />
                </DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.totalOutput")}</DetailLabel>
                <DetailValue>
                  {formatADAFull(data?.tx?.totalOutput)}
                  <ADAicon />
                </DetailValue>
              </DetailsInfoItem>
            </Group>
            {tabs.map(({ key, label, icon }) => {
              const value = data[key];
              if (!value) return null;
              return (
                <Group key={key}>
                  <DetailLink to={details.transaction(hash, key)} data-testid={`transaction.widget.${key}`}>
                    <DetailLabel>
                      <DetailLinkIcon>{icon}</DetailLinkIcon>
                      <DetailLinkName>
                        {label}
                        <CustomNumberBadge value={Array.isArray(value) ? value.length : null} />
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
        <ViewMoreButton to={details.transaction(hash)} data-testid="transaction.detailViewEpoch.viewDetail" />
      </>
    );
  };

  return (
    <ViewDetailDrawer anchor="right" open={Boolean(open && hash)} variant="temporary" onClose={handleClose}>
      {renderContent()}
    </ViewDetailDrawer>
  );
};

export default DetailViewTransaction;
