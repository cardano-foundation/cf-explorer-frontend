import { Box, Modal, Skeleton } from "@mui/material";
import { HiArrowLongLeft } from "react-icons/hi2";

import { details, routers } from "../../commons/routers";
import delegatedIcon from "../../../commons/resources/icons/delegated.svg";
import totalStakeIcon from "../../../commons/resources/icons/totalStake.svg";
import rewardIcon from "../../../commons/resources/icons/reward.svg";
import rewardWithdrawIcon from "../../../commons/resources/icons/rewardWithdraw.svg";
import infoIcon from "../../../commons/resources/icons/info.svg";
import policyIcon from "../../../commons/resources/icons/policyIcon.svg";
import timeIcon from "../../../commons/resources/icons/time.svg";
import closeIcon from "../../../commons/resources/icons/closeIcon.svg";

import { formatADA, getShortHash, getShortWallet, numberWithCommas } from "../../commons/utils/helper";

import CopyButton from "../commons/CopyButton";

import {
  BackButton,
  BackText,
  ButtonClose,
  ButtonView,
  CardInfoOverview,
  CardItem,
  HeaderContainer,
  HeaderTitle,
  LabelStatus,
  LinkComponent,
  ModalContainer,
  SlotLeader,
  SlotLeaderContainer,
  SlotLeaderSkeleton,
  TitleCard,
  ValueCard,
  ViewJson,
} from "./styles";
import useFetch from "../../commons/hooks/useFetch";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { parse, stringify } from "qs";
import useFetchList from "../../commons/hooks/useFetchList";
import Table, { Column } from "../commons/Table";
import moment from "moment";
import Card from "../commons/Card";

const PolicyOverview = () => {
  const { policyId } = useParams<{ policyId: string }>();
  const history = useHistory();
  const { search } = useLocation();
  const query = parse(search.split("?")[1]);
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };
  const { data, initialized, loading, total, currentPage } = useFetchList<PolicyHolder>(`/policy/${policyId}/holders`, {
    page: query.page ? +query.page - 1 : 0,
    size: query.size ? (query.size as string) : 10,
  });

  const columns: Column<PolicyHolder>[] = [
    {
      title: "Address",
      key: "address",
      minWidth: "50px",
      render: r => <LinkComponent to={details.address(r.address)}>{getShortWallet(r.address || "")}</LinkComponent>,
    },
    {
      title: "Token name",
      key: "id",
      minWidth: "100px",
      render: r => <LinkComponent to={details.token(r.fingerprint)}>{r.tokenName || ""}</LinkComponent>,
    },
    {
      title: "Token id",
      key: "id",
      minWidth: "100px",
      render: r => <LinkComponent to={details.token(r.fingerprint)}>{getShortHash(r.fingerprint || "")}</LinkComponent>,
    },
    {
      title: "Balance",
      key: "Balance",
      minWidth: "150px",
      render: r => <>{formatADA(r?.quantity ?? "")}</>,
    },
  ];

  return (
    <Box>
      <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
        <Box>
          <BackButton onClick={() => history.goBack()}>
            <HiArrowLongLeft />
            <BackText>Back</BackText>
          </BackButton>
          <HeaderContainer>
            <HeaderTitle>Policy Asset Holders</HeaderTitle>
          </HeaderContainer>
          <SlotLeaderContainer>
            <Box>
              <SlotLeader>
                <Box fontWeight={400} color={"#344054"}>
                  Policy Id:{" "}
                </Box>{" "}
                <Box ml={2}>{policyId}</Box> <CopyButton text={policyId} />
              </SlotLeader>
            </Box>
          </SlotLeaderContainer>
        </Box>
      </Box>

      <Table
        columns={columns}
        data={data || []}
        loading={loading}
        initialized={initialized}
        total={{ count: total, title: "Total" }}
        pagination={{
          onChange: (page, size) => {
            setQuery({ page, size });
          },
          page: currentPage || 0,
          total: total,
        }}
      />
    </Box>
  );
};

export default PolicyOverview;
