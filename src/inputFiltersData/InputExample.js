import React from "react";
import { Input, Row, Col } from "antd";
import "./Input.css";

const InputExample = () => (
  <>
    <Row gutter={16} className="custom-row">
      <Col span={8} className="custom-col">
        <p>Data Início</p>
        <Input placeholder="Data de inicio" className="custom-date-input" />
      </Col>
      <Col span={8} className="custom-col">
        <p>Data de Fim</p>
        <Input placeholder="Data final" className="custom-date-input" />
      </Col>
      <Col span={8} className="custom-col">
        <p>Nome do operador transacionado</p>
        <Input
          placeholder="Nome do operador"
          className="custom-operator-name-input"
        />
      </Col>
    </Row>
    <div className="input-accountId">
      <Row gutter={16}>
        <Col span={24}>
          <p>Código da conta</p>
          <Input placeholder="Código da conta" className="custom-accountId" />
        </Col>
      </Row>
    </div>
  </>
);

export default InputExample;
