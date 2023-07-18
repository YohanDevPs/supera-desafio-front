import React, { useState, useEffect } from "react";
import { baseUrl } from "../constants/baseUrl";
import {
  Row,
  Col,
  Input,
  Button,
  Pagination,
  DatePicker,
  notification,
} from "antd";
import TableTransfers from "../table-transfers/TableTransfers";
import Balances from "../balances/Balances";

import "./TransferFilterForm.css";

const TransferFilterForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [usedUrl, setUsedUrl] = useState("");
  const [transactionOperatorName, setTransactionOperatorName] = useState("");
  const [accountCode, setAccountCode] = useState("");
  const [usedAccountCode, setUsedAccountCode] = useState("");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isButtonSearchDisabled, setIsButtonSearchDisabled] = useState(true);
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

  useEffect(() => {
    setIsButtonSearchDisabled(!accountCode || isNaN(accountCode));
  }, [accountCode]);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      handleSearch();
    }
  }, [currentPage]);

  const handleCodigoContaChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    setAccountCode(numericValue);
  };

  let paginationActivated = false;
  const handlePageChange = (pageNumber) => {
    paginationActivated = true;
    setCurrentPage(pageNumber === 1 ? 0 : pageNumber);
  };

  function transformDate(date) {
    return date.format("YYYY-MM-DD HH:mm:ss");
  }

  const handleSearch = () => {
    let url;
    if (paginationActivated === false && usedAccountCode !== accountCode) {
      url = baseUrl + accountCode + "?page=0";
      setCurrentPage(0);
      paginationActivated = true;
    } else {
      const adjustedPage = currentPage === 0 ? 1 : currentPage;
      url = baseUrl + accountCode + "?page=" + (adjustedPage - 1);
    }

    if (startDate) {
      url += `&startDate=${transformDate(startDate)}`;
    }

    if (endDate) {
      url += `&endDate=${transformDate(endDate)}`;
    }

    if (transactionOperatorName) {
      url += `&transactionOperatorName=${transactionOperatorName}`;
    }

    if (usedUrl === url) {
      return;
    }

    setUsedUrl(url);
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
        setUsedAccountCode(accountCode);
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

  return (
    <>
      <Row gutter={16}>
        <Col style={{ flex: 1, maxWidth: "200px" }}>
          <p>Data Início</p>
          <DatePicker
            value={startDate}
            onChange={(date) => setStartDate(date)}
            className="custom-date-input"
            format="DD/MM/YYYY"
          />
        </Col>
        <Col style={{ flex: 1, maxWidth: "200px" }}>
          <p>Data de Fim</p>
          <DatePicker
            value={endDate}
            onChange={(date) => setEndDate(date)}
            className="custom-date-input"
            format="DD/MM/YYYY"
            disabledDate={(current) =>
              (startDate && current && current.isBefore(startDate)) ||
              current.isAfter(new Date())
            }
          />
        </Col>
        <Col
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div className="container-input-operator">
            <p class="operator-text">Nome do operador transacionado</p>
            <Input
              placeholder="Nome do operador"
              className="input-operator-name"
              style={{ width: "400px" }} // Defina o tamanho do width desejado aqui
              value={transactionOperatorName}
              onChange={(e) => setTransactionOperatorName(e.target.value)}
            />
          </div>
        </Col>
      </Row>
      <div className="input-row-bottom">
        <Button
          type="primary"
          onClick={handleSearch}
          disabled={isButtonSearchDisabled}
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
              value={accountCode}
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
      <TableTransfers datas={filteredBankTransferPage.pagedTransfers.content} />
      <div className="pagination">
        <Pagination
          total={filteredBankTransferPage.pagedTransfers.page.totalElements}
          pageSize={filteredBankTransferPage.pagedTransfers.page.size}
          defaultCurrent={1}
          current={currentPage === 0 ? 1 : currentPage}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default TransferFilterForm;
