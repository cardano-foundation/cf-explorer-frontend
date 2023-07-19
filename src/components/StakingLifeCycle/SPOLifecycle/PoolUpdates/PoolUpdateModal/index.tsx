import { useEffect, useState } from "react";
import { Box, Skeleton, useTheme } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { useHistory } from "react-router-dom";

import ViewMoreAddressModal from "src/components/ViewMoreAddressModal";
import ViewMoreThreeDots from "src/components/commons/ViewMoreThreeDots";
import CustomTooltip from "src/components/commons/CustomTooltip";
import CopyButton from "src/components/commons/CopyButton";
import { details } from "src/commons/routers";
import { formatADAFull, getShortHash, getShortWallet, numberWithCommas } from "src/commons/utils/helper";
import { CertUpdate, ChangeIcon, PoolCert } from "src/commons/resources";

import {
  CardBox,
  ChangeBox,
  VRFKeyText,
  HistoryList,
  Item,
  ItemList,
  Label,
  LineData,
  MinimumAdaLogoIcon,
  MinimumText,
  StyledAdaLogoIcon,
  StyledLink,
  StyledModal,
  StyledTab,
  StyledTabPanel,
  SupperMinimumText,
  TabContainer,
  TabItem,
  TitleTab,
  UpdateItem,
  UpdateList,
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
  const [tabActive, setTabActive] = useState("poolCertificate");
  const theme = useTheme();

  useEffect(() => {
    setTabActive("poolCertificate");
  }, [open]);

  const tabs: TabProps[] = [
    {
      key: "poolCertificate",
      icon: PoolCert,
      label: "Pool certificate",
      children: <PoolCertificate data={data} />
    },
    {
      key: "certificateUpdates",
      icon: CertUpdate,
      label: "Certificate updates",
      children: <PoolCertificateUpdate data={data} />
    }
  ];

  const handleChange = (event: React.SyntheticEvent, tab: TabProps["key"]) => {
    setTabActive(tab);
  };
  const isUpdated = data?.previousMargin !== data?.margin || data?.previousPledge !== data?.pledge;

  return (
    <StyledModal open={open} {...props} title="Pool certificate" sx={{ maxHeight: "min(70vh, 800px)" }}>
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
                  color: (theme) => theme.palette.grey[400],
                  height: "4px"
                }
              }}
            >
              {tabs?.map(({ key, icon: Icon, label }) => (
                <StyledTab
                  key={key}
                  value={key}
                  label={
                    <TabItem>
                      <Icon fill={key === tabActive ? theme.palette.green[200] : theme.palette.grey[300]} />
                      <TitleTab pl={1} active={+(key === tabActive)}>
                        {label}
                      </TitleTab>
                    </TabItem>
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
    </StyledModal>
  );
};
export default PoolUpdateModal;

const PoolCertificate = ({ data }: { data: PoolUpdateDetail | null }) => {
  const history = useHistory();
  const [selectedOwner, setSelectedOwner] = useState<string[]>([]);
  const isUpdateMargin = data?.previousMargin !== null && data?.previousMargin !== data?.margin;
  const isUpdatePledge = data?.previousPledge !== null && data?.previousPledge !== data?.pledge;
  const list: CertificateItemType[] = [
    {
      label: "Transaction ID",
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
      label: "Pool ID",
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
      label: "VRF Key",
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
      label: "Owners",
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
      label: "Reward Account",
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
      label: "Margin",
      content: (
        <>
          <Value>{data?.margin ? numberWithCommas(data?.margin * 100, 2) : 0}%</Value>{" "}
          {data?.previousMargin !== null && (
            <SupperMinimumText>
              Previous: {data?.previousMargin ? numberWithCommas(data?.previousMargin * 100, 2) : 0} %
            </SupperMinimumText>
          )}
        </>
      ),
      extra: isUpdateMargin && <ChangeIcon />
    },
    {
      label: "Pledge",
      content: (
        <>
          <Value>
            {formatADAFull(data?.pledge)}
            <StyledAdaLogoIcon />
          </Value>
          {data?.previousPledge !== null && (
            <MinimumText>
              Previous: {formatADAFull(data?.previousPledge || 0)} <MinimumAdaLogoIcon />
            </MinimumText>
          )}
        </>
      ),
      extra: isUpdatePledge && <ChangeIcon />
    },
    {
      label: "Cost",
      content: (
        <Value>
          {formatADAFull(data?.cost)}
          <StyledAdaLogoIcon />
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
        title="Pool Owner"
        open={!!selectedOwner.length}
        onClose={() => setSelectedOwner([])}
        items={selectedOwner}
        onItemClick={(item) => history.push(details.stake(item))}
      />
    </ItemList>
  );
};

const PoolCertificateUpdate = ({ data }: { data: PoolUpdateDetail | null }) => {
  return (
    <UpdateList>
      {data?.previousMargin !== null && data?.previousMargin !== data?.margin && (
        <UpdateItem>
          <Label>Margin</Label>
          <HistoryList>
            <CardBox>
              <MinimumText>OLD</MinimumText>
              <Value>{data?.previousMargin ? numberWithCommas(data?.previousMargin * 100, 2) : 0}%</Value>
            </CardBox>
            <ChangeBox>
              <ChangeIcon />
            </ChangeBox>
            <CardBox>
              <MinimumText>NEW</MinimumText>
              <Value>{data?.margin ? numberWithCommas(data?.margin * 100, 2) : 0}%</Value>
            </CardBox>
          </HistoryList>
        </UpdateItem>
      )}
      {data?.previousPledge !== null && data?.previousPledge !== data?.pledge && (
        <UpdateItem>
          <Label>Pledge</Label>
          <HistoryList>
            <CardBox>
              <MinimumText>OLD</MinimumText>
              <Value>
                {formatADAFull(data?.previousPledge)}
                <StyledAdaLogoIcon />
              </Value>
            </CardBox>
            <ChangeBox>
              <ChangeIcon />
            </ChangeBox>
            <CardBox>
              <MinimumText>NEW</MinimumText>
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
