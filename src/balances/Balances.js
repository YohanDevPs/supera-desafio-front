import React from "react";
import "./Balances.css";

const Balances = ({ totalBalance, periodBalance }) => {
  return (
    <div className="wrapper-border">
      <div className="saldo-info">
        <h4>Saldo Total:</h4>
        <p>{`R$ ${totalBalance.toFixed(2)}`}</p>
      </div>
      <div className="saldo-info">
        <h4>Saldo no Período:</h4>
        <p>{`R$ ${periodBalance.toFixed(2)}`}</p>
      </div>
    </div>
  );
};

export default Balances;
