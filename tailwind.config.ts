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
        ticket_book_bg: "var(--ticket_book_bg)",
        ticket_book_outline: "var(--ticket_book_outline)",
        access_bg_hovered: "var(--access_hovered_bg)",
        access_bg_selected: "var(--access_selected_bg)",
        gray: "var(--gray)",
        gray_light: "var(--gray_light)",
        ticket_menu_border: "var(--ticket_menu_border)",
      },
      fontFamily: {},
      screens: {
        sm: "480px", // Small screens (default)
      },
    },
  },
  plugins: [],
} satisfies Config;
