import React from "react";
import { List } from "antd";
import "./ListTransfers.css";

const ListTransfers = ({ datas }) => {
  return (
    <div className="list-container">
      <List
        bordered
        dataSource={datas}
        renderItem={(item) => (
          <List.Item className="sss-list">
            <div className="custom-list">
              <div>
                <p>Data: {item.transferDate}</p>
              </div>
              <div>
                <p>Valor: R$ {item.amount}</p>
              </div>
              <div>
                <p>Tipo: {item.type}</p>
              </div>
              <div>
                <p>Nome do Operador: {item.transactionOperatorName}</p>
              </div>
            </div>
          </List.Item>
        )}
        className="custom-list"
      />
    </div>
  );
};

export default ListTransfers;
