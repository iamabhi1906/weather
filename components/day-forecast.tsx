import { Daily } from "@/types/weather-api";
import { Box, Typography } from "@mui/material";
import styles from "./css/day-forecast.module.css";

interface DayWiseForecastProps {
  dayForecast: Daily[];
  timezoneOffset: number;
}

function formatDay(timestamp: number, timezoneOffset: number, index: number) {
  if (index === 0) return "Today";

  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    timeZone: "UTC",
  }).format(new Date((timestamp + timezoneOffset) * 1000));
}

export default function DayWiseForecast({
  dayForecast,
  timezoneOffset,
}: DayWiseForecastProps) {
  return (
    <Box className={styles.forecastRow}>
      {dayForecast.slice(0, 6).map((day, index) => (
        <Box
          className={`${styles.dayCard} ${index === 0 ? styles.active : ""}`}
          key={day.dt}
        >
          <Typography className={styles.dayName}>
            {formatDay(day.dt, timezoneOffset, index)}
          </Typography>
          <Typography className={styles.dayTemp}>
            {day.temp.day.toFixed(0)}°
          </Typography>
          <Typography className={styles.dayCondition}>
            {day.weather[0]?.main || "Weather"}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
