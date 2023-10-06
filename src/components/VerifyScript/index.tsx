import { Button } from "@mui/material";
import { Dispatch, SetStateAction, useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { API } from "src/commons/utils/api";
import { defaultAxios } from "src/commons/utils/axios";
import { VerifyScriptContext } from "src/pages/ContractDetail";

import VerifyScriptModal from "./VerifyScriptModal";
import { StyledVerifyButton, VerifyScriptContainer } from "./styles";

export interface IVerifyScript {
  setShowBanner?: Dispatch<SetStateAction<boolean>>;
}

export const VerifyScript = ({ setShowBanner }: IVerifyScript) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { address } = useParams<{ address: string }>();
  const [loading, setLoading] = useState<boolean>(false);

  const { refreshOverviewAddress, refreshScriptTab } = useContext(VerifyScriptContext);

  const handleClickVerifyButton = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setErrorMessage("");
  }, []);

  const verifyScript = async (script: string) => {
    try {
      if (!script) {
        throw Error("");
      }
      setLoading(true);
      const res = await defaultAxios.post(API.CONTRACTS.VERIFY_SCRIPT, {
        address,
        script
      });
      if (res?.data as boolean) {
        refreshOverviewAddress();
        refreshScriptTab?.();
        setShowBanner?.(true);
        setTimeout(() => setShowBanner?.(false), 3000);
        handleCloseModal();
      } else {
        throw Error("");
      }
    } catch (err) {
      // Todo: handle error
      setErrorMessage(t("message.invalidScript"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <VerifyScriptContainer id="VerifyScriptContainer">
        <StyledVerifyButton component={Button} onClick={handleClickVerifyButton}>
          {t("common.verifyScript")}
        </StyledVerifyButton>
      </VerifyScriptContainer>
      {openModal && (
        <VerifyScriptModal
          open={openModal}
          handleCloseModal={handleCloseModal}
          onSubmit={verifyScript}
          error={errorMessage}
          loading={loading}
        />
      )}
    </>
  );
};

export default VerifyScript;
