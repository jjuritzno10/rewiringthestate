import type { Metadata } from "next";
import { mono, display } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "rewirethestate — open roles in UK government",
  description:
    "An unofficial index of open technical roles inside the UK government's most ambitious teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${display.variable} light`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
