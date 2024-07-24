import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-bg": "#18191A",
        "main-soft-bg": "#242526",
        primary: "rgb(59 130 246)",
        navlink: "#B0B3B8",
        "white-text": "#fff",
        "soft-text": "#b7bac1",
      },
    },
  },
  plugins: [nextui()],
};
export default config;