import { useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { getWeatherVideo } from "@/services/get-wallpaper";

type BackgroundVideo =
  | "auto"
  | "clear_day.mp4"
  | "clear_night.mp4"
  | "cloudy.mp4"
  | "broken_clouds.mp4"
  | "drizzle.mp4"
  | "thunderstorm.mp4"
  | "snow.mp4"
  | "windy.mp4"
  | "smoke.mp4"
  | "ash.mp4"
  | "tornado.mp4";

const backgrounds: { value: BackgroundVideo; label: string }[] = [
  { value: "auto", label: "Auto (Weather)" },
  { value: "clear_day.mp4", label: "Clear Day" },
  { value: "clear_night.mp4", label: "Clear Night" },
  { value: "cloudy.mp4", label: "Cloudy" },
  { value: "broken_clouds.mp4", label: "Broken Clouds" },
  //   { value: "drizzle.mp4", label: "Drizzle" },
  { value: "thunderstorm.mp4", label: "Thunderstorm" },
  { value: "snow.mp4", label: "Snow" },
  { value: "windy.mp4", label: "Windy" },
  //   { value: "smoke.mp4", label: "Smoke" },
  { value: "ash.mp4", label: "Ash" },
  { value: "tornado.mp4", label: "Tornado" },
];

interface BackgroundSelectorProps {
  weatherId: number;
  icon: string;
  onChange: (value: BackgroundVideo) => void;
}

export default function BackgroundSelector({
  weatherId,
  icon,
  onChange,
}: BackgroundSelectorProps) {
  const [background, setBackground] = useState<BackgroundVideo>("auto");

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as BackgroundVideo;
    setBackground(event.target.value as BackgroundVideo);
    if (selectedValue === "auto") {
      onChange(getWeatherVideo(weatherId, icon));
    } else {
      onChange(selectedValue);
    }
  };

  return (
    <Box>
      <FormControl size="small">
        <Select
          labelId="background-select-label"
          value={background}
          onChange={handleChange}
        >
          {backgrounds.map((bg) => (
            <MenuItem key={bg.value} value={bg.value}>
              {bg.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
