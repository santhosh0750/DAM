import React from "react";
import { Provider } from "react-redux";
import { persistor, storedata } from "./store";
import { PersistGate } from "redux-persist/integration/react";

function Reduxprovider({ children }) {
  return (
    <Provider store={storedata}>
      <PersistGate persistor={persistor}>
        <main>{children}</main>
      </PersistGate>
    </Provider>
  );
}

export default Reduxprovider;
