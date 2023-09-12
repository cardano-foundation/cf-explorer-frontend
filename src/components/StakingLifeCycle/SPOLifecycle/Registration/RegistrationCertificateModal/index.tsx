import { Box, Skeleton } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ViewMoreAddressModal from "src/components/ViewMoreAddressModal";
import ViewMoreThreeDots from "src/components/commons/ViewMoreThreeDots";
import { API } from "src/commons/utils/api";
import useFetch from "src/commons/hooks/useFetch";
import CustomTooltip from "src/components/commons/CustomTooltip";
import CopyButton from "src/components/commons/CopyButton";
import { details } from "src/commons/routers";
import { formatADAFull, getShortHash, getShortWallet, numberWithCommas } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";

import { VRFKeyText, Item, ItemList, Label, LineData, StyledLink, StyledModal, Value } from "./styles";

interface CertificateItemType {
  label: React.ReactNode;
  content: React.ReactNode;
  extra?: React.ReactNode | false;
}

interface Props {
  open: boolean;
  poolId: string;
  poolUpdateId: number;
  onClose: () => void;
}
export const RegistrationCertificateModal = ({ poolId, poolUpdateId, ...props }: Props) => {
  const { t } = useTranslation();
  const { data } = useFetch<SPORegistrationDetail>(
    poolUpdateId ? API.SPO_LIFECYCLE.SPO_REGISTRATION_DETAIl(poolId, poolUpdateId) : ""
  );
  const history = useHistory();
  const [selectedOwner, setSelectedOwner] = useState<string[]>([]);

  const list: CertificateItemType[] = [
    {
      label: t("common.txID"),
      content: (
        <LineData>
          <CustomTooltip title={data?.txHash || ""}>
            <StyledLink to={details.transaction(data?.txHash || "")}>{getShortHash(data?.txHash || "")}</StyledLink>
          </CustomTooltip>
          <CopyButton text={data?.txHash || ""} />
        </LineData>
      )
    },
    {
      label: t("common.poolId"),
      content: (
        <LineData>
          <CustomTooltip title={data?.poolView || ""}>
            <StyledLink to={details.delegation(data?.poolView || "")}>
              {getShortWallet(data?.poolView || "")}
            </StyledLink>
          </CustomTooltip>
          <CopyButton text={data?.poolView || ""} />
        </LineData>
      )
    },
    {
      label: t("common.vrfKey"),
      content: (
        <LineData>
          <CustomTooltip title={data?.vrfKey}>
            <VRFKeyText>{getShortHash(data?.vrfKey || "")}</VRFKeyText>
          </CustomTooltip>
          <CopyButton text={data?.vrfKey || ""} />
        </LineData>
      )
    },
    {
      label: t("common.owners"),
      content: (
        <LineData>
          <CustomTooltip title={data?.stakeKeys[0] || ""}>
            <StyledLink to={details.stake(data?.stakeKeys[0] || "")}>{getShortWallet(data?.stakeKeys[0])}</StyledLink>
          </CustomTooltip>
          <CopyButton text={data?.stakeKeys[0] || ""} />
        </LineData>
      ),
      extra: data && data.stakeKeys?.length > 1 && (
        <ViewMoreThreeDots onClick={() => setSelectedOwner(data.stakeKeys || [])} />
      )
    },
    {
      label: t("common.rewardAccount"),
      content: (
        <LineData>
          <CustomTooltip title={data?.rewardAccount || ""}>
            <StyledLink to={details.stake(data?.rewardAccount || "")}>
              {getShortWallet(data?.rewardAccount || "")}
            </StyledLink>
          </CustomTooltip>
          <CopyButton text={data?.rewardAccount || ""} />
        </LineData>
      )
    },
    {
      label: t("margin"),

      content: <Value>{data?.margin ? numberWithCommas(data?.margin * 100, 2) : 0}%</Value>
    },
    {
      label: t("glossary.pledge"),
      content: (
        <Value>
          {formatADAFull(data?.pledge)}
          <ADAicon />
        </Value>
      )
    },
    {
      label: t("glossary.cost"),
      content: (
        <Value>
          {formatADAFull(data?.cost)}
          <ADAicon />
        </Value>
      )
    }
  ];

  return (
    <StyledModal {...props} title={t("common.poolRegisCert")} sx={{ maxHeight: "min(70vh, 800px)" }}>
      <ViewMoreAddressModal
        showFullHash={true}
        maxWidth={680}
        title={t("common.poolOwner")}
        open={!!selectedOwner.length}
        onClose={() => setSelectedOwner([])}
        items={selectedOwner}
        onItemClick={(item) => history.push(details.stake(item))}
      />
      <ItemList>
        {list.map(({ label, content, extra }, index) => {
          return (
            <Item key={index} flexDirection={extra ? "row" : "column"}>
              {extra ? (
                <Box>
                  <Label>{label}</Label>
                  {data ? content : <Skeleton variant="rectangular" />}
                </Box>
              ) : (
                <>
                  <Label>{label}</Label>
                  {data ? content : <Skeleton variant="rectangular" />}
                </>
              )}
              {extra}
            </Item>
          );
        })}
      </ItemList>
    </StyledModal>
  );
};
export default RegistrationCertificateModal;
