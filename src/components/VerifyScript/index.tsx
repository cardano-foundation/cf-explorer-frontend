import { useCallback, useContext, useState } from "react";
import { BannerSuccess, StyledVerifyButton, VerifyScriptContainer } from "./styles";
import VerifySCriptModal from "./VerifyScriptModal";
import { defaultAxios } from "src/commons/utils/axios";
import { API } from "src/commons/utils/api";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { VerifyScriptContext } from "src/pages/ContractDetail";

export interface IVerifyScript {
  verified: boolean;
}

export const VerifyScript = ({ verified }: IVerifyScript) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { address } = useParams<{ address: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);

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
        setShowBanner(true);
        setTimeout(() => setShowBanner(false), 3000);
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
