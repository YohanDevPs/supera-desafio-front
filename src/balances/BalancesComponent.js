import React from "react";
import "./balances.css";

const BalancesComponent = () => {
  const saldoTotal = 1500; // Exemplo de saldo total
  const saldoPeriodo = 500; // Exemplo de saldo no período

  return (
    <div className="wrapper-border">
      {" "}
      {/* Adicione a classe da borda que envolve os elementos */}
      <div className="saldo-info">
        <h4>Saldo Total:</h4>
        <p>{`R$ ${saldoTotal.toFixed(2)}`}</p>
      </div>
      <div className="saldo-info">
        <h4>Saldo no Período:</h4>
        <p>{`R$ ${saldoPeriodo.toFixed(2)}`}</p>
      </div>
    </div>
  );
};

export default BalancesComponent;
