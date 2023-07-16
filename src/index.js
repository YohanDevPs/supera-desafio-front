import React from "react";
import ReactDOM from "react-dom/client";
import TransferPagination from "./transfer-pagination/TransferPagination";
import ListTransfers from "./list-transfers/ListTransfers";
import TransferFilterForm from "./filters/TransferFilterForm";
import Balances from "./balances/Balances";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="container">
    <React.StrictMode>
      <TransferFilterForm />
      <Balances />
      <ListTransfers />
      <TransferPagination />
    </React.StrictMode>
  </div>
);
