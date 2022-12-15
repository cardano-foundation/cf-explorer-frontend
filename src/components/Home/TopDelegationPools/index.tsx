import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import useFetch from "../../../commons/hooks/useFetch";
import { DownRedIcon, UpGreenIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import { formatPrice } from "../../../commons/utils/helper";
import { Column } from "../../commons/Table";
import {
  DelegateTable,
  Header,
  ImageRate,
  PoolName,
  PriceRate,
  PriceValue,
  ProgressContainer,
  ProgressTitle,
  SeemoreButton,
  SeemoreText,
  StyledLinearProgress,
  Title,
  TopDelegateContainer,
} from "./style";

interface Props {}

const ABBREVIATIONS = ["", "k", "m", "b", "t", "q", "Q", "s", "S"];

const TopDelegationPools: React.FC<Props> = () => {
  const { data, loading, initialized } = useFetch<DelegationPool[]>(`delegation/top?page=1&size=4`);
  const history = useHistory();
  data?.forEach(item => {
    if (!item.poolSize) {
      item.poolSize = Math.floor(Math.random() * 10 ** 13);
      item.feePercent = Number((Math.floor(Math.random() * 2 * 10) / 10).toFixed(1)) + 1;
      item.feeAmount = (item.poolSize * item.feePercent) / 100;
      item.reward = Math.floor((Math.random() * 20 * 100) / 100) + 10;
      item.saturation = Math.floor(Math.random() * 60) + 30;
    }
  });
  const columns: Column<DelegationPool>[] = [
    {
      title: "Pool",
      key: "name",
      render: r => <PoolName to={`/delegation-pool/${r.poolId}`}>{r.poolName || r.poolId}</PoolName>,
    },
    {
      title: "Pool size (A)",
      key: "size",
      render: r => formatPrice(r.poolSize / 10 ** 6, ABBREVIATIONS),
    },
    {
      title: "Reward",
      key: "reward",
      render: r => (
        <PriceRate>
          <ImageRate up={r.reward >= 0} src={r.reward >= 0 ? UpGreenIcon : DownRedIcon} alt="price rate" />
          <PriceValue up={r.reward >= 0}>
            {r.reward >= 0 ? "+" : ""}
            {r.reward?.toString().replace(".", ",") || 0} %
          </PriceValue>
        </PriceRate>
      ),
    },
    {
      title: "Fee (A)",
      key: "fee",
      render: r => `${r.feePercent || 0}% (${formatPrice(r.feeAmount / 10 ** 6, ABBREVIATIONS)} A)`,
    },
    {
      title: "Declared Pledge (A)",
      key: "declaredPledge",
      render: r => formatPrice(r.pledge / 10 ** 6, ABBREVIATIONS),
    },
    {
      title: "Saturation",
      key: "output",
      render: r => (
        <ProgressContainer>
          <ProgressTitle>{r.saturation}%</ProgressTitle>
          <StyledLinearProgress variant="determinate" value={r.saturation} style={{ width: 150 }} />
        </ProgressContainer>
      ),
    },
    // {
    //   title: "",
    //   key: "action",
    //   render: r => (
    //     <DetailButton to={routers.DELEGATION_POOL_DETAIL.replace(":poolId", `${r.poolId}`)}>
    //       <small>Detail</small>
    //     </DetailButton>
    //   ),
    // },
  ];
  return (
    <TopDelegateContainer>
      <Header>
        <Title>Top Delegation Pools</Title>
        <SeemoreButton to={routers.DELEGATION_POOLS}>
          <SeemoreText>View All</SeemoreText> <FaAngleDoubleRight size={12} />
        </SeemoreButton>
      </Header>
      <DelegateTable
        loading={loading}
        initialized={initialized}
        columns={columns}
        data={data || []}
        onClickRow={(_, r: DelegationPool) =>
          history.push(routers.DELEGATION_POOL_DETAIL.replace(":poolId", `${r.poolId}`))
        }
      />
      <SeemoreButton to={routers.DELEGATION_POOLS} mobile>
        <SeemoreText>See All</SeemoreText>
      </SeemoreButton>
    </TopDelegateContainer>
  );
};

export default TopDelegationPools;
