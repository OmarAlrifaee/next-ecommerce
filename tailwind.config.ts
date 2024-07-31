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
        "main-bg": "#FFFFFF",
        "main-soft-bg": "#F5F5F5",
        "button-1": "#00FF66",
        "button-2": "#DB4444",
        "button-2-hover": "#E07575",
        "button-3": "#000000",
        "white-text": "#FAFAFA",
        "gray-text": "#7D8184",
        "black-text": "#000000",
        "blue-1": "#A0BCE0",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
