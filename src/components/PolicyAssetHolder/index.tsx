import { Box } from "@mui/material";
import { HiArrowLongLeft } from "react-icons/hi2";

import { details } from "../../commons/routers";

import { formatADA, getPageInfo, getShortHash, getShortWallet } from "../../commons/utils/helper";

import CopyButton from "../commons/CopyButton";

import {
  BackButton,
  BackText,
  HeaderContainer,
  HeaderTitle,
  LinkComponent,
  SlotLeader,
  SlotLeaderContainer,
} from "./styles";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { stringify } from "qs";
import useFetchList from "../../commons/hooks/useFetchList";
import Table, { Column } from "../commons/Table";

const PolicyOverview = () => {
  const { policyId } = useParams<{ policyId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<PolicyHolder>(`/policy/${policyId}/holders`, pageInfo);

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
        {...fetchData}
        columns={columns}
        total={{ title: "Total", count: fetchData.total }}
        pagination={{
          ...pageInfo,
          total: fetchData.total,
          onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
        }}
        onClickRow={(_, r: PolicyHolder) => history.push(details.address(r.address))}
      />
    </Box>
  );
};

export default PolicyOverview;
