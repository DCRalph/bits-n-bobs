import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

import { ThemeProvider } from "~/components/theme-provider";

import  NavBar  from "~/components/NavBar";

export const metadata: Metadata = {
  title: "Bits N Bobs",
  description: "Cool internet bits n bobs",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body id="rootBody">
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            {/* <NavBar /> */}
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
