import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Pagination,
  DatePicker,
  notification,
} from "antd";
import ListTransfers from "../list-transfers/ListTransfers";
import Balances from "../balances/Balances";

import "./TransferFilterForm.css";

const TransferFilterForm = () => {
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [nomeOperador, setNomeOperador] = useState("");
  const [codigoConta, setCodigoConta] = useState("");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [filteredBankTransferPage, setFilteredBankTransferPage] = useState({
    pagedTransfers: {
      content: [],
      page: {
        size: 0,
        totalElements: 0,
        totalPages: 0,
        number: 0,
      },
    },
    totalBalance: 0,
    periodBalance: 0,
  });
  const [currentPage, setCurrentPage] = useState(
    filteredBankTransferPage.pagedTransfers.page.number
  );

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber === 1 ? 0 : pageNumber);
  };

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      handleSearch();
    }
  }, [currentPage]);

  const handleSearch = () => {
    const adjustedPage = currentPage === 0 ? 1 : currentPage;

    let url = baseUrl + codigoConta + "?page=" + (adjustedPage - 1);

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
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        const adjustedData = { ...data };
        if (adjustedData.pagedTransfers.page.number === 0) {
          adjustedData.pagedTransfers.page.number = 1;
        }
        setFilteredBankTransferPage(data);
      })
      .catch((error) => {
        console.error("Erro:", error.message);
        notification.error({
          message: "Erro",
          description: error.message,
          duration: 5,
        });
      });
  };

  function transformDate(date) {
    return date.format("YYYY-MM-DD HH:mm:ss");
  }

  return (
    <>
      <Row gutter={16} className="custom-row">
        <Col span={8} className="custom-col">
          <p>Data Início</p>
          <DatePicker
            value={dataInicio}
            onChange={(date) => setDataInicio(date)}
            className="custom-date-input"
            format="DD/MM/YYYY"
          />
        </Col>
        <Col span={8} className="custom-col">
          <p>Data de Fim</p>
          <DatePicker
            value={dataFim}
            onChange={(date) => setDataFim(date)}
            className="custom-date-input"
            format="DD/MM/YYYY"
            disabledDate={(current) =>
              dataInicio && current && current.isBefore(dataInicio)
            }
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
          onClick={handleSearch}
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
      <Balances
        totalBalance={parseFloat(filteredBankTransferPage.totalBalance)}
        periodBalance={parseFloat(filteredBankTransferPage.periodBalance)}
      />
      <ListTransfers datas={filteredBankTransferPage.pagedTransfers.content} />
      <div className="pagination">
        <Pagination
          total={filteredBankTransferPage.pagedTransfers.page.totalElements}
          pageSize={filteredBankTransferPage.pagedTransfers.page.size}
          defaultCurrent={1}
          current={currentPage === 0 ? 1 : currentPage}
          onChange={handlePageChange}
        />
        <p>Página atual: {currentPage}</p>
      </div>
    </>
  );
};

export default TransferFilterForm;