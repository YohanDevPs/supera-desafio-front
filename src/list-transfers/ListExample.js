import React from "react";
import { List } from "antd";
import "./ListExample.css";

const data = [
  {
    dados: "Valor dos dados 1",
    valencia: "Valor da valência 1",
    Tipo: "deposito",
    NomeOperador: "roberto",
  },
  {
    dados: "Valor dos dados 2",
    valencia: "Valor da valência 2",
    Tipo: "deposito",
    NomeOperador: "roberto",
  },
  {
    dados: "Valor dos dados 3",
    valencia: "Valor da valência 3",
    Tipo: "deposito",
    NomeOperador: "roberto",
  },
];

const ListExample = () => (
  <div className="list-container">
    <List
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item className="sss-list">
          <div className="custom-list">
            <div>
              <p>Dados: {item.dados}</p>
            </div>
            <div>
              <p>Valência: {item.valencia}</p>
            </div>
            <div>
              <p>Tipo: {item.Tipo}</p>
            </div>
            <div>
              <p>Nome do Operador: {item.NomeOperador}</p>
            </div>
          </div>
        </List.Item>
      )}
      className="custom-list"
    />
  </div>
);

export default ListExample;
