import { TabContext, TabList } from "@mui/lab";
import { Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { CertUpdate, ChangeIcon, PoolCert } from "src/commons/resources";
import { details } from "src/commons/routers";
import { formatADAFull, getShortHash, numberWithCommas } from "src/commons/utils/helper";
import ViewMoreAddressModal from "src/components/ViewMoreAddressModal";
import ADAicon from "src/components/commons/ADAIcon";
import CopyButton from "src/components/commons/CopyButton";
import CustomTabTitle from "src/components/commons/CustomTabTitle";
import { Uppercase } from "src/components/commons/CustomText/styles";
import CustomTooltip from "src/components/commons/CustomTooltip";
import ViewMoreThreeDots from "src/components/commons/ViewMoreThreeDots";
import CustomModal from "src/components/commons/CustomModal";

import {
  CardBox,
  ChangeBox,
  HistoryList,
  Item,
  ItemList,
  Label,
  LineData,
  MinimumText,
  StyledAdaLogoIcon,
  StyledLink,
  StyledTab,
  StyledTabPanel,
  SupperMinimumText,
  TabContainer,
  UpdateItem,
  UpdateList,
  VRFKeyText,
  Value
} from "./styles";

interface CertificateItemType {
  label: React.ReactNode;
  content: React.ReactNode;
  extra?: React.ReactNode | false;
}

interface TabProps {
  key: "poolCertificate" | "certificateUpdates";
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  children: React.ReactNode;
}

interface Props {
  open: boolean;
  data: PoolUpdateDetail | null;
  onClose: () => void;
}
export const PoolUpdateModal = ({ data, open, ...props }: Props) => {
  const { t } = useTranslation();
  const [tabActive, setTabActive] = useState("poolCertificate");

  useEffect(() => {
    setTabActive("poolCertificate");
  }, [open]);

  const tabs: TabProps[] = [
    {
      key: "poolCertificate",
      icon: PoolCert,
      label: t("common.poolCert"),
      children: <PoolCertificate data={data} />
    },
    {
      key: "certificateUpdates",
      icon: CertUpdate,
      label: t("common.certificateUpdates"),
      children: <PoolCertificateUpdate data={data} />
    }
  ];

  const handleChange = (event: React.SyntheticEvent, tab: TabProps["key"]) => {
    setTabActive(tab);
  };
  const isUpdated = data?.previousMargin !== data?.margin || data?.previousPledge !== data?.pledge;

  return (
    <CustomModal open={open} {...props} title={t("common.poolCert")} sx={{ maxHeight: "min(70vh, 800px)" }}>
      {isUpdated ? (
        <TabContext value={tabActive}>
          <TabContainer>
            <TabList
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              TabIndicatorProps={{
                sx: {
                  background: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.secondary.main,
                  height: "4px"
                }
              }}
            >
              {tabs?.map(({ key, icon: Icon, label }) => (
                <StyledTab
                  key={key}
                  value={key}
                  label={
                    <CustomTabTitle
                      iconProps={{
                        stroke: "none",
                        sx: {
                          fill: ({ palette }) => (key === tabActive ? palette.primary.main : palette.secondary.light)
                        }
                      }}
                      active={key === tabActive}
                      icon={Icon}
                    >
                      {label}
                    </CustomTabTitle>
                  }
                />
              ))}
            </TabList>
          </TabContainer>
          {tabs.map((item) => (
            <StyledTabPanel key={item.key} value={item.key}>
              {item.children}
            </StyledTabPanel>
          ))}
        </TabContext>
      ) : (
        <PoolCertificate data={data} />
      )}
    </CustomModal>
  );
};
export default PoolUpdateModal;

const PoolCertificate = ({ data }: { data: PoolUpdateDetail | null }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [selectedOwner, setSelectedOwner] = useState<string[]>([]);
  const isUpdateMargin = data?.previousMargin !== null && data?.previousMargin !== data?.margin;
  const isUpdatePledge = data?.previousPledge !== null && data?.previousPledge !== data?.pledge;
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
            <StyledLink to={details.delegation(data?.poolView || "")}>{getShortHash(data?.poolView || "")}</StyledLink>
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
            <StyledLink to={details.stake(data?.stakeKeys[0] || "")}>{getShortHash(data?.stakeKeys[0])}</StyledLink>
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
              {getShortHash(data?.rewardAccount || "")}
            </StyledLink>
          </CustomTooltip>
          <CopyButton text={data?.rewardAccount || ""} />
        </LineData>
      )
    },
    {
      label: t("margin"),
      content: (
        <>
          <Value>{data?.margin ? numberWithCommas(data?.margin * 100, 2) : 0}%</Value>{" "}
          {data?.previousMargin !== null && data?.previousMargin !== data?.margin && (
            <SupperMinimumText>
              {t("common.Previous")}: {data?.previousMargin ? numberWithCommas(data?.previousMargin * 100, 2) : 0} %
            </SupperMinimumText>
          )}
        </>
      ),
      extra: isUpdateMargin && <ChangeIcon />
    },
    {
      label: t("glossary.pledge"),
      content: (
        <>
          <Value>
            {formatADAFull(data?.pledge)}&nbsp;
            <ADAicon width={9} />
          </Value>
          {data?.previousPledge !== null && data?.previousPledge !== data?.pledge && (
            <MinimumText>
              {t("common.Previous")}: {formatADAFull(data?.previousPledge || 0)} <ADAicon width={8} />
            </MinimumText>
          )}
        </>
      ),
      extra: isUpdatePledge && <ChangeIcon />
    },
    {
      label: t("glossary.cost"),
      content: (
        <Value>
          {formatADAFull(data?.cost)}
          &nbsp;
          <ADAicon width={9} />
        </Value>
      )
    }
  ];
  return (
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
      <ViewMoreAddressModal
        showFullHash={true}
        maxWidth={680}
        title={t("common.poolOwner")}
        open={!!selectedOwner.length}
        onClose={() => setSelectedOwner([])}
        items={selectedOwner}
        onItemClick={(item) => history.push(details.stake(item))}
      />
    </ItemList>
  );
};

