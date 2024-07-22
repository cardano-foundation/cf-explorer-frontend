import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { lists } from "src/commons/routers";

import { ContainerHeader, Header, HeaderButton } from "./styles";
function ProtocolHeader() {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <ContainerHeader>
      <Header>{t("common.protocolParameters")}</Header>
      <HeaderButton variant="contained" onClick={() => history.push(lists.protocolParameters("histories"))}>
        {t("common.viewUpdateHistory")}
      </HeaderButton>
    </ContainerHeader>
  );
}

export default ProtocolHeader;
