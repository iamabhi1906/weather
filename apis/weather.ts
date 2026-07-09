import { GetWeatherProps, OneCallResponse } from "@/types/weather-api";
import axios from "axios";

const UNIT = "metric";
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API;

const WeatherAPI = {
  async getWeather(props: GetWeatherProps): Promise<OneCallResponse> {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall`,
        {
          params: {
            lat: props.latitude,
            lon: props.longitude,
            units: props.units || UNIT,
            exclude: props.exclude,
            appid: API_KEY,
          },
        },
      );
      return await response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching weather data:",
          error.response?.data || error.message,
        );
      } else if (error instanceof Error) {
        console.error("Error fetching weather data:", error.message);
      } else {
        console.error("Error fetching weather data:", error);
      }
      throw error;
    }
  },
};

export default WeatherAPI;
