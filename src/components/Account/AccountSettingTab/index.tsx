import { useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { useHistory } from "react-router-dom";

import { useScreen } from "src/commons/hooks/useScreen";
import { removeAuthInfo } from "src/commons/utils/helper";
import { routers } from "src/commons/routers";

import { StyledButton, StyledHelper, StyledInput, StyledLabel, StyledRowItem, WrapRowItem } from "./styles";

type TRowItem = {
  label: string;
  value?: string;
  errorMsg?: string;
  action: () => void;
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  disabledButton?: boolean;
  field: "email" | "username" | "wallet";
  loading?: boolean;
};

const RowItem: React.FC<TRowItem> = ({
  label,
  value,
  errorMsg,
  onChangeValue,
  action,
  disabled = false,
  field,
  disabledButton = false,
  loading = false
}) => {
  const { isTablet } = useScreen();
  return (
    <WrapRowItem>
      <StyledLabel>{label}</StyledLabel>
      <Box marginBottom={"40px"}>
        {!isTablet ? (
          <StyledRowItem>
            <StyledInput disabled={disabled || loading} value={value} onChange={onChangeValue} placeholder={label} />
            <StyledButton
              loading={loading}
              onClick={action}
              disabled={(["email", "username"].includes(field) && !value) || disabledButton}
            >
              Change
            </StyledButton>
          </StyledRowItem>
        ) : (
          <>
            <StyledRowItem marginTop={"10px"}>
              <StyledInput disabled={disabled || loading} value={value} onChange={onChangeValue} placeholder={label} />
            </StyledRowItem>
            <StyledButton
              loading={loading}
              onClick={action}
              disabled={(["email", "username"].includes(field) && !value) || disabledButton}
              sx={{ marginTop: "10px", marginLeft: 0 }}
            >
              Change
            </StyledButton>
          </>
        )}
      </Box>
      <StyledHelper>{errorMsg}</StyledHelper>
    </WrapRowItem>
  );
};

type TFieldInput = {
  value?: string;
  errorMsg?: string;
};

const AccountSettingTab: React.FC = () => {
  const { userData } = useSelector(({ user }: RootState) => user);
  const { disconnect } = useCardano();
  const history = useHistory();
  const [wallet, setWallet] = useState<TFieldInput>({ value: userData?.wallet });

  const onTransferWallet = async () => {
    try {
      disconnect();
      removeAuthInfo();
      history.push(routers.HOME);
    } catch (error) {
      //To do
    }
  };

  return (
    <Box textAlign="left">
      <RowItem
        label="Connected Wallet "
        value={wallet.value}
        errorMsg={wallet.errorMsg}
        onChangeValue={(event) => setWallet({ value: event.target.value, errorMsg: "" })}
        action={onTransferWallet}
        field="wallet"
      />
    </Box>
  );
};

export default AccountSettingTab;
