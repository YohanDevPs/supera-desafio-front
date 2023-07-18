import React from "react";
import "./BalanceSummary.css";

const BalanceSummary = ({ totalBalance, periodBalance }) => {
  return (
    <div className="wrapper-border">
      <div className="saldo-info">
        <h4>Saldo Total:</h4>
        <p>{`R$ ${totalBalance.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}`}</p>
      </div>
      <div className="saldo-info">
        <h4>Saldo no Período:</h4>
        <p>{`R$ ${periodBalance.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}`}</p>
      </div>
    </div>
  );
};

export default BalanceSummary;
