import { Tooltip } from "@mui/material";
import React from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { AIcon, InfoIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import { formatADA, getShortWallet } from "../../../commons/utils/helper";
import CopyButton from "../../commons/CopyButton";

import {
  BackButton,
  BackText,
  DataContainer,
  HeaderContainer,
  HeaderDetailContainer,
  HeaderTitle,
  HeaderTitleSkeleton,
  InfoTitle,
  InfoValue,
  Item,
  PoolId,
  PoolIdSkeleton,
  PoolIdValue,
  StyledImg,
  StyledLinearProgress,
} from "./styles";

interface IDelegationDetailInfo {
  data: DelegationOverview | null;
  loading: boolean;
  poolId: string;
}

const DelegationDetailInfo: React.FC<IDelegationDetailInfo> = ({ data, loading, poolId }) => {
  if (loading) {
    return (
      <HeaderDetailContainer>
        <BackButton to={"/"}>
          <HiArrowLongLeft />
          <BackText>Back</BackText>
        </BackButton>
        <HeaderContainer>
          <HeaderTitle>
            <HeaderTitleSkeleton variant="rectangular" />
          </HeaderTitle>
        </HeaderContainer>
        <PoolId>
          <PoolIdSkeleton variant="rectangular" />
        </PoolId>
      </HeaderDetailContainer>
    );
  }

  const listDetailsLeft = [
    {
      title: "Ticker",
      value: data?.tickerName || "",
    },
    {
      title: "Created date",
      value: data?.createDate || "",
    },
    {
      title: "Reward Account",
      value: data?.rewardAccount ? (
        <>
          <Tooltip placement="bottom" title={data?.rewardAccount || ""}>
            <Link to={routers.ADDRESS_DETAIL.replace(":address", `${data?.rewardAccount}`)}>
              {getShortWallet(data?.rewardAccount || "")}
            </Link>
          </Tooltip>
          <CopyButton text={data?.rewardAccount || ""} />
        </>
      ) : (
        ""
      ),
    },
    {
      title: "Owner Account",
      value: data?.ownerAccount ? (
        <>
          <Tooltip placement="bottom" title={data?.ownerAccount || ""}>
            <Link to={routers.ADDRESS_DETAIL.replace(":address", `${data?.ownerAccount}`)}>
              {getShortWallet(data?.ownerAccount || "")}
            </Link>
          </Tooltip>
          <CopyButton text={data?.ownerAccount || ""} />
        </>
      ) : (
        ""
      ),
    },
    {
      title: "Delegators",
      value: data?.delegators,
    },
  ];
  const listDetailsRight = [
    {
      title: "Pool size",
      value: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px " }}>
          {formatADA(data?.poolSize)}
          <img src={AIcon} alt={"ADA Icon"} />
        </div>
      ),
    },
    {
      title: "Stake limit",
      value: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px " }}>
          {formatADA(data?.stakeLimit)}
          <img src={AIcon} alt={"ADA Icon"} />
        </div>
      ),
    },
    {
      title: "Saturation",
      value: data?.saturation,
    },
    {
      value: <StyledLinearProgress variant="determinate" value={data?.saturation} />,
    },
  ];

  return (
    <HeaderDetailContainer>
      <BackButton to={routers.DELEGATION_POOLS}>
        <HiArrowLongLeft />
        <BackText>Back</BackText>
      </BackButton>
      <HeaderContainer>
        <HeaderTitle>{data?.poolName || poolId}</HeaderTitle>
      </HeaderContainer>
      <PoolId>
        <Tooltip title={poolId} placement="top">
          <Link to={routers.DELEGATION_POOL_DETAIL.replace(":poolId", `${poolId}`)}>
            <small>Pool Id: </small>
            <PoolIdValue>{poolId}</PoolIdValue>
          </Link>
        </Tooltip>
        <CopyButton text={poolId} />
      </PoolId>
      <DataContainer>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {listDetailsLeft.map((item, index) => (
            <Item key={index}>
              {item.title ? (
                <>
                  <StyledImg src={InfoIcon} alt="info" />
                  <InfoTitle>{item.title}:</InfoTitle>
                  <InfoValue>{item.value}</InfoValue>
                </>
              ) : (
                item.value
              )}
            </Item>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {listDetailsRight.map((item, index) => (
            <Item key={index}>
              {item.title ? (
                <>
                  <StyledImg src={InfoIcon} alt="info" />
                  <InfoTitle>{item.title}:</InfoTitle>
                  <InfoValue>{item.value}</InfoValue>
                </>
              ) : (
                item.value
              )}
            </Item>
          ))}
        </div>
      </DataContainer>
    </HeaderDetailContainer>
  );
};

export default DelegationDetailInfo;
