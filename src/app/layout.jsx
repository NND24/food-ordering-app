"use client";
import "./globals.css";
import { ProvinceProvider } from "../context/ProvinceContext";
import { LocationProvider } from "../context/LocationContext";
import { StoreLocationProvider } from "../context/StoreLocationContext";
import { ForgotPassEmailProvider } from "../context/ForgotPassEmailContext";
import { SocketProvider } from "../context/SocketContext";
import { persistor, store } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <HelmetProvider>
            <ProvinceProvider>
              <LocationProvider>
                <StoreLocationProvider>
                  <ForgotPassEmailProvider>
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
                  </ForgotPassEmailProvider>
                </StoreLocationProvider>
              </LocationProvider>
            </ProvinceProvider>
          </HelmetProvider>
        </Providers>
      </body>
    </html>
  );
}
