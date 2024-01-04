import { Box, styled, Button, FilledInput, InputAdornment, IconButton, useTheme } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import CustomModal from "../commons/CustomModal";

export type PassphraseDecryptModalProps = {
  open: boolean;
  onClose: () => void;
  error: string;
  setError: (error: string) => void;
  hanldeDecrypt: () => void;
  setPassphrasse: (pass: string) => void;
};
const PassphraseDecryptModal: React.FC<PassphraseDecryptModalProps> = ({
  error,
  setError,
  hanldeDecrypt,
  setPassphrasse,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <CustomModal
      modalContainerProps={{ style: { maxWidth: 920 } }}
      open={props.open}
      style={{ maxHeight: "unset", overflow: "unset" }}
      onClose={props.onClose}
      title={t("CIP83.decryptMessage")}
    >
      <ModalContent>
        <Box fontWeight={"bold"} color={theme.palette.secondary.light}>
          {t("CIP83.passphrase")}:
        </Box>
        <FilledInput
          hiddenLabel
          onChange={(e) => {
            setPassphrasse(e.target.value);
            setError("");
          }}
          sx={{
            width: "100%",
            maxWidth: 600,
            border: `1px solid ${error ? theme.palette.error[800] : "#E0E0E0"}`,
            marginTop: 2,
            color: theme.palette.secondary.light,
            borderRadius: 2,
            bgcolor: theme.palette.secondary[0],
            ":hover": {
              bgcolor: theme.palette.secondary[0]
            },
            [theme.breakpoints.up("sm")]: {
              minWidth: 400
            }
          }}
          placeholder="Enter Passphrase"
          type={showPassword ? "text" : "password"}
          disableUnderline={true}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? (
                  <MdOutlineVisibilityOff color={theme.palette.secondary.light} />
                ) : (
                  <MdOutlineVisibility color={theme.palette.secondary.light} />
                )}
              </IconButton>
            </InputAdornment>
          }
        />

        {!!error && (
          <Box mt={1} fontSize={12} color={theme.palette.error[800]}>
            Incorrect passphrase. Try again.
          </Box>
        )}

        <Box component={DecryptButton} mt={2} display={"block"} onClick={hanldeDecrypt}>
          {t("CIP83.decryptMessage")}
        </Box>
      </ModalContent>
    </CustomModal>
  );
};

export default PassphraseDecryptModal;

const ModalContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.isDark ? theme.palette.secondary[100] : theme.palette.secondary[0],
  boxShadow: `1px 2px 4px 0px rgba(67, 70, 86, 0.2)`,
  borderRadius: theme.spacing(1)
}));

const DecryptButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  color: theme.palette.secondary[0],
  fontWeight: "bold",
  fontSize: 14,
  padding: theme.spacing(1, 2),
  background: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
  ":hover": {
    background: theme.palette.primary.dark
  }
}));
