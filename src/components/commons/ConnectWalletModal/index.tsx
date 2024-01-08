import React, { useEffect, useState } from "react";
import { capitalize, NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { ConnectWalletButton } from "@cardano-foundation/cardano-connect-with-wallet";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import { NETWORK, NETWORKS } from "src/commons/utils/constants";
import useToast from "src/commons/hooks/useToast";
import { QrCodeDarkMode, QrCodeLightMode, CloseIcon, closeIconDarkMode } from "src/commons/resources";
import { setOpenModal, setWallet } from "src/stores/user";

import { WrapContent } from "./style";
import StyledModal from "../StyledModal";

interface IProps {
  connect: (name: string, onSuccess: () => void, onError: (error: Error) => void) => Promise<void>;
  onTriggerSignMessage: () => void;
  openModal: boolean;
  modalRegister: boolean;
  modalSignMessage: boolean;
  handleSignP2P: () => void;
  handleCloseP2P: () => void;
}

const ConnectWalletModal: React.FC<IProps> = ({
  openModal,
  modalRegister,
  connect,
  onTriggerSignMessage,
  modalSignMessage,
  handleSignP2P,
  handleCloseP2P
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [p2pConnectButton, setP2pConnectButton] = useState<Element[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const toast = useToast();

  const handleClose = () => {
    setOpenModal(false);
  };
  const onSuccess = () => {
    setOpenModal(false);
    onTriggerSignMessage();
  };

  useEffect(() => {
    setTimeout(() => {
      if (openModal) {
        const p2pConnectButton = Array.from(document.querySelectorAll("#connect-wallet-menu > span")).filter(
          (span) => span.textContent === "P2P Wallet"
        );
        setP2pConnectButton(p2pConnectButton);
      }
    }, 0);
  }, [openModal]);

  const walletMenu = document.getElementById("connect-wallet-menu") as HTMLElement | null;
  const p2pOptionModal = document.querySelector("#connect-wallet-dropdown>div:first-child") as HTMLElement | null;
  const walletMenuModal = document.getElementById("modal-content-connect-wallet") as HTMLElement | null;
  const modalContent = document.querySelector('[data-testid="modal-content"]') as HTMLElement | null;
  const subtitle = modalContent?.querySelector("p") as HTMLElement | null;
  const copyButton = modalContent?.querySelector("button") as HTMLElement | null;
  const qrImage = p2pConnectButton[0]?.querySelector("img");
  const modalContentInput = modalContent?.querySelector("input") as HTMLInputElement | null;
  const copiedToast = modalContent?.querySelector("div:last-child") as HTMLElement | null;

  useEffect(() => {
    if (walletMenu) {
      handleCloseP2P();
    }
  }, [walletMenu]);

  useEffect(() => {
    function copyToClipboard(text: string) {
      navigator.clipboard
        .writeText(text)
        .then(function () {
          toast.success(t("message.common.copySuccess"));
        })
        .catch(function () {
          toast.error("message.common.copyFailed");
        });
    }

    if (modalContentInput && copyButton) {
      copyButton.addEventListener("click", function () {
        const hash = modalContentInput.value;
        copyToClipboard(hash);
      });
    }
  }, [modalContentInput, copyButton]);

  if (modalContent) {
    const cancelButton = document.getElementById("cancel-button-p2p-modal") as HTMLElement | null;
    modalContent.addEventListener("click", function (event) {
      if (
        (copyButton && (event.target === copyButton || copyButton.contains(event.target as Node))) ||
        (cancelButton && (event.target === cancelButton || cancelButton.contains(event.target as Node)))
      ) {
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
    handleSignP2P();
    if (walletMenuModal) {
      walletMenuModal.style.visibility = "hidden";
    }

    if (modalContent) {
      //cancel button
      const closeButton = document.getElementById("close-button-p2p-modal") as HTMLElement | null;
      const cancelButton = document.getElementById("cancel-button-p2p-modal") as HTMLElement | null;
      const titleModal = document.getElementById("p2p-modal-title") as HTMLElement | null;

      const cancelButtonElement = document.createElement("button");
      cancelButtonElement.innerHTML = "Cancel";
      cancelButtonElement.id = "cancel-button-p2p-modal";

      cancelButtonElement.addEventListener("click", () => {
        if (p2pOptionModal) {
          p2pOptionModal.style.display = "none";
        }
        if (walletMenuModal) {
          walletMenuModal.style.visibility = "visible";
        }
        Object.assign(modalContent.style, {
          visibility: "hidden",
          padding: 0
        });
      });

      Object.assign(cancelButtonElement.style, {
        marginTop: "20px",
        width: "100%",
        maxWidth: "100%",
        border: "none",
        background: theme.isDark ? theme.palette.primary.main : theme.palette.secondary.main,
        padding: "15px 20px",
        borderRadius: "8px",
        fontWeight: 700,
        fontSize: "16px",
        lineHeight: "19px",
        cursor: "pointer",
        textAlign: "center",
        color: theme.palette.secondary[0],
        textTransform: "none"
      });

      // close button
      const closeButtonElenment = document.createElement("img");

      closeButtonElenment.addEventListener("click", () => {
        setOpenModal(false);
        if (p2pOptionModal) {
          p2pOptionModal.style.display = "none";
        }
        Object.assign(modalContent.style, {
          visibility: "hidden",
          padding: 0
        });
      });

      closeButtonElenment.id = "close-button-p2p-modal";
      closeButtonElenment.src = theme.isDark ? closeIconDarkMode : CloseIcon;
      Object.assign(closeButtonElenment.style, {
        width: "30px",
        height: "30px",
        cursor: "pointer",
        position: "absolute",
        top: "15px",
        right: "15px",
        color: "#fff",
        stroke: "#fff"
      });
      closeButtonElenment.alt = "Close";
      closeButtonElenment.className = "close-button";

      //title modal

      const titleModalElement = document.createElement("h2");
      titleModalElement.innerHTML = t("account.connectP2PWallet");
      titleModalElement.id = "p2p-modal-title";
      !titleModal && modalContent.appendChild(titleModalElement);

      Object.assign(titleModalElement.style, {
        margin: "0 0 20px 0",
        fontWeight: 700,
        fontSize: "24px",
        lineHeight: "29px",
        position: "absolute",
        top: "40px",
        left: "40px",
        color: theme.palette.secondary.main
      });

      !cancelButton && modalContent.appendChild(cancelButtonElement);
      !closeButton && modalContent.appendChild(closeButtonElenment);
    }

    if (modalContent) {
      Object.assign(modalContent.style, {
        padding: "100px 80px 50px 80px",
        visibility: "visible",
        position: "relative",
        backgroundColor: theme.isDark ? theme.palette.secondary[0] : theme.palette.primary[100],
        border: "none",
        margin: "0"
      });
    }
    if (subtitle) {
      subtitle.style.maxWidth = "100%";
      subtitle.style.color = theme.palette.secondary.main;
    }
    if (modalContentInput) {
      Object.assign(modalContentInput.style, {
        backgroundColor: "transparent",
        color: theme.palette.secondary.main
      });
    }

    if (p2pOptionModal && modalContent) {
      Object.assign(p2pOptionModal.style, {
        display: "block",
        height: "auto",
        top: "50%",
        transform: "translate(-50%, -50%)",
        left: "50%"
      });

      if (copiedToast) {
        Object.assign(copiedToast.style, {
          display: "none"
        });
      }
    }
  });

  useEffect(() => {
    if (modalRegister || modalSignMessage) {
      setOpenModal(false);
    }
  }, [modalRegister, modalSignMessage]);

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
    <StyledModal open={openModal} title={t("common.connect2wallet.title")} handleCloseModal={handleClose}>
      <WrapContent
        sx={{
          padding: "0 40px",
          position: "static"
        }}
      >
        <ConnectWalletButton
          limitNetwork={NETWORK === NETWORKS.mainnet ? NetworkType.MAINNET : NetworkType.TESTNET}
          onConnect={handleConnect}
          onConnectError={(wallet, error) => {
            alert(error);
          }}
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
      </WrapContent>
    </StyledModal>
  );
};

export default ConnectWalletModal;
