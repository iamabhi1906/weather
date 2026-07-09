import { CitySearchResult } from "@/types/city-result";
import { Stack, Typography } from "@mui/material";
import styles from "./css/top-bar.module.css";
import CitySearchInput from "./city-search-bar";
import { CitySearch } from "@/types/city-result";

interface TopBarProps {
  city?: CitySearchResult;
  onCitySelect?: (city: CitySearch) => void;
}

function date() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
}

export default function TopBar({ city, onCitySelect }: TopBarProps) {
  return (
    <Stack direction={"row"} className={styles.topBarWrapper}>
      <Typography variant="h5" className={styles.cityInfo}>
        {city?.city || "Your city"}
        {city?.countryName ? `, ${city.countryName}` : ""}
      </Typography>
      <CitySearchInput onCitySelect={onCitySelect} />
      <Typography className={styles.cityInfo} variant="h5">
        {date()}
      </Typography>
    </Stack>
  );
}
