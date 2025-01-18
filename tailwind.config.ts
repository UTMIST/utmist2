import type {Config} from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
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
            screens: {
                xs: "475px",
            },
            colors: {
                primary: {
                    "100": "#d3edfa",
                    DEFAULT: "#1481BA",
                },
                secondary: "#11B54E",
                black: {
                    "100": "#333333",
                    "200": "#141413",
                    "300": "#7D8087",
                    DEFAULT: "#001021",
                },
                white: {
                    "100": "#F7F7F7",
                    DEFAULT: "#FFFFFF",
                },
                "utmist-purple": "#8C51FF",
                "dark-grey": "rgba(0, 0, 0, 0.83)",
                "utmist-pink": "#CC6DE5",
                "dropdown": "#001128",
                "utmist-black": "#121212"
            },
            backgroundImage: {
              "banner-small": "url('/BannerSmall.svg')",
              "banner-large": "url('/Banner.svg')",
              "wwd-banner": "url('/Rectangle45.svg')",
              "github": "url('/GithubIcon.svg')",
              "linkedin": "url('/LinkedinIcon.svg')",
              "mission":"url('/mission_bg.png')",
              rect1: "url('/Rectangle1.svg')",
              rect2: "url('/Rectangle2.svg')",
              rect3: "url('/Rectangle3.svg')",
              rect4: "url('/Rectangle4.svg')",
              rect5: "url('/Rectangle5.svg')",
              rect6: "url('/Rectangle6.svg')",
              rect7: "url('/Rectangle7.svg')",
              "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
              "gradient-conic":
                "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {
                "roboto-mono": ['"Roboto Mono"', "monospace"],
                "work-sans": ["var(--font-work-sans)"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            boxShadow: {
                100: "2px 2px 0px 0px rgb(0, 0, 0)",
                200: "2px 2px 0px 2px rgb(0, 0, 0)",
                300: "2px 2px 0px 2px rgb(17, 181, 78)",
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;