import { alpha, Box, Skeleton, styled } from "@mui/material";
import { useState } from "react";
import { Link as LinkDom } from "react-router-dom";

import { MyGrid } from "./styles";
import ADAicon from "../../../commons/ADAIcon";
import CustomTooltip from "../../../commons/CustomTooltip";
import RecentRegistrations from "./RecentRegistrations";
import useFetch from "../../../../commons/hooks/useFetch";
import { API } from "../../../../commons/utils/api";
import { useParams } from "react-router";
import { formatADA, getShortHash, getShortWallet, numberWithCommas } from "../../../../commons/utils/helper";
import CopyButton from "../../../commons/CopyButton";
import { details } from "../../../../commons/routers";
import StyledModal from "../../../commons/StyledModal";
import { useScreen } from "../../../../commons/hooks/useScreen";
import { FilterParams } from "~/components/StackingFilter";
import { RegistrationDraw } from "./RegistrationDraw";

const Registration = () => {
  const { poolId = "" } = useParams<{ poolId: string }>();
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<SPORegistration | null>(null);
  const { data } = useFetch<SPORegistrationDetail>(
    selected?.poolUpdateId ? API.SPO_LIFECYCLE.SPO_REGISTRATION_DETAIl(poolId, selected?.poolUpdateId) : ""
  );
  const [params, setParams] = useState<FilterParams>({
    fromDate: undefined,
    sort: undefined,
    toDate: undefined,
    txHash: undefined
  });
  const handleSelect = (registration: SPORegistration | null) => {
    setSelected(registration);
  };

  const handleToggleCertificateModal = () => setOpenModal((state) => !state);
  return (
    <Box>
      <RecentRegistrations params={params} setParams={setParams} onSelect={handleSelect} />
      {selected && (
        <RegistrationDraw
          setSelected={setSelected}
          registration={selected}
          data={data}
          toggleModal={handleToggleCertificateModal}
        />
      )}
      <RegistrationCertificateModal
        poolId={poolId}
        poolUpdateId={selected?.poolUpdateId || 0}
        handleCloseModal={handleToggleCertificateModal}
        open={openModal}
      />
    </Box>
  );
};
export default Registration;

export const RegistrationCertificateModal = ({
  poolId,
  poolUpdateId,
  ...props
}: {
  open: boolean;
  poolId: string;
  poolUpdateId: number;
  handleCloseModal: () => void;
}) => {
  const { data, loading } = useFetch<SPORegistrationDetail>(
    poolUpdateId ? API.SPO_LIFECYCLE.SPO_REGISTRATION_DETAIl(poolId, poolUpdateId) : ""
  );
  const { isMobile } = useScreen();

  return (
    <StyledModal {...props} title='Pool Registration certificate'>
      <MyGrid>
        <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
          <Box p={3} display={"flex"}>
            <Box>
              <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
                Transaction ID
              </Box>
              {loading && <Skeleton variant='rectangular' />}
              {data && !loading && (
                <Box pt={"7px"} fontWeight={500}>
                  <CustomTooltip title={data?.txHash || ""}>
                    <Link to={details.transaction(data?.txHash || "")}>
                      {getShortHash(data?.txHash || "")}
                    </Link>
                  </CustomTooltip>
                  <CopyButton text={data?.txHash || ""} />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
          <Box p={3} display={"flex"}>
            <Box>
              <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
                Pool ID
              </Box>
              {loading && <Skeleton variant='rectangular' />}
              {data && !loading && (
                <Box pt={"7px"} fontWeight={500}>
                  <CustomTooltip title={data?.poolView || ""}>
                    <Link to={details.delegation(data?.poolView || "")}>
                      <>{getShortWallet(data?.poolView || "")} </>
                    </Link>
                  </CustomTooltip>
                  <CopyButton text={data?.poolView || ""} />
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
          <Box display={"flex"} p={3} alignItems={"center"}>
            <Box>
              <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
                VRF Key
              </Box>
              {loading && <Skeleton variant='rectangular' />}
              {data && !loading && (
                <Box display={"flex"} gap={"3px"}>
                  <CustomTooltip title={data?.vrfKey || "123"}>
                    <Box pt={"7px"}>
                      <>
                        <Box
                          display={"inline"}
                          fontWeight={500}
                          fontSize='0.875rem'
                          color={({ palette }) => palette.blue[800]}
                        >
                          {getShortHash(data?.vrfKey || "")}
                        </Box>{" "}
                      </>
                    </Box>
                  </CustomTooltip>
                  <Box pt={"7px"}>
                    <CopyButton text={data?.vrfKey || ""} />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
          <Box p={3} display={"flex"} alignItems={"center"}>
            <Box>
              <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
                Owners
              </Box>
              {loading && <Skeleton variant='rectangular' />}
              {data && !loading && (
                <>
                  {(data.stakeKeys || []).map((item) => (
                    <>
                      <Box key={item} pt={"7px"} fontWeight={500} display={"flex"} gap={"3px"}>
                        <CustomTooltip title={item || ""}>
                          <Box>
                            <Link to={details.stake(item || "")}>{getShortWallet(item)}</Link>{" "}
                          </Box>
                        </CustomTooltip>
                        <CopyButton text={item || ""} />
                      </Box>
                    </>
                  ))}
                </>
              )}
            </Box>
          </Box>
        </Box>
        <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
          <Box p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Reward Account
            </Box>
            {loading && <Skeleton variant='rectangular' />}
            {data && !loading && (
              <Box display={"flex"} gap={"3px"}>
                <CustomTooltip title={data?.rewardAccount || ""}>
                  <Box pt={"7px"} fontWeight={500}>
                    <>
                      <Link to={details.stake(data?.rewardAccount || "")}>
                        {getShortWallet(data?.rewardAccount || "")}
                      </Link>{" "}
                    </>
                  </Box>
                </CustomTooltip>
                <Box pt={"7px"}>
                  <CopyButton text={data?.rewardAccount || ""} />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
          <Box p={3} display={"flex"}>
            <Box>
              <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
                Margin
              </Box>
              {loading && <Skeleton variant='rectangular' />}
              {data && !loading && (
                <Box fontSize='0.875rem' pt={"7px"} fontWeight={500}>
                  {data?.margin ? numberWithCommas(data?.margin * 100, 2) : 0}%
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
          <Box p={3} display={"flex"}>
            <Box>
              <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
                Pledge
              </Box>
              {loading && <Skeleton variant='rectangular' />}
              {data && !loading && (
                <Box fontSize='0.875rem' pt={"7px"} fontWeight={500}>
                  {formatADA(data?.pledge)} <ADAicon />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)}>
          <Box p={3}>
            <Box fontWeight={"bold"} fontSize={"0.875rem"} color={({ palette }) => palette.grey[400]}>
              Cost
            </Box>
            {loading && <Skeleton variant='rectangular' />}
            {data && !loading && (
              <Box pt={"7px"}>
                <Box display={"inline"} fontSize='0.875rem' fontWeight={500}>
                  {formatADA(data?.cost)} <ADAicon />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </MyGrid>
    </StyledModal>
  );
};

const Link = styled(LinkDom)(({ theme }) => ({
  fontSize: "0.875rem",
  color: `${theme.palette.blue[800]} !important`
}));
