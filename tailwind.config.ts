import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary: "var(--secondary)",
        secondary_light: "var(--secondary_light)",
        primary: "var(--primary)",
        header: "var(--header)",
        ticket_box_background: "var(--ticket_box_background)",
        ticket_box: "var(--ticket_box)",
        ticket_box_border: "var(--ticket_box_border)",
        ticket_select: "var(--ticket_select_box)",
        gray: "var(--gray)",
      },
      fontFamily: {},
    },
  },
  plugins: [],
} satisfies Config;
