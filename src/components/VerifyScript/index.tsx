import { useCallback, useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { defaultAxios } from "src/commons/utils/axios";
import { API } from "src/commons/utils/api";

import VerifySCriptModal from "./VerifyScriptModal";
import { BannerSuccess, StyledVerifyButton, VerifyScriptContainer } from "./styles";

export interface IVerifyScript {
  verified: boolean;
  refresh: () => void;
}

export const VerifyScript = ({ verified, refresh }: IVerifyScript) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { address } = useParams<{ address: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);

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
      const res = await defaultAxios.post(API.CONTRACTS.VERIFY_SCRIPT(address, encodeURI(script)));
      if (res?.data as boolean) {
        await refresh();
        setShowBanner(true);
        handleCloseModal();
      } else {
        throw Error("");
      }
    } catch (err) {
      setErrorMessage("Invalid script, please try again");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <VerifyScriptContainer>
        <Box>Contract Detail</Box>
        <StyledVerifyButton onClick={handleClickVerifyButton} verified={verified}>
          {verified ? "VERIFIED SCRIPT " : "VERIFY SCRIPT"}
        </StyledVerifyButton>
      </VerifyScriptContainer>
      {showBanner && <BannerSuccess>Success! Contract has been verified successfully.</BannerSuccess>}
      {openModal && (
        <VerifySCriptModal
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
