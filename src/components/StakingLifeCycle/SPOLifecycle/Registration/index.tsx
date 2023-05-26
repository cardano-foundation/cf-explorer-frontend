import { Box, Skeleton } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FakeLink, Item, ItemList, Label, LineData, StyledAdaLogoIcon, StyledLink, StyledModal, Value } from "./styles";
import CustomTooltip from "../../../commons/CustomTooltip";
import RecentRegistrations from "./RecentRegistrations";
import useFetch from "../../../../commons/hooks/useFetch";
import { API } from "../../../../commons/utils/api";
import { useParams } from "react-router";
import { formatADA, getShortHash, getShortWallet, numberWithCommas } from "../../../../commons/utils/helper";
import CopyButton from "../../../commons/CopyButton";
import { details } from "../../../../commons/routers";
import { FilterParams } from "~/components/StackingFilter";
import { RegistrationDraw } from "./RegistrationDraw";
import ViewMoreAddressModal from "~/components/ViewMoreAddressModal";
import ViewMoreThreeDots from "~/components/commons/ViewMoreThreeDots";

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

  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  const handleToggleCertificateModal = () => setOpenModal((state) => !state);
  return (
    <Box>
      <RecentRegistrations
        params={params}
        setParams={setParams}
        onSelect={handleSelect}
        setShowBackButton={setShowBackButton}
      />
      {selected && (
        <RegistrationDraw
          selected={selected}
          data={data}
          toggleModal={handleToggleCertificateModal}
          showBackButton={showBackButton}
        />
      )}
      <RegistrationCertificateModal
        poolId={poolId}
        poolUpdateId={selected?.poolUpdateId || 0}
        onClose={handleToggleCertificateModal}
        open={openModal}
      />
    </Box>
  );
};
export default Registration;



interface RegistrationCertificateModalProps {
  open: boolean;
  poolId: string;
  poolUpdateId: number;
  onClose: () => void;
}
export const RegistrationCertificateModal = ({ poolId, poolUpdateId, ...props }: RegistrationCertificateModalProps) => {
  const { data, loading } = useFetch<SPORegistrationDetail>(
    poolUpdateId ? API.SPO_LIFECYCLE.SPO_REGISTRATION_DETAIl(poolId, poolUpdateId) : ""
  );
  const history = useHistory();
  const [selectedOwner, setSelectedOwner] = useState<string[]>([]);

  return (
    <StyledModal {...props} title='Pool registration certificate'>
      <ViewMoreAddressModal
        showFullHash={true}
        maxWidth={680}
        title='Pool Owner'
        open={!!selectedOwner.length}
        onClose={() => setSelectedOwner([])}
        items={selectedOwner}
        onItemClick={(item) => history.push(details.stake(item))}
      />
      <ItemList>
        <Item>
          <Label>Transaction ID</Label>
          {loading ? (
            <Skeleton variant='rectangular' />
          ) : data ? (
            <LineData>
              <CustomTooltip title={data?.txHash || ""}>
                <StyledLink to={details.transaction(data?.txHash || "")}>{getShortHash(data?.txHash || "")}</StyledLink>
              </CustomTooltip>
              <CopyButton text={data?.txHash || ""} />
            </LineData>
          ) : (
            ""
          )}
        </Item>
        <Item>
          <Label>Pool ID</Label>
          {loading ? (
            <Skeleton variant='rectangular' />
          ) : data ? (
            <LineData>
              <CustomTooltip title={data?.poolView || ""}>
                <StyledLink to={details.delegation(data?.poolView || "")}>
                  {getShortWallet(data?.poolView || "")}
                </StyledLink>
              </CustomTooltip>
              <CopyButton text={data?.poolView || ""} />
            </LineData>
          ) : (
            ""
          )}
        </Item>
        <Item>
          <Label>VRF Key</Label>
          {loading ? (
            <Skeleton variant='rectangular' />
          ) : data ? (
            <LineData>
              <CustomTooltip title={data?.vrfKey}>
                <FakeLink>{getShortHash(data?.vrfKey || "")}</FakeLink>
              </CustomTooltip>
              <CopyButton text={data?.vrfKey || ""} />
            </LineData>
          ) : (
            ""
          )}
        </Item>
        <Item flexDirection={data && data.stakeKeys?.length > 0 ? "row" : "column"}>
          <Box>
            <Label>Owners</Label>
            {loading ? (
              <Skeleton variant='rectangular' />
            ) : data ? (
              data.stakeKeys?.length > 0 && (
                <LineData>
                  <CustomTooltip title={data.stakeKeys[0] || ""}>
                    <StyledLink to={details.stake(data.stakeKeys[0] || "")}>
                      {getShortWallet(data.stakeKeys[0])}
                    </StyledLink>
                  </CustomTooltip>
                  <CopyButton text={data.stakeKeys[0] || ""} />
                </LineData>
              )
            ) : (
              ""
            )}
          </Box>
          {data && data.stakeKeys?.length > 0 && (
            <ViewMoreThreeDots onClick={() => setSelectedOwner(data.stakeKeys || [])} />
          )}
        </Item>
        <Item>
          <Label>Reward Account</Label>
          {loading ? (
            <Skeleton variant='rectangular' />
          ) : data ? (
            <LineData>
              <CustomTooltip title={data?.rewardAccount || ""}>
                <StyledLink to={details.stake(data?.rewardAccount || "")}>
                  {getShortWallet(data?.rewardAccount || "")}
                </StyledLink>
              </CustomTooltip>
              <CopyButton text={data?.rewardAccount || ""} />
            </LineData>
          ) : (
            ""
          )}
        </Item>
        <Item>
          <Box>
            <Label>Margin</Label>
            {loading ? (
              <Skeleton variant='rectangular' />
            ) : data ? (
              <Value>{data?.margin ? numberWithCommas(data?.margin * 100, 2) : 0}%</Value>
            ) : (
              ""
            )}
          </Box>
        </Item>
        <Item>
          <Box>
            <Label>Pledge</Label>
            {loading ? (
              <Skeleton variant='rectangular' />
            ) : data ? (
              <Value>
                {formatADA(data?.pledge)}
                <StyledAdaLogoIcon />
              </Value>
            ) : (
              ""
            )}
          </Box>
        </Item>
        <Item>
          <Label>Cost</Label>
          {loading ? (
            <Skeleton variant='rectangular' />
          ) : data ? (
            <Value>
              {formatADA(data?.cost)}
              <StyledAdaLogoIcon />
            </Value>
          ) : (
            ""
          )}
        </Item>
      </ItemList>
    </StyledModal>
  );
};
