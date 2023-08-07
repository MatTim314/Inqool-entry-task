// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme(
  {
    config,
  },
  {
    text: {
      default: "gunmetal",
      _dark: "seasalt",
    },
  },
  {
    styles: {
      global: {
        "html, body": {
          lineHeight: "tall",
        },
      },
    },
    colors: {
      cyclamen: "#e86a92ff",
      picton_blue: "#3da5d9ff",
      celadon: "#acd8aaff",
      gunmetal: "#2e3138ff",
      white: "#FFFFFF",
      seasalt: "#f7f7f9ff",
    },
  }
);

export default theme;
