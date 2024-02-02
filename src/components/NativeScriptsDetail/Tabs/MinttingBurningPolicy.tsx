import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { t } from "i18next";

import { NativeOneMint, NativeSig, NativeType } from "src/commons/resources";
import { ChipContainer, MultiSigChip, TimeLockChip } from "src/pages/NativeScriptsAndSC/Card";
import CustomModal from "src/components/commons/CustomModal";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";

import { CardSign, ContainerMint, ItemMint, MintCard, MintIcon, MintTitle, ViewSigner } from "./styles";

import { useNativeScriptDetail } from ".";

const MinttingBurningPolicy = () => {
  const { before, keyHashes, isOneTimeMint, isOpen } = useNativeScriptDetail();
  const [signers, setSigners] = useState<string[] | null>(null);
  const theme = useTheme();
  useEffect(() => {
    window.scroll(0, 0);
  }, [before]);

  return (
    <ContainerMint container>
      <ItemMint item width={"100%"} sm={6} xs={12}>
        <MintCard>
          <MintIcon>
            <NativeType fill={theme.isDark ? theme.palette.secondary[800] : theme.palette.secondary[600]} />
          </MintIcon>
          <MintTitle>{t("nativeScript.mint.type")}</MintTitle>
          <Box display={"flex"} flexWrap={"wrap"}>
            <TimeLockChip isOpen={isOpen} />
            <MultiSigChip isMultiSig={(keyHashes || []).length > 1} />
            {isOneTimeMint && (
              <ChipContainer Icon={NativeOneMint} message="One Time Mint" variant="info" titleTooltip="One Time Mint" />
            )}
          </Box>
        </MintCard>
      </ItemMint>
      <ItemMint item width={"100%"} sm={6} xs={12}>
        <MintCard>
          <MintIcon>
            <NativeSig fill={theme.isDark ? theme.palette.secondary[800] : theme.palette.secondary[600]} />
          </MintIcon>
          <MintTitle>{t("nativeScript.mint.signerKeys")}</MintTitle>
          {keyHashes && (keyHashes || []).length === 1 && (
            <Box fontWeight={"bold"} color={({ palette }) => palette.secondary.main}>
              <DynamicEllipsisText
                value={keyHashes[0]}
                isTooltip
                sx={{ lineHeight: 1, transform: "none" }}
                sxFirstPart={{ fontSize: 18, lineHeight: 1 }}
                sxLastPart={{ fontSize: 18, lineHeight: 1 }}
              />
            </Box>
          )}
          {(keyHashes || []).length > 1 && (
            <Box component={ViewSigner} onClick={() => setSigners(keyHashes || [])}>
              {t("nativeScript.viewSigner")}
            </Box>
          )}
        </MintCard>
      </ItemMint>
      <ViewSignerModal open={!!signers} onClose={() => setSigners(null)} data={signers} />
    </ContainerMint>
  );
};

export default MinttingBurningPolicy;

interface ViewSignerModalProps {
  open: boolean;
  onClose: () => void;
  data: string[] | null;
}
const ViewSignerModal: React.FC<ViewSignerModalProps> = ({ data, ...props }) => {
  return (
    <CustomModal
      modalContainerProps={{ style: { maxWidth: 680 } }}
      open={props.open}
      style={{ maxHeight: "unset", overflow: "unset" }}
      onClose={props.onClose}
      title={t("nativeScript.signModal")}
    >
      <CardSign>
        <Box fontWeight={"bold"} color={({ palette }) => palette.secondary.light}>
          {t("nativeScript.signModal")}
        </Box>
        {(data || []).map((sig, idx) => (
          <Box
            key={idx}
            mt={1}
            fontWeight={"bold"}
            color={({ palette }) => palette.secondary.main}
            display={"inline-block"}
            width={"100%"}
          >
            <DynamicEllipsisText value={sig} isTooltip />
          </Box>
        ))}
      </CardSign>
    </CustomModal>
  );
};
