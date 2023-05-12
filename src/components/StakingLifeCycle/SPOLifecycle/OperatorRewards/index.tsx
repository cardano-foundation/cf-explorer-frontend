import { Box, IconButton, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import {
  SPOStalking,
  ADAOrangeIcon,
  SPOInfo,
  SPOKey,
} from "../../../../commons/resources";
import cadarnoSystem from "../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg";

import Line from "../../../Line";
import ArrowDiagram from "../../../ArrowDiagram";
import CustomTooltip from "../../../commons/CustomTooltip";
import { ButtonSPO, PoolName, PoolNamePopup } from "../Registration/styles";
import PopoverStyled from "../../../commons/PopoverStyled";
import { details } from "../../../../commons/routers";
import { formatADA, getShortHash, getShortWallet } from "../../../../commons/utils/helper";
import CopyButton from "../../../commons/CopyButton";
import useFetch from "../../../../commons/hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { API } from "../../../../commons/utils/api";
import StyledModal from "../../../commons/StyledModal";
import Table, { Column } from "../../../commons/Table";
import useFetchList from "../../../../commons/hooks/useFetchList";
import moment from "moment";
import ADAicon from "../../../commons/ADAIcon";
import { StyledLink } from "./styles";

const OperatorReward = ({
  containerPosition,
  handleResize,
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const { poolId = "" } = useParams<{ poolId: string }>();
  const { data, loading } = useFetch<PoolInfo>(API.SPO_LIFECYCLE.SPO_POOL_INFO(poolId));
  const SPOHolderRef = useRef(null);
  const operatorRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const SPOInfoRef = useRef(null);
  const SPOKeyRef = useRef(null);

  useEffect(() => {
    handleResize();
  }, [operatorRef.current, loading]);

  return (
    <Box>
      <Box mt={4}>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
          <Box ref={cadarnoSystemRef}>
            <img src={cadarnoSystem} alt="carrdano" />
          </Box>
          <Box position={"relative"}>
            <Box ref={operatorRef} width={60} height={67}>
              <Box component={IconButton} onClick={() => setOpenModal(true)} p={0}>
                <ADAOrangeIcon />
              </Box>
            </Box>
            <Box position={"absolute"} width={"max-content"} left={"-64%"} bottom={"-50%"} fontWeight={"bold"}>
              Operator Rewards
            </Box>
          </Box>
          <Box ref={SPOHolderRef} width={190} height={245} position={"relative"}>
            <SPOStalking />
            <CustomTooltip title={data?.poolName}>
              <PoolName> {data?.poolName}</PoolName>
            </CustomTooltip>
            <CustomTooltip
              wOpacity={false}
              componentsProps={{
                transition: {
                  style: {
                    backgroundColor: "white",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
                    padding: "10px",
                  }
                },
                arrow: {
                  style: {
                    color: "white",
                  }
                }
              }} title={<Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Box fontSize="1.125rem" color={({ palette }) => palette.grey[400]}>
                    Pool ID:
                  </Box>
                  <PoolNamePopup to={details.delegation(data?.poolView)}>
                    {getShortHash(data?.poolView || "")}
                  </PoolNamePopup>
                  <CopyButton text={data?.poolView} />
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Box fontSize="1.125rem" color={({ palette }) => palette.grey[400]}>
                    Pool name:
                  </Box>
                  <PoolNamePopup to={details.delegation(data?.poolView)}>{data?.poolName}</PoolNamePopup>
                </Box>
              </Box>}>
              <ButtonSPO
                ref={SPOInfoRef}
                component={IconButton}
                left={"33%"}
              >
                <SPOInfo />
              </ButtonSPO>
            </CustomTooltip>
            <Link to={details.stake(data?.stakeKeys[0] || "")}>
              <CustomTooltip
                wOpacity={false}
                componentsProps={{
                  transition: {
                    style: {
                      backgroundColor: "white",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
                      padding: "10px",
                    }
                  },
                  arrow: {
                    style: {
                      color: "white",
                    }
                  }
                }} title={<Box display={"flex"} alignItems={"center"}>
                  {data?.stakeKeys && data.stakeKeys.length > 0 && (
                    <>
                      <SPOKey fill="#108AEF" />
                      <PoolNamePopup to={details.stake(data?.stakeKeys[0] || "")}>
                        {getShortWallet(data?.stakeKeys[0] || "")}
                      </PoolNamePopup>
                      <CopyButton text={data?.stakeKeys[0]} />
                    </>
                  )}
                </Box>} >
                <ButtonSPO
                  ref={SPOKeyRef}
                  component={IconButton}
                  left={"52%"}
                >
                  <SPOKey fill="#438F68" />
                </ButtonSPO>
              </CustomTooltip>
            </Link>
          </Box>
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100vw",
              zIndex: "-1",
            }}
          >
            <Line
              containerPosition={containerPosition}
              fromRef={cadarnoSystemRef}
              toRef={operatorRef}
              pointTo="border"
              pointFrom="border"
              orient="vertical"
            />

            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={operatorRef}
              toRef={SPOHolderRef}
              pointTo="border"
              pointFrom="border"
              orient="vertical"
            />
          </svg>
        </Box>
      </Box>
      <OperatorRewardModal open={openModal} handleCloseModal={() => setOpenModal(false)} />
    </Box>
  );
};
export default OperatorReward;

const OperatorRewardModal = ({ ...props }: { open: boolean; handleCloseModal: () => void }) => {
  const { poolId = "" } = useParams<{ poolId: string }>();
  const [sort, setSort] = useState<string>("");
  const [{ page, size }, setPagination] = useState<{ page: number; size: number }>({ page: 0, size: 10 });
  const fetchData = useFetchList<SPO_REWARD>(API.SPO_LIFECYCLE.REWARD(poolId), { page, size, sort });

  const columns: Column<SPO_REWARD>[] = [
    {
      title: "Epoch",
      key: "Epoch",
      minWidth: "50px",
      render: r => <Link to={details.epoch(r.epochNo)}>{r.epochNo}</Link>,
    },
    {
      title: "Timestamp",
      key: "time",
      minWidth: "50px",
      render: r => <Box>{moment(r?.time).format("MM/DD/yyyy HH:mm:ss")}</Box>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
    },
    {
      title: "Amount ADA",
      key: "AmountADA",
      minWidth: "50px",
      render: r => (
        <Box>
          {formatADA(r.amount)} <ADAicon />
        </Box>
      ),
    },
    {
      title: "Reward Account",
      key: "RewardAccount",
      minWidth: "50px",
      render: r => (
        <CustomTooltip title={r.rewardAccount}>
          <StyledLink to={details.stake(r.rewardAccount)}>{getShortWallet(r.rewardAccount || "")}</StyledLink>
        </CustomTooltip>
      ),
    },
  ];
  return (
    <StyledModal width={600} {...props} title="Operator rewards received">
      <Box>
        <Box maxHeight={"75vh"} overflow={"auto"}>
          <StyledTable
            {...fetchData}
            columns={columns}
            total={{ title: "Total Epochs", count: fetchData.total }}
            pagination={{
              page,
              size,
              total: fetchData.total,
              onChange: (page, size) => setPagination({ page: page - 1, size }),
            }}
          />
        </Box>
      </Box>
    </StyledModal>
  );
};

const StyledTable = styled(Table)(() => ({
  "> :nth-child(2)": {
    boxShadow: "none !important",
  },
}));
