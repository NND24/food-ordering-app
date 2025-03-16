"use client";
import Sidebar from "../../components/admin-components/Sidebar/Sidebar";
import "./../globals.css";
import Navbar from "../../components/admin-components/Navbar/Navbar";
import { usePathname } from "next/navigation"; 
export default function RootLayout({ children }) {

  const pathname = usePathname();  
  const isAuthPage = pathname.startsWith("/admin/auth");

  return (
    <html lang='en'>        
      <body>
        {!isAuthPage && <Navbar />}
        <div className="admin-container">
          {!isAuthPage && <Sidebar />}
          <div className="admin-container-content">
            { children }
          </div>
        </div>
       
      </body>
    </html>
  );
}