const PoolCertificateUpdate = ({ data }: { data: PoolUpdateDetail | null }) => {
  const { t } = useTranslation();
  return (
    <UpdateList>
      {data?.previousMargin !== null && data?.previousMargin !== data?.margin && (
        <UpdateItem>
          <Label>{t("glossary.margin")}</Label>
          <HistoryList>
            <CardBox>
              <MinimumText>
                <Uppercase> {t("common.old")}</Uppercase>
              </MinimumText>
              <Value>{data?.previousMargin ? numberWithCommas(data?.previousMargin * 100, 2) : 0}%</Value>
            </CardBox>
            <ChangeBox>
              <ChangeIcon />
            </ChangeBox>
            <CardBox>
              <MinimumText>
                <Uppercase>{t("common.new")}</Uppercase>
              </MinimumText>
              <Value>{data?.margin ? numberWithCommas(data?.margin * 100, 2) : 0}%</Value>
            </CardBox>
          </HistoryList>
        </UpdateItem>
      )}
      {data?.previousPledge !== null && data?.previousPledge !== data?.pledge && (
        <UpdateItem>
          <Label>{t("glossary.pledge")}</Label>
          <HistoryList>
            <CardBox>
              <MinimumText>
                <Uppercase> {t("common.old")}</Uppercase>
              </MinimumText>
              <Value>
                {formatADAFull(data?.previousPledge)}
                <StyledAdaLogoIcon />
              </Value>
            </CardBox>
            <ChangeBox>
              <ChangeIcon />
            </ChangeBox>
            <CardBox>
              <MinimumText>
                <Uppercase>{t("common.new")}</Uppercase>
              </MinimumText>
              <Value>
                {formatADAFull(data?.pledge)}
                <StyledAdaLogoIcon />
              </Value>
            </CardBox>
          </HistoryList>
        </UpdateItem>
      )}
    </UpdateList>
  );
};
