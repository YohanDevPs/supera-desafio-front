import "./Input.css";

import React, { useState } from "react";
import { Row, Col, Input, Button } from "antd";

const InputExample = () => {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [nomeOperador, setNomeOperador] = useState("");
  const [codigoConta, setCodigoConta] = useState("");

  const baseUrl = "http://localhost:8080/api/transfer/v1/";

  const handleSubmit = () => {
    let url = baseUrl + codigoConta;

    // Verificamos se existe a data de início e, se sim, concatenamos à url
    if (dataInicio) {
      url += `&startDate=${transformDate(dataInicio)}`;
    }

    // Verificamos se existe a data de fim e, se sim, concatenamos à url
    if (dataFim) {
      url += `&endDate=${transformDate(dataFim)}`;
    }

    // Verificamos se existe o nome do operador e, se sim, concatenamos à url
    if (nomeOperador) {
      url += `&transactionOperatorName=${nomeOperador}`;
    }

    // Agora você pode usar a variável "url" para o propósito necessário, por exemplo, fazer uma requisição com axios ou fetch.
    console.log(url);
  };

  function transformDate(date) {
    const parts = date.split("/");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}%2000:00:00`;
    return formattedDate;
  }

  return (
    <>
      <Row gutter={16} className="custom-row">
        <Col span={8} className="custom-col">
          <p>Data Início</p>
          <Input
            placeholder="Data de inicio"
            className="custom-date-input"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </Col>
        <Col span={8} className="custom-col">
          <p>Data de Fim</p>
          <Input
            placeholder="Data final"
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
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
};

export default InputExample;
