import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-bg": "#F4F4F4",
        "main-soft-bg": "#fff",
        "soft-text": "#b7bac1",
        primary: "rgb(59 130 246)",
      },
    },
  },
  plugins: [],
};
export default config;
