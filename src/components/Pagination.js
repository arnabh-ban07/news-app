
import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ currentPage, totalResults, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / pageSize);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <BootstrapPagination>
      <BootstrapPagination.First onClick={() => handlePageChange(1)} />
      <BootstrapPagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
      {[...Array(totalPages)].map((_, index) => (
        <BootstrapPagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </BootstrapPagination.Item>
      ))}
      <BootstrapPagination.Next onClick={() => handlePageChange(currentPage + 1)} />
      <BootstrapPagination.Last onClick={() => handlePageChange(totalPages)} />
    </BootstrapPagination>
  );
};

export default Pagination;

