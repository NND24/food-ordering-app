"use client";
import Sidebar from "@/components/shipper-components/Sidebar/Sidebar";
import "./../globals.css";
import Navbar from "@/components/shipper-components/Navbar/Navbar";
export default function RootLayout({ children }) {
  return (
    <html lang='en'>        
      <body>
        <Navbar/>
        <div className="shipper-container">
          <Sidebar/>
          <div className="shipper-container-content">
            { children }
          </div>
        </div>
       
      </body>
    </html>
  );
}