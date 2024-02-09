import { AuthContext } from "@/context/AuthContext";
import ToasterContext from "@/context/ToasterContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ActiveStatus from "./components/sidebar/ActiveStatus";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Me",
  description: "Chat Application created by Vishal Mistry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
