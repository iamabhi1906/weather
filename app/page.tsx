"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { getCoordinates } from "@/services/current-location";
import WeatherAPI from "@/apis/weather";
import { OneCallResponse } from "@/types/weather-api";
import { CitySearch, CitySearchResult } from "@/types/city-result";
import { fetchCityInfo } from "@/services/city-info";
import TopBar from "@/components/top-bar";
import MainWeatherInfo from "@/components/main-weather-info";
import DayWiseForecast from "@/components/day-forecast";
import { getWeatherVideo } from "@/services/get-wallpaper";
import { formatLocalTime, getGreeting } from "@/lib/time";
import HourlyForecast from "@/components/hourly-forecast";
import MiniWeatherCondition from "@/components/mini-weather-condition";
import { cityFallback } from "@/lib/city";
import BackgroundSelector from "@/components/backgroud-select";

export default function Home() {
  const [weather, setWeather] = useState<OneCallResponse | null>(null);
  const [city, setCity] = useState<CitySearchResult>();
  const [error, setError] = useState<string | null>(null);
  const [videoSrc, setVideoSrc] = useState<string>();

  async function loadWeather(
    coordinate: { latitude: number; longitude: number },
    fallbackCity?: CitySearchResult,
  ) {
    setError(null);
    const weatherData = await WeatherAPI.getWeather(coordinate);
    setWeather(weatherData);
    const weatherVideoSrc = getWeatherVideo(
      weatherData.current.weather[0].id,
      weatherData.current.weather[0].icon,
    );
    setVideoSrc(weatherVideoSrc);
    try {
      const city = await fetchCityInfo(coordinate);
      setCity(city);
    } catch {
      if (fallbackCity) setCity(fallbackCity);
    }
  }

  useEffect(() => {
    async function load() {
      try {
        const coordinate = await getCoordinates();
        await loadWeather(coordinate);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch weather");
      }
    }

    load();
  }, []);

  const handleCitySelect = async (selectedCity: CitySearch) => {
    const fallback = cityFallback(selectedCity);
    setCity(fallback);
    try {
      await loadWeather(
        {
          latitude: selectedCity.latitude,
          longitude: selectedCity.longitude,
        },
        fallback,
      );
    } catch (error) {
      console.log(error);
      setError("Failed to fetch weather for this city");
    }
  };

  if (!weather) {
    return (
      <Box className={styles.loading}>
        <Typography>{error || "Loading weather..."}</Typography>
      </Box>
    );
  }

  const current = weather.current;
  const currentWeather = current.weather[0];
  const condition = currentWeather?.main || "Weather";
  const isNight = currentWeather?.icon.endsWith("n") ?? false;
  const hourly = weather.hourly.slice(1, 7);

  return (
    <Box className={styles.page}>
      <video
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className={styles.backgroundVideo}
      >
        <source src={`/videos/${videoSrc}`} type="video/mp4" />
      </video>
      <Box className={styles.videoOverlay} />
      <Paper
        className={`${styles.paper} ${isNight ? styles.nightPaper : styles.dayPaper}`}
        elevation={3}
      >
        <Box className={styles.mainPanel}>
          <TopBar city={city} onCitySelect={handleCitySelect} />
          <BackgroundSelector
            weatherId={currentWeather?.id ?? 800}
            icon={currentWeather?.icon ?? "01d"}
            onChange={(video) => {
              console.log(video);
              return setVideoSrc(video);
            }}
          />
          <Box className={styles.centerWeather}>
            <MainWeatherInfo weather={weather} />
          </Box>
          <DayWiseForecast
            dayForecast={weather.daily}
            timezoneOffset={weather.timezone_offset}
          />
        </Box>
        <Box className={styles.sidePanel}>
          <Box className={styles.sideHeader}>
            <Typography className={styles.greeting}>
              {getGreeting(current.dt, weather.timezone_offset)}
            </Typography>
            <Typography className={styles.clock}>
              {formatLocalTime(current.dt, weather.timezone_offset)}
            </Typography>
          </Box>

          <MiniWeatherCondition
            current={weather.current}
            condition={condition}
          />
          <HourlyForecast hourly={hourly} timezone={weather.timezone_offset} />
        </Box>
      </Paper>
    </Box>
  );
}
