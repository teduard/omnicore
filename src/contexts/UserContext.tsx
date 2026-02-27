import { createContext, useState, useEffect, type ReactNode } from "react";
import {
  applyDensity,
  applyMode,
  Density,
  Mode,
} from "@cloudscape-design/global-styles";
import { logger } from "../lib/logger";
//import type { Theme } from "@cloudscape-design/components/theming";

const UserContext = createContext(null);
{
  /*
const mainTheme: Theme = {
      tokens: {
      // Values are applied globally, except for visual contexts
      colorBackgroundLayoutMain: {
          // Specify value for light and dark mode
          light: 'white',
          dark: 'blue'
      },
      // Shorter syntax to apply the same value for both light and dark mode
      colorTextAccent: '#0073bb',
   },
   contexts: {
      // Values for visual contexts. Unless specified, default values will be applied
      'top-navigation': {
         tokens: {
            //colorTextAccent: '#f00',
            colorBackgroundContainerContent: '#173451',
         },
      },
      //header: {...},
      //flashbar: {...},
      //alert: {...},
   },
   };
*/
}
const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];
const currencyOptions = [
  { value: "AUD", label: "Australian Dollar" },
  { value: "BRL", label: "Brazilian Real" },
  { value: "CAD", label: "Canadian Dollar" },
  { value: "CHF", label: "Swiss Franc" },
  { value: "CNY", label: "Chinese Renminbi Yuan" },
  { value: "CZK", label: "Czech Koruna" },
  { value: "DKK", label: "Danish Krone" },
  { value: "EUR", label: "Euro" },
  { value: "GBP", label: "British Pound" },
  { value: "HKD", label: "Hong Kong Dollar" },
  { value: "HUF", label: "Hungarian Forint" },
  { value: "IDR", label: "Indonesian Rupiah" },
  { value: "ILS", label: "Israeli New Shekel" },
  { value: "INR", label: "Indian Rupee" },
  { value: "ISK", label: "Icelandic Króna" },
  { value: "JPY", label: "Japanese Yen" },
  { value: "KRW", label: "South Korean Won" },
  { value: "MXN", label: "Mexican Peso" },
  { value: "MYR", label: "Malaysian Ringgit" },
  { value: "NOK", label: "Norwegian Krone" },
  { value: "NZD", label: "New Zealand Dollar" },
  { value: "PHP", label: "Philippine Peso" },
  { value: "PLN", label: "Polish Złoty" },
  { value: "RON", label: "Romanian Leu" },
  { value: "SEK", label: "Swedish Krona" },
  { value: "SGD", label: "Singapore Dollar" },
  { value: "THB", label: "Thai Baht" },
  { value: "TRY", label: "Turkish Lira" },
  { value: "USD", label: "United States Dollar" },
  { value: "ZAR", label: "South African Rand" },
];
const densityOptions = [
  { value: "normal", label: "Comfortable" },
  { value: "compact", label: "Compact" },
];

interface IUserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: IUserProviderProps) => {
  const [defaultTheme, setDefaultTheme] = useState({
    value: "light",
    label: "Light",
  });
  const [defaultDensity, setDefaultDensity] = useState({
    value: "normal",
    label: "Comfortable",
  });
  const [defaultCurrency, setDefaultCurrency] = useState({
    value: "EUR",
    label: "Euro",
  });

  const setTheme = (value: any) => {
    setDefaultTheme(value);
  };

  const toggleTheme = () => {
    setDefaultTheme((option) => {
      if (option.value == "light") {
        return "dark";
      }
      return "light";
    });
  };

  const setDensity = (value: string) => {
    setDefaultDensity(value);
  };

  const toggleDensity = () => {
    setDefaultDensity((option) => {
      if (option.value == "normal") {
        return "compact";
      }
      return "normal";
    });
  };

  const value = {
    defaultTheme,
    themeOptions,
    toggleTheme,
    setTheme,
    setDefaultTheme,
    defaultCurrency,
    setDefaultCurrency,
    currencyOptions,
    defaultDensity,
    toggleDensity,
    densityOptions,
    setDensity,
    setDefaultDensity,
  };

  // needs saving to database
  // and to localStorage
  useEffect(() => {
    if (defaultTheme.value == "light") {
      applyMode(Mode.Light);
    } else {
      applyMode(Mode.Dark);
    }
  }, [defaultTheme]);

  // needs saving to database
  // and to localStorage
  useEffect(() => {
    if (defaultDensity.value == "normal") {
      applyDensity(Density.Comfortable);
    } else {
      applyDensity(Density.Compact);
    }
  }, [defaultDensity]);

  useEffect(() => {
    // needs saving to database
    // and to localStorage
    logger.debug("currency has change un userContext");
    logger.debug(defaultCurrency);
  }, [defaultCurrency]);

  return <UserContext value={value}>{children}</UserContext>;
};

export { UserContext, UserProvider };
