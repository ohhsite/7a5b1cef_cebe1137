// utils/theme.ts
import configData from "../data/config.json";
import { ConfigData } from "../../types";

export const setThemeColors = () => {
  const typedConfigData = configData as ConfigData;
  const colors = typedConfigData.colors;
  
  // Ustawianie zmiennych CSS na podstawie konfiguracji
  document.documentElement.style.setProperty('--color-primary', colors.primary);
  document.documentElement.style.setProperty('--color-secondary', colors.secondary);
  document.documentElement.style.setProperty('--color-accent', colors.accent);
  document.documentElement.style.setProperty('--color-dark', colors.dark);
  document.documentElement.style.setProperty('--color-light', colors.light);
  document.documentElement.style.setProperty('--color-white', colors.white);
  document.documentElement.style.setProperty('--color-black', colors.black);
  document.documentElement.style.setProperty('--color-text-primary', colors.textPrimary);
  document.documentElement.style.setProperty('--color-text-secondary', colors.textSecondary);
  document.documentElement.style.setProperty('--color-text-gray', colors.textGray);
  document.documentElement.style.setProperty('--color-background', colors.background);
  document.documentElement.style.setProperty('--color-background-light', colors.backgroundLight);
  document.documentElement.style.setProperty('--color-background-dark', colors.backgroundDark);
};