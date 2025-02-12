import { Alatsi, Inter, Road_Rage, Roboto } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const roboto = Roboto({
  // from 100 to 900
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const roadRage = Road_Rage({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
export const alatsi = Alatsi({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const jeju = localFont({
  src: "./JejuMyeongjo-Regular.ttf",
  display: "swap",
});
