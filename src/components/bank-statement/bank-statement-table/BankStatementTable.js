import React from "react";
import { format, parseISO } from "date-fns";
import { Table } from "antd";
import "./BankStatementTable.css";

const BankStatementTable = ({ datas }) => {
  return (
    <div className="table.container">
      <Table
        bordered
        dataSource={datas}
        columns={[
          {
            title: "Data",
            dataIndex: "transferDate",
            key: "transferDate",
            render: (transferDate) =>
              format(parseISO(transferDate), "dd/MM/yyyy"),
          },
          {
            title: "Valor",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => (
              <span>
                R${" "}
                {amount.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            ),
          },
          {
            title: "Tipo",
            dataIndex: "type",
            key: "type",
          },
          {
            title: "Nome do Operador",
            dataIndex: "transactionOperatorName",
            key: "transactionOperatorName",
          },
        ]}
        pagination={false}
      />
    </div>
  );
};

export default BankStatementTable;
