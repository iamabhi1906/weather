import { CurrentWeather } from "@/types/weather-api";
import { Air, WaterDropOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import styles from "./css/mini-weather-condition.module.css";

interface MiniWeatherConditionProps {
  current: CurrentWeather;
  condition: string;
}

export default function MiniWeatherCondition({
  current,
  condition,
}: MiniWeatherConditionProps) {
  return (
    <Box>
      <Box className={styles.currentMini}>
        <Typography className={styles.miniTemp}>
          {current.temp.toFixed(0)}°
        </Typography>
        <Typography className={styles.miniMetric}>
          <Air /> {current.wind_speed.toFixed(1)} m/s
        </Typography>
        <Typography className={styles.miniMetric}>
          <WaterDropOutlined /> {current.humidity} %
        </Typography>
      </Box>
      <Typography className={styles.feelsLike}>
        Feels like {current.feels_like.toFixed(0)}°
      </Typography>
      <Typography className={styles.sideCondition}>{condition}</Typography>
    </Box>
  );
}
