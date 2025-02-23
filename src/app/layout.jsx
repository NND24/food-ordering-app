"use client";
import "./globals.css";
import { LocationProvider } from "../context/LocationContext";
import { ForgotPassEmailProvider } from "../context/ForgotPassEmailContext";
import { persistor, store } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <head>
        <script src='https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.js'></script>
        <link href='https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.css' rel='stylesheet' />
      </head>
      <body>
        <Providers>
          <LocationProvider>
            <ForgotPassEmailProvider>
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
            </ForgotPassEmailProvider>
          </LocationProvider>
        </Providers>
      </body>
    </html>
  );
}
