import React from "react";
import ReactDOM from "react-dom/client";
import TransferPagination from "./transfer-pagination/TransferPagination";
import TransferFilterForm from "./filters/TransferFilterForm";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="container">
    <React.StrictMode>
      <TransferFilterForm />
      <TransferPagination />
    </React.StrictMode>
  </div>
);
