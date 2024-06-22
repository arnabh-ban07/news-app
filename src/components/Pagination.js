
// src/components/Pagination.js
import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ currentPage, totalResults, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / pageSize);

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <BootstrapPagination className="justify-content-center">
      <BootstrapPagination.First onClick={() => handlePageChange(1)} />
      <BootstrapPagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {Array.from({ length: totalPages }, (_, index) => (
        <BootstrapPagination.Item
          key={index}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </BootstrapPagination.Item>
      ))}
      <BootstrapPagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <BootstrapPagination.Last onClick={() => handlePageChange(totalPages)} />
    </BootstrapPagination>
  );
};

export default Pagination;


