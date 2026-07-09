import { formatLocalTime } from "@/lib/time";
import { Hourly } from "@/types/weather-api";
import { Box, Typography } from "@mui/material";

import styles from "./css/hourly-forecast.module.css";

interface HourlyForecastProps {
  hourly: Hourly[];
  timezone: number;
}

export default function HourlyForecast({
  hourly,
  timezone,
}: HourlyForecastProps) {
  return (
    <Box className={styles.hourlySection}>
      <Typography className={styles.hourlyTitle}>Hourly Forecast</Typography>
      <Box className={styles.hourlyGrid}>
        {hourly.map((hour) => (
          <Box className={styles.hourCard} key={hour.dt}>
            <Typography className={styles.hourTime}>
              {formatLocalTime(hour.dt, timezone).replace(":00", "")}
            </Typography>
            <Typography className={styles.hourTemp}>
              {hour.temp.toFixed(0)}°
            </Typography>
            <Typography className={styles.hourCondition}>
              {hour.weather[0]?.main || "Weather"}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
