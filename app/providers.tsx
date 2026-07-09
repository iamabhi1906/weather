"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeProviderComp from "./theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProviderComp>{children}</ThemeProviderComp>
    </AppRouterCacheProvider>
  );
}
