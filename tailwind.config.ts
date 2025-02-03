import type { Config } from "tailwindcss";
import fireCMSConfig from "@firecms/ui/tailwind.config.js";

const config: Config = {
  presets: [fireCMSConfig],
  content: [
    "./src/components/**/*.tsx",
    "./src/styles/**/*.tsx",
    "./app/**/*.tsx",
    "./src/**/*.tsx",

    // "./index.html",
    // "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@firecms/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@firecms/ui/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@firecms/core/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@firecms/ui/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@firecms/core/**/*.{js,ts,jsx,tsx}",

    // Exclude AI2 directories
    "!./app/common/ai2/**/*.{ts,tsx}",
    "!./app/(ai2)/**/*.{ts,tsx}",
  ],
  darkMode: ["selector", "[data-theme=\"dark\"]"],
  theme: {
    borderRadius: {
      md: "15px",
    },
    screens: {
      sm: "390px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
    extend: {
      boxShadow: {
        md: "4px 4px 10px rgba(255, 255, 255, 0.25)",
      },
      colors: {
        "utmist-purple": "#8C51FF",
        "dark-grey": "rgba(0, 0, 0, 0.83)",
        "utmist-pink": "#CC6DE5",
        "dropdown": "#001128",
        "utmist-black": "#121212"
      },
      backgroundImage: {
        "banner-small": "url('/assets/BannerSmall.svg')",
        "banner-large": "url('/assets/Banner.svg')",
        "wwd-banner": "url('/assets/Rectangle45.svg')",
        "github": "url('/assets/GithubIcon.svg')",
        "linkedin": "url('/assets/LinkedinIcon.svg')",
        "mission":"url('/assets/mission_bg.png')",
        rect1: "url('/assets/Rectangle1.svg')",
        rect2: "url('/assets/Rectangle2.svg')",
        rect3: "url('/assets/Rectangle3.svg')",
        rect4: "url('/assets/Rectangle4.svg')",
        rect5: "url('/assets/Rectangle5.svg')",
        rect6: "url('/assets/Rectangle6.svg')",
        rect7: "url('/assets/Rectangle7.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        headers: ['"Rubik"', '"Roboto"', "Helvetica", "Arial", "sans-serif"],
        "roboto-mono": ['"Roboto Mono"', "monospace"],
      },
    },
  },
  safelist: [
    {
      pattern: /bg-surface-(50|900)/,
    },
    {
      pattern: /font-(headers|mono)/,
    },
  ]
};

export default config;
