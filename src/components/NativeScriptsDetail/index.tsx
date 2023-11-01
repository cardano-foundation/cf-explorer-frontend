import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

import CustomAccordion, { TTab } from "src/components/commons/CustomAccordion";
import AssociatedAddress from "src/components/NativeScriptsDetail/Tabs/AssociatedAddress";
import {
  AssetHoldersIcon,
  AssociatedAddressesIcon,
  MintingBurningPolicyIcon,
  ScriptTabIcon,
  TokenTabIcon
} from "src/commons/resources";
import HeaderOverview from "src/components/NativeScriptsDetail/HeaderOverview";
import MinttingBurningPolicy from "src/components/NativeScriptsDetail/Tabs/MinttingBurningPolicy";
import Script from "src/components/NativeScriptsDetail/Tabs/Script";
import Token from "src/components/NativeScriptsDetail/Tabs/Token";
import AssetHolders from "src/components/NativeScriptsDetail/Tabs/AssetHolders";

import { StyledContainer } from "./styles";
import { useNativeScriptDetail } from "./Tabs";
const NativeScriptsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { associatedAddress, loading, keyHashes } = useNativeScriptDetail();
  const { t } = useTranslation();

  const smartcontractTabs: TTab[] = [
    {
      key: "mintingBurningPolicy",
      icon: MintingBurningPolicyIcon,
      children: <MinttingBurningPolicy />,
      label: "Minting/ Burning Policy"
    },
    {
      key: "associatedAddresses",
      icon: AssociatedAddressesIcon,
      children: <AssociatedAddress />,
      label: t("common.associatedAddresses")
    },
    {
      key: "script",
      icon: ScriptTabIcon,
      children: <Script />,
      label: "Script"
    },
    {
      key: "token",
      icon: TokenTabIcon,
      children: <Token />,
      label: "Token"
    },
    {
      key: "assetHolders",
      icon: AssetHoldersIcon,
      children: <AssetHolders />,
      label: "Asset Holders"
    }
  ];

  const hiddenKeys = useMemo(() => {
    const keys: string[] = [];
    if (!associatedAddress?.length) keys.push("associatedAddresses");
    if (!keyHashes?.length) keys.push("mintingBurningPolicy");
    return keys;
  }, [associatedAddress, keyHashes]);

  return (
    <StyledContainer>
      <HeaderOverview data={{ scriptHash: id }} />
      <CustomAccordion loading={loading} tabs={smartcontractTabs} hiddenKeys={hiddenKeys} />
    </StyledContainer>
  );
};

export default NativeScriptsDetail;
