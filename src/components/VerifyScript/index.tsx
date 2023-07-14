import { useCallback, useContext, useState, SetStateAction, Dispatch } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { defaultAxios } from "src/commons/utils/axios";
import { API } from "src/commons/utils/api";
import { VerifyScriptContext } from "src/pages/ContractDetail";

import VerifyScriptModal from "./VerifyScriptModal";
import { StyledVerifyButton, VerifyScriptContainer } from "./styles";

export interface IVerifyScript {
  verified: boolean;
  setShowBanner?: Dispatch<SetStateAction<boolean>>;
}

export const VerifyScript = ({ verified, setShowBanner }: IVerifyScript) => {
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
      console.error(err);
      setErrorMessage("Invalid script, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <VerifyScriptContainer>
        <Box>Contract Details</Box>
        <StyledVerifyButton onClick={handleClickVerifyButton} verified={+verified}>
          {verified ? "VERIFIED SCRIPT " : "VERIFY SCRIPT"}
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
