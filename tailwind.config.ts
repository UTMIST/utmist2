import type { Config } from "tailwindcss";
// {js,ts,jsx,tsx,mdx}
const config: Config = {
  content: [
    "./src/components/**/*.tsx",
    "./src/styles/**/*.tsx",
    "./pages/**/*.tsx",
    "./src/**/*.tsx",
  ],
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
      },
      backgroundImage: {
        "banner-small": "url('/assets/BannerSmall.svg')",
        "banner-large": "url('/assets/Banner.svg')",
        "wwd-banner": "url('/assets/Rectangle45.svg')",
        "mission":"url('/assets/mission-bg.png')",
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
        "roboto-mono": ['"Roboto Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
