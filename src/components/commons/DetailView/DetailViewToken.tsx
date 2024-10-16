import React from "react";
import { useTranslation } from "react-i18next";
import { BiChevronRight } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { useTheme } from "@mui/material";

import { MetadataIcon, PeopleIcon, TransactionIcon, UnionTokenIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import {
  formatDateTimeLocal,
  formatNumberDivByDecimals,
  getShortHash,
  numberWithCommas
} from "src/commons/utils/helper";

import CopyButton from "../CopyButton";
import CustomTooltip from "../CustomTooltip";
import ViewAllButton from "../ViewAllButton";
import ViewMoreButton from "../ViewMoreButton";
import {
  CloseButton,
  DetailLabel,
  DetailLabelSkeleton,
  DetailLink,
  DetailLinkIcon,
  DetailLinkName,
  DetailLinkRight,
  DetailValue,
  DetailValueSkeleton,
  DetailsInfoItem,
  Group,
  IconSkeleton,
  MetaData,
  StyledLink,
  TokenContainer,
  TokenDecimal,
  TokenDetailIcon,
  TokenDetailInfo,
  TokenDetailName,
  TokenHeaderContainer,
  TokenHeaderInfo,
  TokenInfo,
  TokenMetaData,
  TokenTotalSupply,
  ViewDetailContainer,
  ViewDetailDrawer,
  ViewDetailHeader,
  ViewDetailScroll
} from "./styles";
import DatetimeTypeTooltip from "../DatetimeTypeTooltip";

type DetailViewTokenProps = {
  token: IToken | null;
  tokenId: string;
  handleClose: () => void;
  open?: boolean;
};

const DetailViewToken: React.FC<DetailViewTokenProps> = (props) => {
  const { t } = useTranslation();
  const { token: data, handleClose, tokenId, open } = props;
  const theme = useTheme();
  const renderContent = () => {
    if (!data) {
      return (
        <>
          <ViewDetailHeader>
            <ViewAllButton tooltipTitle={t("common.viewDetail")} to={details.token(tokenId)} />
            <CustomTooltip title={t("common.close")}>
              <CloseButton onClick={handleClose}>
                <CgClose />
              </CloseButton>
            </CustomTooltip>
          </ViewDetailHeader>
          <ViewDetailContainer>
            <ViewDetailScroll>
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
          <ViewMoreButton to={details.token(tokenId)} />
        </>
      );
    }
    return (
      <>
        <ViewDetailHeader>
          <ViewAllButton tooltipTitle={t("common.viewDetail")} to={details.token(tokenId)} />
          <CustomTooltip title={t("common.close")}>
            <CloseButton onClick={handleClose}>
              <CgClose color={theme.palette.secondary.light} />
            </CloseButton>
          </CustomTooltip>
        </ViewDetailHeader>
        <ViewDetailContainer>
          <ViewDetailScroll>
            <Group>
              <DetailsInfoItem>
                <DetailLabel>{t("common.scriptHash")}</DetailLabel>
                <DetailValue>
                  <CustomTooltip title={data.policy}>
                    <StyledLink
                      data-testid="token.widget.scriptHash"
                      to={
                        data.policyIsNativeScript
                          ? details.nativeScriptDetail(data.policy)
                          : details.smartContract(data.policy)
                      }
                    >
                      {getShortHash(data.policy || "")}
                    </StyledLink>
                  </CustomTooltip>
                  <CopyButton text={data.policy} />
                </DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("common.tokenID")}</DetailLabel>
                <DetailValue>
                  <CustomTooltip title={tokenId}>
                    <StyledLink to={details.token(tokenId)} data-testid="token.widget.tokenId">
                      {getShortHash(tokenId || "")}
                    </StyledLink>
                  </CustomTooltip>
                  <CopyButton text={tokenId} />
                </DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.assetName")}</DetailLabel>
                <DetailValue>
                  <TokenDetailInfo>
                    <TokenDetailName>
                      {data.displayName && data.displayName.length > 20 ? (
                        <CustomTooltip title={data.displayName}>
                          <div>{getShortHash(data.displayName)}</div>
                        </CustomTooltip>
                      ) : data.displayName ? (
                        <div data-testid="token.widget.assetName">{data.displayName}</div>
                      ) : (
                        <CustomTooltip title={data.fingerprint || ""}>
                          <div>{getShortHash(data.fingerprint || "")}</div>
                        </CustomTooltip>
                      )}
                    </TokenDetailName>
                    {data.metadata?.logo ? <TokenDetailIcon src={`${data.metadata?.logo}`} alt="token logo" /> : ""}
                  </TokenDetailInfo>
                </DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("common.totalTxs")}</DetailLabel>
                <DetailValue>{data.txCount}</DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.numberOfHolders")}</DetailLabel>
                <DetailValue>{numberWithCommas(data.numberOfHolders || 0)}</DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.totalVolumn")}</DetailLabel>
                <DetailValue>
                  {formatNumberDivByDecimals(data.totalVolume || 0, data?.metadata?.decimals || 0)}
                </DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("glossary.volume24h")}</DetailLabel>
                <DetailValue>
                  {formatNumberDivByDecimals(data.volumeIn24h || 0, data?.metadata?.decimals || 0)}
                </DetailValue>
              </DetailsInfoItem>
              <DetailsInfoItem>
                <DetailLabel>{t("createdAt")}</DetailLabel>
                <DatetimeTypeTooltip>
                  <DetailValue>{formatDateTimeLocal(data.createdOn || "")}</DetailValue>
                </DatetimeTypeTooltip>
              </DetailsInfoItem>
            </Group>
            <Group>
              <DetailLink data-testid="token.widget.transactions" to={details.token(tokenId)}>
                <DetailLabel>
                  <DetailLinkIcon>
                    <TransactionIcon />
                  </DetailLinkIcon>
                  <DetailLinkName>{t("drawer.transactions")}</DetailLinkName>
                </DetailLabel>
                <DetailValue>
                  <DetailLinkRight>
                    <BiChevronRight size={24} />
                  </DetailLinkRight>
                </DetailValue>
              </DetailLink>{" "}
            </Group>
            <Group>
              <DetailLink to={details.token(tokenId, "topHolders")}>
                <DetailLabel>
                  <DetailLinkIcon>
                    <PeopleIcon />
                  </DetailLinkIcon>
                  <DetailLinkName>{t("glossary.topHolders")}</DetailLinkName>
                </DetailLabel>
                <DetailValue>
                  <DetailLinkRight>
                    <BiChevronRight size={24} />
                  </DetailLinkRight>
                </DetailValue>
              </DetailLink>
            </Group>
            <Group>
              <DetailLink to={details.token(tokenId, "tokenMint")}>
                <DetailLabel>
                  <DetailLinkIcon>
                    <UnionTokenIcon />
                  </DetailLinkIcon>
                  <DetailLinkName>{t("glossary.tokentMint")}</DetailLinkName>
                </DetailLabel>
                <DetailValue>
                  <DetailLinkRight>
                    <BiChevronRight size={24} />
                  </DetailLinkRight>
                </DetailValue>
              </DetailLink>
            </Group>
            <Group>
              <DetailLink to={details.token(tokenId, "metadata")}>
                <DetailLabel>
                  <DetailLinkIcon>
                    <MetadataIcon />
                  </DetailLinkIcon>
                  <DetailLinkName>{t("glossary.metadata")}</DetailLinkName>
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
        <ViewMoreButton
          to={details.token(tokenId)}
          data-testid="token.widget.viewDetail"
          data-policyName={`${data?.policy}${data?.name}`}
        />
        <div data-testid="token.widget.policyName" data-policyName={`${data?.policy}${data?.name}`}></div>
      </>
    );
  };
  return (
    <ViewDetailDrawer anchor="right" open={Boolean(open && tokenId)} variant="temporary" onClose={handleClose}>
      {renderContent()}
    </ViewDetailDrawer>
  );
};

export default DetailViewToken;
