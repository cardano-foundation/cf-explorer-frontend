import React from "react";
import { CgArrowsExchange, CgClose } from "react-icons/cg";
import { MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
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
  DetailCopy,
  TxStatus,
  ConfirmStatus,
  DetailLinkName,
  DetailLinkImage,
} from "./styles";
import { ADAToken } from "../Token";
import NotFound from "../../../pages/NotFound";
import useFetch from "../../../commons/hooks/useFetch";
import { TbFileCheck } from "react-icons/tb";
import { BiChevronRight } from "react-icons/bi";
import { routers } from "../../../commons/routers";
import { getShortHash } from "../../../commons/utils/helper";

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
  const { loading, data } = useFetch<Transaction>(hash ? `tx/${hash}` : ``);

  if (!loading && !data) return <NotFound />;

  if (!data || loading)
    return (
      <ViewDetailDrawer anchor="right" open={!!hash} hideBackdrop variant="permanent">
        <ViewDetailContainer>
          <CloseButton onClick={handleClose}>
            <CgClose />
          </CloseButton>
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
                    <InfoIcon />
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
                    <InfoIcon />
                    <DetailValueSkeleton variant="rectangular" />
                  </DetailLabel>
                  <DetailValue>
                    <DetailLabelSkeleton variant="rectangular" />
                  </DetailValue>
                </DetailsInfoItem>
              </Group>
            );
          })}
        </ViewDetailContainer>
      </ViewDetailDrawer>
    );

  return (
    <ViewDetailDrawer anchor="right" open={!!hash} hideBackdrop variant="permanent">
      <ViewDetailContainer>
        <CloseButton onClick={handleClose}>
          <CgClose />
        </CloseButton>
        <HeaderContainer>
          <ProgressCircle
            size={150}
            pathLineCap="butt"
            pathWidth={4}
            trailWidth={2}
            percent={((data?.tx.epochSlot || 0) / (data.tx.maxEpochSlot || MAX_SLOT_EPOCH)) * 100}
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
              <StyledLink to={routers.TRANSACTION_DETAIL.replace(":trxHash", `${data.tx.hash}`)}>
                {getShortHash(data.tx.hash)}
              </StyledLink>
              <DetailCopy text={data.tx.hash} />
            </DetailValue>
          </DetailsInfoItem>
          <DetailsInfoItem>
            <DetailLabel>
              <InfoIcon />
              Time
            </DetailLabel>
            <DetailValue>{data.tx.time}</DetailValue>
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
              <ConfirmStatus status={"MEDIUM"}>{"MEDIUM"}</ConfirmStatus>
            </DetailValue>
          </DetailsInfoItem>
          <DetailsInfoItem>
            <DetailLabel>
              <InfoIcon />
              Transaction Fees
            </DetailLabel>
            <DetailValue>
              {`${data.tx.fee} ${"ADA"}`}
              <ADAToken color="black" size={"var(--font-size-text-x-small)"} />
            </DetailValue>
          </DetailsInfoItem>
          <DetailsInfoItem>
            <DetailLabel>
              <InfoIcon />
              Total Output
            </DetailLabel>
            <DetailValue>
              {`${data.tx.totalOutput} ${"ADA"}`}
              <ADAToken color="black" size={"var(--font-size-text-x-small)"} />
            </DetailValue>
          </DetailsInfoItem>
        </Group>
        {tabs.map(({ key, label, icon }) => {
          const value = data[key];
          if (!value) return null;
          return (
            <Group key={key}>
              <DetailLink to={routers.TRANSACTION_DETAIL.replace(":trxHash", `${data.tx.hash}`)}>
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
      </ViewDetailContainer>
    </ViewDetailDrawer>
  );
};

export default DetailViewTransaction;
