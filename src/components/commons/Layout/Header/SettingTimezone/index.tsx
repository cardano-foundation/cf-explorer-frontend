import { useState, MouseEvent, useEffect } from "react";
import { useSessionStorage } from "react-use";
import { Button, useTheme, Popover, Box, Radio } from "@mui/material";
import moment from "moment-timezone";
import { t } from "i18next";

import { BlackWarningIcon, SettingTimezoneIcon } from "src/commons/resources";
import CustomTooltip from "src/components/commons/CustomTooltip";
import useAuth from "src/commons/hooks/useAuth";
import { authAxios } from "src/commons/utils/axios";
import { USER_API } from "src/commons/utils/api";

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
      <CustomTooltip title={t("common.timzoneNotice")}>
        <Button
          aria-describedby={id}
          type="button"
          onClick={handleClick}
          sx={{
            position: "relative",
            border: `2px solid ${theme.palette.primary[200]}`,
            width: 40,
            minWidth: 40,
            height: 40,
            borderRadius: 2,
            ":after": {
              content: "''",
              display: open ? "block" : "none",
              background: theme.palette.secondary[0],
              position: "absolute",
              bottom: "-20px",
              width: "14px",
              height: "16px",
              zIndex: 1,
              transform: "rotate(45deg)",
              boxShadow:
                "0px 5px 5px -3px rgba(0,0,0,0.1), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.1)",
              [theme.breakpoints.down("lg")]: {
                display: "none"
              }
            }
          }}
        >
          <SettingTimezoneIcon fill={theme.palette.secondary.light} />
        </Button>
      </CustomTooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          mt: 1,
          ".MuiPaper-root": { borderRadius: "8px", bgcolor: theme.palette.secondary[0], overflow: "visible" },
          [theme.breakpoints.down("lg")]: {
            display: "none"
          }
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
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const zoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zoneNameShort = moment.tz(zoneName).format("z");
  const timezone = moment.tz(zoneName).format("Z");

  const [timezoneSS, setTimezoneLS] = useSessionStorage("timezone", window.navigator.language);
  const [selectedTimeZone, setSelectedTimeZone] = useState(
    isLoggedIn
      ? `${localStorage.getItem("userTimezone")}` === "utc"
        ? "UTC"
        : localStorage.getItem("userTimezone") || "UTC"
      : zoneNameShort !== "UTC"
      ? timezoneSS
      : "UTC"
  );
  const timezoneText = `${zoneNameShort.indexOf("+") != -1 ? zoneName : zoneNameShort} (UTC ${timezone})`;

  useEffect(() => {
    if (selectedTimeZone.toLowerCase() !== "utc" && window.navigator.language !== timezoneSS) {
      sessionStorage.setItem("timezone", window.navigator.language);
      localStorage.setItem("userTimezone", window.navigator.language);
    }
  }, [window.navigator.language]);

  const hanldeSetUserTimezone = async (tz: string) => {
    setLoading(true);
    await authAxios
      .post(`${USER_API.SET_TIMEZONE}?timezone=${tz}`)
      .then((res) => res.data)
      .then((data) => {
        if (data) {
          setSelectedTimeZone(tz);
          localStorage.setItem("userTimezone", tz);
          window.location.reload();
        }
      })
      .finally(() => setLoading(false));
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoggedIn) {
      await hanldeSetUserTimezone(event.target.value);
    } else {
      setSelectedTimeZone(event.target.value);
      setTimezoneLS(event.target.value);
      window.location.reload();
    }
  };

  return (
    <Box
      p={2}
      px={4}
      borderRadius={2}
      width={"min(320px, 80vw)"}
      position={"relative"}
      bgcolor={theme.palette.secondary[0]}
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
        component={zoneNameShort === "UTC" ? CustomTooltip : Box}
        title={zoneNameShort === "UTC" ? t("common.timzoneNoticeDisnable") : undefined}
        placement="bottom"
      >
        <Box
          my={3}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          color={zoneNameShort === "UTC" ? theme.palette.secondary[600] : theme.palette.secondary.light}
        >
          <Box
            component={(timezoneText || "").length > 20 ? CustomTooltip : Box}
            title={(timezoneText || "").length > 20 ? timezoneText : undefined}
          >
            <Box maxWidth={"185px"} overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"}>
              {timezoneText}
            </Box>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            {moment(Date().toString()).format("HH:mm")}
            <Radio
              sx={{
                color: `${zoneNameShort === "UTC" ? theme.palette.secondary[600] : "none"} !important`,
                p: 0
              }}
              value={window.navigator.language}
              checked={window.navigator.language === selectedTimeZone || "UTC" !== selectedTimeZone}
              onChange={handleChange}
              disabled={zoneNameShort === "UTC" || loading}
            />
          </Box>
        </Box>
      </Box>

      <Box
        pb={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        color={theme.palette.secondary.light}
      >
        <Box>UTC</Box>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          {moment(Date().toString()).utc().format("HH:mm")}
          <Radio
            sx={{ p: 0 }}
            value={"UTC"}
            checked={"UTC" === selectedTimeZone}
            onChange={handleChange}
            disabled={loading}
          />
        </Box>
      </Box>
    </Box>
  );
};
