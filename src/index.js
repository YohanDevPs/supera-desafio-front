import React from "react";
import ReactDOM from "react-dom/client";
import BankStatementPage from "./components/bank-statement/BankStatementPage";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="container">
    <React.StrictMode>
      <BankStatementPage />
    </React.StrictMode>
  </div>
);