import React from "react";
import { getShortHash } from "../../../commons/utils/helper";
import Card from "../../commons/Card";
import CopyButton from "../../commons/CopyButton";
import CustomTooltip from "../../commons/CustomTooltip";
import DetailCard from "../../commons/DetailCard";

import { Active, Deactive, Flex, StyledLink, Title } from "./styles";

interface IStakeOverview {
  data: IStakeKeyDetail | null;
  loading: boolean;
}

const StakeOverview: React.FC<IStakeOverview> = ({ data, loading }) => {
  const listDetails = [
    {
      title: "Hash",
      value: (
        <Flex>
          <CustomTooltip title={`${data?.stakeAddress || ""}`} placement="top">
            <StyledLink style={{marginRight: "12.25px"}}>{getShortHash(data?.stakeAddress || "")}</StyledLink>
          </CustomTooltip>
          <CopyButton text={`${data?.stakeAddress || ""}`} />
        </Flex>
      ),
    },
    {
      title: "Total Stake",
      value: "",
    },
    {
      title: "Reward available",
      value: "",
    },
    {
      title: "Reward withdrawn",
      value: "",
    },
    {
      title: "Delegated to",
      value: "",
    },
  ];

  return (
    <Card
      title={
        <Title>
          Stake Key Details
          {data?.status === "ACTIVE" ? <Active>Active</Active> : <Deactive>Deactive</Deactive>}
        </Title>
      }
    >
      <DetailCard loading={loading} listDetails={listDetails} joinCard />
    </Card>
  );
};

export default StakeOverview;
