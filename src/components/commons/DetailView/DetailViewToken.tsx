import React, { useEffect, useState } from "react";
import { CgArrowsExchange, CgClose } from "react-icons/cg";
import { PolicyWhiteIcon } from "../../../commons/resources";
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
  StyledLink,
  DetailLinkName,
  TokenContainer,
  TokenTitle,
  TokenHeaderContainer,
  TokenTitleIcon,
  TokenMetaData,
  TokenInfo,
  TokenName,
  TokenIcon,
  MetaData,
  TokenHeaderInfo,
  TokenTotalSupply,
  TokenInfoLabel,
  TokenInfoValue,
  TokenDecimal,
  TokenDetailInfo,
  TokenDetailName,
  TokenDetailIcon,
  TokenHeader,
  ViewDetailScroll,
  StyledViewMore,
} from "./styles";
import useFetch from "../../../commons/hooks/useFetch";
import { BiChevronRight } from "react-icons/bi";
import { details } from "../../../commons/routers";
import { formatCurrency, getShortWallet } from "../../../commons/utils/helper";
import axios from "axios";
import moment from "moment";
import ViewMoreButton from "../ViewMoreButton";
import CustomTooltip from "../CustomTooltip";
import CopyButton from "../CopyButton";

type DetailViewTokenProps = {
  tokenId: string;
  handleClose: () => void;
};

const DetailViewToken: React.FC<DetailViewTokenProps> = props => {
  const { tokenId, handleClose } = props;
  const { data } = useFetch<IToken>(tokenId ? `tokens/${tokenId}` : ``);
  const [tokenMetadata, setTokenMetadata] = useState<ITokenMetadata>({});

  useEffect(() => {
    async function loadMetadata() {
      if (data) {
        try {
          const {
            data: { subjects },
          } = await axios.post("/metadata/query", {
            subjects: [`${data.policy}${data.name}`],
            properties: ["policy", "logo", "decimals"],
          });

          if (subjects.length !== 0) {
            setTokenMetadata({
              policy: subjects[0]?.policy,
              logo: subjects[0]?.logo.value,
              decimals: subjects[0]?.decimals.value,
            });
          }
        } catch (err) {}
      }
      return true;
    }
    loadMetadata();
  }, [data]);

  if (!data)
    return (
      <ViewDetailDrawer anchor="right" open={!!tokenId} hideBackdrop variant="permanent">
        <ViewDetailContainer>
          <ViewDetailScroll>
            <StyledViewMore tooltipTitle="View Detail" to={details.token(tokenId)} />
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
        <ViewMoreButton to={details.token(tokenId)} />
      </ViewDetailDrawer>
    );

  return (
    <ViewDetailDrawer anchor="right" open={!!tokenId} hideBackdrop variant="permanent">
      <ViewDetailContainer>
        <ViewDetailScroll>
          <StyledViewMore tooltipTitle="View Detail" to={details.token(tokenId)} />
          <CustomTooltip placement="top" title="Close">
            <CloseButton onClick={handleClose}>
              <CgClose />
            </CloseButton>
          </CustomTooltip>
          <TokenContainer>
            <TokenHeaderContainer>
              <TokenHeader>
                <TokenTitleIcon src={PolicyWhiteIcon} alt="policy" />
                <TokenTitle>Policy Script</TokenTitle>
              </TokenHeader>
            </TokenHeaderContainer>
            {data.displayName || tokenMetadata.logo ? (
              <TokenMetaData>
                <TokenInfo>
                  <TokenName>
                    {data.displayName && data.displayName.length > 25 ? (
                      <CustomTooltip title={data.displayName} placement="top">
                        <div>{getShortWallet(data.displayName)}</div>
                      </CustomTooltip>
                    ) : (
                      data.displayName
                    )}
                  </TokenName>
                  {tokenMetadata.logo ? (
                    <TokenIcon src={tokenMetadata.logo} alt="token logo" />
                  ) : (
                    <IconSkeleton variant="circular" />
                  )}
                </TokenInfo>
                <MetaData>{""}</MetaData>
              </TokenMetaData>
            ) : (
              ""
            )}
            <TokenHeaderInfo>
              <TokenTotalSupply>
                <TokenInfoLabel>Total Supply</TokenInfoLabel>
                <TokenInfoValue>{formatCurrency(data.supply || 0)}</TokenInfoValue>
              </TokenTotalSupply>
              <TokenDecimal>
                <TokenInfoLabel>Decimal</TokenInfoLabel>
                {tokenMetadata.decimals ? (
                  <TokenInfoValue>{tokenMetadata.decimals}</TokenInfoValue>
                ) : (
                  <DetailValueSkeleton variant="rectangular" />
                )}
              </TokenDecimal>
            </TokenHeaderInfo>
          </TokenContainer>
          <Group>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Token ID
              </DetailLabel>
              <DetailValue>
                <CustomTooltip placement="top" title={tokenId}>
                  <StyledLink to={details.token(tokenId)}>{getShortWallet(tokenId || "")}</StyledLink>
                </CustomTooltip>
                <CopyButton text={tokenId} />
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Asset name
              </DetailLabel>
              <DetailValue>
                <TokenDetailInfo>
                  <TokenDetailName>
                    {data.displayName && data.displayName.length > 20 ? (
                      <CustomTooltip title={data.displayName} placement="top">
                        <div>{getShortWallet(data.displayName)}</div>
                      </CustomTooltip>
                    ) : (
                      data.displayName
                    )}
                  </TokenDetailName>
                  {tokenMetadata.logo ? (
                    <TokenDetailIcon src={tokenMetadata.logo} alt="token logo" />
                  ) : (
                    <IconSkeleton variant="circular" />
                  )}
                </TokenDetailInfo>
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Transactions
              </DetailLabel>
              <DetailValue>{data.txCount}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>
                <InfoIcon />
                Created
              </DetailLabel>
              <DetailValue>{moment(data.createdOn).format("MM/DD/YYYY HH:mm:ss")}</DetailValue>
            </DetailsInfoItem>
          </Group>
          <Group>
            <DetailLink to={details.token(tokenId)}>
              <DetailLabel>
                <DetailLinkIcon>
                  <CgArrowsExchange />
                </DetailLinkIcon>
                <DetailLinkName>Transactions</DetailLinkName>
              </DetailLabel>
              <DetailValue>
                <DetailLinkRight>
                  <BiChevronRight size={24} />
                </DetailLinkRight>
              </DetailValue>
            </DetailLink>
          </Group>
        </ViewDetailScroll>
      </ViewDetailContainer>
      <ViewMoreButton to={details.token(tokenId)} />
    </ViewDetailDrawer>
  );
};

export default DetailViewToken;
