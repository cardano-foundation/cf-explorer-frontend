import { useCallback, useContext, useState, SetStateAction, Dispatch } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { defaultAxios } from "src/commons/utils/axios";
import { VerifyScriptContext } from "src/pages/ContractDetail";
import { API } from "src/commons/utils/api";

import VerifyScriptModal from "./VerifyScriptModal";
import { StyledVerifyButton, VerifyScriptContainer } from "./styles";
import { Uppercase } from "../commons/CustomText/styles";

export interface IVerifyScript {
  verified: boolean;
  setShowBanner?: Dispatch<SetStateAction<boolean>>;
}

export const VerifyScript = ({ verified, setShowBanner }: IVerifyScript) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { address } = useParams<{ address: string }>();
  const [loading, setLoading] = useState<boolean>(false);

  const { refreshOverviewAddress, refreshScriptTab } = useContext(VerifyScriptContext);

  const handleClickVerifyButton = useCallback(() => {
    if (verified) return;
    setOpenModal(true);
  }, [verified]);

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
      <VerifyScriptContainer>
        <Box>{t("head.page.constactDetails")}</Box>
        <StyledVerifyButton onClick={handleClickVerifyButton} verified={+verified}>
          <Uppercase> {verified ? t("common.verifiedScript") + " " : t("common.verifyScript")}</Uppercase>
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
