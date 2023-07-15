import React from 'react';
import { Pagination } from 'antd';
import "./TransferPagination.css";

const TransferPagination = () => (
  <div className="pagination">
  <Pagination defaultCurrent={1} total={50} />
  </div>
);

export default TransferPagination;
