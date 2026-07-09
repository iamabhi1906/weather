"use client";

import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

import { CitySearch } from "@/types/city-result";
import { getCity } from "@/api/city-search";

import styles from "./css/top-bar.module.css";

interface CitySearchInputProps {
  onCitySelect?: (city: CitySearch) => void;
}

export default function CitySearchInput({
  onCitySelect,
}: CitySearchInputProps) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<CitySearch[]>([]);
  const [loading, setLoading] = useState(false);

  const executeCitySearch = (city: CitySearch | string | null) => {
    if (!city || typeof city === "string") return;
    onCitySelect?.(city);
  };

  useEffect(() => {
    const search = async () => {
      if (query.length < 2) {
        setOptions([]);
        return;
      }
      setLoading(true);
      try {
        const data = await getCity(query);
        setOptions(data);
      } finally {
        setLoading(false);
      }
    };
    const timeout = setTimeout(search, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      loading={loading}
      className={styles.searchBar}
      filterOptions={(x) => x}
      getOptionKey={(option) =>
        typeof option === "string" ? option : option.id
      }
      getOptionLabel={(option) => {
        if (typeof option === "string") return option;
        return `${option.name}${
          option.admin1 ? `, ${option.admin1}` : ""
        }, ${option.country}`;
      }}
      onInputChange={(_, value) => setQuery(value)}
      onChange={(_, value) => executeCitySearch(value)}
      noOptionsText="No cities found"
      loadingText="Searching..."
      fullWidth
      size="small"
      renderInput={(params) => (
        <TextField {...params} placeholder="Search city..." />
      )}
    />
  );
}
