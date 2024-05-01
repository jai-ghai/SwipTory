import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "react-toastify/dist/ReactToastify.css";

import "./main.css";

import Layout from "./components/common/Layout/Layout.jsx";
import App from "./App.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Layout>
        <App />
      </Layout>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
