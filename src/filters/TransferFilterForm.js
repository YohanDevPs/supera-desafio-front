import "./TransferFilterForm.css";

import React, { useState } from "react";
import { Row, Col, Input, Button } from "antd";
import ListTransfers from "../list-transfers/ListTransfers";
import Balances from "../balances/Balances";

const TransferFilterForm = () => {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [nomeOperador, setNomeOperador] = useState("");
  const [codigoConta, setCodigoConta] = useState("");
  const [contentList, setContentList] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [periodBalance, setPeriodBalance] = useState(0);

  const baseUrl = "http://localhost:8080/api/transfer/v1/";

  const handleSubmit = () => {
    let url = baseUrl + codigoConta + "?page=0";

    if (dataInicio) {
      url += `&startDate=${transformDate(dataInicio)}`;
    }

    if (dataFim) {
      url += `&endDate=${transformDate(dataFim)}`;
    }

    if (nomeOperador) {
      url += `&transactionOperatorName=${nomeOperador}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const contentList = data.pagedTransfers.content;
        setContentList(contentList);

        const totalBalance = parseFloat(data.totalBalance);
        setTotalBalance(totalBalance);
        const periodBalance = parseFloat(data.periodBalance);
        setPeriodBalance(periodBalance);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  };

  function transformDate(date) {
    const parts = date.split("/");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formattedDate + "%2000:00:00";
  }

  return (
    <>
      <Row gutter={16} className="custom-row">
        <Col span={8} className="custom-col">
          <p>Data Início</p>
          <Input
            placeholder="dd/mm/aaaa"
            className="custom-date-input"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </Col>
        <Col span={8} className="custom-col">
          <p>Data de Fim</p>
          <Input
            placeholder="dd/mm/aaaa"
            className="custom-date-input"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </Col>
        <Col span={8} className="custom-col">
          <p>Nome do operador transacionado</p>
          <Input
            placeholder="Nome do operador"
            className="custom-operator-name-input"
            value={nomeOperador}
            onChange={(e) => setNomeOperador(e.target.value)}
          />
        </Col>
      </Row>
      <div className="input-accountId">
        <Button type="primary" onClick={handleSubmit}>
          Pesquisar
        </Button>
        <Row gutter={16}>
          <Col span={24}>
            <p>Código da conta</p>
            <Input
              placeholder="Código da conta"
              className="custom-accountId"
              value={codigoConta}
              onChange={(e) => setCodigoConta(e.target.value)}
            />
          </Col>
        </Row>
      </div>
      <Balances totalBalance={totalBalance} periodBalance={periodBalance} />
      <ListTransfers datas={contentList} />
    </>
  );
};

export default TransferFilterForm;
