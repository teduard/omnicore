import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  applyDensity,
  applyMode,
  Density,
  Mode,
} from "@cloudscape-design/global-styles";
import { logger } from "../lib/logger";

const UserContext = createContext(null);

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
  const localTheme = localStorage.getItem("SessionTheme");
  const localCurrency = localStorage.getItem("SessionCurrency");
  const localLayout = localStorage.getItem("SessionLayout");
  const user = JSON.parse(localStorage.getItem("SessionUser"));

  const [defaultTheme, setDefaultTheme] = useState(
    localTheme === "light"
      ? {
          value: "light",
          label: "Light",
        }
      : {
          value: "dark",
          label: "Dark",
        },
  );
  const [defaultDensity, setDefaultDensity] = useState(
    localLayout === "normal"
      ? {
          value: "normal",
          label: "Comfortable",
        }
      : {
          value: "compact",
          label: "Compact",
        },
  );
  const [defaultCurrency, setDefaultCurrency] = useState(
    localCurrency
      ? JSON.parse(localCurrency)
      : {
          value: "EUR",
          label: "Euro",
        },
  );

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

  // needs saving to database
  // and to localStorage
  useEffect(() => {
    if (defaultTheme.value == "light") {
      applyMode(Mode.Light);
      localStorage.setItem("SessionTheme", "light");
    } else {
      applyMode(Mode.Dark);
      localStorage.setItem("SessionTheme", "dark");
    }
  }, [defaultTheme]);

  // needs saving to database
  // and to localStorage
  useEffect(() => {
    if (defaultDensity.value == "normal") {
      applyDensity(Density.Comfortable);
      localStorage.setItem("SessionLayout", "normal");
    } else {
      applyDensity(Density.Compact);
      localStorage.setItem("SessionLayout", "compact");
    }
  }, [defaultDensity]);

  useEffect(() => {
    // needs saving to database
    // and to localStorage
    logger.debug("currency has changed in userContext");
    logger.debug(defaultCurrency);
    localStorage.setItem("SessionCurrency", JSON.stringify(defaultCurrency));
  }, [defaultCurrency]);

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
    user
  };

  return <UserContext value={value}>{children}</UserContext>;
};

export { UserContext, UserProvider };
