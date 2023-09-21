import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { useKey } from "react-use";
import { useTranslation } from "react-i18next";

import { HeaderSearchIconComponent, WhiteSearchIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import InfoGraphicModal from "src/components/InfoGraphicModal";
import { useScreen } from "src/commons/hooks/useScreen";
import { getRandomInt } from "src/commons/utils/helper";
import { BROWSE_POOL_IDS, BROWSE_STAKE_ADDRESSES } from "src/commons/utils/constants";

import DropdownMenu from "../commons/DropdownMenu";
// eslint-disable-next-line import/order
import {
  StyledContainer,
  Title,
  SearchTitle,
  InfoLink,
  SearchContainer,
  StyledInput,
  SubmitButton,
  Image,
  SearchButton,
  TextOR,
  ExampleBox
} from "./styles";

enum BROWSE_VALUES {
  DELEGATOR = "DELEGATOR",
  STAKE_POOL = "STAKE_POOL"
}

import CustomIcon from "../commons/CustomIcon";

const StakingLifeCycleSearch = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const history = useHistory();
  const { isMobile } = useScreen();
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const BROWSER_OPTIONS = [
    {
      label: t("dropdown.browseDelegator"),
      value: BROWSE_VALUES.DELEGATOR
    },
    {
      label: t("dropdown.stakePool"),
      value: BROWSE_VALUES.STAKE_POOL
    }
  ];

  const hanldeSearch = () => {
    if (!value) {
      setError(t("message.noResultsFound"));
    }
    if (value.startsWith("stake")) {
      history.push(details.staking(value, "timeline"));
    } else if (value.startsWith("pool")) {
      history.push(details.spo(value, "timeline"));
    } else setError(t("message.noResultsFound"));
  };
  useKey("enter", hanldeSearch);

  useEffect(() => {
    document.title = "Welcome to Staking Lifecycle | Cardano Blockchain Explorer";
  }, []);

  const handleSelect = (value: string) => {
    if (value === BROWSE_VALUES.DELEGATOR) {
      const rndIndex = getRandomInt(BROWSE_STAKE_ADDRESSES.length);
      history.push(details.staking(BROWSE_STAKE_ADDRESSES[rndIndex]));
    } else {
      const rndIndex = getRandomInt(BROWSE_POOL_IDS.length);
      history.push(details.spo(BROWSE_POOL_IDS[rndIndex]));
    }
  };

  return (
    <StyledContainer>
      <Title data-testid="staking-lifecycle-title">
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={isMobile ? "column" : "row"}
        >
          <Box fontSize={isMobile ? "32px" : "48px"} whiteSpace={"nowrap"}>
            {t("glossary.stakingLifecycle")}
          </Box>
        </Box>
      </Title>
      <SearchTitle>
        {t("common.searchPoolDesc")}
        <InfoLink onClick={() => setOpenInfoModal((pre) => !pre)}>{t("common.whatCardano")}</InfoLink>
      </SearchTitle>
      <Box>
        <SearchContainer mx={"auto"}>
          <StyledInput
            placeholder={t("slc.typeStakeOrPool")}
            onChange={(e) => {
              setValue(e.target.value.trim());
              setError("");
            }}
            value={value}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                hanldeSearch();
              }
            }}
          />
          <SubmitButton onClick={hanldeSearch}>
            <CustomIcon icon={HeaderSearchIconComponent} stroke={theme.palette.secondary.light} height={22} />
          </SubmitButton>
        </SearchContainer>
        <Box color={({ palette }) => palette.error[700]} sx={{ marginBottom: "20px" }}>
          {error}
        </Box>
      </Box>
      <InfoGraphicModal open={openInfoModal} onClose={() => setOpenInfoModal(false)} />
      <ExampleBox bgcolor={"blue"}>
        <SearchButton onClick={hanldeSearch}>
          <Image src={WhiteSearchIcon} alt="Search button" /> {t("common.search")}
        </SearchButton>
        <TextOR>{t("common.or")}</TextOR>
        <DropdownMenu options={BROWSER_OPTIONS} title="Browse" handleSelect={handleSelect} />
      </ExampleBox>
    </StyledContainer>
  );
};

export default StakingLifeCycleSearch;
