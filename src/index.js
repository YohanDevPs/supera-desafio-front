import React from "react";
import ReactDOM from "react-dom/client";
import TransferPagination from "./transfer-pagination/TransferPagination";
import ListExample from "./list-transfers/ListExample";
import InputExample from "./inputFiltersData/InputExample";
import BalancesComponent from "./balances/BalancesComponent";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="container">
    <React.StrictMode>
      <InputExample />
      <BalancesComponent />
      <ListExample />
      <TransferPagination />
    </React.StrictMode>
  </div>
);
