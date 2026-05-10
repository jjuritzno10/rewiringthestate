import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const display = localFont({
  src: [
    {
      path: "../public/fonts/sequel-sans/SequelSans-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/sequel-sans/SequelSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/sequel-sans/SequelSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/sequel-sans/SequelSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});
