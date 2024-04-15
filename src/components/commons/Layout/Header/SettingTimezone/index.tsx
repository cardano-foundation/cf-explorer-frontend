import { useState, MouseEvent } from "react";
import { useLocalStorage } from "react-use";
import { Button, useTheme, Popover, Box, Radio } from "@mui/material";
import moment from "moment-timezone";
import { t } from "i18next";

import { BlackWarningIcon, SettingTimezoneIcon } from "src/commons/resources";
import CustomTooltip from "src/components/commons/CustomTooltip";

export default function SettingTimezone() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        sx={{ border: `2px solid ${theme.palette.primary[200]}`, width: 40, minWidth: 40, height: 40, borderRadius: 2 }}
      >
        <SettingTimezoneIcon fill={theme.palette.secondary.light} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          mt: 1,
          ".MuiPaper-root": { borderRadius: "8px", bgcolor: theme.palette.secondary[0], overflow: "visible" }
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <TimezoneCard />
      </Popover>
    </div>
  );
}

const TimezoneCard = () => {
  const theme = useTheme();

  const zoneName = moment.tz.guess();
  const zoneNameShort = moment.tz(zoneName).format("z");
  const timezone = moment.tz(zoneName).format("Z");
  const [timezoneLS, setTimezoneLS] = useLocalStorage("timezone", window.navigator.language);
  const [selectedTimeZone, setSelectedTimeZone] = useState(timezoneLS);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTimeZone(event.target.value);
    setTimezoneLS(event.target.value);
    window.location.reload();
  };

  return (
    <Box
      p={2}
      px={4}
      borderRadius={2}
      width={"min(300px, 80vw)"}
      position={"relative"}
      bgcolor={theme.palette.secondary[0]}
      sx={{
        ":after": {
          content: "''",
          display: "block",
          background: theme.palette.secondary[0],
          position: "absolute",
          top: "-6px",
          left: "12px",
          width: "14px",
          height: "16px",
          transform: "rotate(45deg)"
        }
      }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={1}
        fontWeight={"bold"}
        color={theme.palette.secondary.main}
      >
        {t("common.timzoneFormat")}
        <Box
          component={CustomTooltip}
          title={
            <Box textAlign={"left"} width={"min(280px, 80vw)"}>
              {t("common.timzoneFormat.des")}
            </Box>
          }
          placement="bottom-start"
          pr={"10px"}
        >
          <BlackWarningIcon />
        </Box>
      </Box>

      <Box
        py={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        color={theme.palette.secondary.light}
      >
        <Box>
          {zoneNameShort.indexOf("+") != -1 ? zoneName : zoneNameShort} (UTC{" "}
          {timezone.replace("0", timezone.charAt(1) === "0" ? "" : "0").split(":")[0]})
        </Box>
        <Box>
          {moment(Date().toString()).format("HH:mm")}
          <Radio
            value={window.navigator.language}
            checked={window.navigator.language === selectedTimeZone}
            onChange={handleChange}
          />
        </Box>
      </Box>

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        color={theme.palette.secondary.light}
      >
        <Box>UTC</Box>
        <Box>
          {moment(Date().toString()).utc().format("HH:mm")}
          <Radio value={"UTC"} checked={"UTC" === selectedTimeZone} onChange={handleChange} />
        </Box>
      </Box>
    </Box>
  );
};
