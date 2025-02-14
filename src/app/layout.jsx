"use client";
import "./globals.css";
import { LocationProvider } from "../context/LocationContext";

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <script src='https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.js'></script>
        <link href='https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.css' rel='stylesheet' />
      </head>
      <body>
        <LocationProvider>{children}</LocationProvider>
      </body>
    </html>
  );
}
