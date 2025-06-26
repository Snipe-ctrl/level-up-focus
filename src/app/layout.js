import { Inter } from "next/font/google"
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Level-Up Focus",
  description: "Gameify your studies!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}