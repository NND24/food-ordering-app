"use client";
import Sidebar from "../../components/admin-components/Sidebar/Sidebar";
import "./../globals.css";
import Navbar from "../../components/admin-components/Navbar/Navbar";
export default function RootLayout({ children }) {
  return (
    <html lang='en'>        
      <body>
        <Navbar/>
        <div className="admin-container">
          <Sidebar/>
          <div className="admin-container-content">
            { children }
          </div>
        </div>
       
      </body>
    </html>
  );
}