import React, { useEffect } from "react";
import { capitalize } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { ConnectWalletButton } from "@cardano-foundation/cardano-connect-with-wallet";
import { useTheme, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import useToast from "src/commons/hooks/useToast";
import { QrCodeDarkMode, QrCodeLightMode } from "src/commons/resources";
import { setOpenModal, setWallet } from "src/stores/user";
import { NETWORK } from "src/commons/utils/constants";

import { WrapContent } from "./style";
import StyledModal from "../StyledModal";
interface IProps {
  connect: (name: string, onSuccess: () => void, onError: (error: Error) => void) => Promise<void>;
  onTriggerSignMessage: () => void;
  openModal: boolean;
  modalRegister: boolean;
}

const ConnectWalletModal: React.FC<IProps> = ({ openModal, modalRegister, connect, onTriggerSignMessage }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [isP2Pconnect, setIsP2Pconnect] = React.useState(false);

  const toast = useToast();
  const handleClose = () => {
    setOpenModal(false);
    setIsP2Pconnect(false);
  };
  const onSuccess = () => {
    setOpenModal(false);
    onTriggerSignMessage();
  };

  const p2pConnectButton = Array.from(document.querySelectorAll("#connect-wallet-menu > span")).filter(
    (span) => span.textContent === "P2P Wallet"
  );

  const walletMenu = document.getElementById("connect-wallet-menu") as HTMLElement | null;
  const p2pOptionModal = document.querySelector("#connect-wallet-dropdown>div:first-child") as HTMLElement | null;
  const modalContent = document.querySelector('[data-testid="modal-content"]') as HTMLElement | null;
  const subtitle = modalContent?.querySelector("p") as HTMLElement | null;
  const copyButton = modalContent?.querySelector("button") as HTMLElement | null;
  const modalContentInput = modalContent?.querySelector("input") as HTMLElement | null;
  const qrImage = p2pConnectButton[0]?.querySelector("img");
  const copiedToast = modalContent?.querySelector("div:last-child") as HTMLElement | null;

  useEffect(() => {
    function copyToClipboard(text: string) {
      if (!navigator.clipboard) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.visibility = "hidden";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand("copy");
          toast.success(t("message.common.copySuccess"));
        } catch (err) {
          toast.error("message.common.copyFailed");
        }
        return;
      }
      navigator.clipboard
        .writeText(text)
        .then(function () {
          toast.success(t("message.common.copySuccess"));
        })
        .catch(function () {
          toast.error("message.common.copyFailed");
        });
    }

    if (copyButton) {
      copyButton.addEventListener("click", function () {
        const textToCopy = "Your text here";
        copyToClipboard(textToCopy);
      });
    }
  }, [copyButton]);

  if (modalContent) {
    modalContent.addEventListener("click", function (event) {
      if (copyButton && (event.target === copyButton || copyButton.contains(event.target as Node))) {
        // Do nothing
      } else {
        event.stopPropagation();
      }
    });
  }

  if (qrImage && qrImage instanceof HTMLImageElement) {
    qrImage.src = theme.isDark ? QrCodeDarkMode : QrCodeLightMode;
  }

  p2pConnectButton[0]?.addEventListener("click", () => {
    setIsP2Pconnect(true);
    if (walletMenu) {
      walletMenu.style.display = "none";
    }
    if (p2pOptionModal && modalContent) {
      Object.assign(p2pOptionModal.style, {
        position: "static",
        display: "block",
        backgroundColor: theme.isDark ? theme.palette.secondary[0] : theme.palette.primary[100]
      });
      Object.assign(modalContent.style, {
        backgroundColor: theme.isDark ? theme.palette.secondary[0] : theme.palette.primary[100],
        margin: " 0 auto",
        width: "-webkit-fill-available",
        border: "none",
        padding: "0",
        color: theme.palette.secondary.main
      });
      if (subtitle) {
        subtitle.style.maxWidth = "100%";
      }
      if (modalContentInput) {
        Object.assign(modalContentInput.style, {
          backgroundColor: "transparent",
          color: theme.palette.secondary.main
        });
      }
      if (copiedToast) {
        Object.assign(copiedToast.style, {
          display: "none"
        });
      }
    }
  });

  useEffect(() => {
    return setIsP2Pconnect(false);
  }, []);

  useEffect(() => {
    if (modalRegister) {
      setOpenModal(false);
    }
  }, [modalRegister]);

  const onError = (error: Error, walletName: string) => {
    if (error.name === "WrongNetworkTypeError") {
      toast.error(
        t("message.changeNetwork", {
          wrongNetwork: NETWORK.charAt(0).toUpperCase() + NETWORK.slice(1).toLowerCase(),
          correctNetwork: NETWORK.charAt(0).toUpperCase() + NETWORK.slice(1).toLowerCase()
        })
      );
    } else if (error.name === "WalletExtensionNotFoundError") {
      toast.error(
        t("message.wallet.notFound", {
          walletName: capitalize(walletName)
        })
      );
    } else {
      toast.error(t("message.wallet.created", { walletName }));
    }
  };
  const handleConnect = (walletName: string) => {
    setWallet(walletName);
    setOpenModal(false);
    connect(
      walletName,
      () => onSuccess(),
      (error: Error) => onError(error, walletName)
    );
  };

  return (
    <StyledModal
      open={openModal}
      title={isP2Pconnect ? t("account.connectP2PWallet") : t("common.connect2wallet.title")}
      handleCloseModal={handleClose}
    >
      <WrapContent
        sx={{
          padding: "0 40px",
          position: "static"
        }}
      >
        <ConnectWalletButton
          onConnect={handleConnect}
          peerConnectEnabled={true}
          hideActionMenu={true}
          customCSS={`
            & > button {
            display: none;
            };
            width: 100%;
            max-width: 100%;
            #connect-wallet-menu {
              display: flex;
              position:static;
              flex-direction: column-reverse;
              font-family:Roboto,sans-serif;
              font-size: 16px;
              font-weight: 700;
              width: 100%;
              max-width: 100%;
              & > span {
              padding: 20px;
              margin-bottom: 16px;
              border-radius: 10px;
              background-color: ${theme.isDark ? theme.palette.secondary[100] : theme.palette.primary[100]};
              border: 1px solid ${theme.palette.primary[200]};
              color: ${theme.isDark ? theme.palette.secondary.main : theme.palette.secondary.light};
              display: flex;
              justify-content: space-between;
              flex-direction: row-reverse;
            };
            `}
        />
        {isP2Pconnect && (
          <Button
            sx={{
              marginTop: "20px",
              width: "100%",
              maxWidth: "100%",
              background: theme.isDark ? theme.palette.primary.main : theme.palette.secondary.main,
              padding: "15px 20px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "19px",
              textAlign: "center",
              color: theme.palette.secondary[0],
              "&:hover": {
                background: theme.isDark ? theme.palette.primary.dark : theme.palette.secondary.main
              },
              textTransform: "none"
            }}
            onClick={() => {
              setIsP2Pconnect(false);
              const walletMenu = document.getElementById("connect-wallet-menu") as HTMLElement | null;
              if (walletMenu) {
                walletMenu.style.display = "flex";
              }
              if (p2pOptionModal) {
                p2pOptionModal.style.display = "none";
              }
            }}
          >
            Cancel
          </Button>
        )}
      </WrapContent>
    </StyledModal>
  );
};

export default ConnectWalletModal;
