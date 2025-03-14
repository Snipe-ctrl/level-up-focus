import { Inter } from "next/font/google"
import { AuthProvider } from "@/context/AuthContext"
import Header from "../components/header"
import Timer from "../components/timer";
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
        <AuthProvider>
          <Header />
          <Timer />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
