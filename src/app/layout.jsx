"use client";
import "./globals.css";
import { ProvinceProvider } from "../context/ProvinceContext";
import { LocationProvider } from "../context/LocationContext";
import { StoreLocationProvider } from "../context/StoreLocationContext";
import { ForgotPassEmailProvider } from "../context/ForgotPassEmailContext";
import { SocketProvider } from "../context/SocketContext";
import { VoucherProvider } from "../context/VoucherContext";
import { LanguageProvider } from "../context/LanguageContext";
import { persistor, store } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300' suppressHydrationWarning>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <HelmetProvider>
              <ThemeProvider attribute='class' defaultTheme='light' enableSystem={true}>
                <LanguageProvider>
              <ProvinceProvider>
                  <LocationProvider>
                    <StoreLocationProvider>
                      <ForgotPassEmailProvider>
                        <VoucherProvider>
                        <SocketProvider>
                          {children}
                          <ToastContainer
                            position='top-right'
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme='light'
                          />
                        </SocketProvider>
                        </VoucherProvider>
                      </ForgotPassEmailProvider>
                    </StoreLocationProvider>
                  </LocationProvider>
                </ProvinceProvider>
              </LanguageProvider>
              </ThemeProvider>
            </HelmetProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
