import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { details } from "src/commons/routers";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { FlexCenter, TruncateSubTitleContainer } from "src/components/share/styled";

import { TextLabel, TextValue } from "./styles";

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
              <FlexCenter key={value} sx={{ paddingBottom: "15px", overflow: "scroll", justifyContent: "flex-start" }}>
                <TextLabel>{label}: </TextLabel>
                <TextValue>
                  <CustomTooltip title={value}>
                    <Box
                      color={({ palette }) => `${palette.primary.main} !important`}
                      component={Link}
                      to={details.stake(value)}
                    >
                      <TruncateSubTitleContainer display={"grid"}>
                        <DynamicEllipsisText value={value} isCoppy={true} />
                      </TruncateSubTitleContainer>
                    </Box>
                  </CustomTooltip>
                </TextValue>
              </FlexCenter>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};
export default StakeKeyBox;
