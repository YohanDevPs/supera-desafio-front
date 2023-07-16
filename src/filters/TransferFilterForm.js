import "./TransferFilterForm.css";

import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button, Pagination } from "antd";
import ListTransfers from "../list-transfers/ListTransfers";
import Balances from "../balances/Balances";

const TransferFilterForm = () => {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [nomeOperador, setNomeOperador] = useState("");
  const [codigoConta, setCodigoConta] = useState("");
  const [totalBalance, setTotalBalance] = useState(0);
  const [periodBalance, setPeriodBalance] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredBankTransferPage, setFilteredBankTransferPage] = useState({
    pagedTransfers: {
      content: [],
    },
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(!codigoConta || isNaN(codigoConta));
  }, [codigoConta]);

  const handleCodigoContaChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    setCodigoConta(numericValue);
  };

  const baseUrl = "http://localhost:8080/api/transfer/v1/";

  const handleSubmit = () => {
    let url = baseUrl + codigoConta + "?page=" + currentPage;

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
        setFilteredBankTransferPage(data);
        setTotalBalance(parseFloat(data.totalBalance));
        setPeriodBalance(parseFloat(data.periodBalance));
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
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
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={isButtonDisabled}
        >
          Pesquisar
        </Button>
        <Row gutter={16}>
          <Col span={24}>
            <p>
              <span style={{ color: "red", marginRight: 4 }}>*</span>
              Código da conta
            </p>
            <Input
              placeholder="Código da conta"
              className="custom-accountId"
              value={codigoConta}
              onChange={handleCodigoContaChange}
              required
            />
          </Col>
        </Row>
      </div>
      <Balances totalBalance={totalBalance} periodBalance={periodBalance} />
      <ListTransfers datas={filteredBankTransferPage.pagedTransfers.content} />
      <div className="pagination">
        <Pagination defaultCurrent={1} total={50} onChange={handlePageChange} />
        <p>Página atual: {currentPage}</p>
      </div>
    </>
  );
};

export default TransferFilterForm;
