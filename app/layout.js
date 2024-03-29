import Image from "next/image";
import { Analytics } from '@vercel/analytics/react';
import Footer from "./components/Footer";
import Header from "./components/Header";
import MapProvider from "./lib/state";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata = {
  title: "Find Your FGC",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <MapProvider>{children}</MapProvider>
        {/* moved the background Image to layout so it can be shared on the map page without having to re-render it */}
        <Image
          className={styles.image}
          src="/AT_CD_04.png"
          fill={true}
          style={{objectFit: "cover"}}
          alt="Picture of the author"
        />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
