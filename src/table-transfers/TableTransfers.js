import React from "react";
import { format, parseISO } from "date-fns";
import { List } from "antd";
import "./TableTransfers.css";

const TableTransfers = ({ datas }) => {
  return (
    <div className="list-container">
      <List
        bordered
        dataSource={datas}
        renderItem={(item) => (
          <List.Item className="sss-list">
            <div className="custom-list">
              <div>
                <p>Data: {format(parseISO(item.transferDate), "dd/MM/yyyy")}</p>
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

export default TableTransfers;
