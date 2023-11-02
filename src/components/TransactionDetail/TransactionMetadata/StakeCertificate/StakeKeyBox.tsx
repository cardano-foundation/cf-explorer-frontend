import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { details } from "src/commons/routers";

import { EllipsisContainer, StyledItem, TextLabel, TextValue } from "./styles";

type TProps = {
  data: TStakeCertificated;
};

const StakeKeyBox = ({ data }: TProps) => {
  const { t } = useTranslation();
  const leftRow = [
    {
      label: t("common.stakeAddress"),
      value: data.stakeAddress,
      originValue: data.stakeAddress
    }
  ];

  return (
    <Box pt={"15px"}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {leftRow.map(({ label, value }) => {
            return (
              <StyledItem key={value}>
                <TextLabel>{label}: </TextLabel>
                <TextValue>
                  <Box
                    color={({ palette }) => `${palette.primary.main} !important`}
                    component={Link}
                    to={details.stake(value)}
                  >
                    <EllipsisContainer>
                      <DynamicEllipsisText value={value} isCopy isTooltip customTruncateFold={[4, 6]} />
                    </EllipsisContainer>
                  </Box>
                </TextValue>
              </StyledItem>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};
export default StakeKeyBox;
