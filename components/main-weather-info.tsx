import { OneCallResponse } from "@/types/weather-api";
import { Box, Stack, Typography } from "@mui/material";
import styles from "./css/main-weather-info.module.css";
import AirIcon from "@mui/icons-material/Air";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";

interface MainWeatherInfoProps {
  weather: OneCallResponse;
}

export default function MainWeatherInfo({ weather }: MainWeatherInfoProps) {
  const current = weather.current;
  const condition = current.weather[0]?.main || "Weather";

  return (
    <Box className={styles.mainWeatherInfoWrapper}>
      <Stack direction="row" className={styles.temperatureRow}>
        <Typography variant="h1" className={styles.temp}>
          {current.temp.toFixed(0)}
          <span className={styles.degree}>°</span>
        </Typography>
        <Stack className={styles.stats}>
          <Stack direction="row" className={styles.statItem}>
            <AirIcon />
            <Typography>{current.wind_speed.toFixed(1)} m/s</Typography>
          </Stack>
          <Stack direction="row" className={styles.statItem}>
            <WaterDropOutlinedIcon />
            <Typography>{current.humidity} %</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Typography className={styles.condition}>{condition}</Typography>
    </Box>
  );
}
