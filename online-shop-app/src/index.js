import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { createStore } from "redux";
import { Provider } from "react-redux";
import store from "./reduxMul/store";
// import cartReducer from "./redux/reducers/cartReducer";
// import rootReducer from "./redux/reducers/globalReducer";

//store
// const storeRedux = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
