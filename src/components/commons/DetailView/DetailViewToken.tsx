import React from 'react';
import { CgClose } from 'react-icons/cg';
import { PolicyWhiteIcon } from '../../../commons/resources';
import {
  CloseButton,
  ViewDetailContainer,
  DetailsInfoItem,
  DetailLabel,
  DetailValue,
  DetailLabelSkeleton,
  DetailValueSkeleton,
  IconSkeleton,
  ViewDetailDrawer,
  Group,
  DetailLink,
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
  ViewDetailHeader
} from './styles';
import { BiChevronRight } from 'react-icons/bi';
import { details } from '../../../commons/routers';
import { formatDateTimeLocal, getShortWallet, numberWithCommas } from '../../../commons/utils/helper';
import ViewMoreButton from '../ViewMoreButton';
import CustomTooltip from '../CustomTooltip';
import CopyButton from '../CopyButton';
import { Box } from '@mui/material';
import ViewAllButton from '../ViewAllButton';

type DetailViewTokenProps = {
  token: IToken | null;
  tokenId: string;
  handleClose: () => void;
};

const DetailViewToken: React.FC<DetailViewTokenProps> = (props) => {
  const { token: data, handleClose, tokenId } = props;

  if (!data)
    return (
      <ViewDetailDrawer anchor='right' open={!!tokenId} hideBackdrop variant='permanent'>
        <ViewDetailHeader>
          <ViewAllButton tooltipTitle='View Detail' to={details.token(tokenId)} />
          <CustomTooltip title='Close'>
            <CloseButton onClick={handleClose}>
              <CgClose />
            </CloseButton>
          </CustomTooltip>
        </ViewDetailHeader>
        <ViewDetailContainer>
          <ViewDetailScroll>
            <TokenContainer>
              <TokenHeaderContainer>
                <IconSkeleton variant='circular' />
                <DetailValueSkeleton variant='rectangular' />
              </TokenHeaderContainer>
              <TokenMetaData>
                <TokenInfo>
                  <DetailValueSkeleton variant='rectangular' />
                  <IconSkeleton variant='circular' />
                </TokenInfo>
                <MetaData />
              </TokenMetaData>
              <TokenHeaderInfo>
                <TokenTotalSupply>
                  <DetailValueSkeleton variant='rectangular' />
                  <DetailValueSkeleton variant='rectangular' />
                </TokenTotalSupply>
                <TokenDecimal>
                  <DetailValueSkeleton variant='rectangular' />
                  <DetailValueSkeleton variant='rectangular' />
                </TokenDecimal>
              </TokenHeaderInfo>
            </TokenContainer>
            <Group>
              {new Array(4).fill(0).map((_, index) => {
                return (
                  <DetailsInfoItem key={index}>
                    <DetailLabel>
                      <DetailValueSkeleton variant='rectangular' />
                    </DetailLabel>
                    <DetailValue>
                      <DetailLabelSkeleton variant='rectangular' />
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
                      <DetailValueSkeleton variant='rectangular' />
                    </DetailLabel>
                    <DetailValue>
                      <DetailLabelSkeleton variant='rectangular' />
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
    <ViewDetailDrawer anchor='right' open={!!tokenId} hideBackdrop variant='permanent'>
      <ViewDetailHeader>
        <ViewAllButton tooltipTitle='View Detail' to={details.token(tokenId)} />
        <CustomTooltip title='Close'>
          <CloseButton onClick={handleClose}>
            <CgClose />
          </CloseButton>
        </CustomTooltip>
      </ViewDetailHeader>
      <ViewDetailContainer>
        <ViewDetailScroll>
          <TokenContainer>
            <TokenHeaderContainer>
              <TokenHeader>
                <TokenTitleIcon src={PolicyWhiteIcon} alt='policy' />
                <TokenTitle>Policy Script</TokenTitle>
              </TokenHeader>
            </TokenHeaderContainer>
            {data.displayName || data?.metadata?.logo ? (
              <TokenMetaData>
                <TokenInfo>
                  <TokenName>
                    {data.displayName && data.displayName.length > 25 ? (
                      <CustomTooltip title={data.displayName}>
                        <div>{getShortWallet(data.displayName)}</div>
                      </CustomTooltip>
                    ) : (
                      data.displayName
                    )}
                  </TokenName>
                  {data?.metadata?.logo ? (
                    <TokenIcon src={`data:/image/png;base64,${data.metadata?.logo}`} alt='token logo' />
                  ) : (
                    ''
                  )}
                </TokenInfo>
                <Box pb={2}>
                  <MetaData>{data?.metadata?.description || ''}</MetaData>
                </Box>
              </TokenMetaData>
            ) : (
              ''
            )}
            <TokenHeaderInfo>
              <TokenTotalSupply>
                <TokenInfoLabel>Total Supply</TokenInfoLabel>
                <TokenInfoValue>{numberWithCommas(data.supply)}</TokenInfoValue>
              </TokenTotalSupply>
              <TokenDecimal>
                <TokenInfoLabel>Decimal</TokenInfoLabel>
                <TokenInfoValue>{data?.metadata?.decimals || 0}</TokenInfoValue>
              </TokenDecimal>
            </TokenHeaderInfo>
          </TokenContainer>
          <Group>
            <DetailsInfoItem>
              <DetailLabel>Token ID</DetailLabel>
              <DetailValue>
                <CustomTooltip title={tokenId}>
                  <StyledLink to={details.token(tokenId)}>{getShortWallet(tokenId || '')}</StyledLink>
                </CustomTooltip>
                <CopyButton text={tokenId} />
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Asset name</DetailLabel>
              <DetailValue>
                <TokenDetailInfo>
                  <TokenDetailName>
                    {data.displayName && data.displayName.length > 20 ? (
                      <CustomTooltip title={data.displayName}>
                        <div>{getShortWallet(data.displayName)}</div>
                      </CustomTooltip>
                    ) : (
                      data.displayName
                    )}
                  </TokenDetailName>
                  {data.metadata?.logo ? (
                    <TokenDetailIcon src={`data:/image/png;base64,${data.metadata?.logo}`} alt='token logo' />
                  ) : (
                    ''
                  )}
                </TokenDetailInfo>
              </DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Total Transactions</DetailLabel>
              <DetailValue>{data.txCount}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Number of Holders</DetailLabel>
              <DetailValue>{numberWithCommas(data.numberOfHolders || 0)}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Total Volume</DetailLabel>
              <DetailValue>{numberWithCommas(data.totalVolume || 0)}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Volume 24H</DetailLabel>
              <DetailValue>{numberWithCommas(data.volumeIn24h || 0)}</DetailValue>
            </DetailsInfoItem>
            <DetailsInfoItem>
              <DetailLabel>Created</DetailLabel>
              <DetailValue>{formatDateTimeLocal(data.createdOn || '')}</DetailValue>
            </DetailsInfoItem>
          </Group>
          <Group>
            <DetailLink to={details.token(tokenId)}>
              <DetailLabel>
                {/* <DetailLinkIcon>
                  <CgArrowsExchange />
                </DetailLinkIcon> */}
                <DetailLinkName>Transactions</DetailLinkName>
              </DetailLabel>
              <DetailValue>
                <DetailLinkRight>
                  <BiChevronRight size={24} />
                </DetailLinkRight>
              </DetailValue>
            </DetailLink>{' '}
          </Group>
          <Group>
            <DetailLink to={details.token(tokenId, 'topHolders')}>
              <DetailLabel>
                {/* <DetailLinkIcon>
                  <CgArrowsExchange />
                </DetailLinkIcon> */}
                <DetailLinkName>Top Holders</DetailLinkName>
              </DetailLabel>
              <DetailValue>
                <DetailLinkRight>
                  <BiChevronRight size={24} />
                </DetailLinkRight>
              </DetailValue>
            </DetailLink>
          </Group>
          <Group>
            <DetailLink to={details.token(tokenId, 'tokenMint')}>
              <DetailLabel>
                {/* <DetailLinkIcon>
                  <CgArrowsExchange />
                </DetailLinkIcon> */}
                <DetailLinkName>Token Mint</DetailLinkName>
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
